---
Order: 150
xref: default-to-dark-mode
Title: Default To Dark Mode
Description: Allows control over whether dark mode should be used by default or not.
---

By default, Chocolatey GUI uses a light mode for all of its user interface.  As a result, you will see a screen similar to the following when first starting the application:

![Default to Dark Mode Disabled](/assets/images/chocolatey-gui/feature_default_to_dark_mode_disabled.png "Default to Dark Mode Disabled")

It is possible to toggle between a light and dark mode for the application using the buttons at the top right hand corner of the application, but if you prefer to see the dark mode by default, then you can enable it with this feature.  As a result, you will see something like the following when first starting the application:

![Default to Dark Mode Enabled](/assets/images/chocolatey-gui/feature_default_to_dark_mode_enabled.png "Default to Dark Mode Enabled")

## Resources

Below is a short video which shows this feature in action:

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'DefaultToDarkMode'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'DefaultToDarkMode'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'DefaultToDarkMode'" --global

chocolateyguicli feature disable --name="'DefaultToDarkMode'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.18.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.18.0.
