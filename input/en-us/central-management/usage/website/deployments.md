---
Order: 40
xref: ccm-deployments
Title: Deployments
Description: How to deploy packages, and execute PowerShell, on client machines
RedirectFrom:
  - docs/central-management-deployments
  - en-us/central-management/usage/deployments
---

## Description

Chocolatey Central Managements' Deployments functionality allows for pre-defined actions to be executed across any Chocolatey-managed computers.
Deployment actions can be defined as simple `choco` commands, or as fully-fledged PowerShell scripts.

## Creating a Deployment

To setup a new Deployment, you'll need to create a Deployment which defines the steps for the Deployment and the computers which will run them.
In order to get started, you'll need at least the `Create Deployment` and/or the `Create Advanced Deployment` permissions applied to your user account in CCM.
You will also need to have at least one Group of computers already defined.

1. From the Central Management dashboard, select `Deployments` from the left sidebar.

   ![Central Management dashboard, arrow pointing to Deployments menu in the left sidebar](/assets/images/deployments/ccm-dashboard-deployments-menu.png)
1. Select the :heavy_plus_sign: **Create New Deployment** button at the top of the page.

   ![CCM Deployments page, arrow pointing to Create New Deployment button](/assets/images/deployments/ccm-deployments-new-deployment-button.png)
1. (Optional) Give the Deployment a custom name by clicking the edit icon displayed next to it and entering a new name.
   Press **Enter** to save the new name.

   ![CCM New Deployment page, arrow pointing to the edit title button](/assets/images/deployments/ccm-deployments-edit-deployment-name.png)
1. (Optional, Requires CCM v0.4.0+) Add a schedule by selecting the :heavy_plus_sign: **Add Schedule** button.

   ![CCM New Deployment page, arrow pointing to Add Schedule button](/assets/images/deployments/ccm-deployments-add-schedule.png)
   1. Enter a date and time, or click the :calendar: button to pick the date and time from a calendar UI.

   ![CCM Deployment schedule picker](/assets/images/deployments/ccm-deployments-set-schedule-datetime.png)
   1. (Optional) If you'd like to define a maintenance window for the deployment start time, select the **Restrict schedule to a maintenance window** option and enter the ending date and time for the maintenance window.

   ![CCM Deployment maintenance window option](/assets/images/deployments/ccm-deployments-maintenance-window.png)
1. Select :heavy_plus_sign: **Add Step** to add your first Deployment step.

   ![CCM Deployment add step button](/assets/images/deployments/ccm-deployments-add-step.png)
1. (Optional) In the `Create New Deployment Step` modal, enter a custom name for the Deployment step.

   ![CCM Deployment new step modal](/assets/images/deployments/ccm-deployments-new-step-modal.png)
1. Add the Deployment step action:
   * For _Basic_ Deployment steps, select a `Script command` from the list, and one or more `Package name`(s) to install.

     ![CCM Deployment basic step action](/assets/images/deployments/ccm-deployments-basic-step-action.png)
   * For _Advanced_ Deployment steps (requires the _Create Privileged Deployment_ user role), click the **Advanced** button and then enter one or more PowerShell script commands.

     ![CCM Deployment advanced step action](/assets/images/deployments/ccm-deployments-advanced-step-action.png)
   * You can use [Sensitive Variables](xref:ccm-sensitive-variables#adding-sensitive-variables-to-scripts) in an Advanced script in Chocolatey Central Management version 0.7.0 and later.
   <?! Include "../../../../shared/sensitive-variables-note.txt" /?>

1. (Optional) Click **Show advanced options** to set one or more of the following options:
   * `Execution timeout`.
   * `Valid exit codes`.
   * `Machine contact timeout` (requires CCM v0.4.0+ to edit).
   * `Fail overall Deployment if not successful`.
     Disabling this option will allow the overall Deployment to be marked as successful even if the step fails.
     By default, if any Deployment step fails, the overall Deployment is marked as Failed.
   * `Only run other Deployment steps if successful`.
     Enabling this option will prevent subsequent Deployment steps from starting if this step fails.
     The overall Deployment will be marked as Failed, and subsequent steps will be Cancelled.
1. Select the **Select Target Groups** tab.

   ![CCM Deployment step Select Target Group tab](/assets/images/deployments/ccm-deployments-select-groups-tab.png)
1. Add groups from the **Available Groups** column to the **Selected Groups** column by selecting them from the list and pressing the `>` button.
   You can also select the `>>` button to immediately move all groups into the **Selected Groups** column.

   ![CCM Deployment step Select Target Groups modal](/assets/images/deployments/ccm-deployments-step-select-groups-modal.png)
1. Click the :floppy_disk: **Save** button to save the step.

   ![CCM Deployment step Save button](/assets/images/deployments/ccm-deployments-step-save.png)
1. Continue to add steps until your Deployment is complete.
1. Select :floppy_disk: **Save** to save the changes to the Deployment.

## Deployment States

A Deployment state is the state is the state of an individual Deployment from creation/draft to completion and being optionally archived after completion. Once a Deployment has completed, it can be labeled as a number of different [Deployment Statuses](xref:#deployment-statuses). This is the complete lifecycle of a Deployment as it flows down the menu structure defined in the Deployments tab of the Chocolatey Central Management dashboard.

### Draft

A Deployment is initially created in the `Draft` state, and will remain in this state until it is moved into the `Ready` state.
While it is in the `Draft` state, it cannot be run, and scheduled Deployment start times will be ignored.

### Scheduled/Ready

Once the Deployment enters the `Ready` state, it's eligible to be started.
Deployments in this state can be started manually or according to a schedule.

> :memo: **NOTE**
>
> Any further modifications to a Deployment in this state will revert it back to the `Draft` state.

### Active

Deployments that are currently in progress will be in this state.

### Completed

Deployments that have finished running will enter the `Completed` state. They will list their status depending on how the run went.

### Archived

Deployments that are in a completed state can also be `Archived` to hide them from the main Deployments screen.
This is helpful if you'd like to reduce clutter on the main Deployments screen without discarding the information the completed report contains.

You can access archived Deployments from the `Reports -> Deployments` page in the left sidebar of the Chocolatey Central Management dashboard.

## Deployment Statuses

This is a list of all the statuses that a Deployment step or whole Deployment can report as. They are listed in order of processing order as a new Deployment runs.

### Ready

This status is presented once a Deployment enters the active state. It is now waiting for the next agent check-in to grab the Deployment from Chocolatey Central Management.

### Unreachable

This status is reported when a Deployment is queued up in Chocolatey Central Management but the agent is unable to receive or accept the Deployment. This is usually the status given when a step or whole Deployment reaches its execution timeout. This can be an agent or server side error. It's best to check both the `central-management-service.log` file on the server as well as the `chocolatey-agent.log` file on the client to investigate if you receive this status.

### Active

This status is given once the agent accepts the Deployment from Chocolatey Central Management. It then begins processing the Deployment and also reports back to Chocolatey Central Management that is has started this Deployment step.

### Inconclusive

This status is reported when a Deployment step has gone to active, but Chocolatey Central Management doesn't get a reply back as to the status of the step from the agent. It is best to look at the `chocolatey-agent.log` file from the client as to why it was not able to report back to Chocolatey Central Management.

### Cancelled

This status is reported anytime a Deployment step or Deployment is manually cancelled by someone.

### Success

This status indicates the Deployment step completed and reported back as successful.

### Failed

This status indicates the Deployment failed for some reason. You can click the `View Log` button on the individual Deployment step to get more data on the failure.

### Unknown

This is a catch-all-status. When a Deployment step or whole Deployment does not meet the criteria to fit one of the other statuses, it is labeled as status `Unknown`. If you get this status, please reach out to us via the means listed when running `choco support`.

## FAQ

### What Versions of Components Do I Need for Deployments to Work Properly?

While you might be able to get things to work with Chocolatey Central Management v0.2.x and Chocolatey Agent v0.10.x, it's best to use the following:

* Chocolatey Central Management components (`chocolatey-management-*` all 3 packages) - v0.3.0+
* Chocolatey Agent (`chocolatey-agent` package on all clients) - v0.11.0+
* Chocolatey Licensed Extension (`chocolatey.extension` on all clients) - v2.1.1+

### What Is the Chocolatey Central Management Compatibility Matrix?

Chocolatey Central Management has specific compatibility requirements with quite a few moving parts. It is important to understand that there are some Chocolatey Agent versions that may not be able to communicate with some versions of Chocolatey Central Management and vice versa.  Please see the [Chocolatey Central Management Component Compatibility Matrix](xref:central-management#ccm-component-compatibility-matrix) for details.

### Why Do I See Some Machines Have Not Opted in for Deployments?

If you are on the Groups screen, you may notice that some machines show up highlighted with a orange color. The legend below it mentions "Not Opted In For Deployments (Configuration)".

![Group eligibility legend](/assets/images/groups/ccm-groups-eligibility.png)

As you can see from the text, it is meant to help you figure out the issue:

> The computer has not opted in or a group contains computers that have not opted in for deployments by configuration. Please ensure the computer has at least chocolatey-agent v0.10.0+ installed and the feature "useChocolateyCentralManagementDeployments" has been set to enabled on the client computer.

This is telling you that you need to ensure you set the client to allow for the the use of Deployments. As it is a security consideration, it requires an explicit opt-in on client machines. See [Client Setup - Features](xref:ccm-client#features) for details on how to set it.

### I Have Plenty of Licenses, Why Do Some Machines Show Not Opted in for Deployments and Also Exceeds Your Current License Count?

Once you upgrade to at least Chocolatey Central Management v0.2.0, every machine will show that until they check in the next time. Once they check in, that will go away. So it's basically normal to see that until those machines check in again.

### Can I Use Chocolatey Deployments to Upgrade Chocolatey Central Management based components?

You can upgrade the chocolatey-agent package via Chocolatey Central Management. To do so please see [here](xref:upgrade-agent#use-chocolatey-central-management-to-upgrade-chocolatey-agent) as this must be performed as an advanced Deployment step.

We do not recommend upgrading Chocolatey Central Management itself via an automated Deployment process. Please see our [Chocolatey Central Management Upgrade Documentation](xref:ccm-upgrade) for the supported upgrade process.

### What Is Run Actual?

You may have seen `--run-actual` get attached to scripts where you are running choco commands - what is it?

This is a switch that is passed to opt out of Chocolatey Self-Service. It's typically passed by the agent service back to choco to run a command for a user. You typically would not issue this, but the agent service will, so you are likely to see it in the logs if you are looking closely.

### What Happens if More Than One Deployment Is "Active" at the Same Time?

This will depend a little bit on the version of Chocolatey Central Management you're running.
Prior to v0.4.0, control of Deployments was handled entirely on a per-Deployment-_step_ basis.
This means that if you have an active Deployment with some of the computers in it idling (waiting for a later step in the Deployment to begin, essentially), these machines will pick up available Deployment steps from an unrelated Deployment while they're waiting.

As of v0.4.0 of Chocolatey Central Management, this has been fine tuned so that any client that runs a Deployment will not pick up any steps from unrelated Deployments until all its assigned steps in the first Deployment are completed.

This can get a bit confusing, so let's consider the following scenario:

* Deployment A
  * Step 1
    * Computer A
    * Computer B
  * Step 2
    * Computer B
  * Step 3
    * Computer A
* Deployment B
  * Step 1
    * Computer A

Let's say `Deployment A` is started first, and `Deployment B` starts while `Deployment A` is in either step 1 or step 2.
When `Deployment A` reaches step 2, even though `Computer A` is not currently running any Deployment steps, it will not start running steps from `Deployment B` because it still has a task to do in `Deployment A`.
If you are running Chocolatey Central Management 0.3.x, `Computer A` will instead pick up and run the step from `Deployment B` despite `Deployment A` still being in progress.

### Why Do My Computers or Groups Show as Ineligible for Deployments While They're Opted In?

Computers can be considered ineligible for Deployments based on two criteria:

1. Is the computer licensed under your Chocolatey for Business license?
1. Is the computer opted in for Deployments based on the Chocolatey configuration?

If **either** one of these two criteria is not met, that computer is considered ineligible for Deployments.

Additionally, any group that contains any of the following will be considered ineligible:

* An ineligible computer
* A group containing **any** ineligible computers
* A group containing **any** ineligible groups

### What Happens if a Computer / Group in a Deployment Becomes Ineligible?

* For Deployments that have not yet started:
  * If the Deployment is scheduled, it will not run until all computers/groups are eligible again.
  * If the Deployment is not scheduled, it cannot be started until all computers/groups are eligible again.

  Once Chocolatey Central Management has confirmed the problem computer(s)/group(s) are eligible again, the Deployment can be started.
  If the Deployment was previously scheduled and it has not passed the maintenance window time (if set), it will start at that point.
* For Deployments that are currently `Active`
  * As soon as Chocolatey Central Management detects the ineligible computer, it will terminate the current Deployment step.
  * Then, all following Deployment steps will be `Cancelled`.

### How Can I Run Deployments in a Semi-connected Environment?

As of Chocolatey Central Management v0.4.0, you are able to configure Deployments to tolerate semi-connected environments.
This effectively allows Chocolatey Central Management Deployments to simply wait until a client is connected to the network before it begins a given Deployment step.

To configure this, you can set the `Machine Contact Timeout` value in the Advanced settings of each individual Deployment Step to `0`.
This value must be positive, or zero (which is treated as infinite).
You may want to configure this only for the first step of a Deployment, or for multiple steps if you expect the target machines to be connected/disconnected over the course of the Deployment.

> :memo: **NOTE**
>
> If the Deployment is scheduled with a maintenance window set, the `Machine Contact Timeout` value of the first Deployment step is ignored.
> In this case, the maintenance window defines the contact timeout for the first step.
The `Execution Timeout` is the maximum allowed time for the Chocolatey Agent to execute the Deployment step task.
Any positive value for this setting will be respected, and as with `Machine Contact Timeout`, a `0` value is treated as infinite.
However, if the execution timeout is infinite and a computer goes offline, that Deployment step will not complete until that computer checks in again. If it errors three times attempting to provide the results, it will fail it at the client and that computer will not report results, and require manual intervention.
Infinite execution timeouts are **not recommended** for this reason &mdash; Deployment steps may end up seemingly stalling for long periods of time and/or require manual intervention to cancel them.

## Deployments Webinars

Catch the recording of the Jun 32rd, 2020 webinar for a full showcase of the Chocolatey Central Management Deployments features:

https://chocolatey.org/events/chocolatey-deployments

## Common Errors and Resolutions

### A Deployment Step Is Stalled With Infinite Execution Timeout

The only way to resolve this currently is to cancel the Deployment itself, which can be done from the main Deployments list.
On the right-hand side of the Active Deployments table, click the Actions menu for the corresponding Deployment, and select `Cancel`.
You will be asked to confirm the cancellation.

All remaining steps in the Deployment will be cancelled, along with any still running or pending tasks.

### The Updated License File Is Not Being Picked Up in the Website

You need to restart the web executable currently. We are looking to have it automatically picked up in future releases. Here's a script to handle that:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Process -Name "ChocolateySoftware.ChocolateyManagement.Web.Mvc" -ErrorAction SilentlyContinue | Stop-Process
Get-Service chocolatey-* | Start-Service
```

### A Computer or Group Is Not Showing as Available for Deployments but I Have Plenty of Available Licenses

Once you upgrade to Chocolatey Central Management v0.3.0+, you have upgraded the Agent on the machine to v0.11.0+, and it has successfully completed a check in, then that messaging should go away. Note that clients do not get a message back that there was a failure as a security feature - you'll need to consult the Central Management Service logs. You can find that at `$env:ChocolateyInstall\logs\ccm-service.log`, or if you are on a version of Chocolatey Central Management prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

### Using `choco` Commands in a Script Deployment Break if Semicolons Are Used to Separate the Statements

When constructing a PowerShell script for a Deployment, all Chocolatey commands must be placed on separate lines.  It is not possible to do something like the following:

```powershell
choco list --local-only -r; exit $LASTEXITCODE
```

Instead, this should be written as:

```powershell
choco list --local-only -r
exit $LASTEXITCODE
```

For more information on when this will be addressed, you can subscribe to the [GitHub issue](https://github.com/chocolatey/chocolatey-licensed-issues/issues/158).

## Related Topics

* [Chocolatey Central Management](xref:central-management)
* [Chocolatey Central Management - Groups](xref:ccm-groups)
* [Chocolatey Central Management - Computers](xref:ccm-computers)
* [Chocolatey Central Management - Reports](xref:ccm-reports)
