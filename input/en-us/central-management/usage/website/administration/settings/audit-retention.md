---
Order: 50
xref: ccm-administration-settings-audit-retention
Title: Audit Retention
Description: Information about using up audit retention settings within the Administration Settings screen
---

> :choco-warning: **WARNING**
>
> **BREAKING CHANGE**
>
> This feature was added, as a breaking change, in version 0.6.0 of Chocolatey Central Management.  Audit Retention is enabled by default, and will immediately start truncating the audit log table as soon as it is installed.
> If you require to keep all audit logs, we would recommend that you first back up the CCM database before applying the new version.

In an attempt to control the size of the Chocolatey Central Management database, it is possible to control the retention policy for the audit logs table within the application.

By default, Audit Retention is enabled, and any logs that are older than 30 days will automatically be removed.

![Audit Retention Settings Tab](/assets/images/ccm/setup/website/audit-retention-tab.png)

If you want to change these settings, follow these steps:

1. Open the CCM Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left hand menu click on `Administration` and then `Settings`.
1. Click on the `Audit Retention` tab
1. Modify the settings as required (either disable audit retention by unchecking the checkbox, or modify the length of time that logs are retained)
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