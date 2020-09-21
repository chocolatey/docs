# Chocolatey Central Management - Groups

Central Management's Groups are the basis on which a given [[Deployment|CentralManagementDeployments]] operates.
In Central Management, a Group may contain one or more computers and/or other groups.
Currently, Central Management's groups are entirely self-contained, and cannot be directly mapped from Active Directory groups.

The **Groups** page can be accessed from the left-hand navigation menu on your Central Management Dashboard by selecting the **Groups** menu item.
If you do not see this menu entry, verify with your administrator whether your Central Management account has the View Groups role assigned..

![Groups menu entry on the CCM Dashboard](images/groups/ccm-groups-menu.png)

<!-- TOC depthFrom:2 -->

- [Creating a Group](#creating-a-group)
- [Editing a Group](#editing-a-group)
- [Deleting a Group](#deleting-a-group)
- [Eligibility for Deployments](#eligibility-for-deployments)
- [FAQ](#faq)
  - [Why do I see some machines have not opted in for Deployments?](#why-do-i-see-some-machines-have-not-opted-in-for-deployments)
  - [I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?](#i-have-plenty-of-licenses-why-do-some-machines-show-not-opted-in-for-deployments-and-also-exceeds-your-current-license-count)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [A computer or group is not showing as available for deployments but I have plenty of available licenses](#a-computer-or-group-is-not-showing-as-available-for-deployments-but-i-have-plenty-of-available-licenses)
- [Related Topics](#related-topics)

<!-- /TOC -->

___
## Creating a Group

On the main Groups page, select the **+ Create New Group** button.

![Create New Group button on the Groups page](images/groups/ccm-groups-new.png)

Fill in a Name for the group and (optionally) a Description in the appropriate fields in the _Create New Group_ modal.
Then, select the computer(s) or existing group(s) you would like to include in the new group and click the **>** button in the _Available Groups/Computers_ column to add the selected items, or click the **>>** button to add all available groups and computers into the new group.

![New Group Modal](images/groups/ccm-groups-modal-new.png)

Click **:floppy_disk: Save** to close the modal and create the new group.

___
## Editing a Group

> :information_source: **NOTE**
>
> If you do not see the **Edit** menu entry or the **:gear: Actions** buttons, consult your administrator to determine if you have the Edit Groups role assigned.

On the main Groups page, find the group you want to edit.
You can enter a search term in the text field to filter results by typing in part of their Name or Description and clicking the :mag: button.
Select the **:gear: Actions** button on the right-hand side of the group, and then select **Edit** to open the _Edit Group_ modal.

![Edit menu entry in group actions flyout menu](images/groups/ccm-groups-edit.png)

From the **Edit Group** modal, you can modify the group name and description, and modify members by adding or removing groups and/or computers.

___
## Deleting a Group

> :information_source: **NOTE**
>
> If you do not see the **Delete** menu entry or the **:gear: Actions** buttons, consult your administrator to determine if you have the appropriate role assigned to your account.

On the main Groups page, find the group you want to edit.
You can enter a search term in the text field to filter results by typing in part of their Name or Description and clicking the :mag: button.
Similar to the [Edit Group](#editing-a-group) action, select the **:gear: Actions** button on the right-hand side of the group, and instead select **Delete**.
You will be prompted to confirm the deletion.

___
## Eligibility for Deployments

The Create / Edit Group modals display groups or computers that are ineligible for Deployments in either red or orange, depending on the reason for their ineligibility.
**All** groups and computers in a given group must have their eligibility clear in order for that group to be used as part of a Deployment.
If a Deployment is targeting ineligible groups, the deployment cannot be started until the eligibility status(es) of the affected computers has been resolved.

![Group eligibility legend](images/groups/ccm-groups-eligibility.png)

___
## FAQ
### Why do I see some machines have not opted in for Deployments?
If you are on the Groups screen, you may notice that some machines show up highlighted with a coloring, and one of those colorings is an orange - the legend below it mentions "Not Opted In For Deploymens (Configuration)".

![Group eligibility legend](images/groups/ccm-groups-eligibility.png)

As you can see from the text, it is meant to help you figure out the issue:

> The computer has not opted in or a group contains computers that have not opted in for deployments by configuration. Please ensure the computer has at least chocolatey-agent v0.10.0+ installed and the feature "useChocolateyCentralManagementDeployments" has been set to enabled on the client computer.

This is telling you that you need to ensure you set the client to allow for the the use of Deployments. As it is a security consideration, it requires an explicit opt-in on client machines. See [[Client Setup - Features |CentralManagementSetupClient#features]] for details on how to set it.

### I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?
Once you upgrade to at least CCM v0.2.0, every machine will show that until they check in the next time. Once they check in, that will go away. So it's basically normal to see that until those machines check in again.

___
## Common Errors and Resolutions
### A computer or group is not showing as available for deployments but I have plenty of available licenses
Once you upgrade to Central Management v0.3.0+, you have upgraded the Agent on the machine to v0.11.0+, and it has successfully completed a check in, then that messaging should go away. Note that clients do not get a message back that there was a failure as a security feature - you'll need to consult the Central Management Service logs. You can find that at `$env:ChocolateyInstall\logs\ccm-service.log`, or if you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.


___
## Related Topics

* [[Chocolatey Central Management|CentralManagement]]
* [[Central Management - Deployments|CentralManagementDeployments]]
* [[Central Management - Computers|CentralManagementComputers]]

___
[[Chocolatey Central Management|CentralManagement]]
