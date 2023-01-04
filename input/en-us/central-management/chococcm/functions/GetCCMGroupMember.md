---
Order: 110
xref: get-ccmgroupmember
Title: Get-CCMGroupMember
Description: Information about the Get-CCMGroupMember function
RedirectFrom: docs/get-ccmgroup-member
---

# Get-CCMGroupMember

<!-- This documentation is automatically generated from /Get-CCMGroupMember.ps1 using GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Returns information about a CCM group's members

## Syntax

~~~powershell
Get-CCMGroupMember `
  -Group <String> [<CommonParameters>]
~~~

## Description

Return detailed group information from Chocolatey Central Management


## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Get-CCMGroupMember -Group "WebServers"

~~~

## Inputs

None

## Outputs

None

## Parameters

###  -Group &lt;String&gt;
The Group to query

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
> This documentation has been automatically generated from `Import-Module "ChocoCCM" -Force; Get-Help Get-CCMGroupMember -Full`.

