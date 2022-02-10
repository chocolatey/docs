---
Order: 30
xref: gui-remote-source
Title: Remote Source
Description: Information about displaying available packages from remote sources
---

Any [Chocolatey source](xref:gui-sources) that is configured will show as a remote source in the Chocolatey GUI [main window](xref:gui-main-window).  When selected, either directly through the user interface, or via a [keyboard shortcut](xref:use-keyboard-bindings), the available packages from that source will be fetched, and shown.

It is the visual equivalent of running the `choco list --source https://community.chocolatey.org` command, and paging the results that are displayed.

There are various features that can be used to configure how remote sources work, including:

- [Exclude Install Packages](xref:exclude-installed-packages)
- [Prevent Preload](xref:prevent-preload)
- [Show Aggregated Source View](xref:show-aggregated-source-view)

![Remote Source showing packages from the Chocolatey Community Repository](/assets/images/chocolatey-gui/feature_default_tile_view_remote_enabled.png "Remote Source showing packages from the Chocolatey Community Repository")

It is possible to show this view in both tile and list format, and this can be controlled through the [toggle switch](xref:gui-tileview), or
by setting the [Default to Tile View for Local Source](xref:default-to-tile-view-for-remote-source) feature to the required setting.

From any remote source view, either by navigating to the [package details page](xref:gui-package-details), or by activating the context menu for the
required package, it is possible to perform one of the [available actions](xref:gui-package-details-actions) for a package.

All remote sources can be turned off using the [Hide All Remote Chocolatey Sources](xref:hide-all-remote-chocolatey-sources) feature.  **NOTE:** This is a commercial feature that requires the use of the [Chocolatey GUI Licensed Extension](xref:chocolatey-gui-licensed-extension).