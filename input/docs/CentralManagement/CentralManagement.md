# Chocolatey Central Mangement (CCM)

Chocolatey Central Management (CCM) provides you insights across your desktop and endpoint environments. CCM is available with Chocolatey for Business only.

Once installed and configured, you can use CCM to:

* Bring reporting to the organizational level
* Quickly see all software across the organization and see what needs attention immediately
* Create reports for tracking and auditing purposes
* Manage endpoints with deployments through groups and collections

![Central Management Logo](images/features/ccm/central-management.png)

This provides an overview on Chocolatey Central Mangement (CCM). It provides both setup and use of CCM.

___
<!-- TOC depthFrom:2 depthTo:5 -->

- [CCM Components](#ccm-components)
  - [CCM Component Compatibility Matrix](#ccm-component-compatibility-matrix)
- [Getting CCM](#getting-ccm)
- [Stay Up To Date](#stay-up-to-date)
- [Links](#links)
  - [Setup / Installation](#setup--installation)
  - [Setup / Upgrade](#setup--upgrade)
  - [Using Central Management](#using-central-management)
- [Related Articles](#related-articles)
- [Roadmap](#roadmap)
- [FAQs](#faqs)
  - [How do I take advantage of Chocolatey Central Management?](#how-do-i-take-advantage-of-chocolatey-central-management)
  - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
  - [Will this become available for lower editions of Chocolatey?](#will-this-become-available-for-lower-editions-of-chocolatey)
  - [What's the minimum version of the Chocolatey packages I need to use CCM?](#whats-the-minimum-version-of-the-chocolatey-packages-i-need-to-use-ccm)
  - [Where can I find all the log files for Chocolatey Central Management](#where-can-i-find-all-the-log-files-for-chocolatey-central-management)
  - [Where can I find the changelog or release notes for Chocolatey Central Management?](#where-can-i-find-the-changelog-or-release-notes-for-chocolatey-central-management)
  - [How do I get support?](#how-do-i-get-support)
  - [How do I set up Chocolatey Central Management?](#how-do-i-set-up-chocolatey-central-management)
  - [What is the CCM compatibility matrix?](#what-is-the-ccm-compatibility-matrix)
  - [If I update the license file, do I need to restart my services and web?](#if-i-update-the-license-file-do-i-need-to-restart-my-services-and-web)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [Computers checking in are overwriting each other](#computers-checking-in-are-overwriting-each-other)
  - [An Internal error occurred during your request](#an-internal-error-occurred-during-your-request)
  - [System.Data.SqlClient.SqlException: Invalid column name](#systemdatasqlclientsqlexception-invalid-column-name)

<!-- /TOC -->

___
## CCM Components

The following are all of the Chocolatey components required for Central Management to work.

* Chocolatey (`chocolatey` package) v0.10.12+
* Chocolatey for Business (C4B) Edition.
* Chocolatey Licensed Extension (`chocolatey.extension` package) v2.0.0+
* Chocolatey Agent (`chocolatey-agent` package) v0.9.0+
* CCM Database (`chocolatey-management-database` package) v0.1.0+
  * This deploys the CCM database schema to a specified SQL Server instance
* CCM Service (`chocolatey-management-service` package) v0.1.0+
  * This installs the CCM Service, which the Chocolatey Agent will communicate with.
* CCM Website (`chocolatey-management-web` package) v0.1.0+
  * This is the CCM front end website that is the main user interface of the application

### CCM Component Compatibility Matrix
Central Management has specific needs that are mostly handled by packaging aspects. As the Chocolatey Agent and Central Management communicate with each other, there are some versions that may not be compatible with each other due to mistakes or fixes that needed to be implemented. This serves as a means of capturing that for you.

> :memo: **NOTE**
>
> Central Management packages (all three) are treated as a singular unit, meaning all three packages across one or more machines must all be on the same version. Using different versions of Central Management packages (db, service, web) is completely unsupported and likely will not even work properly.

|Central Management|Chocolatey Agent|Chocolatey Licensed Extension|Chocolatey|
|------------------|----------------|-----------------------------|----------|
|0.3.0+            |0.11.0+         | 2.1.0+                      | 0.10.15+ |
|0.2.x             |0.10.x          | 2.1.0+                      | 0.10.15+ |
|0.1.1             |0.9.x           | 2.0.3+                      | 0.10.15+ |
|0.1.0             |0.9.x           | 2.0.0+                      | 0.10.12+ |

____
## Getting CCM
CCM is only available for Chocolatey for Business (C4B) customers. If you are a C4B customer, you can head to the install components section:

* [[Central Management Setup|CentralManagementSetup]]
* [[Central Management Client Setup|CentralManagementSetupClient]]

If you are not a customer yet, you can [reach out for a trial](https://chocolatey.org/contact/trial).

> :memo: **NOTE**
>
> Trials are limited to organizations. If you are personally wanting to work with CCM and other C4B components, you can purchase a C4B starter pack - see [pricing](https://chocolatey.org/pricing).

___
## Stay Up To Date
* [[Release Notes Central Management|ReleaseNotesCentralManagement]]
* [Release Announcements Only Mailing List](https://groups.google.com/group/chocolatey-announce)

___
## Links

### Setup / Installation
* [[Central Management Setup|CentralManagementSetup]]
    * [[Central Management Database Setup|CentralManagementSetupDatabase]]
    * [[Central Management Service Setup|CentralManagementSetupService]]
    * [[Central Management Web Setup|CentralManagementSetupWeb]]
* [[Central Management Client Setup|CentralManagementSetupClient]]

### Setup / Upgrade
* [[Upgrading Central Management|CentralManagementSetupUpgrade]]

### Using Central Management

* [[CCM Computers|CentralManagementComputers]]
* [[CCM Software|CentralManagementSoftware]]
* [[CCM Groups|CentralManagementGroups]]
* [[CCM Deployments|CentralManagementDeployments]]
* [[CCM Reports|CentralManagementReports]]

![CCM Overview](images/features/ccm/ccm_overview.jpg)

___
## Related Articles

* [[Quick Deployment Environment (QDE)|QuickDeploymentEnvironment]]

___
## Roadmap

Chocolatey Central Management will allow:

* ~~Centralized Software Management for your entire organization.~~ Completed June 2020.
* ~~Centralized reporting of software.~~ Completed May 2019
* ~~Know immediately what software is out of date and on what machines.~~ Completed May 2019
* ~~Know within seconds the entire estate of software and what versions are installed.~~ Completed May 2019
  * ~~Including zips and archives* that do not show up in Programs and Features~~ Completed May 2019
  * ~~Including internal software* that does not show up in Programs and Features~~ Completed May 2019
* Adhoc reporting for a particular machine or set of machines
* ~~Run arbitrary Chocolatey commands against one or more machines~~ Completed June 2020.
* ~~See how many machines you are actively managing in your organization~~ Completed May 2019
* More...

\* - When deployed through Chocolatey.

____
## FAQs
### How do I take advantage of Chocolatey Central Management?
You must have a [Business edition of Chocolatey](https://chocolatey.org/compare). Business editions are great for organizations that need to manage the total software lifecycle.

### I'm a licensed customer, now what?
See [Getting CCM](#getting-ccm).

### Will this become available for lower editions of Chocolatey?
CCM will only be available in Chocolatey for Business (C4B).

### What's the minimum version of the Chocolatey packages I need to use CCM?
See [CCM Components](#ccm-components).

### Where can I find all the log files for Chocolatey Central Management
Chocolatey Central Management is made up of a number of components, so there will be a few possible places to find the log files, which you may be asked for when engaging with support.

* The Chocolatey Central Management Website log file located at `c:\tools\chocolatey-management-web\App_Data\Logs\ccm-website.log`. If you are on a version of CCM prior to 0.2.0, the log will be located at `c:\tools\chocolatey-management-web\App_Data\Logs\Logs.txt`.
* The Chocolatey Central Management service log file is located at `$env:ChocolateyInstall\logs\ccm-service.log`. If you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.
* The Chocolatey Agent log file is located at `$env:ChocolateyInstall\logs\chocolatey-agent.log`. If you are on a version of Chocolatey Agent prior to 0.10.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service\logs\chocolatey-agent.log`.

### Where can I find the changelog or release notes for Chocolatey Central Management?

Please see [[Release Notes Central Management|ReleaseNotesCentralManagement]].

### How do I get support?

Please run `choco support` from a licensed edition and follow the instructions.

### How do I set up Chocolatey Central Management?

You can start from a pre-configured environment known as [[Quick Deployment Environment (QDE)|QuickDeploymentEnvironment]], or see [Setup / Installation](#setup--installation).

### What is the CCM compatibility matrix?
Central Management has specific compatibility requirements with quite a few moving parts. It is important to understand that there are some Chocolatey Agent versions that may not be able to communicate with some versions of CCM and vice versa.  Please see the [CCM Component Compatibility Matrix](#ccm-component-compatibility-matrix) for details.

### If I update the license file, do I need to restart my services and web?
Yes, you do need to restart the agents, the service, and the web to pick up the license. Here's a handy script:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Process ChocolateySoftware.ChocolateyManagement.Web.Mvc | Stop-Process
Get-Service chocolatey-* | Start-Service
```

For your agent machines:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Service chocolatey-* | Start-Service
```


___
## Common Errors and Resolutions
### Computers checking in are overwriting each other
You are generating machines from a base image that already had Chocolatey commercial code on it. This is okay, but you need to remove the Chocolatey Machine Id Guid, which is used to identify a machine as unique.

When the licensed agent service is installed on a machine, a unique machine id is given to the machine. If you are starting from a template, there is no opportunity for that to be different and when those machines start checking in, they will start overwriting each other.

Basically you need to go find the machine id at `HKEY_LOCAL_MACHINE\SOFTWARE\Chocolatey\` (`UniqueId`) and remove it as part of your image deployment mechanism.

```powershell
Write-Host "Removing Chocolatey Unique Machine GUID"
Remove-ItemProperty -Path "HKLM:\Software\Chocolatey" -Name "UniqueId" -Force
# Restart the Agent Service if it is running
```

Once you've removed this, you'll need to restart the Agent Service to get it regenerated.

> :information_source: You may ***also*** need to remove the ChocolateyLocalAdmin user (if you are using it for services) and reinstall the Agent service (and CCM service if on this machine) to get that password corrected.

### An Internal error occurred during your request
Check the log files. You may have incorrect database access, but most likely it can come because you didn't follow the steps for setup appropriately.

### System.Data.SqlClient.SqlException: Invalid column name
This means you are upgrading things out of order. Please make sure your database is upgraded first, then the service, then the web.

