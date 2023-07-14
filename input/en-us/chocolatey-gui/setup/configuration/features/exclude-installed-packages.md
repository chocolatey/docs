---
Order: 70
xref: exclude-installed-packages
Title: Exclude Installed Packages
Description: Do not show packages that are already installed when viewing sources
---

By default, when viewing remote sources, such as the Chocolatey Community Repository, Chocolatey GUI will show you all
available packages, even if you already have them installed.  Installed packages will be marked with a green banner,
indicating that they are currently installed.  As a result, you may see something like the following:

![Exclude Installed Packages Disabled](/assets/images/chocolatey-gui/feature_exclude_installed_packages_disabled.png "Exclude Installed Packages Disabled")

By enabling this feature, packages that are already installed will no longer be shown in the list of available packages,
as shown here:

![Exclude Installed Packages Enabled](/assets/images/chocolatey-gui/feature_exclude_installed_packages_enabled.png "Exclude Installed Packages Enabled")

> :choco-info: **NOTE**
>
> When first enabling this feature, if the remote source was already open, it will be refresh to refresh the package list before the packages will be excluded.

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/Qr8OCK3eqr4?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'ExcludeInstalledPackages'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'ExcludeInstalledPackages'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'ExcludeInstalledPackages'" --global

chocolateyguicli feature disable --name="'ExcludeInstalledPackages'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.17.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.17.0.
