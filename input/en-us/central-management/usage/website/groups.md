---
Order: 30
xref: ccm-groups
Title: Groups
Description: Information on groups within Chocolatey Central Management
RedirectFrom:
  - docs/central-management-groups
   en-us/central-management/usage/groups
---

Groups are the basis on which a given [Deployment Plan](xref:ccm-deployments) operates.
A Group may contain one or more Computers, and/or other Groups.
Currently, Groups are entirely self-contained, and cannot be directly mapped from Active Directory Groups.

The **Groups** page can be accessed from the left-hand navigation menu by selecting the **Groups** menu item.
If you do not see this menu entry, verify with your administrator whether yourhas the `View Groups` role assigned.

![Groups menu entry on the Chocolatey Central Management Dashboard](/assets/images/groups/ccm-groups-menu.png)

## The All Computers (Automatic Group)

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.11.0.

All Computers present in Chocolatey Central Management are automatically added to a System Managed Group named `All Computers (Automatic Group)`. This Group can not be edited or deleted.

![The All Computers (Automatic Group) on the Groups page with an arrow pointing to the Group in the table](/assets/images/groups/ccm-groups-automatic-group-table-entry.png)

The `All Computers (Automatic Group)` will have a blue lock icon next to the name in the table. Hovering over this lock icon will display a tooltip with more information.

![The All Computers (Automatic Group) on the Groups page with an arrow pointing to the tooltip containing additional information stating, "All computers are added to this Group automatically and are system managed. This Group can not be edited or deleted.".](/assets/images/groups/ccm-groups-automatic-group-tooltip.png)

## Temporary Groups

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.12.0.  

A Temporary Group is a Group that has been created for one or more specific circumstance, for instance as part of creating an Automatic Deployment Plan.
These Groups are normally not viewable from anywhere, other than the Deployment Plans where they are being used, and will be cleaned up on an interval when they are no longer needed.

A Temporary Group can also not be Edited, Deleted, or Duplicated manually by a user. As well, no other Group can have such a Group as a Sub-Group.

## Creating a Group

On the main Groups page, select the **+ Create New Group** button.

![Create New Group button on the Groups page](/assets/images/groups/ccm-groups-new.png)

Fill in a Name for the Group and (optionally) a Description in the appropriate fields in the _Create New Group_ modal.
Then, select the Computer(s) or existing Group(s) you would like to include in the new Group and click the **>** button in the _Available Groups/Computers_ column to add the selected items, or click the **>>** button to add all available Groups and Computers into the new Group.

![New Group Modal](/assets/images/groups/ccm-groups-modal-new.png)

Click :floppy_disk: **Save** to close the modal and create the new Group.

## Editing a Group

> :choco-info: **NOTE**
>
> If you do not see the **Edit** menu entry or the :gear: **Actions** buttons, consult your administrator to determine if you have the Edit Groups role assigned.

On the main Groups page, find the Group you want to edit.
You can enter a search term in the text field to filter results by typing in part of their Name or Description and clicking the :mag: button.
Select the :gear: **Actions** button on the left-hand side of the Group, and then select **Edit** to open the _Edit Group_ modal.

![Edit menu entry in Group actions flyout menu](/assets/images/groups/ccm-groups-edit.png)

From the **Edit Group** modal, you can modify the Group name and description, and modify members by adding or removing Groups and/or Computers.

## Deleting a Group

> :choco-info: **NOTE**
>
> If you do not see the **Delete** menu entry or the :gear: **Actions** buttons, consult your administrator to determine if you have the appropriate role assigned to your account.

On the main Groups page, find the Group you want to edit.
You can enter a search term in the text field to filter results by typing in part of their Name or Description and clicking the :mag: button.
Similar to the [Edit Group](#editing-a-group) action, select the :gear: **Actions** button on the left-hand side of the Group, and instead select **Delete**.
You will be prompted to confirm the deletion.

## Viewing a Group's Details

On the main Groups page, find the group you want to view.
You can enter a search term in the text field to filter results by typing in part of their Name or Description and clicking the :mag: button.
Select the :gear: **Actions** button on the left-hand side of the group, and select **Details**.

![Details menu entry in Group actions flyout menu](/assets/images/groups/ccm-groups-details.png)

On the Group Details page, you'll find a searchable list of all Computers and Groups that are in the Group, as well as a more detailed view of the Group information.  

![Group Details screen showing the Computers and Groups that are currently in the Group](/assets/images/groups/ccm-groups-details-screen.png)

## Eligibility for Deployments

The Create / Edit Group modals display Groups or Computers that are ineligible for Deployment Steps in either red or orange, depending on the reason for their ineligibility.
**All** Groups and Computers in a given Group must have their eligibility clear in order for that Group to be used as part of a Deployment Step.
If a Deployment Step is targeting ineligible Groups, the Deployment Plan cannot be started until the eligibility status(es) of the affected Computers has been resolved.

![Group eligibility legend](/assets/images/groups/ccm-groups-eligibility.png)

## FAQ

### Why do I see some machines have not opted in for Deployments?

If you are on the Groups screen, you may notice that some machines show up highlighted with a coloring, and one of those colorings is an orange - the legend below it mentions "Not Opted In For Deployments (Configuration)".

![Group eligibility legend](/assets/images/groups/ccm-groups-eligibility.png)

As you can see from the text, it is meant to help you figure out the issue:

> The Computer has not opted in, or a Group contains Computers that have not opted in, for deployments by configuration. Please ensure the Computer has at least Chocolatey Agent v0.10.0+ installed and the feature `useChocolateyCentralManagementDeployments` has been set to enabled on the client Computer.

This is telling you that you need to ensure you set the client to allow for the use of Deployments. As it is a security consideration, it requires an explicit opt-in on client machines. See [Client Setup - Features](xref:ccm-client#features) for details on how to set it.

### I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?

Once you upgrade to at least CCM v0.2.0, every machine will show that until they check in the next time. Once they check in, that will go away. So it's basically normal to see that until those machines check in again.

## Common Errors and Resolutions

### A Computer or Group is not showing as available for deployments, but I have plenty of available licenses

Once you upgrade to Central Management v0.3.0+, you have upgraded the Agent on the machine to v0.11.0+, and it has successfully completed a check in, then that messaging should go away. Note that clients do not get a message back that there was a failure as a security feature - you'll need to consult the Central Management Service logs. You can find that at `$env:ChocolateyInstall\logs\ccm-service.log`, or if you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

## Related Topics

* [Chocolatey Central Management](xref:central-management)
* [Central Management - Deployments](xref:ccm-deployments)
* [Central Management - Computers](xref:ccm-computers)
