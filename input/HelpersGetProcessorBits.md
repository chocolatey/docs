# Get-ProcessorBits

Get the system architecture address width.

## Syntax

~~~powershell
Get-ProcessorBits `
  [-Compare <Object>]
~~~

## Description

This will return the system architecture address width (probably 32 or
64 bit). If you pass a comparison, it will return true or false instead
of {`32`|`64`}.

## Notes

When your installation script has to know what architecture it is run
on, this simple function comes in handy.

## Aliases

None

## Inputs

None

## Outputs

None

## Parameters
 




[[Function Reference|HelpersReference]]

***NOTE:*** This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Get-ProcessorBits -Full`.
