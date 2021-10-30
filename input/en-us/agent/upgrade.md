---
Order: 30
xref: upgrade-agent
Title: Upgrade
Description: Information on how to upgrade Chocolatey Agent
---

## Upgrade process

> :memo: **NOTE** The upgrade of `chocolatey-agent` through `chocolatey-agent` will require a restart of the service in order for the new version to be picked up.

To upgrade Chocolatey Agent, you can upgrade it through Chocolatey with the command `choco upgrade chocolatey-agent`.

## Change service account username or password

If you need to change the username or password of the Chocolatey Agent, you can either change it through the Windows Service Manager, or you can uninstall and reinstall while [passing the new username/password to the install command](xref:setup-agent#package-parameters).

### Use Chocolatey Central Management to change the service account username or password


If you use Chocolatey Central Management, you won't be able to use a deployment to uninstall the agent and then install the agent. This is because the agent cannot change the username/password while is it running. Instead, you can send a deployment that creates a scheduled task to uninstall the agent, then install with the new parameters.

> :memo: **NOTE** Due to limitations of Windows Task Scheduler, it is likely that your users will see the PowerShell window initially, but it should disappear once PowerShell has fully started.

An example advanced deployment script to do this is as follows:

```powershell
$delayInMinutes = 1
$action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-WindowStyle Hidden -Command choco uninstall chocolatey-agent -y ; choco install chocolatey-agent -y --params='/Username:<Username>' --package-parameters-sensitive='/Password:<Password>'"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($DelayInMinutes)
$principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
$settings = New-ScheduledTaskSettingsSet -Hidden
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "Upgrade chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal -Settings $settings -Verbose:$false
```

Be sure to use [Sensitive Variables](xref:ccm-sensitive-variables) to ensure the username and password don't get added to the Chocolatey logs when using Chocolatey Central Management version 0.7.0 or newer.
