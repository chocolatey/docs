---
Order: 42
xref: howto-create-extension-package
Title: How to Create an Extension Package
Description: A walkthrough creating a Chocolatey extension package
---

As we've mentioned in other articles, a Chocolatey package can do near anything PowerShell can - including sharing functions and logic between packages.

In this how-to, we'll talk about sharing functions between packages using extension packages.

### What Is an Extension Package

In Chocolatey-parlance, an extension package is a package that extends the ability of other Chocolatey packages, by making additional PowerShell functions or cmdlets available.

Most simply put, a given extension package will import one or more PowerShell modules every time `choco` runs!

### Why Would You Use An Extension Package

The main reason we talk about extension packages is to reduce having to add the same lines of code or functions to multiple packages you maintain.

You may be familiar with DRY ("Don't Repeat Yourself") coding principles, which (put simply) hold that there are benefits to maintaining your code in a single location and calling that where appropriate.

Extension packages allow you to easily follow this best practice within your Chocolatey packages without copying your lines of code into dozens of places (or packages).

Examples of this include:

- The [Chocolatey Font Helpers Extension](https://community.chocolatey.org/packages/chocolatey-font-helpers.extension), which has some well tested functionality for installing and uninstalling fonts in Chocolatey packages.

- The [Chocolatey Compatibility Extension](https://community.chocolatey.org/packages/chocolatey-compatibility.extension), which provides otherwise deprecated or removed functions from older releases of Chocolatey CLI to maintain compatibility with older packages.

- The [Chocolatey Windows Update extension](https://community.chocolatey.org/packages/chocolatey-windowsupdate.extension), which provides shared functions for many of the Windows Knowledge Base update packages on the Chocolatey Community Repository.

You might choose to use this over installing a full PowerShell module if you didn't want to expose the PowerShell module to the normal users of the machine - for instance, if you never wanted to expose the functions outside of Chocolatey runspaces. If you just wanted to use an available PowerShell module, you might consider having a dependency on a package that installs that module, instead.

### Extension Package

An extension package is organised much like any other Chocolatey package - though instead of the scripts within the `tools` directory you may be familiar with, there should be an `extensions` directory.

We'll now run through how to create an extension package, assuming you have an environment set up as in [Preparing Your Environment for Package Creation](#package-creation-env-placeholder).

#### Creating an Extension Package

> **Shortcut:** You can use a [package template](#package-template-placeholder) to create an extension package!
> Try it, by installing the `extension.template` package and running `choco new test.extension --template extension`

The extension package is actually different enough to a regular package that using the default template would result in more cleanup than help!

Create a new directory to hold your package files, and within that directory create a nuspec file for your new extension package - we're going to call ours `example.extension` in these examples, but you can change that to whatever you like!

1. Create a new folder for this package. For the example, we will call it `example.extension`.
    1. Create a package metadata file named `example.extension.nuspec`, and add content [as shown below](#package-metadata-content).
1. In the `example.extension` folder, create a folder named `extensions`.
    1. Within the `extensions` folder, create a `ExampleModule.psm1` file, and add content [as shown below](#simple-module-content).

##### Package Metadata Content

```xml
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2011/08/nuspec.xsd">
  <metadata>
    <id>example.extension</id>
    <version>0.1.0</version>
    <title>Example Extension</title>
    <authors>__REPLACE__</authors>
    <description>A super cool extension package!</description>
    <summary>Extension package for testing.</summary>
    <tags>extension chocolatey package</tags>
  </metadata>
</package>
```

##### Simple Module Content

```PowerShell
function Set-ConfigValue {
    <#
        .Synopsis
            Sets a value for that program you're using.

        .Example
            Set-ConfigValue -Name SMTP -Value 6
    #>
    [CmdletBinding()]
    param(
        # The name of the config to set
        [Parameter(Mandatory, Position = 0, ValueFromPipelineByPropertyName)]
        [string]$Name,

        # The value to set the config to
        [Parameter(Mandatory, Position = 1, ValueFromPipelineByPropertyName)]
        [string]$Value,

        # The path to the config file to modify
        [string]$Path = "C:\ProgramData\exampleapp\config.json"
    )
    begin {
        # Ensure the Config Directory exists
        if (-not (Test-Path (Split-Path $Path))) {
            $null = New-Item -Path (Split-Path $Path) -ItemType Directory
        }
        $Configuration = if (Test-Path $Path) {
            Get-Content $Path | ConvertFrom-Json
        } else {
            @{}
        }
    }
    process {
        $Configuration.$Name = $Value
    }
    end {
        $Configuration | ConvertTo-Json | Set-Content -Path $Path
    }
}
```

So, if you browse through the files in VS Code or Explorer, you should see a file structure like this:

```text
example.extension
├── example.extension.nuspec
├── extensions
│   ├── ExampleModule.psm1
```

Open the `example.extension.nuspec` file in VS Code and modify the metadata as appropriate:

* **authors**: This should be replaced with your name or handle.

That's all you need!

You may notice that all of the example packages above end with `.extension`. This is not required for an extension package by Chocolatey itself, but it is how we easily classify extension packages on the Chocolatey Community Repository.

#### Creating Your Install Script

As we mentioned earlier, there's no need for an install script in an extension package - Chocolatey CLI handles putting the extension in the right place!

You can _also_ include a `tools` directory, with the standard Chocolatey scripts (which could be used for system-specific configuration of the module), but it is not required.

#### Considering Uninstallation

Chocolatey will also handle uninstallation of the extension module automatically, so there's no need to add a `chocolateyUninstall.ps1` script to this package.

### Compiling Your Package

You can now use `choco pack` to compile your Chocolatey package into a nupkg file, ready for installation!

1. In VSCode, press `Ctrl + Shift + P` or use the `View` menu and click on `Command Palette`.
1. Select `Chocolatey: Package Chocolatey package(s)` from the prompt.
1. Select `example.extension.nuspec` from the prompt.
1. Press Enter, providing no additional input.

You should have a new package generated in your current working directory.

### Installing Your Package

This sort of package isn't normally installed on it's own, but you can now test installation of your package!

In an elevated command prompt on your test environment, run the following:

```PowerShell
choco install example.extension --source='Tutorials' --confirm
```

You should then be able to browse to the extensions directory, within your Chocolatey installation, and see that your PowerShell module has been placed there.

```PowerShell
# This should show an 'example' directory, along with all of your other installed extensions
Get-ChildItem $env:ChocolateyInstall\extensions

# This should show your module
Get-ChildItem $env:ChocolateyInstall\extensions\example
```

### Using Shared PowerShell Functions

Once you've created your extension package, using the functions contained within is as simple as ensuring the package is installed (for instance, by adding a dependency) and calling the functions within your Chocolatey scripts.

If you've already created a [config package](#config-package-placeholder), why not try adding your newly available functions to it?

- Open the config package `.nuspec` file in VS Code.
- [Add a dependency](#nuspec-dependency-addition) on your new extension package.
- Replace [usage of PowerShell code](#powershell-dependency-addition) in the original package with your new function.

#### Nuspec Dependency Addition

```xml
    <dependencies>
      <dependency id="example.extension" />
    </dependencies>
```

You should now be able to reference your function within the package, without having defined it there.

#### PowerShell Dependency Addition

```PowerShell
# Write Configuration File
Set-ConfigValue -Name LicensePath -Value (Join-Path $ConfigDirectory "LICENSE.txt")
Set-ConfigValue -Name ComputerName -Value $env:ComputerName
```

### Conclusion

At this point, you have created a package that extends the functionality of Chocolatey CLI - and possibly used it in another package.
