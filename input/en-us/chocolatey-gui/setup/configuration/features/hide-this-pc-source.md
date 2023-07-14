---
Order: 160
xref: hide-this-pc-source
Title: Hide This PC Source
Description: Allow control over whether Chocolatey GUI should show the local This PC source or not
---

There are times when you want to simplify the usage of Chocolatey GUI for your end users, and only show the sources where packages can be installed from, rather than including a source which lists all of the currently installed packages.  When this feature is enabled, Chocolatey GUI would change from showing the following:

![Hide This PC Source Disabled](/assets/images/chocolatey-gui/feature_hide_this_pc_source_disabled.png "Hide This PC Source Disabled")

to only showing the available remote sources which are currently configured on the system:

![Hide This PC Source Enabled](/assets/images/chocolatey-gui/feature_hide_this_pc_source_enabled.png "Hide This PC Source Enabled")

Notice that the "This PC" source is no longer available.

<?! Include "../../../../../shared/require-chocolatey-gui-licensed-extension-note.txt" /?>

<?! Include "../../../../../shared/restart-required-warning.txt" /?>

<?! Include "../../../../../shared/hiding-sources.txt" /?>

## Resources

Below is a short video which shows this feature in action:

> :choco-info: **NOTE**
>
> Coming soon

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'HideThisPCSource'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'HideThisPCSource'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'HideThisPCSource'" --global

chocolateyguicli feature disable --name="'HideThisPCSource'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.19.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI v0.19.0.