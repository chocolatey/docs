---
Order: 10
xref: ccm-example-deployments
Title: Deployments
Description: Example Deployment Plans that can be imported into Chocolatey Central Management for immediate use
---

## Summary

Chocolatey Central Management (CCM) now (in version 0.11.0 and up) supports importing and exporting Deployment Plans. We have several example Deployment Plans that you can import and use immediately, to help you make best use of your Chocolatey for Business suite!

<?! Include "../../../../shared/import-deployment-plan.txt" /?>

### Updating Values in Deployment Plans

Some values in an exported Deployment Plan don't import nicely, or age well. When importing an example Deployment Plan, you are very likely to have to update the `Target Group(s)` and any `Deployment Start Time` that is set.

After importing the Deployment Plan, you should follow these steps to ensure you are able to deploy it!

#### Setting the Target Group(s)

You will also need to set a Target Group for the Deployment Step:

- Mouse-over the Deployment Step and click the `Edit` button.
    ![Editing a Deployment Step](/assets/images/deployments/ccm-deployments-edit-deployment-step.jpg)

- Navigate to the `Select Target Groups` panel.

- Highlight your preferred groups and click the `>` button to move them into `Selected Groups`.
    ![Selecting Target Groups](/assets/images/deployments/ccm-deployments-step-select-groups-modal.png)

- Click `Save`.

#### Setting the Start Time Date (Scheduled Deployments)

Before you can run the Deployment Plan, you must set the `Start Date Time` to a time at least 30 minutes in the future.

To do so, click on the clock icon next to the `Start Date Time` field. When you have selected an appropriate time, click `Save`.

![Updating an invalid Start Date Time](/assets/images/deployments/ccm-deployments-set-schedule-datetime.png)

## Example Deployment Plans

We have several example Deployment Plans shown below, and you can check the [CCM Deployment Examples repository](https://github.com/chocolatey/ccm-deployment-examples) on GitHub for more.

#### Installing or Upgrading a Package

This Deployment Plan is a basic example of deploying a package using a simple Deployment Step.

For further details, please see the [readme here](https://github.com/chocolatey/ccm-deployment-examples/blob/main/deployments/installing-a-package-simple/README.md).

#### Installing Multiple Packages

This Deployment Plan is a basic example of deploying multiple packages.

We recommend that you use a separate Deployment Step for each package to deploy to allow per-computer reporting.

You can use this to generate larger Deployment Plans with more comprehensive suites of packages, even mixing Basic and Advanced Deployment Steps in order to provide additional configuration.

For further details, please see the [readme here](https://github.com/chocolatey/ccm-deployment-examples/blob/main/deployments/installing-multiple-packages/README.md).

#### Installing a Package with Parameters

This Deployment Plan is an example of deploying a package using an Advanced Deployment Step, in this case to provide a package parameter during deployment.

The example passes the `/InstallDir` parameter to the `python312` package, causing the package to be installed to the location provided.

We use the Advanced Deployment Step to do this because the Basic Deployment Step does not allow package parameters to be used.

For further details, please see the [readme here](https://github.com/chocolatey/ccm-deployment-examples/blob/main/deployments/installing-a-package-with-params/README.md).

### Advanced Deployments

#### Scheduled Deployments (Upgrading License Package)

These Deployment Plans are basic examples of deploying a package on a schedule - in this case a `chocolatey-license` package.

For further details, please see the [readme here](https://github.com/chocolatey/ccm-deployment-examples/tree/main/deployments/upgrading-license-daily).

#### Upgrading Chocolatey for Business Client Packages

These Deployment Plans are examples of upgrading the Chocolatey for Business client components.

There are two example Deployment Plans here. They follow the instructions laid out on the [upgrading to Chocolatey v2](https://docs.chocolatey.org/en-us/guides/upgrading-to-chocolatey-v2-v6#upgrade-using-chocolatey-central-management-deployments) page.

The first upgrades the Chocolatey for Business client components to the latest 1.x version.

The second upgrades Chocolatey CLI to the latest version.

For further details, please see the [readme here](https://github.com/chocolatey/ccm-deployment-examples/tree/main/deployments/upgrading-chocolatey-for-business-clients)
