---
Order: 60
xref: prevent-automated-outdated-packages-check
Title: Prevent Automated Outdated Packages Check
Description: Allows control over whether Chocolatey GUI will automatically check for outdated packages installed locally
---

By default, when the Chocolatey GUI application starts up it will immediately check to see what packages are outdated, so that this information can be displayed within the application.  When this check is happening, you will see the following progress bar being shown:

![Showing the outdated packages check in action](/assets/images/chocolatey-gui/feature_prevent_automated_outdated_packages_check_1.png "Showing the outdated packages check in action")

Depending on the number of packages that you currently have installed, and the number of sources that you have configured, this check can take a long time.  If you are not interested in having this check happen automatically, you can enable the PreventAutomatedOutdatedPackagesCheck feature.

Once enabled, if you want to manually check the outdated status of packages that you have installed, you can still trigger this check using this button:

![Showing where the manual check for outdated packages is located](/assets/images/chocolatey-gui/feature_prevent_automated_outdated_packages_check_2.png "Showing where the manual check for outdated packages is located")

In addition, Chocolatey GUI does cache the information about which packages are outdated.  The length of time that this information is cached can be controlled via the [OutdatedPackagesCacheDurationInMinutes](xref:outdated-packages-cache-duration-in-minutes) option.

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/PnFWc5p5I6E?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'PreventAutomatedOutdatedPackagesCheck'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'PreventAutomatedOutdatedPackagesCheck'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'PreventAutomatedOutdatedPackagesCheck'" --global

chocolateyguicli feature disable --name="'PreventAutomatedOutdatedPackagesCheck'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.18.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.18.0.
