---
Order: 75
xref: hooks
Title: Extend Chocolatey With PowerShell Scripts (Hooks)
Description: Run PowerShell before and after Package Automation Scripts
---

A feature is available in Chocolatey CLI v1.2.0, which allows you to extend a package's automation script(s) with additional PowerShell scripts, called hooks.

## Overview

Hooks allow you to run code before a package automation script like a `chocolateyInstall.ps1` runs, or after. They even work when automation scripts are not included in the package. Each script can selectively target a single package ID, or run for all packages. Then they can be distributed using `.hook` packages.

## Creating Hook Scripts

Hook scripts are PowerShell `.ps1` files, and are run in the same environment as package automation scripts run, so they have access to all of the same environment variables and helpers.

The conditions for when a hook is run is based on the filename of the hook. The filename format is `<pre|post>-<install|beforemodify|uninstall>-<packageID|all>.ps1`. The first section is for the timing of when the hook script runs. Filenames that start with `pre` run before the package automation script (e.g. the `chocolateyInstall.ps1`), while filenames that start with `post` are run afterwards. The second section of the filename determines which package automation script the hook is run before or after. The third section of the filename is either a string of the package ID for which the hook should be run, or the keyword `all` to specify that the hook should be run for all package IDs.

If a package does not contain a `chocolateyInstall.ps1`, but a `pre-install-all.ps1` hook is installed, then that hook will still run at the point in the package install as the `chocolateyInstall.ps1` would have been run if the package had included it.

## Creating Hook Packages

Hooks can be installed just like extensions, via a specific package type, namely `.hook`. The name of the installed hook folder is the package id, minus the `.hook`.

How to create a Hook package:

1. Create a package with a `.hook` suffix like `choco new name.hook`
1. Delete the created files and folders except for the `.nuspec`
1. Create a `hook` folder in the root of the package (next to the `.nuspec`).
1. Put your hook PowerShell script files inside the `hook` folder.
1. Pack and install your new Hook package.

## Recommendations

### Still under development

Hook scripts and packages are still new, so guidelines and best practices are still being determined. Follow along at the [Chocolatey Community Hooks Repository](https://github.com/chocolatey-community/chocolatey-hooks) for the latest information.

### Avoid taking dependencies on regular packages

It is best to avoid having a `.hook` package taking a dependency on regular packages. This is so the included hooks from the package can be installed before other packages get initially installed. For example, if there is a `pre-install-git.ps1` hook and the `.hook` package it is included in takes a dependency on `git`, then the `chocolateyInstall.ps1` from the `git` package would have already run before the hook is installed, which is counterproductive.

### Do take dependencies on extension packages

If any hook script in a `.hook` package require helpers from an `.extension` package, then make sure that the `.hook` package takes a dependency on that `.extension` package.

### Don't take dependencies on hook packages

Don't add a hook package as a dependency for your regular package. Hook scripts are intended to be added only by the user of Chocolatey CLI. If your package requires functionality similar to that which would normally be provided via a hook script package, then it should be added directly to the standard automation scripts for the package. Adding a hook package as a dependency to your regular package will cause the package to fail validation on the Chocolatey Community Repository.

### Don't add hook scripts to regular packages

Don't add hook scripts to your regular Chocolatey package. If your package requires functionality similar to that which would normally be provided via a hook script package, then it should be added directly to the standard automation scripts for the package. Adding a hook script to your regular package will cause the package to fail validation on the Chocolatey Community Repository.
