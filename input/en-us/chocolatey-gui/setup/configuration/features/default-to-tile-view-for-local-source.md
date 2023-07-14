---
Order: 20
xref: default-to-tile-view-for-local-source
Title: Default to Tile View for Local Source
Description: How to configure whether the tile or list view is used by default
---

By default (starting with version 0.18.0), Chocolatey GUI uses a tile view to show all of the packages that are currently installed locally on the
machine that is executing Chocolatey GUI.  As a result, you will see a screen similar to the following when first
starting the application:

![Default to Tile View for Local Source Disabled](/assets/images/chocolatey-gui/feature_default_tile_view_local_disabled.png "Default to Tile View for Local Source Disabled")

It is possible to toggle between the list view and a tile view for the packages that are installed locally using the
buttons at the top right hand corner of the application, but it you prefer to see the list view by default, then you
can enable it with this feature.  As a result, you will see something like the following when first starting the
application:

![Default to Tile View for Local Source Enabled](/assets/images/chocolatey-gui/feature_default_tile_view_local_enabled.png "Default to Tile View for Local Source Enabled")

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/LpeukOvEXEo?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'DefaultToTileViewForLocalSource'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'DefaultToTileViewForLocalSource'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'DefaultToTileViewForLocalSource'" --global

chocolateyguicli feature disable --name="'DefaultToTileViewForLocalSource'" --global
```

## Default Value

As of version 0.18.0 of Chocolatey GUI, the default value for this feature is enabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.16.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.17.0.
