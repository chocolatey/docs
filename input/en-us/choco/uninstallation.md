---
Order: 30
xref: choco-uninstallation
Title: How to uninstall
Description: Information on how to uninstall Chocolatey
RedirectFrom: docs/uninstallation
---

# Uninstalling Chocolatey

Should you decide you don't like Chocolatey, you can uninstall it simply by removing the folder (and the environment variable(s) that it creates).  Since it is not actually installed in Programs and Features, you don't have to worry that it cluttered up your registry (however that's a different story for the applications that you installed with Chocolatey or manually).

## Folder
Most of Chocolatey is contained in `C:\ProgramData\chocolatey` or whatever `$env:ChocolateyInstall` evaluates to. You can simply delete that folder.

> :memo: **NOTE**
>
> You might first back up the sub-folders `lib` and `bin` just in case you find undesirable results in removing Chocolatey. Bear in mind not every Chocolatey package is an installer package, there may be some non-installed applications contained in these subfolders that could potentially go missing. Having a backup will allow you to test that aspect out.

## Environment Variables
There are some environment variables that need to be adjusted or removed.

* ChocolateyInstall
* ChocolateyToolsLocation
* ChocolateyLastPathUpdate
* PATH (will need updated to remove)

## Script
There are no warranties on this script whatsoever, but here is something you can try:

> :warning: **WARNING**
>
> This will remove Chocolatey and all packages, software, and configurations in the Chocolatey Installation folder from your machine. Everything will be GONE. This is very destructive. DO NOT RUN this script unless you completely understand what the intention of this script is and are good with it. If you mess something up, we cannot help you fix it.

> :warning: **WARNING**
>
> Seriously, this script may destroy your machine and require a rebuild. It may have varied results on different machines in the same environment. Think twice before running this.

<p class="text-danger"><strong>Click the red button below to reveal the uninstall scripts.</strong></p>
<button class="btn btn-danger btn-collapse collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#uninstallScripts" aria-expanded="false" aria-controls="uninstallScripts">Yes, I understand the dangers of running these scripts</button>
<div id="uninstallScripts" class="collapse">
<div class="pt-3">

If you also intend to delete the Chocolatey directory, remove the `-WhatIf` switch from the `Remove-Item` call near the bottom:

~~~powershell
$VerbosePreference = 'Continue'
if (-not $env:ChocolateyInstall) {
    $message = @(
        "The ChocolateyInstall environment variable was not found."
        "Chocolatey is not detected as installed. Nothing to do."
    ) -join "`n"

    Write-Warning $message
    return
}

if (-not (Test-Path $env:ChocolateyInstall)) {
    $message = @(
        "No Chocolatey installation detected at '$env:ChocolateyInstall'."
        "Nothing to do."
    ) -join "`n"

    Write-Warning $message
    return
}

<#
    Using the .NET registry calls is necessary here in order to preserve environment variables embedded in PATH values;
    Powershell's registry provider doesn't provide a method of preserving variable references, and we don't want to
    accidentally overwrite them with absolute path values. Where the registry allows us to see "%SystemRoot%" in a PATH
    entry, PowerShell's registry provider only sees "C:\Windows", for example.
#>
$userKey = [Microsoft.Win32.Registry]::CurrentUser.OpenSubKey('Environment')
$userPath = $userKey.GetValue('PATH', [string]::Empty, 'DoNotExpandEnvironmentNames').ToString()

$machineKey = [Microsoft.Win32.Registry]::LocalMachine.OpenSubKey('SYSTEM\ControlSet001\Control\Session Manager\Environment\', $true)
$machinePath = $machineKey.GetValue('PATH', [string]::Empty, 'DoNotExpandEnvironmentNames').ToString()

$backupPATHs = @(
    "User PATH: $userPath"
    "Machine PATH: $machinePath"
)
$backupFile = "C:\PATH_backups_ChocolateyUninstall.txt"
$backupPATHs | Set-Content -Path $backupFile -Encoding UTF8 -Force

$warningMessage = @"
    This could cause issues after reboot where nothing is found if something goes wrong.
    In that case, look at the backup file for the original PATH values in '$backupFile'.
"@

if ($userPath -like "*$env:ChocolateyInstall*") {
    Write-Verbose "Chocolatey Install location found in User Path. Removing..."
    Write-Warning $warningMessage

    $newUserPATH = @(
        $userPath -split [System.IO.Path]::PathSeparator |
            Where-Object { $_ -and $_ -ne "$env:ChocolateyInstall\bin" }
    ) -join [System.IO.Path]::PathSeparator

    # NEVER use [Environment]::SetEnvironmentVariable() for PATH values; see https://github.com/dotnet/corefx/issues/36449
    # This issue exists in ALL released versions of .NET and .NET Core as of 12/19/2019
    $userKey.SetValue('PATH', $newUserPATH, 'ExpandString')
}

if ($machinePath -like "*$env:ChocolateyInstall*") {
    Write-Verbose "Chocolatey Install location found in Machine Path. Removing..."
    Write-Warning $warningMessage

    $newMachinePATH = @(
        $machinePath -split [System.IO.Path]::PathSeparator |
            Where-Object { $_ -and $_ -ne "$env:ChocolateyInstall\bin" }
    ) -join [System.IO.Path]::PathSeparator

    # NEVER use [Environment]::SetEnvironmentVariable() for PATH values; see https://github.com/dotnet/corefx/issues/36449
    # This issue exists in ALL released versions of .NET and .NET Core as of 12/19/2019
    $machineKey.SetValue('PATH', $newMachinePATH, 'ExpandString')
}

# Adapt for any services running in subfolders of ChocolateyInstall
$agentService = Get-Service -Name chocolatey-agent -ErrorAction SilentlyContinue
if ($agentService -and $agentService.Status -eq 'Running') {
    $agentService.Stop()
}
# TODO: add other services here

Remove-Item -Path $env:ChocolateyInstall -Recurse -Force -WhatIf

'ChocolateyInstall', 'ChocolateyLastPathUpdate' | ForEach-Object {
    foreach ($scope in 'User', 'Machine') {
        [Environment]::SetEnvironmentVariable($_, [string]::Empty, $scope)
    }
}

$machineKey.Close()
$userKey.Close()
~~~

Additionally, the below code will remove the environment variables pointing to the tools directory that was managed by Chocolatey.
If you want to remove the actual directory from disk, remove the `-WhatIf` switch from the `Remove-Item` call below as well.

~~~powershell
if ($env:ChocolateyToolsLocation -and (Test-Path $env:ChocolateyToolsLocation)) {
    Remove-Item -Path $env:ChocolateyToolsLocation -WhatIf -Recurse -Force
}

foreach ($scope in 'User', 'Machine') {
    [Environment]::SetEnvironmentVariable('ChocolateyToolsLocation', [string]::Empty, $scope)
}
~~~
</div>
</div>