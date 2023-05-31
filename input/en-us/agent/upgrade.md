---
Order: 30
xref: upgrade-agent
Title: Upgrade
Description: Information on how to upgrade Chocolatey Agent
---

## Upgrade Process

> :choco-info: **NOTE**
>
> The upgrade of `chocolatey-agent` through `chocolatey-agent` will require a restart of the service in order for the new version to be picked up.

### Minor / Patch Versions (for example 1.1.x to 1.3.x, or 1.1.1 to 1.1.5)

To upgrade Chocolatey Agent directly, you can upgrade it through Chocolatey CLI with the command `choco upgrade chocolatey-agent`.

### Major Versions

When upgrading Chocolatey Agent to a new major version (for example, **v1.x** to **v2.x**) a specific upgrade process needs to be followed to ensure that all its dependencies will be correctly installed.

As an example, the upgrade process for v1.x to v2.x is as follows:

1. Ensure you are on the latest stable **v1.x** version of Chocolatey CLI, **v5.x** version of Chocolatey Licensed Extension, and **v1.x** version of Chocolatey Agent.
    - To find the latest versions, you can use `choco search --exact chocolatey --all-versions` (or `chocolatey.extension` / `chocolatey.agent` for those packages).
      You can also visit [Chocolatey CLI's Chocolatey Community Repository page](https://community.chocolatey.org/packages/chocolatey) (or other packages' pages on the site) and look at the Version History section to get this list.
1. Upgrade `chocolatey` **first**.
1. Due to the dependency version ranges and Chocolatey CLI's dependency resolution, `chocolatey-agent` will be upgraded alongside the `chocolatey` package and associated dependencies.

### Using Chocolatey Central Management to Upgrade chocolatey-agent

Because Chocolatey Central Management uses `chocolatey-agent` to perform its actions, the upgrade will require a restart of the service.
The easiest way to do this is with a scheduled task as part of an Advanced Deployment.

A recommended Advanced Deployment script to do this is as follows:

> :choco-warning: **WARNING**
>
> If upgrading `chocolatey-agent` to a new **major** version, target **only** the `chocolatey` package for the `choco upgrade` command in the script below, instead of the `chocolatey-agent` package.

```powershell
$delayInMinutes = 1

# If using an internal repository to install Chocolatey Agent, replace `chocolatey.licensed` below
# with the name or URL of your internally configured source.
choco upgrade chocolatey-agent --source 'chocolatey.licensed'

# Ensure the deployment task registers as failed if the installation failed, and skip registering the
# scheduled task.
if ($LASTEXITCODE -ne 0) {
    Write-Error 'The upgrade failed!'
    exit $LASTEXITCODE
}

# Restart the Agent service after the preset delay time via a scheduled task.
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($delayInMinutes)
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-WindowStyle Hidden -Command Restart-Service chocolatey-agent"
$principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -Hidden
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "restart chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal -Settings $settings -Verbose:$false
```

> :choco-warning: **WARNING**
>
> Although the `ScheduledTasks` module is available on Windows Server 2012 R2, the [`chocolatey-agent` service encounters an error when trying to import it](https://github.com/chocolatey/chocolatey-licensed-issues/issues/273). It is recommended to explore other options for the scheduled task if you're using Windows Server 2012 R2.

## Change Service Account Username or Password

If you need to change the username or password of the Chocolatey Agent, you have a few options:

* Change it through the Windows Service Manager
* Change it during an upgrade by [passing the new username/password to the upgrade command](xref:setup-agent#package-parameters)
* Change it during an uninstall and reinstall while [passing the new username/password to the install command](xref:setup-agent#package-parameters).

> :choco-warning: **WARNING**
>
> The service password cannot be changed through a Chocolatey upgrade command while the service is running.

### Use Chocolatey Central Management to Change the Service Account Username or Password

If you use Chocolatey Central Management, you won't be able to use a deployment to uninstall the agent and then install the agent. This is because the agent cannot change the username/password while is it running. Instead, you can send a deployment that creates a scheduled task to uninstall the agent, then install with the new parameters.

> :choco-info: **NOTE**
>
> Due to limitations of Windows Task Scheduler, it is likely that your users will see the PowerShell window initially, but it should disappear once PowerShell has fully started.

An example advanced deployment script to do this is as follows:

```powershell
$delayInMinutes = 1
$newUsername = '<Username>'
$newPassword = '<Password>'

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($delayInMinutes)
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-WindowStyle Hidden -Command choco uninstall chocolatey-agent -y ; choco install chocolatey-agent -y --params='/Username:$newUsername' --package-parameters-sensitive='/Password:$newPassword'"
$principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -Hidden
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "Upgrade chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal -Settings $settings -Verbose:$false
```

> :choco-info: **NOTE**
>
> Be sure to use [Sensitive Variables](xref:ccm-administration-sensitive-variables) to ensure the username and password don't get added to the Chocolatey logs when using Chocolatey Central Management version 0.7.0 or newer.

> :choco-warning: **WARNING**
>
> Although the `ScheduledTasks` module is available on Windows Server 2012 R2, the [`chocolatey-agent` service encounters an error when trying to import it](https://github.com/chocolatey/chocolatey-licensed-issues/issues/273). It is recommended to explore other options for the scheduled task if you're using Windows Server 2012 R2.
