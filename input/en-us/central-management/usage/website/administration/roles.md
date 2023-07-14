---
Order: 10
xref: ccm-administration-roles
Title: Roles
Description: Information about configuring roles within the Chocolatey Central Management Administration section
---

Chocolatey Central Management's roles are the basis for setting collections of permissions that can be assigned to specific users within Chocolatey Central Management.

Roles can be accessed by going to Administration on the left-hand navigation and selecting roles.

![Roles menu entry on the CCM Dashboard](/assets/images/ccm/roles/ccm-roles-menu.png)

## Creating a Role

On the main roles page, select the **+ Create New Role** button.

![Create New Role button on the Roles page](/assets/images/ccm/roles/ccm-roles-new.png)

You will then be presented with the Role properties window where you can enter the name for the new role. You also have the option to make your new role the Default which will be added to all new users by default.

![Creating New Role Setting Role Properties](/assets/images/ccm/roles/ccm-roles-set-properties.png)

Next you'll want to click over to Permissions. This window will allow you to select what specific permissions you wish to give your new role.

![Creating New Role Setting Permissions](/assets/images/ccm/roles/ccm-roles-set-permissions.png)

Click :floppy_disk: **Save** to close the window and create the new role.

## Editing a Role

> :choco-info: **NOTE**
>
> If you do not see the **Edit** menu entry or the :gear: **Actions** buttons, please see your Administrator to determine if your account has the _Edit Roles_ permission.

On the main Roles page, find the role you want to edit.
You can also use _Select Permissions (0)_ to filter the Roles listed based on them having the permissions you select.

Select the :gear: **Actions** button on the left-hand side of the role, and then select **Edit** to open the _Edit Group_ window.

![Edit menu entry in role actions flyout menu](/assets/images/ccm/roles/ccm-roles-edit.png)

From the **Edit Role** window, you can modify the name, set it to be the Default role, and edit its permissions.

## Deleting a Role

> :choco-info: **NOTE**
>
> If you do not see the **Delete** menu entry or the :gear: **Actions** buttons, please see your Administrator to determine if your account has the _Edit Roles_ permissions.
>
> Roles labelled **Static** cannot be deleted.
>
> You cannot delete a Role if the account you are using also has the Role assigned to it.

On the main Roles page, find the role you want to delete. You can also use _Select Permissions (0)_ to filter the roles listed based on permission. Similar to the [Edit Role](#editing-a-role) action, select the :gear: **Actions** button on the left-hand side of the role, and select **Delete**. You will be prompted to confirm the deletion.

## Pre-Configured Roles

When first browsing to the Roles page, you'll be presented with 5 pre-configured roles that are built-in to Chocolatey Central Management.

![Pre-configured roles in CCM Dashboard](/assets/images/ccm/roles/ccm-roles-preconfiguredroles.png)

These pre-configured roles are labeled **Static** and cannot be deleted. They can however be edited by name, default role selection, and permissions.

We recommend you review the permissions these roles have. Then edit them, if needed, to work within your environment.

## Related Topics

* [Chocolatey Central Management](xref:central-management)
* [Chocolatey Central Management - Deployments](xref:ccm-deployments)
* [Chocolatey Central Management - Reports](xref:ccm-reports)
