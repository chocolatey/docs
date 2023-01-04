---
Order: 30
xref: gui-refresh
Title: Refresh
Description: Information on refreshing the current packages list
---

Chocolatey GUI, by default, will automatically check for the currently installed packages, and will fetch the first page of results when looking at remote sources, when navigating to a source when the application first loads.  However, this functionality can be configured using the [Prevent Preload](xref:prevent-preload) feature, or there can be changes to packages outside of Chocolatey GUI.  When these situations occur, you can manually refresh the current list of packages using the following button:

![Show where the refresh packages button is located within the User Interface](/assets/images/chocolatey-gui/user_interface_main-window_action_refresh-packages.png "Show where the refresh packages button is located within the User Interface")

> :choco-info: **NOTE**
>
> This button exists when looking at both local and remote sources