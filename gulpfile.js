'use strict';

const concat = require('gulp-concat');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');
const merge = require('merge-stream');
const injectstring = require('gulp-inject-string');
const browserify = require('browserify');
const babelify = require('babelify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const log = require('fancy-log');
const bundleconfig = require('./bundleconfig.json');
const fs = require('fs');
const ts = require('gulp-typescript');

const editFilePartial = 'Edit this file at https://github.com/chocolatey/choco-theme/partials';
const { series, parallel, src, dest } = require('gulp');

const regex = {
    css: /\.css$/,
    js: /\.js$/
};

const paths = {
    input: 'input/',
    assets: 'input/assets/',
    partials: 'input/global-partials',
    node_modules: 'node_modules/',
    theme: 'node_modules/choco-theme/'
};

const tsProject = ts.createProject(`${paths.theme}tsconfig.json`);

const getBundles = regexPattern => {
    return bundleconfig.filter(bundle => {
        return regexPattern.test(bundle.outputFileName);
    });
};

const del = () => {
    return src([
        `${paths.assets}css`,
        `${paths.assets}js`,
        `${paths.assets}fonts`,
        `${paths.assets}images/global-shared`,
        paths.partials
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
};

const copyTheme = () => {
    const copyFontAwesome = src(`${paths.node_modules}@fortawesome/fontawesome-free/webfonts/*.*`)
        .pipe(dest(`${paths.assets}fonts/fontawesome-free`));

    const copyImages = src(`${paths.theme}images/global-shared/*.*`)
        .pipe(dest(`${paths.assets}images/global-shared`));

    const copyIcons = src(`${paths.theme}images/icons/*.*`)
        .pipe(dest(paths.input));

    const copyPartials = src([
            `${paths.theme}partials/*.*`,
            `!${paths.theme}partials/AlertText.txt`,
            `!${paths.theme}partials/svgstyles.txt`,
            `!${paths.theme}partials/partials/TermsLastUpdated.txt`,
            `!${paths.theme}partials/TermsToc.html`,
            `!${paths.theme}partials/TermsContent.html`
        ])
        .pipe(injectstring.prepend(`@* ${editFilePartial} *@\n`))
        .pipe(injectstring.replace(/topNoticeText = ""/, `topNoticeText = "${fs.readFileSync(`${paths.theme}partials/AlertText.txt`, 'utf8')}"`))
        .pipe(injectstring.replace(/<input id="themeToggle" \/>/, fs.readFileSync(`${paths.theme}partials/ThemeToggle.txt`)))
        .pipe(injectstring.replace(/﻿/, '')) // eslint-disable-line
        .pipe(rename({ prefix: '_', extname: '.cshtml' }))
        .pipe(dest(paths.partials));

    const copyTermsLastUpdated = src(`${paths.theme}partials/TermsLastUpdated.txt`)
        .pipe(injectstring.prepend(`<!-- ${editFilePartial} -->\n`))
        .pipe(rename({ basename: 'terms-last-updated' }))
        .pipe(dest(paths.partials));

    const copyTermsContent = src(`${paths.theme}partials/TermsContent.html`)
        .pipe(injectstring.prepend(`<!-- ${editFilePartial} -->\n`))
        .pipe(rename({ basename: 'terms-content', extname: '.txt' }))
        .pipe(dest(paths.partials));

    const copyChocoThemeJs = src(`${paths.theme}js/**/*.*`)
        .pipe(dest(`${paths.assets}js/temp`));

    return merge(copyFontAwesome, copyImages, copyIcons, copyPartials, copyTermsLastUpdated, copyTermsContent, copyChocoThemeJs);
};

const compileSass = () => {
    return src(`${paths.theme}scss/*.scss`)
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(`${paths.assets}css`));
};

const compileTs = () => {
    const tsResult = src(`${paths.assets}js/temp/ts/**/*.ts`)
        .pipe(tsProject());
 
    return tsResult.js.pipe(dest(`${paths.assets}js/temp/ts`));
};

const compileJs = () => {
    const tasks = getBundles(regex.js).map(bundle => {
        const b = browserify({
            entries: bundle.inputFiles,
            debug: true,
            transform: [babelify.configure({
                presets: [
                    '@babel/preset-env',
                    ['@babel/preset-react', { runtime: 'automatic' }]
                ],
                compact: false
            })]
        });

        return b.bundle()
            .pipe(source(bundle.outputFileName))
            .pipe(buffer())
            .on('error', error => { log.error(error.message); })
            .pipe(dest('.'));
    });

    return merge(tasks);
};

const compileCss = () => {
    const tasks = getBundles(regex.css).map(bundle => {
        return src(bundle.inputFiles, { base: '.' })
            .pipe(concat(bundle.outputFileName))
            .pipe(dest('.'));
    });

    return merge(tasks);
};

const purgeCss = () => {
    return src(`${paths.assets}css/chocolatey.bundle.css`)
        .pipe(purgecss({
            content: [
                `${paths.input}**/*.cshtml`,
                `${paths.input}**/*.md`,
                `${paths.assets}js/*.*`,
                `${paths.theme}scss/_algolia.scss`
            ],
            safelist: [
                '::-webkit-scrollbar',
                '::-webkit-scrollbar-thumb',
                'link-light',
                'bg-purple',
                'fa-check',
                'fa-triangle-exclamation',
                'fa-info',
                'fa-xmark',
                'text-bg-warning',
                'text-bg-danger',
                'text-bg-success',
                'text-bg-info'
            ]
        }))
        .pipe(dest(`${paths.assets}css/`));
};

const minCss = () => {
    const tasks = getBundles(regex.css).map(bundle => {
        return src(bundle.outputFileName, { base: '.' })
            .pipe(cleancss({
                level: 2,
                compatibility: 'ie8'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('.'));
    });

    return merge(tasks);
};

const minJs = () => {
    const tasks = getBundles(regex.js).map(bundle => {
        return src(bundle.outputFileName, { base: '.' })
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('.'));
    });

    return merge(tasks);
};

const delEnd = () => {
    return src([
        `${paths.assets}css/*.css`,
        `!${paths.assets}css/*.min.css`,
        `${paths.assets}js/*.js`,
        `!${paths.assets}js/*.min.js`,
        `${paths.assets}js/temp`
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
};

// Independent tasks
exports.del = del;

// Gulp series
exports.compileSassJs = parallel(compileSass, compileJs);
exports.minCssJs = parallel(minCss, minJs);

// Gulp default
exports.default = series(del, copyTheme, compileTs, exports.compileSassJs, compileCss, purgeCss, exports.minCssJs, delEnd);
