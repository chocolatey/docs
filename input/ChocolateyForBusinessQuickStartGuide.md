# Chocolatey for Business Quick Start Implementation Guide

Thank you for choosing Chocolatey as your partner in Windows software automation management. We are excited to help you dive in and successfully implement a deployment of all the necessary components.

> :memo: **NOTE**
>
> This quick-start guide is intended for customers who have recently purchased Chocolatey for Business (C4B), or are evaluating C4B as part of a proof-of-concept. 
> It illustrates only **one** method of setting up your Chocolatey environment, and is by **NO** means exhaustive. 
> Our goal is to get you up-and-running quickly, and testing out the feature set. 
> For a more complete reference of possible scenarios and solutions, please refer to the [[Organizational Deployment Documentation|HowToSetupOfflineInstallation]].

If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.

Let's get started!

<!-- TOC depthFrom:2 -->

- [Components](#components)
- [Requirements](#requirements)
    - [Administrator Workstation](#administrator-workstation)
    - [Repository Server (Nexus):](#repository-server-nexus)
    - [Deployment/Configuration Management Solution](#deploymentconfiguration-management-solution)
    - [Central Management Server](#central-management-server)
    - [Clients/Nodes:](#clientsnodes)
- [Installation](#installation)
    - [Preparation on Administrator Workstation](#preparation-on-administrator-workstation)
    - [Repository Server Setup](#repository-server-setup)
    - [Back on Administrative Workstation](#back-on-administrative-workstation)
    - [Client Nodes](#client-nodes)
    - [Central Management Server](#central-management-server-1)
    - [Conclusion](#conclusion)

<!-- /TOC -->

## Components

![Implementation Diagram](images/C4B-implementation-diagram.jpg)<!--remove {.border style="max-width:820px;"} remove-->

As illustrated in the diagram above, there are five main components to a default Chocolatey install, namely:

1. **Administrator Workstation**: This is the workstation of the implementer. Internet access, as well as running from an administrator-level user, are required.
1. **Repository Server**: This is the application that will serve out the Nuget package (.nupkg) files internally. This guide will assume you'd like to use Sonatype [Nexus](https://www.sonatype.com/nexus-repository-oss), although Jfrog [Artifactory](https://jfrog.com/artifactory/) is an equally-suitable option. Further repository details are available at [[repository options|HowToHostFeed]].
1. **Deployment/Configuration Management Solution**: We are going to stick to PowerShell commands and scripts in this guide. However, it is _strongly_ recommended to use a full-featured configuration management solution to manage your package deployments. Some examples are Puppet, Chef, Ansible, and SaltStack. Read more about them on the [[Infrastucture Automation page|FeaturesInfrastructureAutomation]].
1. **Central Management Server**: This is a standalone server that hosts the Chocolatey Central Management web interface, as well as the back-end database on which it relies. Currently, this interface provides reporting on packages installed on endpoints. In future, a feature will be added to enable deployments of packages and updates from this web console, as well. Installation of this component is not detailed in the scope of this guide, but the current documentation can be found on the the [Chocolatey Central Management Setup page](https://chocolatey.org/docs/central-management-setup). Your Chocolatey for Business license (including trial) does entitle you to this feature.
1. **Clients/Nodes**: These are the workstation or server endpoints you wish to manage packages on, with Chocolatey. Every node requires a license.

---

## Requirements

Below are the recommended guidelines of what's required for this specific deployment. More of each resource is preferred, if available.

### Administrator Workstation

* Windows 7+ / Windows Server 2003+ (ideally, Windows 10)
* 2 cores (more preferred)
* 4-8 GB RAM
* 100 GB of free disk space (for package creation)
* Internet access
* Administrator user rights
* All commands should be run from Administrator PowerShell window

### Repository Server (Nexus):

* Windows Server 2012+ (ideally, Windows Server 2016)
* 4+ CPU cores (more preferred)
* 16 GB+ RAM (4GB of RAM reserved specifically for JRE)
* 1 TB of free space for local artifact storage (details [here](https://help.sonatype.com/repomanager3/system-requirements))
* Internet access
* Administrator user rights
* All commands should be run from Administrator PowerShell window

### Deployment/Configuration Management Solution

Again, this is out of the scope of this document, but _highly_ recommended when scaling out deployments. Read more about configuration management solutions on the [[Infrastructure Automation page|FeaturesInfrastructureAutomation]].

### Central Management Server

As with configuration managers, this is out-of-scope for this document. Generally, though, enough resources to host an ASP.NET IIS deployment and a SQL Server back end are recommended. Requirements for this server are detailed [[here|FeaturesChocolateyCentralManagement#requirements]].

### Clients/Nodes:

* Start with 1 or 2 endpoints (scale up after initial config and testing)
* Windows 7+ / Windows Server 2003+ (ideally, Windows 10 / Windows Server 2016)
* PowerShell v2+ (not PowerShell Core)
* .NET Framework 4.6.1+ (minimum required version for Chocolatey Central Management access)

---

## Installation

### Preparation on Administrator Workstation

1. From an Administrator PowerShell Window, run the following command to install Chocolatey:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```

1. Download the `chocolatey.license.xml.txt` file that was attached your trial e-mail. Also, download the `chocolatey-c4b-quickstart.nupkg` file from the link in that same email. Save both the files to the administrator workstation, and make note of the **full file path** for the next step.
1. From an Administrator PowerShell Window, browse to the folder where you copied the above two files. Run the following command to install the `chocolatey-c4b-quickstart` package, making sure to pass the **full file path** to your license file:

    ```powershell
    choco install chocolatey-c4b-quickstart --source . -y --params "'/LicenseFile:<FULL_PATH_TO_LICENSE_FILE>'"
    ```

    <!--remove {.list-style-type-disc} remove-->
    > :memo: **NOTE**: We have built this package to SIMPLIFY the initial setup greatly; it will perform the following:
    > * Download appropriate ".nupkg" files needed to setup Chocolatey.
    > * Install the license file in the correct directory
    > * Download a script for Offline install of Chocolatey on endpoints

1. From an Administrator PowerShell Window, run the following command to install the `chocolatey.extension` package:

    ```powershell
    choco install chocolatey.extension -y --source="'C:\choco-setup\packages'"
    ```

### Repository Server Setup

As recommended, we will assume you have access to the internet from this server. You will need at least a temporary firewall allowance for this, in order to follow the below steps.

1. Copy the entire `C:\choco-setup` directory from the Administrator workstation to the same location on your repository server.
1. From an Administrator PowerShell Window, run the following command to install Chocolatey:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
    ```

1. From an Administrator PowerShell Window, run the following command to copy the license into the correct directory:

    ```powershell
    $null = New-Item $env:ChocolateyInstall\license -ItemType Directory -Force
    Get-ChildItem -Path "C:\choco-setup" -Recurse | Where-Object { $_.Name -match "'chocolatey.license'" } | Copy-Item "'$($_.Fullname)'" "'$env:ChocolateyInstall\chocolatey.license.xml'" -Force
    ```

1. From an Administrator PowerShell Window, run the following command to install the `chocolatey.extension` package:

    ```powershell
    choco install chocolatey.extension -y --source="'C:\choco-setup\packages'"
    ```

1. From an Administrator PowerShell Window, run the following command to install the `nexus-repository` package:

    ```powershell
    choco install nexus-repository -y --no-progress
    ```

    > :warning: **WARNING**
    >
    > If you have already installed your Nexus repository, then the above step is not required. 
    > This guide assumes you are starting form scratch. It may be easier, if you are following this verbatim and don't have anything in your repositoryyet, to simply run `choco uninstall nexus-repository -y` and then `choco install nexus-repository -y`. 
    > As the next step requires a freshly-installed Nexus repository, with admin passwords not reset, this would be the most compatible approach.

1. Versions of Nexus newer than 3.21 have disabled the ability to run automated scripting by default. However, we'll need this to be enabled in order to automate our repository cleanup and creation.
From an Administrator PowerShell Window, run the following command to install the enable Nexus scripting, and to restart the Nexus service for the changes to take effect:

    ```powershell
    Add-Content C:\ProgramData\sonatype-work\nexus3\etc\nexus.properties "nexus.scripts.allowCreation=true"
    Restart-Service -Name nexus
    ```

1.  Download the `chocolatey-nexus-setup` package from the link provided in your trial email, and save it to the `\choco-setup\packages` directory on the Nexus server. From an Administrator PowerShell console, run:

    ```powershell
    choco install chocolatey-nexus-setup --source="'C:\choco-setup\packages'"
    ```

    <!--remove {.list-style-type-disc} remove-->
    >This package will do the following:
    >- Remove unwanted demo repositories
    >- Add a "choco-hosted" Nuget repository
    >- Add a "choco-install" raw repository
    >- Add an "Install.ps1" script to the "choco-install" raw repository
    >- Enable the Nuget API key realm
    >- Output the API key for the Nexus server (copy this key for a later step)

1. You will require Google Chrome in order to login to the Nexus web UI (site can appear unresponsive in IE). From an Administrator PowerShell console, run:

    ```powershell
    choco install googlechrome -y
    ```

1. The administrative password for the Nexus web UI can be found in the following file:

    ```cmd
    C:\ProgramData\sonatype-work\nexus3\admin.password
    ```

Copy this password out of the above file, and use it for the next step.

1. Login to the Nexus web UI (with Google Chrome) at http://localhost:8081 using the username "admin" and the password from above. Follow the prompts to reset the "admin" credential, and check the box to enable anonymous access. You can choose to not enable anonymous access, but passing credentials to acces the repository is out of the scope of this document.

### Back on Administrative Workstation

1. Download the script from [[Exercise 4 here|HowToSetupOfflineInstallation#exercise-4-create-a-package-for-the-license]], and save it in your `choco-setup\files` folder as `Add-LicensePackage.ps1`.
Run this script in a PowerShell Administrator console, to create the license package.
1. Ensure the chocolatey nupkg itself is in the C:\choco-setup\packages directory. The following code accomplishes this:

    ```powershell
    Copy-Item "'$env:ChocolateyInstall\lib\chocolatey\chocolatey.nupkg'" C:\choco-setup\packages
    ```

1. Upload all ".nupkg" files from `C:\choco-setup\packages` to Nexus repository using the fully-qualified domain name (FQDN) and apikey of the Nexus server:

    ```powershell
    Get-ChildItem "'C:\choco-setup\packages\*.nupkg'" |
    Foreach-Object {
        choco push $_.FullName --source="'http://<_FQDN_OF_REPOSITORY_>:8081/repository/choco-hosted/'" -k="'<_API_KEY_>'" --force
    }
    ```

### Client Nodes

1. Install Chocolatey using the offline `Install.ps1` script from offline repository:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('http://<_FQDN_OF_REPOSITORY_>:8081/repository/choco-install/Install.ps1'))
    ```

1. Add the Nexus repository as a Chocolatey source:

    ```powershell
    choco source add --name="'choco-hosted'" --source="'http://<_FQDN_OF_REPOSITORY_>:8081/repository/choco-hosted/'"
    ```

1. Remove Chocolatey Community Repository as a souce:

    ```powershell
    choco source remove --name="'chocolatey'"
    ```

1. Install the `chocolatey-license` package:

    ```powershell
    choco install chocolatey-license -y
    ```

1. Install the `chocolatey.extension` package:

    ```powershell
    choco install chocolatey.extension -y
    ```

### Central Management Server

Again, the setup of the Chocolatey Central Management server is beyond the scope of this document (please read over and follow the detailed instructions on the [Chocolatey Central Management Setup page](https://chocolatey.org/docs/central-management-setup).

### Conclusion

Congratulations! If you followed all the steps detailed above, you should now have a fully-functioning Chocolatey implementation deployed in your environment.

It is worth mentioning that some customers may have a more bespoke environment, with the presence of proxies and additional configuration management applications. Chocolatey is engineered to be quite flexible, specifically to account for these scenarios. Please refer to the many options for installation referenced on the [[Installation page|Installation#more-install-options]]. Again, If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.
