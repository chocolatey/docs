---
Order: 370
xref: uninstall-chocolateyenvironmentvariable
Title: Uninstall-ChocolateyEnvironmentVariable
Description: Information on Uninstall-ChocolateyEnvironmentVariable function
RedirectFrom:
  - docs/helpers-uninstall-chocolatey-environment-variable
  - docs/helpersuninstallchocolateyenvironmentvariable
---

# Uninstall-ChocolateyEnvironmentVariable

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Uninstall-ChocolateyEnvironmentVariable.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

> :choco-info: **NOTE**
>
> Administrative Access Required when `-VariableType 'Machine'.`

Removes a persistent environment variable.

## Syntax

~~~powershell
Uninstall-ChocolateyEnvironmentVariable `
  -VariableName <String> `
  [-VariableType {Process | User | Machine}] `
  [-IgnoredArguments <Object[]>] [<CommonParameters>]
~~~

## Description

Uninstall-ChocolateyEnvironmentVariable removes an environment variable
with the specified name and value. The variable can be scoped either to
the User or to the Machine. If Machine level scoping is specified, the
command is elevated to an administrative session.

## Notes

This command will assert UAC/Admin privileges on the machine when
`-VariableType Machine`.

This will remove the environment variable from the current session.

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell

# Remove an environment variable
Uninstall-ChocolateyEnvironmentVariable -VariableName 'bob'
~~~

**EXAMPLE 2**

~~~powershell

# Remove an environment variable from Machine
Uninstall-ChocolateyEnvironmentVariable -VariableName 'bob' -VariableType 'Machine'
~~~ 

## Inputs

None

## Outputs

None

## Parameters

###  -VariableName &lt;String&gt;
The name or key of the environment variable to remove.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | true
Position?              | 1
Default Value          | 
Accept Pipeline Input? | false
 
###  -VariableType
Specifies whether this variable is at either the individual User level
or at the Machine level.


Valid options: Process, User, Machine

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 2
Default Value          | User
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
 * [Set-EnvironmentVariable](xref:set-environmentvariable)
 * [Install-ChocolateyPath](xref:install-chocolateypath)


[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Uninstall-ChocolateyEnvironmentVariable -Full`.

View the source for [Uninstall-ChocolateyEnvironmentVariable](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Uninstall-ChocolateyEnvironmentVariable.ps1)
