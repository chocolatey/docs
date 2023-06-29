---
Order: 80
xref: get-environmentvariablenames
Title: Get-EnvironmentVariableNames
Description: Information on Get-EnvironmentVariableNames function
RedirectFrom:
  - docs/helpers-get-environment-variable-names
  - docs/helpersgetenvironmentvariablenames
---

# Get-EnvironmentVariableNames

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-EnvironmentVariableNames.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Gets all environment variable names.

## Syntax

~~~powershell
Get-EnvironmentVariableNames `
  [-Scope {Process | User | Machine}]
~~~

## Description

Provides a list of environment variable names based on the scope. This
can be used to loop through the list and generate names.

## Notes

Process dumps the current environment variable names in memory /
session. The other scopes refer to the registry values.

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Get-EnvironmentVariableNames -Scope Machine

~~~ 

## Inputs

None

## Outputs


 * A list of environment variables names.


## Parameters

###  -Scope
The environment variable target scope. This is `Process`, `User`, or
`Machine`.


Valid options: Process, User, Machine

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 1
Default Value          | 
Accept Pipeline Input? | false
 


## Links

 * [Get-EnvironmentVariable](xref:get-environmentvariable)
 * [Set-EnvironmentVariable](xref:set-environmentvariable)


[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Get-EnvironmentVariableNames -Full`.

View the source for [Get-EnvironmentVariableNames](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-EnvironmentVariableNames.ps1)
