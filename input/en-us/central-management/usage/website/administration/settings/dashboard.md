---
Order: 13
xref: ccm-administration-settings-dashboard
Title: Dashboard
Description: Information about setting Dashboard settings within the Administration Settings screen
---

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.12.0.

On the [Chocolatey Central Management Dashboard](xref:ccm-dashboard) there is a count of the `Total Stale Computers`. This is defined as `the total number of Computers that haven't reported into Chocolatey Central Management in the last 180 days.`.  Here 180 is the default value, but you can change this by using the following steps:

1. Open the Chocolatey Central Management Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left-hand menu click on `Administration` and then `Settings`.
1. Click on the `Dashboard` tab in the `Settings` screen.

    ![Chocolatey Central Management Dashboard Settings](/assets/images/ccm/administration/settings/dashboard.png)

1. Adjust the `Amount of time, in Days, before being notified of Computers not reporting in`.
1. Click the `Save All` button to save changes.

> :choco-info: **NOTE**
>
> When the [Stale Computer Retention Policy](xref:ccm-administration-settings-retention#stale-computer-retention) is enabled, it is not possible to set the `Amount of time, in Days, before being notified of Computers not reporting in` for the Dashboard to a number that is lower than what is currently configured for the `Amount of time, in Days, to keep stale Computers before deleting` setting, and vice versa.  If this is attempted, a validation warning will be shown
>
> ![Chocolatey Central Management Dashboard Settings Validation Error](/assets/images/ccm/administration/settings/dashboard-validation-error.png)

> :choco-info: **NOTE**
>
> When upgrading to Chocolatey Central Management 0.12.0, if the [Stale Computer Retention Policy](xref:ccm-administration-settings-retention#stale-computer-retention) is enabled, if the current value for `Amount of time, in Days, to keep stale Computers before deleting` is less than the default value for `Amount of time, in Days, before being notified of Computers not reporting in`, a change will be made to the default value to make it half of the configured value for `Amount of time, in Days, to keep stale Computers before deleting`.