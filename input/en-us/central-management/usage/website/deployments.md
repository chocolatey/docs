---
Order: 20
xref: ccm-deployments
Title: Deployments
Description: How to deploy packages, and execute PowerShell, on client machines
RedirectFrom:
  - docs/central-management-deployments
  - en-us/central-management/usage/deployments
---

## Description

Central Management's Deployments functionality allows for pre-defined actions to be executed across any Chocolatey-managed computers.
Deployment actions can be defined as simple `choco` commands, or as fully-fledged PowerShell scripts.

## Creating a Deployment

To setup a new Deployment, you'll need to create a Deployment which defines the steps for the deployment and the computers which will run them.
In order to get started, you'll need at least the `Create Deployment` and/or the `Create Advanced Deployment` permissions applied to your user account in CCM.
You will also need to have at least one Group of computers already defined.

1. From the Central Management dashboard, select `Deployments` from the left sidebar.

    ![Central Management dashboard, arrow pointing to Deployments menu in the left sidebar](/assets/images/deployments/ccm-dashboard-deployments-menu.png)

1. Select the :heavy_plus_sign: **Create New Deployment** button at the top of the page.

    ![CCM Deployments page, arrow pointing to Create New Deployment button](/assets/images/deployments/ccm-deployments-new-deployment-button.png)

1. (Optional) Give the deployment a custom name by clicking the edit icon displayed next to it and entering a new name.
   Press **Enter** to save the new name.

    ![CCM New Deployment page, arrow pointing to the edit title button](/assets/images/deployments/ccm-deployments-edit-deployment-name.png)

1. (Optional, Requires CCM v0.4.0+) Add a schedule by selecting the :heavy_plus_sign: **Add Schedule** button.

    ![CCM New Deployment page, arrow pointing to Add Schedule button](/assets/images/deployments/ccm-deployments-add-schedule.png)

    * Enter a date and time, or click the :calendar: button to pick the date and time from a calendar UI.

        ![CCM deployment schedule picker](/assets/images/deployments/ccm-deployments-set-schedule-datetime.png)

    * (Optional) If you'd like to define a maintenance window for the deployment start time, select the **Restrict schedule to a maintenance window** option and enter the ending date and time for the maintenance window.

       ![CCM deployment maintenance window option](/assets/images/deployments/ccm-deployments-maintenance-window.png)

    * (Optional) If you'd like a deployment to happen again, on a recurring basis, select how often you'd like the deployment to recur. Check the [recurring deployments section for more information](#recurring-deployments)

        ![CCM deployment Repeat Period](/assets/images/deployments/ccm-deployments-repeat-period.png)

1. Select :heavy_plus_sign: **Add Step** to add your first deployment step.

    ![CCM deployment add step button](/assets/images/deployments/ccm-deployments-add-step.png)

1. (Optional) In the `Create New Deployment Step` modal, enter a custom name for the deployment step.

    ![CCM deployment new step modal](/assets/images/deployments/ccm-deployments-new-step-modal.png)

1. Add the deployment step action:
   * For _Basic_ deployment steps, select a `Script command` from the list, a `Package name` to install, and optionally a specific package version to install or whether to allow Chocolatey to install the latest prerelease package version.  **NOTE:** It is not possible to use a space character within the `Package name` or `Package Version` textboxes, and the `Package Version` textbox must contain at least one digit.

        ![CCM deployment basic step action](/assets/images/deployments/ccm-deployments-basic-step-action.png)

    * For _Advanced_ deployment steps (requires the _Create Privileged Deployment_ user role), click the **Advanced** button and then enter one or more PowerShell script commands.

        ![CCM deployment advanced step action](/assets/images/deployments/ccm-deployments-advanced-step-action.png)

    * You can use [Sensitive Variables](xref:ccm-administration-sensitive-variables#adding-sensitive-variables-to-scripts) in an Advanced script in Chocolatey Central Management version 0.7.0 and later.
   <?! Include "../../../../shared/sensitive-variables-note.txt" /?>

1. (Optional) Click **Show advanced options** to set one or more of the following options:
    * `Execution timeout`.
    * `Valid exit codes`.
    * `Machine contact timeout` (requires CCM v0.4.0+ to edit).
    * `Fail overall deployment if not successful`.
      Disabling this option will allow the overall deployment to be marked as successful even if the step fails.
      By default, if any deployment step fails, the overall deployment is marked as Failed.
    * `Only run other deployment steps if successful`.
      Enabling this option will prevent subsequent deployment steps from starting if this step fails.
      The overall deployment will be marked as Failed, and subsequent steps will be Cancelled.
1. Select the **Select Target Groups** tab.

    ![CCM deployment step Select Target Group tab](/assets/images/deployments/ccm-deployments-select-groups-tab.png)

1. Add groups from the **Available Groups** column to the **Selected Groups** column by selecting them from the list and pressing the `>` button. You can also select the `>>` button to immediately move all groups into the **Selected Groups** column.

    ![CCM deployment step Select Target Groups modal](/assets/images/deployments/ccm-deployments-step-select-groups-modal.png)

1. Click the :floppy_disk: **Save** button to save the step.

    ![CCM deployment step Save button](/assets/images/deployments/ccm-deployments-step-save.png)

1. Continue to add steps until your deployment is complete.
1. Select :floppy_disk: **Save** to save the changes to the deployment.

## Recurring Deployments

As mentioned above, when creating a deployment it possible to select a scheduled start date/time, and in addition a Repeat Period.  This Repeat Period controls how often a deployment recurs going forward. The values for the Repeat Period are:

- `Daily`
- `Weekly`
- `Every two weeks`
- `Every four weeks`
- `Monthly`
- `Every two months`
- `Quarterly`
- `Every six months`
- `Yearly`

Once a deployment has been assigned a Repeat Period, and it is moved to the [Ready](#ready) state, it will be shown with a slightly different icon:

![CCM deployment marked as recurring](/assets/images/deployments/ccm-deployments-recurring-icon.png)

Let's take as example a deployment in the [Ready](#ready) state that is scheduled to start on `23rd August 2022 at 07:11 UTC`, with a Repeat Period of `Weekly` set.
Once this instance of the deployment moves to the [Active](#active) state, another instance of the deployment will be created.
The new instance will have the same steps and settings except for the scheduled start date/time, which will be set to exactly 1 week from the scheduled start date/time of the previous instance (in this case `30th August 2022 at 07:11 UTC`).

For repeating deployments, a new instance of the deployment will be created once a scheduled deployment moves to the [Active](#active) state.
If a repeating deployment specifies a maintenance window date/time (`Last Scheduled Date Time`), the new instance's maintenance window will also be adjusted from the previous instance's value by the same period as the scheduled start date/time.

> :warning: WARNING
>
> If the scheduled start date/time of a deployment is overridden using the [Run Now](#run-now) action, the new instance of the recurring deployment will use the **scheduled** start date/time of the previous instance when calculating the next scheduled start date/time, **not** the date/time that the deployment actually started.
> If you want to change the scheduled start date/time of the recurring deployment, edit the deployment while it is in the [Ready](#ready) state to ensure that future instances of the recurring deployment will use that value when calculating the next scheduled date/time.

While in the [Ready](#ready) state, if you use the [Cancel](#cancel) or [Delete](#delete) action on the recurring deployment, no further instances of the recurring deployment will be created.

## Deployment States

### Draft

A deployment is initially created in the [`Draft`](#draft) state, and will remain in this state until it is moved into the [`Ready`](#ready) state.
While it is in the [`Draft`](#draft) state, it cannot be run, and scheduled deployment start times will be ignored.

While in the [`Draft`](#draft) state, the available actions that can be performed on a deployment plan are:

- [Move To Ready](#move-to-ready)
- [Edit](#edit)
- [Duplicate](#duplicate)
- [Delete](#delete)

### Ready

Once the deployment enters the [`Ready`](#ready) state, it's eligible to be started.
Deployments in this state can be started manually or according to a schedule.

> :memo: **NOTE**
>
> Any modifications to a deployment in this state will revert it back to the [`Draft`](#draft) state.

While in the [`Ready`](#ready) state, the available actions that can be performed on a deployment plan are:

- [View](#view)
- [Run Now](#run-now)
- [Edit](#edit)
- [Duplicate](#duplicate)
- [Cancel](#cancel)
- [Delete](#delete)

### Active

Deployments that are currently in progress will be in this state.

While in the [`Active`](#active) state, the available actions that can be performed on a deployment plan are:

- [Details](#details)
- [Duplicate](#duplicate)
- [Cancel](#cancel)

### Completed

Deployments that have completed running will be in either the `Success`,  `Failed`, `Unreachable`, `Inconclusive`, or `Cancelled` state, depending on how the run went.

While in one of these states, the available actions that can be performed on a deployment plan are:

- [Details](#details)
- [Duplicate](#duplicate)
- [Archive](#archive)

### Archived

Deployments that are in a completed state can be actioned using [`Archive`](#archive) action to hide them from the main Deployments screen.
This is helpful if you'd like to reduce clutter on the main deployments screen without discarding the information the completed report contains.

You can access archived deployments from the `Deployments` page and clicking on the `View Archived Deployments` button.  [`Archived`](#archived) deployments will not appear in any other reports that contain deployment plans.

While in the [`Archived`](#archived) state, no additional actions can be performed on a deployment plan.

## Deployment Plan Actions

Depending on the [state](#deployment-states) that a deployment plan is currently in, there are a defined set of actions that can be performed on them.  What follows are is a description of each of those actions.

### Move To Ready

This action moves a deployment plan from the [`Draft`](#draft) state to the [`Ready`](#ready) state. While in this interim state, no additional changes can be made to the deployment plan.  If changes are made, it will be moved back to the [`Draft`](#draft) state.

### Edit

The action opens the edit page for the selected deployment plan.  Here changes can be made to the steps, schedule, groups, etc.  If any changes are made on the page, a deployment plan that was in the [`Ready`](#ready) state, will be moved back to the [`Draft`](#draft) state.

### Duplicate

> :memo: **NOTE**
>
> This feature became available starting with Chocolatey Central Management 0.10.0

The action makes an exact copy (with the exception of any scheduled start/end time or repeat period) of any given deployment plan.  Once the duplicate has been created, you will be taken to the edit page ready to make any additional required changes.  The name of the new deployment plan will be the same as the original with some additional information added to the end.  For example, if the original deployment plan was called `Install Papercut`, the name given to the duplicate would be `Install Papercut - Copy (19 Aug 2022 12:52:25)` where the timestamp is the current date time.

> :memo: **NOTE**
>
> There is a specific permission to allow duplication of a deployment plan. If you want to configure this permission, it can be done either for an individual [user](xref:ccm-administration-users), or a specific [role](xref:ccm-administration-roles)

### Delete

This removes all information about the deployment plan from Chocolatey Central Management.

The action cannot be undone, so care should be taken before using it.

### View

The action opens the edit page for the selected deployment plan where all the parts of the plan can be viewed.  Here changes can be made to the steps, schedule, groups, etc.  If any changes are made on the page, a deployment plan that was in the [`Ready`](#ready) state, will be moved back to the [`Draft`](#draft) state.

### Run Now

This action takes a deployment plan from the [`Ready`](#ready) state, to the [`Active`](#active) state.  This can be thought of as actually setting the deployment plan in motion, and the steps within this deployment plan will begin to be picked up by the computers that are contained within the steps (in the order that has been defined).

If a deployment plan is in the ready state, but is waiting for the scheduled start time before automatically starting, it is possible to override this start time using the `Run Now` action.  Care should be taken here though if the deployment plan is also a recurring deployment plan.  In this case, the overriding the scheduled start time will mean that the next deployment plan will be configured to use the scheduled start time for the next iteration, and _not_ the overridden start time.

### Cancel

This action stops all future steps from being performed within a deployment plan.  Any steps that are currently active will still be allowed to complete, but no further steps will occur.

If a recurring deployment is Cancelled from the [`Ready`](#ready) state, all future instances of the plan are also cancelled.
If you want to skip an iteration of a recurring deployment, instead change its scheduled start time directly.

### Details

This action opens up the details for the selected deployment plans, allowing the user to see the progress so far.  For example: the currently active step, or which computers have picked up this step.  This view is useful for monitoring the progress in real time, as the details pages update automatically.

### Archive

This action will mark any completed deployment plan as archived, and it will no longer be shown in the main deployments screen of Chocolatey Central Management website.  You can access archived deployments from the `Deployments` page and clicking on the `View Archived Deployments` button.

## FAQ

### What versions of components do I need for Deployments to work properly?

While you might be able to get things to work with CCM v0.2.x and Chocolatey Agent v0.10.x, it's best to use the following:

* CCM components (`chocolatey-management-*` all 3 packages) - v0.3.0+
* Chocolatey Agents (`chocolatey-agent` package on all clients) - v0.11.0+
* Chocolatey Licensed Extension (`chocolatey.extension` on all clients) - v2.1.1+

### What is the CCM compatibility matrix?

Central Management has specific compatibility requirements with quite a few moving parts. It is important to understand that there are some Chocolatey Agent versions that may not be able to communicate with some versions of CCM and vice versa.  Please see the [CCM Component Compatibility Matrix](xref:central-management#ccm-component-compatibility-matrix) for details.

### Why do I see some machines have not opted in for Deployments?

If you are on the Groups screen, you may notice that some machines show up highlighted with a coloring, and one of those colorings is an orange - the legend below it mentions "Not Opted In For Deploymens (Configuration)".

![Group eligibility legend](/assets/images/groups/ccm-groups-eligibility.png)

As you can see from the text, it is meant to help you figure out the issue:

> The computer has not opted in or a group contains computers that have not opted in for deployments by configuration. Please ensure the computer has at least chocolatey-agent v0.10.0+ installed and the feature "useChocolateyCentralManagementDeployments" has been set to enabled on the client computer.

This is telling you that you need to ensure you set the client to allow for the the use of Deployments. As it is a security consideration, it requires an explicit opt-in on client machines. See [Client Setup - Features](xref:ccm-client#features) for details on how to set it.

### I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?

Once you upgrade to at least CCM v0.2.0, every machine will show that until they check in the next time. Once they check in, that will go away. So it's basically normal to see that until those machines check in again.

### Can I use Chocolatey Deployments to upgrade CCM based components?

Likely you absolutely can, just keep in mind that there may be a specific ordering in how you would upgrade everything and adhere to that order. In some instances, you may need to upgrade agents first, then CCM components as once CCM is upgraded it may not be able to talk to the agents. However agents will stop being able to talk to CCM for a small period of time while you are upgrading CCM, but then things will start working again.

### What is Run Actual?

You may have seen `--run-actual` get attached to scripts where you are running choco commands - what is it?

This is a switch that is passed to opt out of Chocolatey Self-Service. It's typically passed by the agent service back to choco to run a command for a user. You typically would not issue this, but the agent service will, so you are likely to see it in the logs if you are looking closely.

### What Happens if More Than One Deployment is "Active" at the Same Time?

This will depend a little bit on the version of Central Management you're running.
Prior to v0.4.0, control of deployments was handled entirely on a per-deployment-_step_ basis.
This means that if you have an active deployment with some of the computers in it idling (waiting for a later step in the deployment to begin, essentially), these machines will pick up available deployment steps from an unrelated deployment while they're waiting.

As of v0.4.0 of Central Management, this has been fine tuned a little bit so that any computer which is acted on by a deployment will not pick up any steps from unrelated deployments until all its assigned steps in the first deployment are completed.

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
When `Deployment A` reaches step 2, even though `Computer A` is not currently running any deployment steps, it will not start running steps from `Deployment B` because it still has a task to do in `Deployment A`.
If you are running CCM 0.3.x, `Computer A` will instead pick up and run the step from `Deployment B` despite `Deployment A` still being in progress.

### Why do My Computers or Groups Show as Ineligible for Deployments While They're Opted In?

Computers can be considered ineligible for deployments based on two criteria:

1. Is the computer licensed under your Chocolatey for Business license?
1. Is the computer opted in for deployments based on the Chocolatey configuration?

If **either** one of these two criteria is not met, that computer is considered ineligible for deployments.

Additionally, any group that contains any of the following will be considered ineligible:

* An ineligible computer
* A group containing **any** ineligible computers
* A group containing **any** ineligible groups

### What Happens if a Computer / Group in a Deployment Becomes Ineligible?

* For deployments that have not yet started:
  * If the deployment is scheduled, it will not run until all computers/groups are eligible again.
  * If the deployment is not scheduled, it cannot be started until all computers/groups are eligible again.

  Once CCM has confirmed the problem computer(s)/group(s) are eligible again, the deployment can be started.
  If the deployment was previously scheduled and it has not passed the maintenance window time (if set), it will start at that point.
* For deployments that are currently [`Active`](#active)
  * As soon as CCM detects the ineligible computer, it will terminate the current deployment step.
  * Then, all following deployment steps will be `Cancelled`.

### How Can I Run Deployments in a Semi-Connected Environment?

As of CCM v0.4.0, you are able to configure deployments to tolerate semi-connected environments.
This effectively allows CCM deployments to simply wait until a machine is connected to the network before it begins a given deployment step.

To configure this, you can set the `Machine Contact Timeout` value in the Advanced settings of each individual Deployment Step to `0`.
This value must be positive, or zero (which is treated as infinite).
You may want to configure this only for the first step of a deployment, or for multiple steps if you expect the target machines to be connected/disconnected over the course of the deployment.

> :memo: **NOTE**
>
> If the deployment is scheduled with a maintenance window set, the `Machine Contact Timeout` value of the first deployment step is ignored.
> In this case, the maintenance window defines the contact timeout for the first step.
The `Execution Timeout` is the maximum allowed time for the Chocolatey Agent to execute the deployment step task.
Any positive value for this setting will be respected, and as with `Machine Contact Timeout`, a `0` value is treated as infinite.
However, if the execution timeout is infinite and a computer goes offline, that deployment step will not complete until that computer checks in again. If it errors three times attempting to provide the results, it will fail it at the client and that computer will not report results, and require manual intervention.
Infinite execution timeouts are **not recommended** for this reason &mdash; deployment steps may end up seemingly stalling for long periods of time and/or require manual intervention to cancel them.

## Deployments Webinars

Catch the recording of the Jun 32rd, 2020 webinar for a full showcase of the Chocolatey Central Management Deployments features:

<https://chocolatey.org/events/chocolatey-deployments>

## Common Errors and Resolutions

### A deployment step is stalled with infinite execution timeout

The only way to resolve this currently is to cancel the deployment itself, which can be done from the main Deployments list.
On the right-hand side of the [`Active`](#active) Deployments table, click the Actions menu for the corresponding deployment, and select [`Cancel`](#cancel).
You will be asked to confirm the cancellation.

All remaining steps in the deployment will be cancelled, along with any still running or pending tasks.

### The updated license file is not being picked up in the website

You need to restart the web executable currently. We are looking to have it automatically picked up in future releases. Here's a script to handle that:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Process -Name "ChocolateySoftware.ChocolateyManagement.Web.Mvc" -ErrorAction SilentlyContinue | Stop-Process
Get-Service chocolatey-* | Start-Service
```

### A computer or group is not showing as available for deployments but I have plenty of available licenses

Once you upgrade to Central Management v0.3.0+, you have upgraded the Agent on the machine to v0.11.0+, and it has successfully completed a check in, then that messaging should go away. Note that clients do not get a message back that there was a failure as a security feature - you'll need to consult the Central Management Service logs. You can find that at `$env:ChocolateyInstall\logs\ccm-service.log`, or if you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

### Using `choco` commands in a script deployment break if semicolons are used to separate the statements

When constructing a PowerShell script for a deployment, all Chocolatey commands must be placed on separate lines.  It is not possible to do something like the following:

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
* [Central Management - Groups](xref:ccm-groups)
* [Central Management - Computers](xref:ccm-computers)
* [Central Management - Reports](xref:ccm-reports)
