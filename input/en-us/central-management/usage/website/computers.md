---
Order: 40
xref: ccm-computers
Title: Computers
Description: Information on computers within CCM
RedirectFrom:
  - docs/central-management-computers
  - en-us/central-management/usage/computers
---

Chocolatey Central Management gives you visibility into what's installed on a given computer, as well as their last check-in to Central Management and IP Address.

The **Computers** page can be accessed from the Central Management Dashboard via the menu entry in the left-hand sidebar.

![Computers menu entry on the CCM Dashboard](/assets/images/computers/ccm-computers-nav.png)

## Registering a New Computer

Client computers (agents) will show up in Central Management automatically as long as long as these conditions are met for the client computer:

1. The `chocolatey`, `chocolatey.extension`, and `chocolatey-agent` packages are installed, alongside a valid Chocolatey for Business license.
1. The `useChocolateyCentralManagement` feature is enabled.
1. The `centralManagementServiceUrl` is set correctly in the chocolatey configuration file (typically to `https://<FQDN_to_CCM_service_host>:24020/ChocolateyManagementService`)
1. The client has access to the above URL (this may require opening the port in your firewall, etc.) so that it can resolve the SSL certificate necessary to communicate with the CCM service.

Please see [Central Management Client Setup](xref:ccm-client) for more details and setup.

## Viewing Installed Software on a Computer

> :choco-info: **NOTE**
>
> Starting with Chocolatey Central Management 0.10.0, the groups that a computer is a member of is shown in both the table of all computers, as well as on the computer details pages.  By default, this will only show the first 5 group memberships. If there are more group associations:
>
> - The computers table will display a `...` link in the Groups column. Upon hovering this link, a tooltip will be shown with all group memberships.
> - On the computer details page, a `View More` link will be shown. When clicked, this will cause an expansion to show all group memberships and the link will update to say `View Less`. Clicking this link again will show the default previous view.

From the main Computers page in Central Management, locate the computer of interest in the list or by providing a search term in the table filter.
Select the :gear: **Actions** menu in the corresponding right-hand column, and click **Details**.

![Finding a computer's details menu option](/assets/images/computers/ccm-computers-details-menu.png)

You will be presented with a list of the installed software packages for the machine, similar to below.

![Computer details screen showing installed software](/assets/images/computers/ccm-computers-details.png)

## Removing a Computer from Central Management

> :choco-info: **NOTE**
>
> Unless you first uninstall (at minimum) the `chocolatey-agent` or disable Central Management by disabling the feature setting, the deleted computer will reappear when the Chocolatey Agent performs its next check-in.

From the main Computers page in Central Management, locate the computer of interest in the list or by providing a search term in the table filter.
Select the :gear: **Actions** menu in the corresponding right-hand column, and click **Delete**.

![Deleting a computer in Central Management](/assets/images/computers/ccm-computers-delete-menu.png)

You will be prompted to confirm the deletion.

![Prompt to confirm deletion of a computer in Central Management](/assets/images/computers/ccm-computers-delete-confirm.png)


### Computers are not showing up in CCM

You need to check the CCM service logs. The agent will always report success when it communicates with the service successfully. The service may reject what it receives, but due to security settings, it won't tell the client about that.

The logs are located at `$env:ChocolateyInstall\logs\ccm-service.log`. If you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

For more common errors related to checking in, see the [setup section (and component setup sub-sections)](xref:ccm-setup) as they dive deeper into common errors and resolutions related to things such as this.

## Related Topics

* [Chocolatey Central Management](xref:central-management)
* [Central Management - Software](xref:ccm-software)
* [Central Management - Groups](xref:ccm-groups)
* [Central Management - Reports](xref:ccm-reports)
