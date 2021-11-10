# Chocolatey Docs

This repository contains the source files for the documentation site that can be found here:

https://docs.chocolatey.org/en-us/

This site is built using [Statiq](https://statiq.dev/).

## Thanks

The original template that was used to create this docs site came from the work that was done by [Patrik Svensson](https://github.com/patriksvensson), on his [Spectre.Console](https://spectresystems.github.io/spectre.console/) and [Spectre.Cli](https://spectresystems.github.io/spectre.cli/) docs sites. Huge thank you to Patrik for all his help!

## Building the site

### Setup

There are a number or pre-requisites that are needed before you will be able to build the website locally.  These include:

* .NET Core SDK
* NodeJS
* Yarn

There is a `.\setup.ps1` file in the root of this repository that can be used to install all necessary packages, and which will be kept up to date as these change.

### Building the site

To build the site locally on your machine, either run the `.\build.ps1` or the `build.sh` file (depending on your system).  This will compile the site, and all generated output file be placed into the `output` folder.

### Previewing the site

To preview the site locally on your machine, either run the `.\preview.ps1` or the `preview.sh` file (depending on your system).  Once completed, you should be able to open a browser on your machine to `http://localhost:5080` and the site will be loaded.  Once running, any changes made to the files within the `input` folder will cause the site to be rebuilt with the new content.

### Troubleshooting the build

If you are having build errors with `'copyTheme' errored after`, try removing the `node_modules` directory and clearing your yarn cache with `yarn cache clean`.

## Build Status

[![GitHub Actions Build Status](https://github.com/chocolatey/docs/workflows/Publish%20Documentation/badge.svg)](https://github.com/chocolatey/docs/actions?query=workflow%3A%22Build+Pull+Request%22)

## Chat Room
Come join in the conversation about Chocolatey in our [Community Chat Room](https://ch0.co/community).

Please make sure you've read over and agree with the [etiquette regarding communication](https://github.com/chocolatey/choco/blob/master/README.md#etiquette-regarding-communication).

## Search

Search uses [Algolia DocSearch](https://docsearch.algolia.com/) as backend.
Configuration for crawler is available at https://github.com/algolia/docsearch-configs/blob/master/configs/chocolatey.json.