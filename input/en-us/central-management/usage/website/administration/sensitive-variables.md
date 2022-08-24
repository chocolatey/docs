---
Order: 30
xref: ccm-administration-sensitive-variables
Title: Sensitive Variables
Description: Information on sensitive variables within Chocolatey Central Management
RedirectFrom: en-us/central-management/usage/website/sensitive-variables
---

Chocolatey Central Management gives you the ability to create sensitive variables for use in deployments.

The **Sensitive Variables** page can be accessed from the Administration section of Chocolatey Central Management. The page is only visible to users who have permissions to create or delete sensitive variables.

![Sensitive Variables menu entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)

## Creating a new Sensitive Variable

1. From the Chocolatey Central Management Dashboard, select `Administration` > `Sensitive Variables` from the left sidebar.

    ![Central Management dashboard, arrow pointing to Sensitive Variables menu in the left sidebar entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)
1. Select the :heavy_plus_sign: **Create new sensitive variable** button at the top of the page.

    ![CCM Sensitive Variables page, arrow pointing to Create new sensitive variable button](/assets/images/sensitive-variables/create-new-btn.png)
1. Fill in the details and click Save.

    ![Fill in Sensitive Variables information](/assets/images/sensitive-variables/fill-in-variable.png)

Alternatively, variables can also be added from an Deployment Step Advanced script by clicking the :heavy_plus_sign: in the upper right corner.

![Sensitive Variables Added from the Advanced script of a Deployment Step](/assets/images/sensitive-variables/ccm-deployment-step-add-btn.png)

## Adding Sensitive Variables to scripts

<?! Include "../../../../shared/sensitive-variables-note.txt" /?>

1. In an Advanced script of a Deployment Step, select the variable to insert from the Sensitive Variables drop down.

![Deployment Step Advanced script, showing the Sensitive Variables drop down with SERVICE_PASSWORD selected](/assets/images/sensitive-variables/add-variable-to-deployment-step.png)

## Deleting Sensitive Variables

1. From the Chocolatey Central Management Dashboard, select `Administration` > `Sensitive Variables` from the left sidebar.

    ![Central Management dashboard, arrow pointing to Sensitive Variables menu in the left sidebar entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)
1. Select :wastebasket: **Delete** beside the Sensitive Variable you wish to delete.

    ![Sensitive Variables page with arrow to a delete button](/assets/images/sensitive-variables/delete-variable.png)

## Editing / Changing Sensitive Variables

You cannot change or edit a Sensitive Variable directly. If you need to change the value a Sensitive Variable has, please [delete it](#deleting-sensitive-variables) and [create it](#creating-a-new-sensitive-variable) again.