---
Order: 30
xref: upgrade-agent
Title: Upgrade
Description: Information on how to upgrade Chocolatey Agent
---

## Upgrade process

> :memo: **NOTE**
>
> The upgrade of `chocolatey-agent` through `chocolatey-agent` will require a restart of the service in order for the new version to be picked up.

To upgrade Chocolatey Agent, you can upgrade it through Chocolatey with the command `choco upgrade chocolatey-agent`.

### Use Chocolatey Central Management to upgrade chocolatey-agent

Because Chocolatey Central Management uses `chocolatey-agent` to perform it's actions, the upgrade will require a restart of the service. The easiest way to do this is with a scheduled task as part of an advanced deployment.

An example advanced deployment script to do this is as follows:

```powershell
$delayInMinutes = 1

choco upgrade chocolatey-agent

$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($delayInMinutes)
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-WindowStyle Hidden -Command Restart-Service chocolatey-agent"
$principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -Hidden
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "restart chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal -Settings $settings -Verbose:$false
```

> :warning: **WARNING**
>
> Although the `ScheduledTasks` module is available on Windows Server 2012 R2, the [`chocolatey-agent` service encounters an error when trying to import it](https://github.com/chocolatey/chocolatey-licensed-issues/issues/273). It is recommended to explore other options for the scheduled task if you're using Windows Server 2012 R2.

## Change service account username or password

If you need to change the username or password of the Chocolatey Agent, you have a few options:

* Change it through the Windows Service Manager
* Change it during an upgrade by [passing the new username/password to the upgrade command](xref:setup-agent#package-parameters)
* Change it during an uninstall and reinstall while [passing the new username/password to the install command](xref:setup-agent#package-parameters).

> :warning: **WARNING**
>
> The service password cannot be changed through a Chocolatey upgrade command while the service is running.

### Use Chocolatey Central Management to change the service account username or password

If you use Chocolatey Central Management, you won't be able to use a deployment to uninstall the agent and then install the agent. This is because the agent cannot change the username/password while is it running. Instead, you can send a deployment that creates a scheduled task to uninstall the agent, then install with the new parameters.

> :memo: **NOTE**
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

> :memo: **NOTE**
>
> Be sure to use [Sensitive Variables](xref:ccm-administration-sensitive-variables) to ensure the username and password don't get added to the Chocolatey logs when using Chocolatey Central Management version 0.7.0 or newer.

> :warning: **WARNING**
>
> Although the `ScheduledTasks` module is available on Windows Server 2012 R2, the [`chocolatey-agent` service encounters an error when trying to import it](https://github.com/chocolatey/chocolatey-licensed-issues/issues/273). It is recommended to explore other options for the scheduled task if you're using Windows Server 2012 R2.
