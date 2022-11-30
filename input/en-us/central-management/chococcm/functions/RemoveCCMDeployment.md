---
Order: 240
xref: remove-ccmdeployment
Title: Remove-CCMDeployment
Description: Information about the Remove-CCMDeployment function
RedirectFrom: docs/remove-ccmdeployment
---

# Remove-CCMDeployment

<!-- This documentation is automatically generated from /Remove-CCMDeployment.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Removes a deployment plan

## Syntax

~~~powershell
Remove-CCMDeployment `
  -Deployment <String[]> `
  [-WhatIf] `
  [-Confirm] [<CommonParameters>]
~~~

## Description

Removes the Deployment Plan selected from a Central Management installation


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Remove-CCMDeployment -Name 'Super Complex Deployment'

~~~

**EXAMPLE 2**

~~~powershell
Remove-CCMDeployment -Name 'Deployment Alpha' -Confirm:$false

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Deployment &lt;String[]&gt;
The Deployment to  delete

Property               | Value
---------------------- | ------------------------------
Aliases                |
Required?              | true
Position?              | 1
Default Value          |
Accept Pipeline Input? | true (ByValue, ByPropertyName)

###  -WhatIf
Property               | Value
---------------------- | -----
Aliases                | wi
Required?              | false
Position?              | named
Default Value          |
Accept Pipeline Input? | false

###  -Confirm
Property               | Value
---------------------- | -----
Aliases                | cf
Required?              | false
Position?              | named
Default Value          |
Accept Pipeline Input? | false

### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` https://go.microsoft.com/fwlink/p/?LinkID=113216 .



[Function Reference](xref:chococcm-functions)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Remove-CCMDeployment -Full`.
