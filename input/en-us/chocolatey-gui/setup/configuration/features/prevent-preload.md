---
Order: 50
xref: prevent-preload
Title: Prevent Preload
Description: Allows control over whether packages are immediately fetched when navigating to a remote source view
---

By default, when navigating to a remote source (for example the Chocolatey Community Repository), Chocolatey GUI will fetch and display the first page of packages that can be installed.  Depending on your use of Chocolatey GUI, you may want to immediately search for packages, rather than install from the first page of packages.  If you enable the Prevent Preload feature, than the first pages of packages will not be fetched, and instead, you will be able to immediately search for a package that you want to install.

When enabled, you will see the following when navigating to a remote source:

![Prevent Preload is enabled, showing the ability to immediately search for packages](/assets/images/chocolatey-gui/feature_prevent_preload.png "Prevent Preload is enabled, showing the ability to immediately search for packages")

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/lwhn9E3_Mu4?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'PreventPreload'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'PreventPreload'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'PreventPreload'" --global

chocolateyguicli feature disable --name="'PreventPreload'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.18.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.18.0.
