'use strict';

const gulp = require('gulp'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    sass = require('gulp-sass'),
    clean = require('gulp-clean'),
    purgecss = require('gulp-purgecss'),
    rename = require('gulp-rename'),
    merge = require('merge-stream'),
    injectstring = require('gulp-inject-string'),
    bundleconfig = require('./bundleconfig.json');

const editFilePartial = 'Edit this file at https://github.com/chocolatey/choco-theme/partials';
const { series, parallel, src, dest, watch } = require('gulp');
sass.compiler = require('node-sass');

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

const getBundles = (regexPattern) => {
    return bundleconfig.filter(bundle => {
        return regexPattern.test(bundle.outputFileName);
    });
};

function del() {
    return src([
        paths.assets + 'css', 
        paths.assets + 'js', 
        paths.assets + 'fonts',
        paths.assets + 'images/global-shared',
        paths.partials
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
}

function copyTheme() {
    var copyFontAwesome = src(paths.node_modules + '@fortawesome/fontawesome-free/webfonts/*.*')
        .pipe(dest(paths.assets + 'fonts/fontawesome-free'));

    var copyImages = src(paths.theme + 'images/global-shared/*.*')
        .pipe(dest(paths.assets + 'images/global-shared'));

    var copyIcons = src(paths.theme + 'images/icons/*.*')
        .pipe(dest(paths.input));

    var copyPartials = src([paths.theme + 'partials/*.*', '!'+ paths.theme + 'partials/svgstyles.txt'])
        .pipe(injectstring.prepend('@* ' + editFilePartial + ' *@\n'))
        .pipe(rename({ prefix: "_", extname: '.cshtml' }))
        .pipe(dest(paths.partials));

    return merge(copyFontAwesome, copyImages, copyIcons, copyPartials);
}

function compileSass() {
    return src(paths.theme + 'scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest(paths.assets + 'css'));
}

function compileJs() {
    var tasks = getBundles(regex.js).map(function (bundle) {

        return gulp.src(bundle.inputFiles, { base: '.' })
            .pipe(babel({
                "sourceType": "unambiguous",
                "presets": [
                    ["@babel/preset-env", { 
                        "targets": {
                            "ie": "10"
                        }
                    }
                  ]]
            }))
            .pipe(concat(bundle.outputFileName))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function compileCss() {
    var tasks = getBundles(regex.css).map(function (bundle) {

        return gulp.src(bundle.inputFiles, { base: '.' })
            .pipe(concat(bundle.outputFileName))
            .pipe(gulp.dest('.'));
    });

    return merge(tasks);
}

function purgeCss() {
    return src(paths.assets + 'css/chocolatey.bundle.css')
        .pipe(purgecss({
            content: [
                paths.input + '**/*.cshtml',
                paths.input + '**/*.md',
                paths.assets + 'js/*.*',
                paths.theme + 'scss/_algolia.scss'
            ],
            safelist: [
                '::-webkit-scrollbar', 
                '::-webkit-scrollbar-thumb', 
                'gitter-chat-embed', 
                'gitter-open-chat-button'
            ]
        }))
        .pipe(dest(paths.assets + 'css/'));
}

function minCss() {
    var tasks = getBundles(regex.css).map(function (bundle) {

        return gulp.src(bundle.outputFileName, { base: '.' })
            .pipe(cleancss({
                level: 2,
                compatibility: 'ie8'
            }))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulp.dest('.'));
    });

    return merge(tasks);
}

function minJs() {
    var tasks = getBundles(regex.js).map(function (bundle) {

        return gulp.src(bundle.outputFileName, { base: '.' })
            .pipe(uglify())
            .pipe(rename({ suffix: '.min' }))
            .pipe(dest('.'));
    });

    return merge(tasks);
}

function delEnd() {
    return src([
        paths.assets + 'css/*.css',
        '!' + paths.assets + 'css/*.min.css',
        paths.assets + 'js/*.js',
        '!' + paths.assets + 'js/*.min.js'
    ], { allowEmpty: true })
        .pipe(clean({ force: true }));
}

// Independednt tasks
exports.del = del;

// Gulp series
exports.compileSassJs = parallel(compileSass, compileJs);
exports.minCssJs = parallel(minCss, minJs);

// Gulp default
exports.default = series(del, copyTheme, exports.compileSassJs, compileCss, purgeCss, exports.minCssJs, delEnd);

// Watch files
exports.watchFiles = function () {
    watch([paths.theme], exports.default);
};