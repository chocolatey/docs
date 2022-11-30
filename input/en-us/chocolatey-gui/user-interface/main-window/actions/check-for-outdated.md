---
Order: 20
xref: check-for-outdated
Title: Check for outdated packages
Description: Information on checking for outdated packages
---

Chocolatey GUI, by default, will check for installed packages that are currently outdated (based on available sources) when the application first loads.  However, this can be turned of using the [Prevent Automated Outdated Packages Check](xref:prevent-automated-outdated-packages-check) feature, or there can be changes to packages outside of Chocolatey GUI.  When these situations occur, you can manually invoke the check for outdated packages using the following button:

![Show where the check for outdated packages button is located within the User Interface](/assets/images/chocolatey-gui/user_interface_main-window_action_check-for-outdated.png "Show where the check for outdated packages button is located within the User Interface")

> :choco-info: **NOTE**
>
> This button exists when looking at both local and remote sources