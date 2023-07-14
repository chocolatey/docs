---
Order: 60
xref: ccm-administration-settings-stale-computer-deletion
Title: Stale Computer Deletion
Description: Information about using up stale computer deletion settings within the Administration Settings screen
---

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.10.0.

In Chocolatey Central Management, a stale computer is one which hasn't reported in for a long period of time. This could be perfectly normal, but it could also be a sign that this computer is no longer active, and should be removed.  This is something that can be done manually, given the correct permissions, from the [computers page](xref:ccm-computers#removing-a-computer-from-central-management), however, enabling this setting automatically removes stale computers from Chocolatey Central Management.

By default, Stale Computer Deletion is disabled. When it is enabled, computers that haven't reported into Chocolatey Central Management within the set timeframe (the default is 365 days) will be removed.

![Stale Computer Deletion Settings Tab](/assets/images/ccm/setup/website/stale-computer-deletion-tab.png)

If you want to change these settings, follow these steps:

1. Open the CCM Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left hand menu click on `Administration` and then `Settings`.
1. Click on the `Stale Computer Deletion` tab
1. Modify the settings as required (either enable audit retention by unchecking the checkbox, or modify the length of time that logs are retained)
1. Click the `Save All` button at the top right of the page to save your settings.

As noted in the User Interface, any modifications to this section of the settings will require the Web Application to be restarted.  This can be completed by doing the following:

1. Get direct access to the machine that is hosting the CCM Web Application
1. Open an administrative PowerShell session
1. Run the following commands:
```powershell
Get-Process -Name "ChocolateySoftware.ChocolateyManagement.Web.Mvc" -ErrorAction SilentlyContinue | Stop-Process -Force
Stop-Website -Name ChocolateyCentralManagement
Restart-WebAppPool -Name ChocolateyCentralManagement
Start-Website -Name ChocolateyCentralManagement
```