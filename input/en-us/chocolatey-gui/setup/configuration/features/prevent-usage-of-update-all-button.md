---
Order: 170
xref: prevent-usage-of-update-all-button
Title: Prevent usage of Update All button
Description: Allows control over whether the Update All button should be available or not
---

Chocolatey GUI has always had the ability to run the equivalent of the `choco upgrade all` command, via the [Update All button](xref:gui-update-all).  However, there are times when you want to provide finer grain control of what packages are being updated at any given time.  As such, this feature allowing removal of the Update All button from the Chocolatey GUI user interface.

By default, the Update All button will be shown:

![Show the update all button in the Chocolatey GUI UI](/assets/images/chocolatey-gui/user_interface_main-window_action_update-all_2.png "Show the update all button in the Chocolatey GUI UI")

however, once this feature is enabled, it will no longer be shown

![Show the update all button removed in the Chocolatey GUI UI](/assets/images/chocolatey-gui/user_interface_main-window_update-all-removed.png "Show the update all button removed in the Chocolatey GUI UI")

<?! Include "../../../../../shared/require-chocolatey-gui-licensed-extension-note.txt" /?>

<?! Include "../../../../../shared/restart-required-warning.txt" /?>

## Resources

Below is a short video which shows this feature in action:

> :choco-info: **NOTE**
>
> Coming soon

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'PreventUsageOfUpdateAllButton'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'PreventUsageOfUpdateAllButton'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'PreventUsageOfUpdateAllButton'" --global

chocolateyguicli feature disable --name="'PreventUsageOfUpdateAllButton'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.19.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI v0.19.0.