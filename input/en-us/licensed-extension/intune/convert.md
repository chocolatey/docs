---
Order: 30
xref: intune-convert
Title: Converting Chocolatey Packages to Intune Packages
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

Converting from Chocolatey packages to Intune packages that can be later pushed using `choco push` has been added to a new command called `convert`. This command allows the file path of a single package to be passed and Chocolatey will then convert it, and its dependencies, to Chocolatey Intune packages.

## Usage

### Prerequisites

Ensure that the Chocolatey package you want to convert, and it's depedencies, are present in the current directory before running the `convert` command. You can do this with `choco download <PACKAGE NAME> --internalize`.

### Command Line

~~~sh
choco convert <path to chocolatey pkg> [<options/switches>]
~~~

Provide the path to the Chocolatey package file (`.nupkg`) you want to convert to a Chocolatey Intune package.

### Context Menu

For convenience, a new context menu entry **Convert Chocolatey Package** has been added when you right-click a file with the extension of `.nupkg`.

### Dependency Resolving

When Chocolatey looks to resolve dependencies, it will look in the folder that the package being converted is in (e.g. Chocolatey will look in `c:\packages` if you run `choco convert c:\packages\mypackage.1.0.0.nupkg`). It will find and convert the highest version found that satisfies the version criteria specified in the converted package `.nuspec` metadata file.

> :warning: **WARNING**
>
> If a child package is found, in the dependency chain, that has a more restritive dependency version criteria than the Chocolatey package you want to convert, then this more restrictive version criteria will be used when the Chocolatey Intune package is created.

> :warning: **WARNING**
>
> While measures have been taken to minimize the risk of circular dependencies, there is no guarantee that the `convert` command will convert them successfully and may result in corrupt Chocolatey Intune packages.

### Examples

To start converting Chocolatey packages to the Chocolatey Intune package format, you first need to download the packages. The location can be the Chocolatey Community Repository, your own internal repository, or any other valid Chocolatey source. As an example, to download version `86.0` of the `firefox` Chocolatey package and convert it to a Chocolatey Intune package along with its dependencies:

~~~sh
choco download firefox --version 86.0 --internalize
choco convert firefox.86.0.nupkg --to-format=intune
~~~


If you do not want to convert the dependencies of the `firefox` Chocolatey package, you can run the following:

~~~sh
choco download firefox --version 86.0 --internalize --ignore-dependencies
choco convert firefox.86.0.nupkg --to-format=intune --ignore-dependencies
~~~

> :warning: **WARNING**
> 
> By specifying the path to a pre-release package, pre-release support will be enabled for the package and its dependencies. However, while the package you are converting can be a pre-release, you cannot have a dependency on a pre-release package if the Chocolatey package you are converting is a stable release. This is the same behaviour as the [`push`](xref:intune-push) command.

> :memo: **NOTE**
>
> If the packages `chocolatey` or `chocolatey.extension` do not exist in the same directory as the Chocolatey package you are converting, a warning about them being 'missing' will be shown. This warning can be safely ignored if these two packages are already available in your Intune tenant. If these are not available in your Intune tenant, you may use this download command:
>
> ~~~sh
> choco download chocolatey chocolatey.extension --internalize
> ~~~

## FAQ

### Do I need to call convert for all dependencies of a Chocolatey package?

If a Chocolatey package has dependencies, Chocolatey will convert each of them to a Chocolatey Intune package.

### Must I have all Chocolatey package dependencies already downloaded?

You may skip the handling of dependencies when converting a package by using the `--ignore-dependencies` argument. However, it is recommended not to skip dependency handling as the package may not install or upgrade, and some software functionality may be lost. Be mindful that you may be prevented from pushing the Chocolatey package to your Intune tenant if the dependencies do not already exist locally or in Intune.

### I get an error message about `convert` not being available

The `convert` command is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled. This feature can be enabled by running:

~~~sh
choco feature enable --name=allowPreviewFeatures
~~~
