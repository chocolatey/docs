# Chocolatey Docs

This repository contains the source files for the documentation site that can be found here:

https://docs.chocolatey.org/en-us/

This site is built using [Astro](https://astro.build/).

## Writing Documentation

Listed below are some of the areas we consider important when writing. We have two goals:

* **Consistency**. It's important when writing to be consistent in all areas including, but not limited to, headings, code style, formatting, use of bold and italics. We acknowledge that as our writing style has evolved not all of our writing has followed. When we write we should be consistent.
* **Clarity**. When writing we must remember to write for others and not just for ourselves. It's important to understand that jargon or acronyms can cause confusion, misunderstanding and a barrier for others who are not familiar with the terms. Avoid using jargon where you can and only use acronyms once they have been defined. Ensure any [jargon or acronyms used are documented](https://docs.chocolatey.org/en-us/information/jargon-buster).

To help with these goals, please refer to our guides on [writing documentation](https://design.chocolatey.org/content-and-marketing/writing-documentation) and the use of [language and grammar](https://design.chocolatey.org/content-and-marketing/language-and-grammar).

## Building the Site for Development

There are multiple options to build the site:

1. Build it on [your own computer](#build-the-site-on-your-computer).
1. Open in [GitHub Codespaces](https://codespaces.new/chocolatey/docs?devcontainer_path=.devcontainer/devcontainer.json).
1. Build it using a [Dev Container](#build-the-site-using-a-dev-container).
1. Build it using [Docker](#build-the-site-using-docker).

### Build the Site On Your Computer

Ensure that you have Node v20+ installed by running `node -v`. There is a `.\setup.ps1` file in the root of this repository that uses Chocolatey to install or upgrade Node to the correct version.

After confirming the required Node version, run the following command from a terminal:

```powershell
yarn dev
```

This will compile the site, and bring up a preview on `http:localhost:5086`. Any changes you make will automatically be hot reloaded.

### Build the Site Using a Dev Container

Follow these steps to open the project in a [Dev Container](https://containers.dev/):

1. Install the Dev Containers extension for Visual Studio Code if you haven't already. You can install it from the Extensions view (Ctrl+Shift+X) by searching for "Dev Containers".
2. Open the Command Palette (Ctrl+Shift+P or F1) and run the command `Dev Containers: Open Folder in Container...`.
3. Select the folder containing this repository (or the repository root if you've already opened it in VS Code).
4. Wait for the Dev Container to start up. This may take a few minutes the first time as it needs to download the container image. Subsequent starts will be faster.
5. Once the Dev Container is ready, you'll have a full development environment with all the required tools and dependencies pre-installed. Any changes you make will automatically be hot reloaded.
6. When you're done, you can close the Dev Container by running the `Dev Containers: Close Remote Connection` command from the Command Palette.

### Build the Site Using Docker

From a terminal, run the following:

```powershell
docker build -t chocolatey-docs-container .
```

Once this is complete, run the following from the same terminal:

```powershell
docker run -p 5086:5086 -v $(pwd):/app chocolatey-docs-container
```

This will compile the site, and bring up a preview on `http:localhost:5086`. Any changes you make will automatically be hot reloaded.

## Building the Site for Production

Building the site for production is a good practice before submitting a pull request. An error of any kind will be flagged in the production build and it will fail.

From a terminal, run the following:

```powershell
yarn build
```

Once this is complete, run the following from the same terminal:

```powershell
yarn preview
```

This will start a server to show what the site will look like in production. Changes made to source files will not be reflected in this preview.

### Troubleshooting the Build

If you are having build errors with `'copyTheme' errored after`, try removing the `node_modules` directory and clearing your yarn cache with `yarn cache clean`.

If you receive the error `The configured user limit (128) on the number of inotify instances has been reached, or the per-process limit on the number of open file descriptors has been reached` then you can increase the number by running `echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`. See [this GitHub comment](https://github.com/dotnet/aspnetcore/issues/8449#issuecomment-512275929) for more information.

## Recommended VS Code Extensions

The following VS Code extensions are recommended to get the best development experience:

* [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode) - Syntax highlighting for .astro files.
* [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx) - Syntax highlighting for .mdx files.
* [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next) - JavaScript and TypeScript intelliSense.
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - Highlights syntax errors in .ts and .js files.
* [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint) - Highlights syntax errors in .md and .mdx files.
* [Trailing Spaces](https://marketplace.visualstudio.com/items?itemName=shardulm94.trailing-spaces) - Highlights trailing spaces and allows you to easily delete them.
* [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker) - Highlights spelling errors and suggests fixes.
* [Gremlins](https://marketplace.visualstudio.com/items?itemName=nhoizey.gremlins) - Highlights characters that can be harmful because they are invisible or look like legitimate ones.

## Understanding Astro

The [Chocolatey Design System](https://design.chocolatey.org) and [choco-astro](https://github.com/chocolatey/choco-astro) contain information on how to understand several Astro concepts:

* Learn how to [override automatically generated heading ID's](https://github.com/chocolatey/choco-astro?tab=readme-ov-file#overriding-automatically-generated-heading-ids).
* Learn about Astro and how to use [Components in `.mdx` and `.astro`](https://design.chocolatey.org/foundations/astro) file types.
* Learn how to use the [`<Callout />` Component](https://design.chocolatey.org/components/callouts) to display notes and important information.
* Learn how to use the [`<CollapseButton />` Component](https://design.chocolatey.org/collapse-button) to display a button that triggers a collapsed element.
* Learn how to use the [`<Iframe />` Component](https://design.chocolatey.org/components/iframe) to display videos with defined aspect ratios.
* Learn how to use the [`<Tabs />` Component](https://design.chocolatey.org/components/tabs) to display content in tabbed interface.
* Learn how to use the [`<Xref />` Component](https://design.chocolatey.org/components/xref) to link to other documents within this repository.

## Markdown Diagrams with Mermaid

[Mermaid](https://mermaid.js.org/) via an [Astro integration](https://github.com/chocolatey/choco-astro/blob/main/astro.config.mjs.json) allows an easy way to display information with diagrams written in markdown. Find more information on usage at the [choco-astro repository](https://github.com/chocolatey/choco-astro?tab=readme-ov-file#markdown-diagrams-with-mermaid).

## Adding A New Highlight

A Highlight is what is shown on the home page of docs.chocolatey.org and the left sidebar. These need updated every so often, especially when there has been a new release. Follow the steps below to add a new Highlight.

### Front Page Highlight

For front page highlights, we should try to keep it to less than 6 highlights. When adding a new one, consider editting existing highlights to set `showOnHome` to `false`.

1. Navigate to `src/content/docs/en-us/highlights` then into the current year folder.
1. Copy an existing file.
1. Change the name of the new file to include the month number as the first characters in the name, such as `10-testing-home.md`.
1. Fill in details needed and follow the current naming convention for xrefs in the file.
    1. Change the `ctaText` value to something unique.

### Left Sidebar Highlight

For left sidebar highlights, we want to keep it to a minimum to reduce the amount the navigation is pushed down the page. It's recommended to edit only the top highlight file to link to the current highlighted article, and leave the bottom one to link to all highlights.

To edit either of these highlights:

1. Navigate to `src/content/docs/en-us/highlights`.
1. Find the highlight you want to edit: `00-top-sidebar-highlight.md` for the top one, and `99-bottom-sidebar-highlight.md` for the bottom one.
1. Edit the details as desired making note of the following `highlight` front matter settings that control the destination and link text:
    ```markdown
    ctaXref: highlights
    ctaAnchor: december-2024
    ctaText: View December's highlights
    ```

If it's decided that extra highlights should be added:

1. Navigate to `src/content/docs/en-us/highlights`.
1. Copy one of the existing `*sidebar-highlight.md` files.
1. Change the name of the new file to start with a number that will determine it's order in the sidebar, such as `10-testing-home-sidebar-highlight.md`. Ensure the `-sidebar-highlight` in the name is retained.
1. In the nested `highlight` front matter, ensure the following are set in the nested `highlight` front matter:
    ```markdown
    showOnHome: false
    showOnHighlights: false
    showInSidebar: true
    ```
1. Fill in the rest of the details needed and follow the current naming convention for xrefs in the file.
    1. Change the `ctaText` value to something unique.
1. If there is a Sidebar Highlight already active, find the file that it is referencing. The title and post date can be a clue as to what file this is inside of the `src/content/docs/en-us/highlights` folder.
1. In the nested `highlight` front matter on the OLD file, ensure the following are set:
    ```markdown
    showOnHome: false
    showOnHighlights: false
    showInSidebar: false
    ```

## Running Playwright Tests

To run all the Playwright tests, first run the following command:

```powershell
yarn build
```

Once this has completed, run:

```powershell
yarn playwright
```

This will run all Playwright tests and report any errors for further investigation.

## Build Status

[![GitHub Actions Build Status](https://github.com/chocolatey/docs/workflows/Publish%20Documentation/badge.svg)](https://github.com/chocolatey/docs/actions?query=workflow%3A%22Build+Pull+Request%22)

## Chat Room

Come join in the conversation about Chocolatey in our [Community Chat Room](https://ch0.co/community).

Please make sure you've read over and agree with the [etiquette regarding communication](https://github.com/chocolatey/choco/blob/master/README.md#etiquette-regarding-communication).

## Search

Search uses [Algolia DocSearch](https://docsearch.algolia.com/) as backend.
