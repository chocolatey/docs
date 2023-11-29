---
Order: 50
xref: ccm-software
Title: Software
Description: Information on software within CCM
RedirectFrom:
  - docs/central-management-software
  - en-us/central-management/usage/software
---

Chocolatey Central Management gives you direct visibility into the software packages in use in your organization, making it easy to see which machines are out of date and may need packages updated.
Software packages can be viewed in the context of the organisation as a whole, or in the context of an individual computer.

The main **Software** page can be accessed from the Central Management dashboard via the menu entry in the left-hand sidebar.

![Software menu entry on the CCM dashboard](/assets/images/software/ccm-software-nav.png)

## Main Page

The Software main page lists all installed software in any computers that have checked in to Central Management, including version information and whether the package is outdated (has a newer version available).

![Software main page](/assets/images/software/ccm-software-main.png)

## Upgrade Individual Software

In the leftmost column of the Software table you will find an :gear: **Actions** menu which will display an **Upgrade** option on outdated Software.

![Finding the Upgrade menu entry for a specific Software entry](/assets/images/software/ccm-software-upgrade-menu.png)

Clicking this option will create a New Deployment Plan. This Deployment Plan will create one Deployment Step with a [Temporary Group](xref:ccm-groups#temporary-groups) that contains all the Computers the outdated Software is currently installed on.

![Automatically created Deployment Plan showing Temporary Group](/assets/images/software/ccm-software-temporary-group.png)

From here, the Deployment Plan can be edited and deployed as outlined in the [Deployment Plans documentation](xref:ccm-deployments).

## Uninstall Individual Software

In the leftmost column of the Software table you will find an :gear: **Actions** menu which will display an **Uninstall** option.

![Finding the Upgrade menu entry for a specific Software entry](/assets/images/software/ccm-software-uninstall-menu.png)

Clicking this option will create a New Deployment Plan. This Deployment Plan will create one Deployment Step with a [Temporary Group](xref:ccm-groups#temporary-groups) that contains all the Computers the Software is currently installed on.

![Automatically created Deployment Plan showing Temporary Group](/assets/images/software/ccm-software-temporary-group.png)

From here, the Deployment Plan can be edited and deployed as outlined in the [Deployment Plans documentation](xref:ccm-deployments).

## Upgrade All Software

From the Software main page, click the **Create New Deployment Plan** button and select the **Upgrade Outdated Software** option.

![Button to upgrade all outdated Software from the Software main page](/assets/images/software/ccm-software-upgrade-all-software.png)

Clicking this option will create a New Deployment Plan. This Deployment Plan will contain one Deployment Step per outdated piece of Software.  

![Automatically created Deployment Plan showing a Deployment Step for each piece of Software](/assets/images/software/ccm-software-upgrade-all-steps.png)

Each Deployment Step will create a [Temporary Group](xref:ccm-groups#temporary-groups) that contains all the Computers the Software is currently installed on.

![Automatically created Deployment Plan showing Temporary Group](/assets/images/software/ccm-software-upgrade-all-temporary-group.png)

From here, the Deployment Plan can be edited and deployed as outlined in the [Deployment Plan documentation](xref:ccm-deployments).

## Software Details

In the leftmost column of the Software table you will find an :gear: **Actions** menu which will display a **Details** option.
Clicking this option will take you to the **Software Details** page.

![Finding the Details menu entry for a specific Software entry](/assets/images/software/ccm-software-details-menu.png)

On the _Software Details_ page, you'll find a searchable list of all computers that currently have the package installed, as well as a more verbose view of the package information.

![Software Details page](/assets/images/software/ccm-software-details-page.png)

### Upgrade Individual Software

From the Software Details page of an outdated Software in Chocolatey Central Management, click the **Create New Deployment Plan** button and select the **Upgrade Software** option.

![Button to upgrade individual Software on a Computer from the Software Details page](/assets/images/software/ccm-software-details-upgrade-software.png)

Clicking this option will create a New Deployment Plan. This Deployment Plan will create one Deployment Step with a [Temporary Group](xref:ccm-groups#temporary-groups) that contains all the Computers the Software is currently installed on.

![Automatically created Deployment Plan showing Temporary Group](/assets/images/software/ccm-software-temporary-group.png)

From here, the Deployment Plan can be edited and deployed as outlined in the [Deployment Plan documentation](xref:ccm-deployments).

### Uninstall Individual Software

From the Software Details in Chocolatey Central Management, click the **Create New Deployment Plan** button and select the **Uninstall Software** option.

![Button to uninstall individual outdated Software on a Computer from the Software Details page](/assets/images/software/ccm-software-details-uninstall-software.png)

Clicking this option will create a New Deployment Plan. This Deployment Plan will create one Deployment Step with a [Temporary Group](xref:ccm-groups#temporary-groups) that contains all the Computers the Software is currently installed on.

![Automatically created Deployment Plan showing Temporary Group](/assets/images/software/ccm-software-temporary-group.png)

From here, the Deployment Plan can be edited and deployed as outlined in the [Deployment Plan documentation](xref:ccm-deployments).

## Related Topics

* [Central Management - Computers](xref:ccm-computers)
* [Central Management - Reports](xref:ccm-reports)

[Chocolatey Central Management](xref:central-management)
