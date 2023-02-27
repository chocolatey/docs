---
Order: 70
xref: chocolateygui-known-issues
Title: Known Issues
Description: Current known issues regarding Chocolatey GUI
RedirectFrom: docs/chocolatey-gui-known-issues
---

## Package installation arguments are not remembered when upgrading a package with ChocolateyGUI

When the `useRememberedArgumentsForUpgrades` Chocolatey feature is enabled, package arguments are not correctly retained when upgrading packages.

This is due to [a known bug in chocolatey.lib](https://github.com/chocolatey/choco/issues/2886).

If you need to use this feature, you must currently upgrade affected packages via Chocolatey CLI instead of Chocolatey GUI.

## Chocolatey GUI asking for credentials for my non-administrator accounts

If a user is a member of the Built-in AD group `Network Configuration Operators`, then that means they have an elevation token available and will be treated in the same way as administrative accounts. To fix this, you have two options:

* Remove the users from `Network Configuration Operators` - PowerShell offers an alternative to `ipconfig /flushdns` that does not require admin permissions - `Clear-DnsClientCache`.
* OR change the ChocolateyGui.exe.manifest file in v0.17.0+ in the Chocolatey GUI folder under Program Files to `<requestedExecutionLevel level="asInvoker" uiAccess="false" />` (from `highestAvailable`).

Please see the following [GitHub Issue](https://github.com/chocolatey/ChocolateyGUI/issues/629) for more details.

## Pin command does not work when running with Background Mode enabled

In the current versions of Chocolatey CLI (v0.11.1) and Chocolatey GUI (v0.19.0), when attempting to pin a package using the Chocolatey CLI (choco.exe) with Background Mode enabled, things will work as expected.  i.e. when running: `choco pin add --name="procmon"`.

The procmon package will be correctly pinned.

However, if you attempt the same operation via Chocolatey GUI, using the "Pin (Ignore Updates)" context menu, you will get an error stating:

> Failed to pin package
>
> Exception: System.NullReferenceException: Object reference not set to an instance of an object

This was fixed as part of a feature addition within [Chocolatey GUI Licensed Extension V 0.2.0](xref:chocolatey-gui-licensed-extension-release-notes#march-9-2021).

## chocolateyguicli Command Not Registered by System

If you recieve an error in the shell stating `chocolateyguicli is not registered` or `ObjectNotFound`, please go through the following steps.

1. Reinstall the `chococlateygui` package. `choco upgrade chocolateygui -y --force`

1. If step 1 did not fix the issue, please check that your antivirus software is not blocking the Chocolatey GUI Config from being written to. The Chocolatey GUI Config file can be located at `C:\ProgramData\Chocolatey GUI\Config\Data.db`.

1. If further assistance is needed please reach out via your support means. Listed by running `choco support`. If running Chocolatey OSS please reach out via Discord.
