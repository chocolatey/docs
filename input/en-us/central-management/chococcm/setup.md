---
Order: 20
xref: chococcm-setup
Title: Setup
Description: How to setup the ChocoCCM PowerShell Module
---

> :choco-info: **NOTE**
>
> The ChocoCCM PowerShell Module requires an installation of at least CCM v0.4.0 in order to be fully compatible.

## Installation

To install the ChocoCCM PowerShell Module from the [PowerShell Gallery](https://www.powershellgallery.com/packages/ChocoCCM) use the following command:

```powershell
Install-Module -Name ChocoCCM
```

## Upgrade

To upgrade to a newer version, when available from the [PowerShell Gallery](https://www.powershellgallery.com/packages/ChocoCCM), run the following command:

```powershell
Update-Module -Name ChocoCCM
```

## Available Functions

Have a look at the [complete](xref:chococcm-functions) list of all available functions included within the ChocoCCM module.

Or you can run the following command:

```powershell
Get-Command -Module ChocoCCM
```