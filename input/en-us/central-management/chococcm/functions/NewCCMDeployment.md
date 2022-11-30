---
Order: 210
xref: new-ccmdeployment
Title: New-CCMDeployment
Description: Information about the New-CCMDeployment function
RedirectFrom: docs/new-ccmdeployment
---

# New-CCMDeployment

<!-- This documentation is automatically generated from /New-CCMDeployment.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Create a new CCM Deployment Plan

## Syntax

~~~powershell
New-CCMDeployment `
  -Name <String> [<CommonParameters>]
~~~

## Description

Creates a new CCM Deployment. This is just a shell. You'll need to add steps with New-CCMDeploymentStep.


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
New-CCMDeployment -Name 'This is awesome'

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Name &lt;String&gt;
The name for the deployment

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
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help New-CCMDeployment -Full`.
