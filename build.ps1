#!/usr/bin/env pwsh
$ErrorActionPreference = 'Stop'
$DotNetInstallerUri = 'https://dot.net/v1/dotnet-install.ps1';
$DotNetUnixInstallerUri = 'https://dot.net/v1/dotnet-install.sh'
$DotNetChannel = 'LTS'
$PSScriptRoot = Split-Path $MyInvocation.MyCommand.Path -Parent

[string] $DotNetVersion = '3.1.402'

###########################################################################
# INSTALL .NET CORE CLI
###########################################################################

$env:DOTNET_SKIP_FIRST_TIME_EXPERIENCE = 1
$env:DOTNET_CLI_TELEMETRY_OPTOUT = 1
$env:DOTNET_ROLL_FORWARD_ON_NO_CANDIDATE_FX = 2

Function Remove-PathVariable([string]$VariableToRemove) {
  $SplitChar = ';'
  if ($IsMacOS -or $IsLinux) {
    $SplitChar = ':'
  }

  $path = [Environment]::GetEnvironmentVariable("PATH", "User")
  if ($path -ne $null) {
    $newItems = $path.Split($SplitChar, [StringSplitOptions]::RemoveEmptyEntries) | Where-Object { "$($_)" -inotlike $VariableToRemove }
    [Environment]::SetEnvironmentVariable("PATH", [System.String]::Join($SplitChar, $newItems), "User")
  }

  $path = [Environment]::GetEnvironmentVariable("PATH", "Process")
  if ($path -ne $null) {
    $newItems = $path.Split($SplitChar, [StringSplitOptions]::RemoveEmptyEntries) | Where-Object { "$($_)" -inotlike $VariableToRemove }
    [Environment]::SetEnvironmentVariable("PATH", [System.String]::Join($SplitChar, $newItems), "Process")
  }
}

# Get .NET Core CLI path if installed.
$FoundDotNetCliVersion = $null;
if (Get-Command dotnet -ErrorAction SilentlyContinue) {
  $FoundDotNetCliVersion = dotnet --version;
}

if ($FoundDotNetCliVersion -ne $DotNetVersion) {
  $InstallPath = Join-Path $PSScriptRoot ".dotnet"
  if (!(Test-Path $InstallPath)) {
    New-Item -Path $InstallPath -ItemType Directory -Force | Out-Null;
  }

  if ($IsMacOS -or $IsLinux) {
    $ScriptPath = Join-Path $InstallPath 'dotnet-install.sh'
    (New-Object System.Net.WebClient).DownloadFile($DotNetUnixInstallerUri, $ScriptPath);
    & bash $ScriptPath --version "$DotNetVersion" --install-dir "$InstallPath" --channel "$DotNetChannel" --no-path

    Remove-PathVariable "$InstallPath"
    $env:PATH = "$($InstallPath):$env:PATH"
  }
  else {
    $ScriptPath = Join-Path $InstallPath 'dotnet-install.ps1'
    (New-Object System.Net.WebClient).DownloadFile($DotNetInstallerUri, $ScriptPath);
    & $ScriptPath -Channel $DotNetChannel -Version $DotNetVersion -InstallDir $InstallPath;

    Remove-PathVariable "$InstallPath"
    $env:PATH = "$InstallPath;$env:PATH"
  }
  $env:DOTNET_ROOT = $InstallPath
}

###########################################################################
# RUN BUILD SCRIPT
###########################################################################

$SCRIPT_NAME = "recipe.cake"

Write-Host "Restoring .NET Core tools"
dotnet tool restore
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Bootstrapping Cake"
dotnet cake $SCRIPT_NAME --bootstrap
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }

Write-Host "Running Build"
dotnet cake $SCRIPT_NAME @args
if ($LASTEXITCODE -ne 0) { exit $LASTEXITCODE }