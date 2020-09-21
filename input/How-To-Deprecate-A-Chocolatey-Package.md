## The Problem
From time to time, a previously approved Chocolatey Package needs to be deprecated.  This could be for a number of reasons:

* It was created in error.
* It has been superseded by another package.
* It is an older package that no longer follows the [Package Guidelines](CreatePackages).
* Its package id has been changed to something that better fits with the [package naming guidelines](CreatePackages#naming-your-package).

All versions of this package could simply be unlisted from chocolatey.org, meaning that they could no longer be installed, however, this solution is not ideal.  Any user who previously installed this package, and added it as part of an installation script, would get an error the next time that they tried to install it, and this is far from ideal.

When a package needs to be deprecated, it needs to be handled in such a way that existing users will continue to be able to use the old package id, but take advantage of the replacement package, if there is one.

## The Solution
When deprecating a Chocolatey Package, the following steps should be followed:

* Create a **[new version](CreatePackages#package-fix-version-notation)** of the deprecated Chocolatey Package.
* Prepend **[Deprecated]** to the **title** of the package (e.g. `<title="[Deprecated] Software Title" />`
* Update the package **description**: Why is the package being deprecated?
* Add a **[dependency](http://docs.nuget.org/docs/reference/nuspec-reference#Specifying_Dependencies) on the other package** (if the package is being superseded).
* **Remove all files** except the `.nuspec` from the Chocolatey Package.
* Replace `<files>...</files>` section in `.nuspec` with `<files />` tag to prevent any file from being included with the package.
* **Remove the iconUrl**.
* **Unlist all versions** from the package gallery, ***except*** the final deprecated version. The final deprecated version is required so that there is an update path to the new package.

By following this process, any existing users who try to update the old package will automatically get the new package, as it will be installed as a dependency.
