---
Order: 50
xref: ccm-administration-settings-retention
Title: Retention Settings
Description: Information about using retention settings within the Administration Settings screen
RedirectFrom:
  - en-us/central-management/usage/website/administration/settings/audit-retention
  - en-us/central-management/usage/website/administration/settings/stale-computer-deletion
---

Chocolatey Central Management has a number of settings that allow you to adjust various retention periods. By default, only the Audit Retention policy is enabled.

If you want to change these settings, follow these steps:

1. Open the CCM Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left hand menu click on `Administration` and then `Settings`.
1. Click on the `Retention` tab
1. Modify the settings as required
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

## Audit Retention

> :choco-warning: **WARNING**
>
> **BREAKING CHANGE**
>
> This feature was added, as a breaking change, in version 0.6.0 of Chocolatey Central Management.  Audit Retention is enabled by default, and will immediately start truncating the audit log table as soon as it is installed.
> If you require to keep all audit logs, we would recommend that you first back up the CCM database before applying the new version.

In an attempt to control the size of the Chocolatey Central Management database, it is possible to control the retention policy for the audit logs table within the application.

By default, Audit Retention is enabled, and any logs that are older than 30 days will automatically be removed.

![Audit Retention Settings](/assets/images/ccm/setup/website/audit-retention-settings.png)

## Stale Computer Retention


> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.10.0.

In Chocolatey Central Management, a stale computer is one which hasn't reported in for a long period of time. This could be perfectly normal, but it could also be a sign that this computer is no longer active, and should be removed.  This is something that can be done manually, given the correct permissions, from the [computers page](xref:ccm-computers#removing-a-computer-from-central-management), however, enabling this setting automatically removes stale computers from Chocolatey Central Management.

By default, Stale Computer Deletion is disabled. When it is enabled, computers that haven't reported into Chocolatey Central Management within the set timeframe (the default is 365 days) will be removed.

![Stale Computer Deletion Settings](/assets/images/ccm/setup/website/stale-computer-deletion-settings.png)

## Deployment Plan Retention

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.11.0.

Chocolatey Central Management has the ability to automatically archive or delete deployments that have reached a completion state.

By default, Deployment Plan Retention is disabled for both archiving and deleting. When it is enabled, Deployment Plans that have completed beyond the set timeframe (the default is 30 days) will be archived, or deleted. If both archive and delete is enabled, the delete period will be considered the combination of the archive and the delete.


![Deployment Plan Retention Settings](/assets/images/ccm/setup/website/deployment-plan-retention-settings.png)
