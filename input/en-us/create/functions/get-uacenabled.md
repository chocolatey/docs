---
Order: 130
xref: get-uacenabled
Title: Get-UACEnabled
Description: Information on Get-UACEnabled function
RedirectFrom:
  - docs/helpers-get-uac-enabled
  - docs/helpersgetuacenabled
---

# Get-UACEnabled

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-UACEnabled.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Determines if UAC (User Account Control) is turned on or off.

## Syntax

~~~powershell
Get-UACEnabled
~~~

## Description

This is a low level function used by Chocolatey to decide whether
prompting for elevated privileges is necessary or not.

## Notes

This checks the `EnableLUA` registry value to be determine the state of
a system.

## Aliases

None

## Inputs

None

## Outputs


 * System.Boolean


## Parameters
 



[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Get-UACEnabled -Full`.

View the source for [Get-UACEnabled](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-UACEnabled.ps1)
