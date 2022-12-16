---
Order: 10
xref: create-packages
Title: Create Packages
Description: How to start creating your own Chocolatey packages
RedirectFrom:
  - docs/create-packages
  - docs/CreatePackages
---

# Creating Chocolatey Packages

## Summary
See [What are Chocolatey Packages?](xref:getting-started#what-are-chocolatey-packages) first.

> :memo: **NOTE**
>
> When you host internal packages, those packages can embed software and/or point to internal shares. You are not subject to software distribution rights like the packages on the community feed, so you can create packages that are more reliable and secure.

First you should determine if you are making a self-contained package or (also) using automation scripts. You should also consider creating [automatic packages](xref:automatic-packaging) for the best maintainability over time.

1. Run `choco new -h` to get a feel for what you can pass e.g `choco new bob` (to create a package named `bob`)
1. Note all the rules below. This will help you, especially in publishing to the community feed (https://chocolatey.org)

#### Self-Contained?
If you have a self-contained package, you can remove the automation scripts
entirely and just include the runtime executables, they will automatically get shimmed,
which puts them on the path. Ensure you have the [legal right to distribute](xref:legal)
the application though. You should read up on the Shim Generation section
below though to familiarize yourself on what to do with GUI applications
and/or ignoring shims (also known as batch redirects).

#### Including the Software Installer in the Package
Sometimes called embedding the binaries, there are functions in the automation scripts you can call that will use the installers directly from the package instead of downloading first. This makes for the most reliable and deterministic packages, but ensure you have the [legal right to distribute](xref:legal) the software first if publishing to a public location (like the community package repository).

#### Automation Scripts
You have a powerful use of Chocolatey, as you are using PowerShell. So you
can do just about anything you need. Choco has some very handy [built-in functions](xref:powershell-reference) that you can use, these are sometimes called
[helpers](xref:powershell-reference).

## Quick Start guide

If you think you got what it takes and just want to know the basic steps to get a package out, there is a special [Quick Start Guide](xref:create-packages-quick-start) for you.

> :memo: **NOTE**
>
> This doesn't exempt you from observing the rules, requirements and guidelines (noted below).

## Rules to be observed before publishing packages

There are a few rules that you have to follow before pushing packages to chocolatey.org:

1. **Don't package illegal software.** Packages of software that is illegal in most countries in the world are prohibited to publish on Chocolatey.org. This applies in particular to software that violates the copyright, pirated software and activation cracks. Remember that this also affects software that is especially designed to accomplish software piracy.
2. **Do not include software in a package that you don't have the right to distribute.** Please see [Distribution Rights](xref:legal#distributions) for more information. Any package found not in compliance with this will be removed immediately. Instead you can download binaries from official distribution locations at runtime.
1. **Packaging commercial or trial software?** Clearly state this in the package description. Does it require an activation key? Is there a trial period if you don't have a key? How long is this trial period?
1. **Only post publicly relevant packages.** You should consider whether this package is useful for others. If that is not the case, it shouldn't be published on Chocolatey.org. Reasons for that can be if the package would require a very customized configuration. You can host your personal packages on [MyGet](https://www.myget.org/) and still be able to install them with Chocolatey using the `-source` parameter.
1. **Do not publish junk or malware** packages.
1. **Don't package software _containing_ malware.** Packages of software that comes with bundled adware, spyware or other unrelated software that installs even in silent mode, are not allowed. But if you can figure out how to install the desired software without this unrelated software, it is allowed to publish the package. That can be accomplished for example with additional command line switches or by adding specific values to the registry. Examples of packages which make use of this are [PDFCreator](https://github.com/stack72/MyChocolateyPackages/tree/master/PDFCreator) and [CCleaner](https://github.com/tonigellida/chocolateyautomaticpackages/tree/master/ccleaner).
1. **Don't package software that is already packaged**. Use the search function in the [Chocolatey Community Repository(https://community.chocolatey.org/packages) and look if there is already a package for the desired software. If you would like to improve the already existing  package or if you have suggestions, just contact the package maintainer or open a pull request at the maintainer’s package repository.
1. **Don't include other required software if there's a package of it.** If a package requires other software of which there is already a package, the already existing package should be used as [dependency](http://docs.nuget.org/create/nuspec-reference#specifying-dependencies) instead.
1. **Split dependencies into multiple packages.** Try to split up packages as much as possible. If for example a program comes with additional modules/installers that are optional, make different packages for them instead of including all the things into one package. This idea is already widely applied for Linux packages, because it leads to a more lightweight system and reduces potential issues and conflicts.
1. **Use a simple intuitive lowercase name for the package**. See the [package naming guidelines](#naming-your-package) for details. (If you are a reviewer/moderator, this is considered a guideline).

Is your package unqualified for the Chocolatey feed, but you like to be able to install it through Chocolatey? One alternative would be to host your package on MyGet. See [Hosting Chocolatey Packages on MyGet](xref:hosting-chocolatey-packages-on-myget).

## Character encoding

* **Use the UTF-8 character encoding** for the `*.nuspec` and `*.ps1` files. If you don’t respect this rule, some characters are not displayed correctly in the [Chocolatey Community Repository](http://community.chocolatey.org/packages), because if defaults to `UTF-8`.
* **Byte Order Mark (BOM) is optional for `*.nuspec`.**. A `BOM` is not required but it won't hurt anything if it is found.
* **PowerShell scripts need to be saved in UTF-8 with `BOM`**. PowerShell is ignoring the standards and needs a `BOM` in order to recognize scripts as `UTF-8`. Otherwise it processes non `ASCII` characters incorrectly.
* Don’t use the default Windows Editor. While newer versions of Notepad have improved its ability to handle line endings and UTF-8 w/out BOM, it is still behind in capabilities as compared to other editors. Alternatives:
    * [Visual Studio Code](https://community.chocolatey.org/packages/vscode)
    * [Notepad++](http://community.chocolatey.org/packages/notepadplusplus)
    * [Geany](http://community.chocolatey.org/packages/geany)
* Use this **XML declaration**: `<?xml version="1.0" encoding="utf-8"?>`.

> :memo: **NOTE**
>
> There is a lot of confusion in the world of character encodings: For example, `ANSI` is an incorrect term for the internal Windows character encodings, e.&nbsp;g. `Windows-1252`. But you should not use this encoding family anyway.

## What version of the software should I package?
The main release of a product versions are usually sufficient. If there are also beta versions available and you would rather have that, then please create both the official release and the beta (and set the beta as a prerelease when pushing the item to community.chocolatey.org). Regular users of packages may want to use official releases only and not betas.

> :memo: **NOTE**
>
> Both of these have the SAME package id, just different versions.

## Okay, how do I create packages?
There are three main elements to a Chocolatey package. Only the nuspec is required (#1 below).

1. [Nuspec](xref:create-packages#nuspec)
1. [chocolateyInstall.ps1](xref:chocolatey-install-ps1) - check out the [helper reference](xref:powershell-reference)
1. any application files to include (it is highly suggested that you are the author in this case or you have the right to [distribute files](xref:legal)). EXE files in the package/downloaded to package folder from chocolateyInstall.ps1 will get a link to the command line.
1. chocolateyUninstall.ps1, for uninstalling your package. See [helper reference](xref:powershell-reference) for functions available in your script.

> :memo: **NOTE**
>
> Please maintain compatibility with Posh v2. Not every OS we support is on Posh v2 (nor comes OOB with Posh v3+). It's best to work with the widest compatibility of systems out there.

There is a video showing the creation of a package: [http://www.youtube.com/watch?v=Wt_unjS_SUo](http://www.youtube.com/watch?v=Wt_unjS_SUo)
The video is a bit outdated in showing the contents of the chocolateyInstall.ps1. Have a look at what the [chocolateyInstall.ps1](https://github.com/ferventcoder/chocolatey-packages/blob/master/manual/windirstat/tools/chocolateyInstall.ps1) looks like now:

```powershell
$packageName = 'windirstat'
$fileType = 'exe'
$url = 'http://prdownloads.sourceforge.net/windirstat/windirstat1_1_2_setup.exe'
$silentArgs = '/S'

Install-ChocolateyPackage $packageName $fileType $silentArgs $url
```

## During which scenarios will my custom scripts be triggered?
The table below shows which scripts are available, and which command(s) will cause them to be run.

Script Name                                    | Install | Upgrade | Uninstall
-----------------------------------------------|---------|---------|----------
chocolateyBeforeModify.ps1                     |         | Yes     | Yes
chocolateyInstall.ps1                          | Yes     | Yes     |
chocolateyUninstall.ps1                        |         |         | Yes

> :memo: **NOTE**
>
> In the upgrade scenario, the chocolateyInstall.ps1 script will be the one included in the new package. The chocolateyBeforeModify.ps1 script will be the one from the previously installed package.

The chocolateyBeforeModify.ps1 script will only be executed if using choco version 0.9.10 or later.

## Nuspec

The `Chocolatey` Windows package manager uses the same infrastructure as [NuGet](http://nuget.org/), the Visual Studio package manager by Outercurve Foundation (sponsored by Microsoft). Therefore packages are based on the same principles. One of those is a package description (specification) in `xml` format, known as the `Nuspec`.

The `Nuspec` contains basic information such as the version, license, maintainer, and package dependencies. `Chocolatey` includes additional optional functionality on top of [NuGet's Nuspec format](http://docs.nuget.org/docs/reference/nuspec-reference) - the best way to determine currently supported features is to create a test package, and look at the generated nuspec file.

```choco new testpackage```

> :memo: **NOTE**
>
> If your package uses recently introduced functionality, you might want to include `chocolatey` as a dependency with the version being the lowest version that has the introduced functionality. Otherwise the installation could fail for users with an older version of `Chocolatey` installed.

You can indicate the `Chocolatey` dependency like any other dependency. E.g.:
```xml
    <dependencies>
      <dependency id="chocolatey" version="0.9.8.21" />
    </dependencies>
```

Logically, the version is based on the lowest compatible version. But if you don't know and used a lot of sorcery in your package, depend on the version of `Chocolatey` that you succesfully tested your package on.

**See also:** [NuGet Version Reference](http://docs.nuget.org/docs/reference/versioning)

## But for real, how do I create a package?

* **Generate new package**:
   * `choco new -h` will get you started seeing options available to you.
   * Once you figured out all of your options, you should move forward with generating your template.

## Install Only On Some Versions of Windows
Right now if the software the package installs is only supported on particular versions of Windows, you should absolutely fail the package. An installed package indicates success. If you pass a warning message but don't also throw an error, that means the package installed successfully. Folks using the package are going to be confused because they will then expect that the underlying software is also installed. The software itself may throw a cryptic error, which will lead to questions from the community about why it is broken (when it is just unsupported). Do yourself a favor and check the version of Windows and throw an error if it is not a supported version. Under no circumstances should you bypass with a warning, because a warning is still a success.

There is at least one noted exception to this and that is low-level packages that are meant as dependencies that need to be present even if they do not install anything. These are things like KBs that only need to be installed on some versions of Windows. If the package failed and it was a dependency of a higher level package that installed software, it would cause issues attempting to install that software on different versions of Windows. Since about 5% of the packages apply to this exception, stick with the above thoughts for packages.

> :memo: **NOTE**
>
> We will ultimately enhance the nuspec and take care of this for you automatically. Until we get there, follow the above avenue.

## Installation Paths

As the package maintainer, you decide where the packaged application is installed or extracted to. Depending on your type of application (see *“What distinction does Chocolatey make between an installable and a portable application?”* at the bottom of the [FAQ](xref:faqs)) there are a couple of suitable locations (not listed in any particular order):

### 1. The default installation path of your .msi/.exe setup file

The original creator probably had a reason for choosing a specific default installation path.
If you think, the user should be able to customize this path and you, the package maintainer, know how to pass a custom path on to the installer, then you should use `%ChocolateyBinRoot%`.

### 2. The package directory in `%ChocolateyInstall%\lib\mypackage`

You can extract the application within the package directory itself (or even ship an extracted version with the package). This allows Chocolatey to automatically find executables and put those on `%path%`.

### 3 Path provided by the `Get-ToolsLocation` helper

> :warning: **WARNING**
>
> It was previously possible to use the helper `Get-BinRoot` for backwards compatibility. This is still possible in v1.0.0, however its use is not recommended as the function is now deprecated, and will be removed in v2.0.0.

The path returned by the helper `Get-ToolsLocation` can be used as the parent directory for the installation. `Get-ToolsLocation` will return the value of the  environment variable `%ChocolateyToolsLocation%`. If the value does not contain a drive reference, the system drive will be prepended. If the environment variable is not set, the default path (`C:\tools`) will be returned.

As an example, [GeoServer](https://github.com/AdmiringWorm/chocolatey-packages/blob/0f3b93ab7b067b265a06349a68297d07b1598e64/automatic/geoserver/tools/chocolateyuninstall.ps1#L8) uses `%ChocolateyToolsLocation%`. If the environment variable is not set, it will be set to `c:\tools` and GeoServer will install to `C:\tools\GeoServer` by default. If `%ChocolateyToolsLocation%` is set to "C:\Common\bin", GeoServer installs to `C:\Common\bin\GeoServer`.

`%ChocolateyToolsLocation%` gives the Chocolatey user a way of controlling where packages are installed. If you want to allow customizing the installation path, then this is currently the way to go.

### Make it clear in the package description

No matter how you decide, you are advised to state the default installation directory in your package description. This prevents confusion about where the application will end up being installed.

If you allow customizing the installation path, then append instructions on how to do that, too.

### Windows environment variables
Chocolatey installations are advised to be performed while running "as administrator".  Because of this it is important that you understand that some windows environment variables will be pinned to the administrator user and not the installation user at least
one circumstance.

On many systems there are multiple accounts.  The issue can occur on a system where there is an admin user with an account type of "Administrator", let's call this user **admin**. There is another user with an account type of "Standard User" lets call this second user **user**.

Note: "Administrator" and "Standard User" are the 2 account types that Windows 10 supports.

When **admin** chooses to run a `cmd` shell with elevated privileges by right clicking and selecting "Run as administrator".  **admin** will be warned by "User Access Control" that they are elevating privileges via a dialog that **admin** can dismiss.  The command shell will run the shell with administrator rights from the **admin** account.  All good!

When **user** chooses to run a `cmd` shell by right clicking and selecting "Run as administrator", **user** will be asked to enter the credentials for **admin** account to gain administrator rights.  **user** will need to enter **admin**'s credentials and then the command shell will run the shell with administrator rights from the **admin** account.  Wait... what?

Yes, really.  An elevated command shell for **user** will run as if it is the **admin** user!

That means that when your installer depends on any environment variables to find install locations there is a scenario where the environment variables are from a different user (e.g. **admin**) than the user installing the package.

The known affected environment variables are: `APPDATA`, `LOCALAPPDATA`, `TEMP`, `TMP`, `USERNAME`, `USERPROFILE`

Example Settings for a user named "administrator":
```
APPDATA=C:\Users\administrator\AppData\Roaming
LOCALAPPDATA=C:\Users\administrator\AppData\Local
TEMP=C:\Users\administrator\AppData\Local\Temp
TMP=C:\Users\administrator\AppData\Local\Temp
USERNAME=administrator
USERPROFILE=C:\Users\administrator
```

A simple way around this is to ask the user to set environment variables that can override environment variables.  Or alternatively, instruct your users to set the necessary environment variables in the elevated privileges command shell.

Example instructions:

>Within the administrator command shell you will need to set 2 environment variables:
>```
>set LOCALAPPDATA=C:\Users\<USERNAME>\AppData\Local
>set USERPROFILE=C:\Users\<USERNAME>
>```

## Upgrading

Prior to choco version 0.9.10, there is no dedicated automation script for upgrade scenarios. Instead, your [chocolateyInstall.ps1](xref:chocolatey-install-ps1) script should support installing/upgrading on top of any previous versions of your package.

More recent versions of choco (0.9.10+) give you the option of supplying a `chocolateyBeforeModify.ps1` script.
If applicable, the version of this script from the currently installed package will be run before subsequent
chocolateyInstall or chocolateyUninstall scripts.

## Uninstalling

Uninstalling is handled by a `chocolateyUninstall.ps1` script, which should be in your package's `tools` directory, next to [chocolateyInstall.ps1](xref:chocolatey-install-ps1). All the usual [helper reference](xref:powershell-reference) are available. If your package doesn't uninstall cleanly, people will get grumpy because they'll have to manually clean up after you. Be a good human being and write an uninstaller.

## Dependency Chaining

You can make packages that depend on other packages just by adding those dependencies to the nuspec. Take a look at [ferventcoder.chocolatey.utilities nuspec](https://github.com/ferventcoder/chocolatey-packages/blob/master/manual/ferventcoder.chocolatey.utilities/ferventcoder.chocolatey.utilities.nuspec).

## Avoid folders named “content”

Do not use a folder named “content” in your package. NuGet attaches a special meaning to this folder and will not allow you to have dependencies on packages that have content folders without also having a content folder. It's turtles all the way down until we or NuGet removes this limitation.

## Naming your package

The **title** of your package (`<title>` tag in the nuspec) should be the same as the name of the application.
Follow the official spelling, use upper and lower case and don’t forget the spaces.
Examples of correct package titles are: _Google Chrome_, _CCleaner_, _PuTTY_ and _FileZilla_.
The title will appear on the left side in the package list of the Chocolatey Community Repository, followed by the version.

There are some guidelines in terms of the package **ID** (`<id>` tag in the nuspec):

* **Use only lowercase letters**, even if you used uppercase letters in the package title.
  (This is considered a guideline because it is correctable in other ways).
  Once a package is submitted (even prior moderation), the Chocolatey Community Repository will always show the id with the casing of the first package version.
  In addition, changing the casing of the package id may have negative side effects on dependencies (note: this last statement needs verified).
* If the original application name consists of compound words without spaces (CamelCase), just as _MKVToolNix_, _TightVNC_ and _VirtualBox_, the package id’s are simply the same (but **lowercase** of course): `mkvtoolnix`, `tightvnc`, and `virtualbox`.
* If the name of the application contains multiple words separated by spaces, such as _MusicBrainz Picard_ or _Adobe Reader_, replace the spaces with the hyphen-minus character “-” (U+002D), or just omit them.
  **Don’t use dots**.
  Dots should be used only if the original application name contains dots (for example, _Paint.NET_).
  Hence the correct id’s of the previously mentioned applications can be `musicbrainz-picard` or `adobereader`.
  We recommended you use the hyphen method when there are long package names to ensure they remain readable.
* For sub-packages, use the hyphen-minus character “-” (U+002D) as the separator, not a dot.
  Sub-packages are intended for separate packages that include extensions, modules or additional features/files for other applications.
  Therefore `keepass-langfiles` is a proper package id, because it adds the language files for the main application which in this case is _KeePass_.
  Another example is `libreoffice-help` for the help pack for _LibreOffice_, the open source office suite.
* If you want to package an open source application, first search for any pre-existing packages on services like [Repology](https://repology.org/).
  If there are already published packages for the application on another repository, **use the same package id**.
  This will make it easier for users which work with multiple platforms, so they don't have to remember and use different package names.

These guidelines are already commonly applied on packages for all major Linux distributions, because they lead to a more consistent user experience for software repositories, result in easier to remember package IDs, and reduce unnecessary considerations on naming packages for package creators.

Note that some packages in the Chocolatey Community Repository don't follow these guidelines; many of these were created before these guidelines were introduced.
New packages should follow the guidelines to improve the overall experience for users going forward.

If you are going to offer a package that has both an installer and an archive (zip or executable only) version of the application, create three packages - see [Portable vs Installable](xref:faqs#what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application) and [Install, Portable, and Meta/Virtual Packages](xref:faqs#what-is-the-difference-between-packages-no-suffix-as-compared-to.install.portable).

### Naming packages to allow for side-by-side installation

For some software, it is expected that users may want multiple different versions installed simultaneously.
This has commonly been seen with software like Python which offer some kind of runtime dependency that other scripts or applications depend on.

In the past, Chocolatey CLI supported a "side-by-side" installation method which could be used for this purpose to install multiple distinct versions side-by-side, on the same machine.
This has since been deprecated and will be removed in version 2.0.0 due to many issues with the use and implementation of the feature.

#### If the software you're creating a package for expects **side-by-side installations of different versions**

1. Create _separate package IDs_ for each major version (or major + minor version, depending on the expectations of users) which include the version number in the ID.
  For example, if the package ID would be `python`, the package for major version 2 would be `python2`, or a package for specifically the 2.7 branch might be `python27` or `python2-7`.
  These individual versioned packages can be updated as normal, as long as that major and/or minor version is still receiving further updates.
1. Create a [**metapackage**](xref:getting-started#terminology) for the overall product with a package version for each of the versioned packages.
  In other words, create another package (this time without a version number in the ID), which contains only a `nuspec` file and add a dependency on the versioned package.
  Following the above example for Python, we'd create a package with the ID `python` at version `2.0.0` that takes a dependency on the `python2` package.
1. New versions of the metapackage should be published for "sub-versions" of the dependency package as well.
  For example, if Python version `3` is released, we'd create a new version of the `python` package with its version set to `3.0.0`, which depends on a new `python3` package.

#### If the software you're creating a package for expects **side-by-side installations of the same version**

A possible example might be where multiple different instances of the software are being installed into different install directories.

Chocolatey does not currently support this functionality.
This functionality can be mimicked by making use of `--force` to forcibly overwrite an already-installed package and providing an argument or package parameter that the package can use to direct the installation to install into a different directory.
However, Chocolatey will only be aware of the most-recently installed copy of the software, and will only be able to provide updates to that single installation of the software in most cases.
As a result, this particular configuration is not supported.

A potential workaround for users maintaining their own package repositories is to maintain separate instances of the same package under different package IDs, where each package ships the same software, but is scripted to install to a different directory.
For example, you can create a `python3-localtoolsfolder` and a `python3-programfilesfolder` package which have the same contents, with only slight differences in the parameters passed to the install functions to ensure they install in the desired locations.
The recommended naming conventions here are similar to sub-packages, where the package is named after the primary package ID followed by a dash and a discriminator, likely named after the install location or referencing the purpose of the additional package(s).

## Package description and release notes

The `<description>` of the package should contain a short text or at least a few words about the software for which the package is made. Here are a few things that should be respected:

* The description should always be written in English, even if the packaged software does not provide an UI in English. You can also include the software’s description in its original language, but insert it after the English description.
* The description should not just contain a repetition of the package name.
* It should not just consist of a link where more information can be found. For that purpose there’s already `<projectUrl>`.
* The contents of `<description>` and also `<releaseNotes>` are parsed as Markdown, so don’t insert line breaks in the middle of sentences. Remember to add empty lines to separate paragraphs and add an empty line before a list.

## Versioning Recommendations
Versioning can be both simple and complicated. The best recommendation is to use the same versioning that the installable/portable application uses. With Chocolatey you get four version segments. If the application only uses 1, 2 or 3 version segments, follow suit.

If the 4th segment is used, some folks like to drop the segment altogether and use that as only the package fix notation using one of the notations in the next section. There is no recommendations at this time.

### Package Fix Version Notation

Package fix version notation ONLY applies when you are making a fix to the package because the existing version of a package is incorrect in some way. So if the software is `1.1.0`, in a normal scenario the package version should be `1.1.0`. If you find that the `1.1.0` package has an issue and you need to fix the package but keep the same version of the software, that is where package fix version notation comes into play. You would end up with both a `1.1.0` package and a `1.1.0.YYYYMMDD` version of the package.

> :memo: **NOTE**
>
> This doesn't apply to packages on the community feed (aka https://community.chocolatey.org/packages) that are still under review (not yet approved). Please read the instructions given in email for resubmitting the same version.

If you need to fix an approved package for some reason, you can use the fourth version element (aka segment) for a package fix notation. There are two recommended methods of package fix version notation:

 * **Date (Year/Month/Day)** - Some folks use year month day package fix notation (yyyyMMdd as in 20120627 seen as 1.2.0.20120627)
 * Sequential - **Not recommended** - Some folks use sequential numbering (0, then 1, etc as in 0 for no fix, 1 for first fix and so on seen as 1.2.0.0 and 1.2.0.1).

Date Package Fix Version Notation is recommended because one can ascertain what it is immediately upon seeing it, where sequential is not obvious on sight whether it is part of the software versioning or something special with the package.

Package fix version notation is only acceptable in the fourth segment. Do not use any of the other segments for package fix notation. If an application only uses 1 or 2 version segments, add zeros into the other segments until you get to the 4th segment (i.e. 1.0.0.20120627).

When the fourth segment is already used, it is recommended to add two zeroes (00) to the end of the version. Then when you need to fix, you just increment that number. So if the package was ruby and the version was 2.0.0-p353, the package is 2.0.0.35300 (adding the two zeroes at the end). Then a fix would be 2.0.0.35301 and so on.

> :warning: **WARNING**
>
> If you decide to add a secondary set of numbers to the fourth segment, you MUST ALWAYS include that secondary set of numbers while the other three version segments are the same. The reason - if you fix `.1` to `.100`, then release `.2`, `.100` is greater than `.2` because versioning doesn't look at the ".", only the number in the element. So `100` is greater than `2`.

## Internationalization and localization of packages
For Chocolatey, internationalization and localization of packages is very important, because it has users from all over the world. Many applications support multiple languages, but they use several different methods to achieve that. Therefore, there is no standard how internationalization/localization has to be integrated into packages. However, here are a few examples of packages that use various techniques. You can use them as inspiration for new packages:
* The ideal situation is when an application determines the user's system language and automatically installs with that language. Then you don't have to take any action relating to localization, because the application already handles that. Examples of such applications are [VLC Media Player](https://community.chocolatey.org/packages/vlc) and [LibreOffice](https://community.chocolatey.org/packages/libreoffice).
* When an application provides different installers for different languages, you should determine the system language and download the appropriate installer. The package for [Mozilla Firefox](https://community.chocolatey.org/packages/Firefox) ([source code](https://github.com/chocolatey-community/chocolatey-packages/tree/master/automatic/Firefox)) uses this method.
* Sometimes an application installer or executable has already integrated all supported languages, but doesn't automatically select the system language during a silent install. Often you can pass an additional install parameter to select the desired language. This is used for example in the [CCleaner](https://community.chocolatey.org/packages/ccleaner) package ([source code](https://github.com/tonigellida/chocolateyautomaticpackages/tree/master/ccleaner)).
* Some application use separate language files which must be downloaded separately and put somewhere in the application directory. It is best when you create a separate package for the language files. If your package id is `packageid`, then call it `packageid-langfiles`. The [language files package for KeePass](https://community.chocolatey.org/packages/keepass-langfiles) is an example how this can be achieved.

## Package icon guidelines
If there is an icon which is suitable for your package, you can specify it in the `<iconUrl>` tag in the nuspec. But there are a few things you should consider:
* **Avoid hotlinking icons from sites where you don’t have control over the file.** If you have a packages repository (recommended), use your own copy of the icon and put it there.
* **Use a static CDN for icon URLs that permits you to serve files hosted in a repository on GitHub.** Some CDN services cache files permanently and it's therefore best to use a specific tag or commit URL, not a branch URL. While we don't make any recommendations about specific services, the more popular ones used by maintainers are [jsDelivr](https://www.jsdelivr.com/), [Statically](https://statically.io/) and [Githack](https://raw.githack.com/).
* **Avoid using GitHub raw links** (`https://raw.githubusercontent.com/...`). They are not intended to be used as CDN.
* **Use the software’s icon if one is available, not the logo.** This blog post explains the difference between logos and icons: http://blog.designcrowd.com/article/353/differences-between-logos-and-icons. If the software of your package doesn’t have an icon, but a logo with text and an image, you can extract the image with your favorite image editor and use that as package icon. An example is [MySQL’s dolphin](https://community.chocolatey.org/packages/mysql).
* **Use package icons with at least 128 pixels in width or height** if available. However, avoid very high resolutions, because this would only unnecessarily increase the page load time. If there are only icons with less than 128 pixels available, choose the icon with the highest resolution you can find without upscaling it. Don’t use low resolution favicons as package icons.
* Use icons with transparent background if available.
* Don’t use distorted or blurry icons.
* The package list in the Chocolatey Community Repository shows the icons with a maximum of 48 pixels in width/height. Application logos with very detailed graphics that are barely visible at that dimension are not suitable as package icons.
* **PNG is the preferred format** for raster package icons. Avoid ICO, GIF and JPEG graphics.
* Good sources for package icons are the official desktop icons of the corresponding application you want to make a package of. The icons can be extracted from the app executables using tools like [BeCyIconGrabber](https://community.chocolatey.org/packages/becyicongrabber). Remember to take the icon with 128&nbsp;px or more and save it as PNG file.

The icon shown on the community.chocolatey.org package page is saved, and served, locally to mitigate against cross scripting attacks and to prevent getting _non HTTPS assets_ errors on the website. Sometimes the page loads faster than the image can be served and the default image gets cached and as a result the new package icon may not be shown until you clear the browser cache for community.chocolatey.org and wait 3 hours before reloading the page.

<a name="how-do-i-exclude-executables-from-getting-batch-redirects"></a>
## How do I exclude executables from getting shims?
If you have executables in the package or brought into the package folder during PowerShell run and you want to exclude them you need to create an empty file named exactly like (**case sensitive**) the executable with `.ignore` suffixed on the end in the same directory where the executable is or will be.

Example: In the case of `Bob.exe` you would create a file named `Bob.exe.ignore` and that file would not get a redirect batch link. The Chocolatey package has an example of that. To further expand, `bob.exe.ignore` would not work because it doesn't have the correct casing.

Here's a great [programmatic example](https://github.com/ferventcoder/chocolatey-packages/blob/6ea7c087bd999d428a564b5d7e236ae998ef72e9/automatic/git.commandline/tools/chocolateyInstall.ps1#L13-L20):

~~~powershell
$files = get-childitem $installDir -include *.exe -recurse

foreach ($file in $files) {
  #generate an ignore file
  New-Item "$file.ignore" -type file -force | Out-Null
}
~~~

<a name="how-do-i-set-up-batch-redirects-for-applications-that-have-a-gui"></a>
## How do I set up shims for applications that have a GUI?
If you don't want to see a hanging window when you open an application from the command line that was set up with Chocolatey, you want to create a file next to the executable that is named exactly the same (**case sensitive**) with `.gui` suffixed on the end.

Example: In the case of `Bob.exe` you would create a file named `Bob.exe.gui` and that file would be set up as a GUI application so the window will call it and then move on without waiting for it to finish.  Again, `bob.exe.gui` would not work because it doesn't have the correct casing.

## Build Your Package

Open a command line in the directory where the nuspec is and type [`choco pack`](xref:choco-command-pack). That's it.

## Testing Your Package

> :memo: **NOTE**
>
> We strongly suggest the following should be performed in a VM and not on your machine.

> :memo: **NOTE**
>
> Testing your package can be done in the same way as the verifier - take a look at [Chocolatey Verifier Testing](https://github.com/chocolatey-community/chocolatey-test-environment).

To test the package you just built, open a command line shell and navigate to the directory where the `*.nupkg` file is located. Then type:

~~~powershell
choco install packageName --debug --verbose --source .
~~~~

This will install the package right out of your source. As you find things you may need to fix, using `--force` (`-f`) will remove and reinstall the package from the updated `*.nupkg`. If you are specifically testing `chocolateyBeforeModify.ps1`, you need to be testing upgrade and uninstall scenarios. You need to install a version of the package with this file **first** as before modify is like uninstall, it runs from the installed package, not the package you are installing (like `chocolateyInstall.ps1` does).

> :memo: **NOTE**
>
> Using Force `--force` (`-f`) should only be done in subsequent testing where you are reinstalling the same package that you've changed and should NOT be used in regular use scenarios. It should definitely not be in scripts.

> :memo: **NOTE**
>
> If you are using a Semver dash in your package version (such as 1.0.0-beta), you will need to use the `--pre` switch or else you will get *Unable to find package* errors from `choco install`.  You can also specify `-version 1.0.0-beta` to try to install that exact version.

`.` points to the current directory. You can specify multiple directories separated by a semicolon;

When your `nuspec` specifies dependencies that are not in your source, you should add their paths to the source directory. E.g. in the case of Chocolatey itself:

```xml
<dependencies>
    <dependency id="chocolatey" version="0.9.8.20" />
</dependencies>
```

You'll need to append the API path like so:
`--source "'.;https://community.chocolatey.org/api/v2/'"` (note the double quotes bookending the apostrophes here, use `%cd%` in cmd.exe or `$pwd` in Powershell.exe if `.` doesn't resolve). See [passing options with quotes](xref:choco-commands#how-to-pass-options-switches).

> :memo: **NOTE**
>
> If you need to do this, please ensure you run `choco pack` first. This method of passing a source won't work calling a nuspec or nupkg directly as it will override the source passed to the local folder.

You can also use the `--debug` switch on `choco install` to provide more information.

> :memo: **NOTE**
>
> Do not call install with `.nupkg` - pointing to a file explicitly overrides source. You must call your install with the package name, not the nupkg file and location. You've already specified for choco to look in a local source with `--source "'.;https://community.chocolatey.org/api/v2/'"`. Call `choco install dude --source "'.;https://community.chocolatey.org/api/v2/'"`, not `choco install .\dude.nupkg --source "'.;https://community.chocolatey.org/api/v2/'"`.

### Alternative testing strategy
You can also type `choco install --force --debug --verbose path/to/nuspec` and choco will build the nupkg and attempt to install it.

> :memo: **NOTE**
>
> This is not recommended if you are passing install arguments or package parameters due to some weirdness, and definitely does not work with passed sources as it need to override that with the local folder once it builds the package. Most likely you will want to stick with the recommended strategy.

## Push Your Package

To push your package after you have built and tested it, you type `choco push packageName.nupkg --source sourceLocation` where *packageName.nupkg* is the name of the nupkg that was built with a version number as part of the package name and *sourceLocation* is the location of the source you want to push to (e.g. `--source https://push.chocolatey.org/` for chocolatey's community feed).  You must have an API key for https://push.chocolatey.org/ set. Take a look at [choco push](xref:choco-command-push)

## Automatic packaging?
Yes - [Automatic Packaging](xref:automatic-packaging)

## Becoming a primary maintainer of an existing package
See [Package Maintainer Handover](xref:package-maintainer-handover)
