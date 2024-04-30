$scriptDir = $(Split-Path -parent $MyInvocation.MyCommand.Definition)

# Install chocolatey if required
Try
{
  Get-Command choco -ErrorAction Stop
}
Catch
{
  Write-Host "Chocolatey not installed..."
  Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

  $ChocolateyProfile = "$env:ChocolateyInstall\helpers\chocolateyProfile.psm1"
  if (Test-Path($ChocolateyProfile)) {
   Import-Module "$ChocolateyProfile"
  }
}

Write-Host "Installing base line applications for Chocolatey docs..."
choco upgrade nodejs-lts -y --no-progress