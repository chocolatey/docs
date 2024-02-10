---
Order: 30
xref: deprecate-a-package
Title: Deprecate a Package
Description: How to deprecate a Chocolatey package
RedirectFrom:
  - docs/how-to-deprecate-a-chocolatey-package
---

## The Problem
From time to time, a previously approved Chocolatey Package needs to be deprecated.  This could be for a number of reasons:

* It was created in error.
* It has been superseded by another package.
* It is an older package that no longer follows the [Package Guidelines](xref:create-packages).
* Its package id has been changed to something that better fits with the [package naming guidelines](xref:create-packages#naming-your-package).

All versions of this package could simply be [unlisted](xref:list-unlist-a-package) from chocolatey.org, meaning that they could no longer be installed, however, this solution is not ideal.  Any user who previously installed this package, and added it as part of an installation script, would get an error the next time that they tried to install it, and this is far from ideal.

When a package needs to be deprecated, it needs to be handled in such a way that existing users will continue to be able to use the old package id, but take advantage of the replacement package, if there is one.

## The Solution
When deprecating a Chocolatey Package, the following steps should be followed:

* Create a **[new version](xref:create-packages#package-fix-version-notation)** of the deprecated Chocolatey Package.
* Prepend **[Deprecated]** to the **title** of the package (e.g. `<title>[Deprecated] Software Title</title>`
* Update the package **description**: Why is the package being deprecated?
### The package is being superseded
  * Add a **[dependency](http://docs.nuget.org/docs/reference/nuspec-reference#Specifying_Dependencies) on the other package**.
  * **Replace** `<files>...</files>` section in `.nuspec` with `<files />` tag to prevent any file from being included with the package.
  * **Remove all files** except the `.nuspec` from the Chocolatey Package.
### The package is no longer available and is not being superseded
  * **Remove** `<dependencies>...</dependencies>` if any, except if there is only a dependency linking to the install ([packagename].install) or the portable ([packagename].portable) version of this same package. In this case, remember to update the package version of the targeted package.
  * **Remove** the content of `tools\chocolateyInstall.ps1`  if any.
  * **Remove all files** except the `.nuspec` and `tools\chocolateyInstall.ps1` from the Chocolatey Package.

In both cases:
* If they are no longer available, **remove** `<projectSourceUrl>...</projectSourceUrl>`, `<docsUrl>...</docsUrl>`, `<mailingListUrl>...</mailingListUrl>`, `<bugTrackerUrl>...</bugTrackerUrl>`, `<releaseNotes>...</releaseNotes>`
* **Remove the iconUrl**.
* **[Unlist all versions](xref:list-unlist-a-package)** from the package gallery, **except** the final deprecated version. The final deprecated version is required to, depending on the case, provide an update path to the new package or provide an empty package.

By following this process, any existing users who try to update the old package will automatically get either:
* **The new package**, as it will be installed as a dependency if the package is being superseded.
* **A new version package doing nothing** if the package does no longer exist.
