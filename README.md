# Chocolatey Docs

This repository contains the source files for the documentation site that can be found here:

https://docs.chocolatey.org/en-us/

This site is built using [Statiq](https://statiq.dev/).

## Thanks

The original template that was used to create this docs site came from the work that was done by [Patrik Svensson](https://github.com/patriksvensson), on his [Spectre.Console](https://spectresystems.github.io/spectre.console/) and [Spectre.Cli](https://spectresystems.github.io/spectre.cli/) docs sites. Huge thank you to Patrik for all his help!

## Writing Documentation

Listed below are some of the areas we consider important when writing. We have two goals:

* **Consistency**. It's important when writing to be consistent in all areas including, but not limited to, headings, code style, formatting, use of bold and italics. We acknowledge that as our writing style has evolved not all of our writing has followed. When we write we should be consistent.
* **Clarity**. When writing we must remember to write for others and not just for ourselves. It's important to understand that jargon or acronyms can cause confusion, misunderstanding and a barrier for others who are not familiar with the terms. Avoid using jargon where you can and only use acronyms once they have been defined. Ensure any [jargon or acronyms used are documented](https://docs.chocolatey.org/en-us/information/jargon-buster).

To help with these goals, please refer to our guides on [writing documentation](https://design.chocolatey.org/content-and-marketing/writing-documentation) and the use of [language and grammar](https://design.chocolatey.org/content-and-marketing/language-and-grammar).

## Building the Site

There are two options to build the site:

1. Build it on your own computer.
1. Build it using a Docker container.

### Build the Site On Your Computer

There are a number or pre-requisites that are needed before you will be able to build the website locally.  These include:

* .NET Core SDK
* NodeJS

There is a `.\setup.ps1` file in the root of this repository that can be used to install all necessary packages.

#### Building the Site

To build the site locally on your computer, either run the `.\build.ps1` or the `build.sh` file (depending on your operating system).  This will compile the site, and all generated output file be placed into the `output` folder.

### Build the Site Using a Docker Container

There are two ways you can do this:

* Using the Visual Studio Code Dev Containers extension.
* Running the Docker container from the command line.

#### Using the Visual Studio Code Dev Containers Extension

Connect to the Docker Container in Visual Studio Code. This will launch Visual Studio Code and open a terminal that is running inside the Docker Container whose configuration is defined in `/.devcontainer/devcontainer.json` and `/.devcontainer/Dockerfile`. You can now move onto [previewing the site](#previewing-the-site).

#### Running the Docker Container From the Command Line

Follow these steps:

1. Run `docker pull mcr.microsoft.com/vscode/devcontainers/dotnet:0-3.1-focal`.
1. Change to the `/.devcontainer` directory and run `docker build . --tag chocolatey-docs-container`. This will build the image you can use to preview the docs. Note that you can change the name `chocolatey-docs-container` to whatever you want.

#### Previewing the Site

To preview the site locally on your computer, either run the `.\preview.ps1` or the `preview.sh` file (depending on your operating system). If you are previewing the site using the Docker container from the command line, change to the directory containing this repository and run `docker run -p 5080:5080 -v ${pwd}:/workspaces/chocolatey-docs -w /workspaces/chocolatey-docs -i -t chocolatey-docs-container /bin/bash ./preview.sh`. Replace `chocolatey-docs-container` with whatever you named your container above.

Once completed, you should be able to open a browser on your machine to `http://localhost:5080` and the site will be loaded.  Once running, any changes made to the files within the `input` folder will cause the site to be rebuilt with the new content.

### Troubleshooting the build

If you are having build errors with `'copyTheme' errored after`, try removing the `node_modules` directory and clearing your yarn cache with `yarn cache clean`.

If you receive the error `The configured user limit (128) on the number of inotify instances has been reached, or the per-process limit on the number of open file descriptors has been reached` then you can increase the number by running `echo fs.inotify.max_user_instances=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`. See [this GitHub comment](https://github.com/dotnet/aspnetcore/issues/8449#issuecomment-512275929) for more information.

## Adding a New Highlight

To add a new Highlight, follow the steps below:

1. Check to see if the Highlight you are writing already has a folder associated with it. This will match the current year and month that you are posting the Highlight in. If there is already a folder, copy the file from `/en-us/highlights/template/template.md` into the folder your new Highlight will go in, then skip to step #4.
1. Copy the folder `/en-us/highlights/template` and rename it to the format of "YYYY-MM". For example: "2023-04".
1. In your new folder, update the `index.md` file:
    1. Change the `PostedDateTime` to the first day of the current month. This should match the folder name. This will be the heading title that appears on the [Highlights page](xref:highlights).
    1. Remove the `IsActive: false` line completely. This is set to `true` by default, and a section will now appear for the given month on the Highlights page.
1. In your new folder, change the file name of `template.md` to match the title of the Highlight you are writing. This should be something that can easily be identified if changes will need to be made by another person later.
1. Update your new (previously `template.md`) file as needed:
    1. Remove the `IsActive: false` line completely. This is set to `true` by default, and will now be shown on the Highlights page.
    1. To make the Highlight appear on the Home page, remove the `ShowOnHome: false` line completely. This is set to `true` by default, and will now be shown on the Home page.

## Build Status

[![GitHub Actions Build Status](https://github.com/chocolatey/docs/workflows/Publish%20Documentation/badge.svg)](https://github.com/chocolatey/docs/actions?query=workflow%3A%22Build+Pull+Request%22)

## Chat Room
Come join in the conversation about Chocolatey in our [Community Chat Room](https://ch0.co/community).

Please make sure you've read over and agree with the [etiquette regarding communication](https://github.com/chocolatey/choco/blob/master/README.md#etiquette-regarding-communication).

## Search

Search uses [Algolia DocSearch](https://docsearch.algolia.com/) as backend.
Configuration for crawler is available at https://github.com/algolia/docsearch-configs/blob/master/configs/chocolatey.json.