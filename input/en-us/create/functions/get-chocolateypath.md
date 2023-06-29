---
Order: 40
xref: get-chocolateypath
Title: Get-ChocolateyPath
Description: Information on Get-ChocolateyPath function
RedirectFrom:
  - docs/helpers-get-chocolatey-path
  - docs/helpersgetchocolateypath
---

# Get-ChocolateyPath

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-ChocolateyPath.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Retrieve the paths available to be used by maintainers of packages.

## Syntax

~~~powershell
Get-ChocolateyPath `
  -PathType <String> [<CommonParameters>]
~~~

## Description

This function will attempt to retrieve the path according to the specified Path Type
to a valid location that can be used by maintainers in certain scenarios.

## Notes

Available in 1.2.0+.

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell

$path = Get-ChocolateyPath -PathType 'PackagePath'
~~~ 

## Inputs

None

## Outputs


 * This function outputs the full path stored accordingly with specified path type.
If no path could be found, there is no output.


## Parameters

###  -PathType &lt;String&gt;
The type of path that should be looked up.
Available values are:
- `PackagePath` - The path to the the package that is being installed. Typically `C:\ProgramData\chocolatey\lib\<PackageName>`
- `InstallPath` - The path to where Chocolatey is installed. Typically `C:\ProgramData\chocolatey`

Property               | Value
---------------------- | -----
Aliases                | type
Required?              | true
Position?              | 1
Default Value          | 
Accept Pipeline Input? | false
 
### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` http://go.microsoft.com/fwlink/p/?LinkID=113216 .



[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Get-ChocolateyPath -Full`.

View the source for [Get-ChocolateyPath](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-ChocolateyPath.ps1)
