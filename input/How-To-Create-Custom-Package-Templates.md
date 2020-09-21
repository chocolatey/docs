# Create Your Own Custom Package Templates

As of [choco 0.9.9.9](https://github.com/chocolatey/choco/issues/76), you can create your own custom package templates when the built-in template is not enough.

<!-- TOC -->

- [Overview](#overview)
  - [Where Do Templates Go?](#where-do-templates-go)
  - [Can I replace the built-in template?](#can-i-replace-the-built-in-template)
  - [What values can I template?](#what-values-can-i-template)
- [Example](#example)
  - [Manage as Templates as Packages](#manage-as-templates-as-packages)
  - [Extending Templates](#extending-templates)
  - [Are There Planned Enhancements?](#are-there-planned-enhancements)

<!-- /TOC -->

## Overview
A template is used for creating packages. Chocolatey (choco) has a built-in template that it uses when generating a new package from the command [[`choco new`|CommandsNew]].

### Where Do Templates Go?

If you drop a template into `$env:ChocolateyInstall\templates` folder, you can use `-t name_of_template` to generate a choco template based on that. So for:

![image](https://cloud.githubusercontent.com/assets/63502/9952997/0603b334-5da2-11e5-8b6d-65a5dbf5d8e0.png)

You would call `choco new pkgname -t organization` and choco will use the template folder instead of the built-in template.


### Can I replace the built-in template?

To replace the built-in template, you should put a folder in the template with the name of "default". Then choco will use that instead of the built-in template with no need to specify a template name.

### What values can I template?
You can get the names by running `choco new -h`:

~~~
Possible properties to pass:
    packageversion
    maintainername
    maintainerrepo
    installertype
    url
    url64
    silentargs
~~~

However `PackageName` and `PackageNameLower` also show up as they are based on the name of the package that you pass e.g. "bob" in `choco new bob`

Then you surround those templated values with `[[]]` to make them templated for choco to use.

**NOTE**: You can set and pass arbitrary values through as well. This is shown in the example with `CustomValue`.

## Example

This is a template for embedding an MSI into a package. This removes almost everything that is unnecessary for embedding software into packages. And because the autoUninstaller handles MSIs without an issue, we don't need a chocolateyUninstall.ps1.

A file with the extension `.nuspec`:

~~~xml
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>[[PackageNameLower]]</id>
    <title>[[PackageName]] (Install)</title>
    <version>[[PackageVersion]]</version>
    <authors>Original authors</authors>
    <owners>[[MaintainerName]]</owners>
    <description>__REPLACE__MarkDown_Okay [[AutomaticPackageNotesNuspec]]
    </description>
    <tags>[[PackageNameLower]] admin</tags>
    <!--<dependencies>
      <dependency id="" version="__VERSION__" />
      <dependency id="" />
    </dependencies>-->
  </metadata>
  <files>
    <file src="tools\**" target="tools" />
  </files>
</package>
~~~

`tools\chocolateyInstall.ps1`:

~~~powershell
# Custom value: [[CustomValue]]
$ErrorActionPreference = 'Stop'; # stop on all errors

[[AutomaticPackageNotesInstaller]]
$packageName  = '[[PackageName]]'
$toolsDir     = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$fileLocation = Join-Path $toolsDir 'NAME_OF_EMBEDDED_INSTALLER_FILE'

$packageArgs = @{
  packageName   = $packageName
  file          = $fileLocation
  fileType      = '[[InstallerType]]' #only one of these: exe, msi, msu

  #MSI
  silentArgs    = "/qn /norestart /l*v `"$env:TEMP\chocolatey\$($packageName)\$($packageName).MsiInstall.log`""
  validExitCodes= @(0, 3010, 1641)
  #OTHERS
  #silentArgs   ='[[SilentArgs]]' # /s /S /q /Q /quiet /silent /SILENT /VERYSILENT -s - try any of these to get the silent installer
  #validExitCodes= @(0) #please insert other valid exit codes here
}

Install-ChocolateyInstallPackage @packageArgs
~~~

Once installed, call this with `choco new test -t mytemplatename CustomValue=Yes`

### Manage as Templates as Packages

If you have Chocolatey v0.9.10+, then you can manage templates as packages themselves, allowing you to upgrade a template when a new version is available. When it comes to packaging templates, Chocolatey takes a conventional approach. You must create a package with the suffix ".template" and have a templates folder.

To manage a template as a package, create a new package with the name "templatename.template". The name of the package minus the ".template" will be the name of the template.

Then create a templates folder. This is where the template goes. the only thing to remember is that the nuspec file created here must end in ".template" as a Chocolatey package allows only one nuspec file.

Here's an example: https://chocolatey.org/packages/zip.template. The source is at https://github.com/ferventcoder/chocolatey-packages/tree/master/manual/zip.template

Yes, it is really that easy. Enjoy!

### Extending Templates

Walmart has a really good post on extending package templates. You can read that at https://chocolatey.org/blog/extending-chocolatey-packaging-at-walmart

### Are There Planned Enhancements?

* List Template names - https://github.com/chocolatey/choco/issues/449
