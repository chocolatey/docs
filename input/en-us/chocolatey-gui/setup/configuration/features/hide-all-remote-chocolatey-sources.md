---
Order: 140
xref: hide-all-remote-chocolatey-sources
Title: Hide All Remote Chocolatey Sources
Description: Allow control over whether Chocolatey GUI should be switched into a read-only mode of operation
---

There are times when you want to use Chocolatey GUI in a read-only mode, meaning that you can view what packages are currently installed, but to not allow access to install any other packages.  When this is enabled, Chocolatey GUI would change from showing the following:

![What Chocolatey GUI looks like before enabling the HideAllRemoteChocolateySources feature](/assets/images/chocolatey-gui/feature_hide_all_remote_chocolatey_sources_1.png "What Chocolatey GUI looks like before enabling the HideAllRemoteChocolateySources feature")

to only showing a single "This PC" source:

![What Chocolatey GUI looks like after enabling the HideAllRemoteChocolateySources feature](/assets/images/chocolatey-gui/feature_hide_all_remote_chocolatey_sources_2.png "What Chocolatey GUI looks like after enabling the HideAllRemoteChocolateySources feature")

Notice that the `ChocolateyInternal` and `chocolatey.licensed` sources are no longer displayed.

<?! Include "../../../../../shared/require-chocolatey-gui-licensed-extension-note.txt" /?>

<?! Include "../../../../../shared/restart-required-warning.txt" /?>

<?! Include "../../../../../shared/hiding-sources.txt" /?>

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/Ix_f_DB9SSY?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'HideAllRemoteChocolateySources'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'HideAllRemoteChocolateySources'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'HideAllRemoteChocolateySources'" --global

chocolateyguicli feature disable --name="'HideAllRemoteChocolateySources'" --global
```

## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.18.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.18.0.
