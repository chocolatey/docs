---
Order: 10
xref: add-ccmgroup
Title: Add-CCMGroup
Description: Information about the Add-CCMGroup function
RedirectFrom: docs/add-ccmgroup
---

# Add-CCMGroup

<!-- This documentation is automatically generated from /Add-CCMGroup.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Adds a group to Central Management

## Syntax

~~~powershell
Add-CCMGroup `
  -Name <String> `
  [-Description <String>] `
  [-Group <String[]>] `
  [-Computer <String[]>] [<CommonParameters>]
~~~

## Description

Deployments in Central Management revolve around Groups. Before you can execute a deployment you must define a target group of computers the Deployment will execute on.
Use this function to create new groups in your Central Management system


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Add-CCMGroup -Name PowerShell -Description "I created this via the ChocoCCM module" -Computer pc1,pc2

~~~

**EXAMPLE 2**

~~~powershell
Add-CCMGroup -Name PowerShell -Description "I created this via the ChocoCCM module" -Group Webservers

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Name &lt;String&gt;
The name you wish to give the group

Property               | Value
---------------------- | -----
Aliases                |
Required?              | true
Position?              | 1
Default Value          |
Accept Pipeline Input? | false

###  -Description [&lt;String&gt;]
A short description of the group

Property               | Value
---------------------- | -----
Aliases                |
Required?              | false
Position?              | 2
Default Value          |
Accept Pipeline Input? | false

###  -Group [&lt;String[]&gt;]
The group(s) to include as members

Property               | Value
---------------------- | -----
Aliases                |
Required?              | false
Position?              | 3
Default Value          |
Accept Pipeline Input? | false

###  -Computer [&lt;String[]&gt;]
The computer(s) to include as members

Property               | Value
---------------------- | -----
Aliases                |
Required?              | false
Position?              | 4
Default Value          |
Accept Pipeline Input? | false

### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` https://go.microsoft.com/fwlink/p/?LinkID=113216 .



[Function Reference](xref:chococcm-functions)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Add-CCMGroup -Full`.
