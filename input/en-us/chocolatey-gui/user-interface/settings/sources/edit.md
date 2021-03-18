---
Order: 20
xref: gui-edit-source
Title: Edit Source
Description: Information on how to edit a source using Chocolatey GUI
---

To edit an existing source through Chocolatey GUI simply click on the source in the `Sources` section.  The details of this source will then be populated in the lower half of the screen, and all of these fields can then be edited:

- Id
- Source
- Username
- Certificate
- Priority
- Is Disabled
- Is Self Service
- Is Proxy Bypassed
- Visible to Admins Only

![Showing the user interface when editing an existing source](/assets/images/chocolatey-gui/user_interface_settings_sources_edit_1.png "Showing the user interface when editing an existing source")

Update all these details, and once completed, click the `SAVE` button.  The updated source will then refresh in the Sources section at the top of the screen.

> :memo: **NOTE**
>
> If attempting to edit the built-in `chocolatey.licensed` source, only certain fields are allowed to be modified, and this will be reflected within the user interface
>
> ![Showing the user interface when attempting to edit chocolatey.licensed source](/assets/images/chocolatey-gui/user_interface_settings_sources_edit_2.png "Showing the user interface when attempting to edit chocolatey.licensed source")