---
Order: 30
xref: intune-convert
Title: Converting Chocolatey Packages to Intune Packages
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

Converting from Chocolatey packages to Intune packages that can be later pushed using `choco push` has been added to a new command called `convert`.
This command allows a single package to be passed and Chocolatey will then convert it, and its dependencies, to Chocolatey Intune packages.

## Usage

### Prerequisites

Ensure that the Chocolatey the package you want to convert and it's depedencies, are present in the current directory before running the `convert` command. You can do this with `choco download <PACKAGE NAME> --internalize`.
### Command Line

Provide the path to the Chocolatey package file (`.nupkg`) you want to convert to a Chocolatey Intune package.

### Context Menu

For convenience, a new context menu entry **Convert Chocolatey Package** has been added when you right-click a file with the extension of `.nupkg`.

### Dependency Resolving

When Chocolatey looks to resolve dependencies, it will look in the folder that the package being converted is in (e.g. Chocolatey will look in `c:\packages` if you run `choco convert c:\packages\mypackage.1.0.0.nupkg`). It will find and convert the highest version found that satisfies the version criteria specified in the converted package `.nuspec` metadata file.

> :warning: **WARNING**
>
> If a child dependency specifies more restrictive version criteria than other packages,
> then all other packages in the same dependency chain will use those version criteria for
> the created Intune package, instead of the original version criteria specified.

> :warning: **WARNING**
>
> Be careful of circular dependencies. While measures have been taken to minimize
> the risk of circular dependencies failing to convert, there is no guarantee that
> the command will not stop working and may result in broken packages being created
> for Intune.

### Examples

To start converting packages from the Chocolatey format to the Intune format, you first need to download the packages from the location of your choice.
The location can be the Community Repository, your own Internal Repository, or any other valid Chocolatey source.
The basic process, in this case, would be:

~~~sh
choco download firefox --version 86.0 --internalize
choco convert firefox.86.0.nupkg --to-format=intune
~~~

The above will download version 86.0 of the Firefox package and convert it along with its dependencies to an Intune-specific format.

If for some reason, you do not want or need to convert the dependencies of the package, you can run the following using the same package as an example

~~~sh
choco download firefox --version 86.0 --internalize --ignore-dependencies
choco convert firefox.86.0.nupkg --to-format=intune --ignore-dependencies
~~~

If the package in question is a pre-release, no additional arguments are needed.
By specifying the path to a pre-release package, pre-release support will be enabled for the package and its dependencies.
However, you cannot depend on a pre-release if the package passed in is a stable release.

> :memo: **NOTE**
>
> If the packages `chocolatey` or `chocolatey.extension` does not exist in the same directory,
> a warning about these packages missing will be shown.
> This warning can be safely ignored if these two packages are already available on your Intune tenant.
> If these are not available, you may use the same download command for acquiring these.
>
> ~~~sh
> choco download chocolatey chocolatey.extension --internalize
> ~~~

## FAQ

### Do I need to call convert for all dependencies of a package?

If a package has dependencies, we will go through each dependency and convert a Chocolatey package for the dependency to an Intune package.

### Must I have all dependencies of a package available?

You may skip the handling of dependencies when converting a package by using the `--ignore-dependencies` argument.
However, it is recommended not to skip the dependency handling, as some functionality may be lost.
Be mindful that you may be prevented from pushing the package to your Intune tenant if the dependencies do not already exist locally or in Intune.

### I am getting a message that The use of .nupkg or .nuspec in package name or source is known to cause issues.

This warning message comes from Chocolatey itself and is due to the program not knowing about the new `convert` command.
The warning message can safely be ignored and will be removed in a future version of Chocolatey.

### I get an error message about `convert` not being available

The `convert` command is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled.
This feature can be enabled by running
~~~sh
choco feature enable --name=allowPreviewFeatures
~~~
