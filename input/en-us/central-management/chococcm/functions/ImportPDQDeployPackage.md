---
Order: 190
xref: import-pdqdeploypackage
Title: Import-PDQDeployPackage
Description: Information about the Import-PDQDeployPackage function
RedirectFrom: docs/import-pdqdeploy-package
---

# Import-PDQDeployPackage

<!-- This documentation is automatically generated from /Import-PDQDeployPackage.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Imports a PDQ Deploy package as a Central Management Deployment

## Syntax

~~~powershell
Import-PDQDeployPackage `
  -PdqXml <String> [<CommonParameters>]
~~~

## Description

Imports a PDQ Deploy package as a Central Management Deployment

## Notes

General notes

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Import-PDQDeployPackage

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -PdqXml &lt;String&gt;
The pdq xml file to import

Property               | Value
---------------------- | -----
Aliases                |
Required?              | true
Position?              | 1
Default Value          |
Accept Pipeline Input? | false

### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` https://go.microsoft.com/fwlink/p/?LinkID=113216 .



[Function Reference](xref:chococcm-functions)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Import-PDQDeployPackage -Full`.
