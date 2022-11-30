---
Order: 180
xref: get-deploymentresult
Title: Get-DeploymentResult
Description: Information about the Get-DeploymentResult function
RedirectFrom: docs/get-deployment-result
---

# Get-DeploymentResult

<!-- This documentation is automatically generated from /Get-DeploymentResult.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Return the result of a Central Management Deployment

## Syntax

~~~powershell
Get-DeploymentResult `
  -Deployment <String> [<CommonParameters>]
~~~

## Description

Return the result of a Central Management Deployment


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Get-CCMDeploymentResult -Name 'Google Chrome Upgrade'

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Deployment &lt;String&gt;
The Deployment for which to return information

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
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Get-DeploymentResult -Full`.
