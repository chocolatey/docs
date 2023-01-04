---
Order: 50
xref: export-ccmdeployment
Title: Export-CCMDeployment
Description: Information about the Export-CCMDeployment function
RedirectFrom: docs/export-ccmdeployment
---

# Export-CCMDeployment

<!-- This documentation is automatically generated from /Export-CCMDeployment.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Exports a Deployment to a CliXML file

## Syntax

~~~powershell
Export-CCMDeployment `
  -Deployment <String> `
  [-DeploymentStepsOnly] `
  -OutFile <String> `
  [-AllowClobber] [<CommonParameters>]
~~~

## Description

Adds ability to export a deployment as cli-xml. Useful for backup/source control of deployments


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Export-CCMDeployment -Deployment TestDeployment -OutFile C:\temp\testdeployment.xml

~~~

**EXAMPLE 2**

~~~powershell
Export-CCMDeployment -Deployment UpgradeChrome -OutFile C:\temp\upgradechrome_ccmdeployment.xml -AllowClobber

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Deployment &lt;String&gt;
The CCM Deployment to Export

Property               | Value
---------------------- | -----
Aliases                |
Required?              | true
Position?              | 1
Default Value          |
Accept Pipeline Input? | false

###  -DeploymentStepsOnly
Only export a deployment's steps

Property               | Value
---------------------- | -----
Aliases                |
Required?              | false
Position?              | named
Default Value          | False
Accept Pipeline Input? | false

###  -OutFile &lt;String&gt;
The xml file to save the deployment as

Property               | Value
---------------------- | -----
Aliases                |
Required?              | true
Position?              | 2
Default Value          |
Accept Pipeline Input? | false

###  -AllowClobber
Allow a file to be overwritten if it already exists

Property               | Value
---------------------- | -----
Aliases                |
Required?              | false
Position?              | named
Default Value          | False
Accept Pipeline Input? | false

### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` https://go.microsoft.com/fwlink/p/?LinkID=113216 .



[Function Reference](xref:chococcm-functions)

> :choco-info: **NOTE**
> 
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Export-CCMDeployment -Full`.
