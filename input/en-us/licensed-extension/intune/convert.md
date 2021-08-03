---
Order: 162
xref: intune-convert
Title: Converting Chocolatey Packages to Intune Packages
---

> :warning: **WARNING**
>
> This solution is planned to be released together with the v3.0.0 release of Chocolatey license, and is thus not yet available.

> :memo: **NOTE**
>
> Intune functionality will require a business or trial license.

## Summary

Converting from Chocolatey packages to Intune packages that can be later pushed using `choco push` has been added to a new command called `convert`, and allows a single package to be passed to the command where it will convert the specified package, as well as traverse all of the dependencies and convert these to Intune specific packages.

## Usage

### Command Line

When calling `choco convert`, just add the path to the `.nupkg` file you want to convert to a Intune package.
Make sure that all dependencies of that package are also located in the same directory as the passed in `.nupkg` file.

### Context Menu

For convenience, a new context menu entry has been added when you right click a file with the extension of `.nupkg`.
Instead of using the Command Line directly, right clicking such a file and selecting `Convert Chocolatey Package to Intune` may be used.

### Dependency Resolving

Resolving the dependencies of packages happens in a similar fashion, but not necessarily the exact same as when installing/upgrading Chocolatey packages.
When we see a dependency being referenced by a package, we will look in the same directory of that package to see if the local dependency
downloaded will satisfy the version criteria specified in the `.nuspec` metadata file.
When there are multiple files that will satisfy the specified criteria, we will convert the highest version found.

> :warning: **WARNING**
>
> If a child dependency specifies a more restrictive version criteria than other packages,
> then all other packages in the same dependency chain will use that version criteria for
> the created Intune package, instead of the original version criteria specified.

> :warning: **WARNING**
>
> Be careful of circular dependencies, while measures have been taken to minimize
> the risk of circular dependencies failing to convert, there is no guarantee that
> the command will not stop working, and may result in broken packages being created
> for Intune.

## FAQ

### Do I need to call convert for all dependencies of a package?

No, if a package have dependencies we will go through each dependency of the package and convert a Chocolatey package for the dependency to Intune as well.

### Must I have all dependencies of a package available?

While it recommended to have all dependencies available when converting a package, the step that handles dependency convertion can be skipped by using the `--ignore-dependencies` argument when calling `choco convert`.
Be mindful that some functionality may be lost when ignoring dependencies, and you may not be able to push your package if dependencies do not already exist locally, or in Intune.