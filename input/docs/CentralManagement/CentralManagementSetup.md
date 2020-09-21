# Chocolatey Central Mangement Setup

Installing CCM takes a little more pre-thought than simply running the package installs.
While it is envisioned that CCM will be installed across multiple servers (split installation), it is certainly possible to run CCM on a single server (monolithic).

When setting up Central Management, currently, the CCM packages do not provision the SQL Server Database Permissions that are required for the CCM components to function.  It is assumed that the necessary permissions have already been provided (see the [FAQ](#how-can-i-add-sql-server-permissions-through-powershell) for one method of doing it).

> :memo: **NOTE**
>
> Please read through all of this prior to running installation as you could run into issues that require support to help you correct later.


> :warning: **WARNING**
>
> Unless otherwise noted, please follow these steps in ***exact*** order. These steps build on each other and need to be completed in order.

> :memo: **NOTE**
>
> If this seems like a lot to set up, you have the ability to get access to the [[Quick Deployment Environment (QDE)|QuickDeploymentEnvironment]]. It comes preloaded with Central Management and other Chocolatey recommended infrastructure. Please see [[Quick Deployment Environment (QDE)|QuickDeploymentEnvironment]].

> :warning: **WARNING**
>
> All deployed components of the CCM packages should **always** be the ***SAME VERSION***. The only time you should not have this is when you are in a state of upgrading and that transition time should be quite short.

> :memo: **NOTE**: Looking for upgrade instructions? See [[Central Management Upgrade|CentralManagementSetupUpgrade]].

___
<!-- TOC depthFrom:2 depthTo:5 -->

- [High Level Requirements](#high-level-requirements)
- [Step 1: Internalize Packages](#step-1-internalize-packages)
- [Step 2: Setup Central Management Database](#step-2-setup-central-management-database)
- [Step 3: Setup Central Mangement Windows Service(s)](#step-3-setup-central-mangement-windows-services)
- [Step 4: Setup Central Management Website](#step-4-setup-central-management-website)
- [Step 5: Setting up Agent Machines](#step-5-setting-up-agent-machines)
- [Upgrading?](#upgrading)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [Executable script code found in signature block](#executable-script-code-found-in-signature-block)
  - [The client reports successful checkin, but nothing is showing up in CCM](#the-client-reports-successful-checkin-but-nothing-is-showing-up-in-ccm)

<!-- /TOC -->

____
## High Level Requirements
Central Management packages require at a minimum:

* Chocolatey for Business (C4B) Edition
* .NET Framework 4.6.1+
* Windows Server 2012+

Each package further defines dependencies that they include.

___
## Step 1: Internalize Packages

> :memo: **NOTE**
>
> Make sure you have read over the [[CCM Compability Matrix|CentralManagement#ccm-component-compatibility-matrix]] prior to starting internalization as this will save you some headaches.

The complete installation of CCM requires several packages that are available from the community repository. Let's get them internalized. We will internalize them to a `C:\packages` directory. It is highly recommended that you push the packages to an internal repository before continuing with other steps in this guide. Change the values in the first lines of this script to match what you need in your environment.


```powershell
# To run this, you need Chocolatey for Business installed (chocolatey / chocolatey.extension).
# - TRIALS are fine, but there are modifications noted in the script.

# Update the values and remove the < >
$YourInternalRepositoryPushUrl = '<INSERT REPOSITORY URL HERE>'
$YourInternalRepositoryApiKey = '<YOUR API KEY HERE>'
# You get this from the chocolatey.license.xml file:
$YourBusinessLicenseGuid = '<INSERT NON-TRIAL C4B LICENSE GUID HERE>'

if(!(Test-Path C:\packages)){
  $null = New-Item C:\packages -ItemType Directory
}

# Download Chocolatey community related items, no internalization necessary
choco download chocolatey chocolateygui --force --source="'https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"

# This is for other Community Related Items
choco download dotnet4.5.2 dotnet4.6.1 --force --internalize --internalize-all-urls --append-use-original-location --source="'https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"


# This is for SQL Server Express
# Not necessary if you already have SQL Server
@('sql-server-express','sql-server-management-studio') | Foreach-Object {
  choco download $_ --force --internalize --internalize-all-urls --append-use-original-location --source="'https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"
}

# We must use the 2.2.7 versions of these packages, so we need to download/internalize these specific items
@('aspnetcore-runtimepackagestore','dotnetcore-windowshosting') | Foreach-Object {
  choco download $_ --version 2.2.7 --force --internalize --internalize-all-urls --append-use-original-location --source="'https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"
}

# Download Licensed Packages
# TRIAL? You have download links, download the files - then place them in the c:\packages folder. Comment out this section
## DO NOT RUN WITH `--internalize` and `--internalize-all-urls` - see https://github.com/chocolatey/chocolatey-licensed-issues/issues/155
choco download chocolatey-agent chocolatey.extension chocolatey-management-database chocolatey-management-service chocolatey-management-web --force --source="'https://licensedpackages.chocolatey.org/api/v2/'" --ignore-dependencies --output-directory="'C:\packages'"  --user="'user'" --password="'$YourBusinessLicenseGuid'"

# Push all downloaded packages to your internal repository
Get-ChildItem C:\packages -Recurse -Filter *.nupkg | Foreach-Object { choco push $_.Fullname --source="'$YourInternalRepositoryPushUrl'" --api-key="'$YourInternalRepositoryApiKey'"}
```

> :information_source: If you are on a TRIAL, you have a step in the script above that you are skipping - noted by "TRIAL?" This is because you don't have direct access to the licensed repository. You will have received an email with download links that contained your trial license file. Refer back to that for the downloads.

___
## Step 2: Setup Central Management Database
Please see [[Central Management Database Setup|CentralManagementSetupDatabase]].

> :memo: **NOTE**: While we'd like to support different database engines at some point in the distant future, currently only SQL Server is supported.

___
## Step 3: Setup Central Mangement Windows Service(s)
Please see [[Central Management Service Setup|CentralManagementSetupService]].

> :memo: **NOTE**: If Step 1 is not succesful, do not move on to this step until you resolve issues with database setup.

___
## Step 4: Setup Central Management Website
Please see [[Central Management Web Setup|CentralManagementSetupWeb]].

> :memo: **NOTE**: If Step 1 or 2 is not succesful, do not move on to this step until you resolve issues with previous steps.

___
## Step 5: Setting up Agent Machines
Please see [[Central Management Client Setup|CentralManagementSetupClient]].

___
## Upgrading?
Looking for upgrade instructions? See [[Central Management Upgrade|CentralManagementSetupUpgrade]].

___
## Common Errors and Resolutions
### Executable script code found in signature block
When attempting to install some components of Chocolatey, you may have seen this error. This was a bug due to how the script at [Step 1: Internalize Packages](#step-1-internalize-packages) was exasperating a known issue at https://github.com/chocolatey/chocolatey-licensed-issues/issues/155.

Please go back through Step 1 and re-internalize those packages. You may need to overwrite any you would have pushed up (many if it won't let you do a push). In Nexus, you can remove the existing items and then upload through there. In other repositories you may need to remove the existing package versions you deployed first.

### The client reports successful checkin, but nothing is showing up in CCM
You need to check the CCM service logs. The agent will always report success when it communicates with the service successfully. The service may reject what it receives, but due to security settings, it won't tell the client about that.

The logs are located at `$env:ChocolateyInstall\logs\ccm-service.log`. If you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.


___
[[Chocolatey Central Management|CentralManagement]]
