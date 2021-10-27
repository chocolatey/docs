---
Order: 30
xref: upgrade-agent
Title: Upgrade
Description: Information on how to upgrade Chocolatey Agent
---

This will guide us through upgrading Chocolatey Agent to a newer version.

## Step 1: Uninstall Chocolatey Agent

```powershell
choco uninstall chocolatey-agent -y
```

## Step 2: Install new version of Chocolatey Agent

```powershell
choco install chocolatey-agent -y
```

## Automated upgrade using [Chocolatey Central Management](xref:central-management)

If you use Chocolatey Central Management, you can't just send a deployment to uninstall the agent and then install the new one. This is because the agent is the one running the tasks. In this case you can send a deployment that creates a scheduled task to uninstall the agent, then install the new version.

> :memo: **NOTE** Due to limitations of Windows Task Scheduler, it is likely that your users will see the Chocolatey command as it's running.

The Advanced deployment script to do this is as follows:

```powershell
$DelayInMinutes = 1
$action = New-ScheduledTaskAction -Execute 'cmd.exe' -Argument "/c choco uninstall chocolatey-agent -y && choco install chocolatey-agent -y"
$trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($DelayInMinutes)
$principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "Upgrade chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal
```

## Change service account username or password

If you need to change the username or password used by the Chocolatey Agent, you can either change it through Windows Service Manager, or you can uninstall and reinstall while [passing the new username/password to the install command](xref:setup-agent#package-parameters).
