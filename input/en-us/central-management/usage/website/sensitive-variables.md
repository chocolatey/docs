---
Order: 60
xref: ccm-sensitive-variables
Title: Sensitive Variables
Description: Information on sensitive variables within CCM
---

Chocolatey Central Management gives you the ability to create sensitive variables for use in deployments.

The **Sensitive Variables** page can be accessed from the Central Management Dashboard via the menu entry in the left-hand sidebar, in the Administration section. This page is only visible to users who have permissions to create or delete sensitive variables (CCM Admins, by default).

![Sensitive Variables menu entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)

## Creating a new Sensitive Variable

1. From the Central Management dashboard, select `Administration` > `Sensitive Variables` from the left sidebar.

    ![Central Management dashboard, arrow pointing to Sensitive Variables menu in the left sidebar entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)
1. Select the :heavy_plus_sign: **Create new sensitive variable** button at the top of the page.

    ![CCM Sensitive Variables page, arrow pointing to Create new sensitive variable button](/assets/images/sensitive-variables/create-new-btn.png)
1. Fill in the details and click Save.

    ![Fill in Sensitive Variables information](/assets/images/sensitive-variables/fill-in-variable.png)

Alternatively, Variables can also be added from the Advanced tab of a Deployment Step by clicking the :heavy_plus_sign: in the upper right corner

![Sensitive Variables Added from the Advanced tab of a Deployment Step](/assets/images/sensitive-variables/ccm-deployment-step-add-btn.png)

## Adding Sensitive Variables to scripts

<?! Include "../../../../shared/sensitive-variables-note.txt" /?>

1. On the advanced tab of a Deployment step, select the variable to insert from the Sensitive Variables drop down.

![Deployment step Advanced tab, showing the Sensitive Variables drop down with SERVICE_PASSWORD selected](/assets/images/sensitive-variables/add-variable-to-deployment-step.png)

## Deleting Sensitive Variables

1. From the Central Management dashboard, select `Administration` > `Sensitive Variables` from the left sidebar.

    ![Central Management dashboard, arrow pointing to Sensitive Variables menu in the left sidebar entry on the CCM Dashboard](/assets/images/sensitive-variables/ccm-sensitive-variables-nav.png)
1. Select :wastebasket: **Delete** beside the Sensitive Variable you wish to delete.

    ![Sensitive Variables page with arrow to a delete button](/assets/images/sensitive-variables/delete-variable.png)
