---
Order: 320
xref: set-environmentvariable
Title: Set-EnvironmentVariable
Description: Information on Set-EnvironmentVariable function
RedirectFrom:
  - docs/helpers-set-environment-variable
  - docs/helperssetenvironmentvariable
---

# Set-EnvironmentVariable

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Set-EnvironmentVariable.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

> :choco-info: **NOTE**
>
> Administrative Access Required when `-Scope 'Machine'.`

DO NOT USE. Not part of the public API. Use
`Install-ChocolateyEnvironmentVariable` instead.

## Syntax

~~~powershell
Set-EnvironmentVariable `
  -Name <String> `
  [-Value <String>] `
  [-Scope {Process | User | Machine}] `
  [-IgnoredArguments <Object[]>] [<CommonParameters>]
~~~

## Description

Saves an environment variable.

## Notes

This command will assert UAC/Admin privileges on the machine if
`-Scope 'Machine'`.

## Aliases

None

## Inputs

None

## Outputs

None

## Parameters

###  -Name &lt;String&gt;
Property               | Value
---------------------- | -----
Aliases                | 
Required?              | true
Position?              | 1
Default Value          | 
Accept Pipeline Input? | false
 
###  -Value [&lt;String&gt;]
Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 2
Default Value          | 
Accept Pipeline Input? | false
 
###  -Scope

Valid options: Process, User, Machine

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 3
Default Value          | 
Accept Pipeline Input? | false
 
###  -IgnoredArguments [&lt;Object[]&gt;]
Allows splatting with arguments that do not apply. Do not use directly.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | named
Default Value          | 
Accept Pipeline Input? | false
 
### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` http://go.microsoft.com/fwlink/p/?LinkID=113216 .


## Links

 * [Install-ChocolateyEnvironmentVariable](xref:install-chocolateyenvironmentvariable)
 * [Uninstall-ChocolateyEnvironmentVariable](xref:uninstall-chocolateyenvironmentvariable)
 * [Install-ChocolateyPath](xref:install-chocolateypath)
 * [Get-EnvironmentVariable](xref:get-environmentvariable)


[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Set-EnvironmentVariable -Full`.

View the source for [Set-EnvironmentVariable](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Set-EnvironmentVariable.ps1)
