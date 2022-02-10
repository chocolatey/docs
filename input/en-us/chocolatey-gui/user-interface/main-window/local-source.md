---
Order: 20
xref: gui-local-source
Title: Local Source
Description: Information about displaying of locally installed packages
---

The "This PC" source, also known as a local source, is the first source that is shown by default when Chocolatey GUI first
opens, and it shows all the currently installed Chocolatey packages.  It is the visual equivalent of running the `choco
list -lo` command, and paging the results that are displayed.

![The This PC Source showing currently installed Chocolatey packages](/assets/images/chocolatey-gui/feature_hide_this_pc_source_disabled.png "The This PC Source showing currently installed Chocolatey packages")

It is possible to show this view in both tile and list format, and this can be controlled through the [toggle switch](xref:gui-tileview), or
by setting the [Default to Tile View for Local Source](xref:default-to-tile-view-for-local-source) feature to the required setting.

In addition, you may want to use the [Prevent Automated Outdated Packages Check](xref:prevent-automated-outdated-packages-check) feature, to prevent Chocolatey GUI calculating what packages are outdated each time Chocolatey GUI opens. It is possible to directly trigger this check using the [Check For Outdated](xref:check-for-outdated) action.

From the local source view, either by navigating to the [package details page](xref:gui-package-details), or by activating the context menu for the
required package, it is possible to perform one of the [available actions](xref:gui-package-details-actions) for a package.

The local source view can be turned off using the [Hide This PC Source](xref:hide-this-pc-source) feature.  **NOTE:** This is a commercial feature that requires the use of the [Chocolatey GUI Licensed Extension](xref:chocolatey-gui-licensed-extension).