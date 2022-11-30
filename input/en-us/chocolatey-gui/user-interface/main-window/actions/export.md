---
Order: 50
xref: gui-export
Title: Export
Description: Information about exporting the currently installed packages
---

Chocolatey GUI provides the ability to export all the currently installed packages (including the version number) from the current machine.  This information is exported into a *.config file, which can then be used to install all packages again, on another machine.

For example, lets imagine that you wanted to completely reset your current machine, and re-install the operating system.  You could use the export button to exported all the currently installed packages, then store the generated file somewhere safe, re-install the operating system, and then get back to the exact same place as you are now with the list of packages.

The following screenshot illustrates where the Export button is located:

![Show where the Export button is located within the User Interface](/assets/images/chocolatey-gui/user_interface_main-window_action_export_1.png "Show where the Export button is located within the User Interface")

Once pushed, you will be prompted for the file name that you would like to use, and where you want the file saved:

![Show the save file dialog that is opened when the Export button is clicked](/assets/images/chocolatey-gui/user_interface_main-window_action_export_2.png "Show the save file dialog that is opened when the Export button is clicked")

Once it is complete, you will have a file that looks like the following:

![Show the contents of the file that is generated when the Export operation is completed](/assets/images/chocolatey-gui/user_interface_main-window_action_export_3.png "Show the contents of the file that is generated when the Export operation is completed")

It would then be possible to take this file onto another machine and then run the following choco command to re-install all the packages again:

```powershell
choco install <path-to-exported-file>
```

> :choco-info: **NOTE**
>
> This button only exists when browsing the local source, i.e. `This PC`