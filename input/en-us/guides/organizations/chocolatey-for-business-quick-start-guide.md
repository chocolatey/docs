---
Order: 30
xref: c4b-quick-start-guide
Title: Chocolatey for Business (C4B) Quick Start Guide
Description: Get up and running quickly with Chocolatey for Business
RedirectFrom: docs/chocolatey-for-business-quick-start-guide
---

Thank you for choosing Chocolatey as your partner in Windows software automation management. We are excited to help you dive in and successfully implement a deployment of all the necessary components.

> :memo: **NOTE**
>
> This quick-start guide is intended for customers who have recently purchased Chocolatey for Business (C4B), or are evaluating C4B as part of a proof-of-concept.
> It illustrates only **one** method of setting up your Chocolatey environment, and is by **NO** means exhaustive.
> Our goal is to get you up-and-running quickly, and testing out the feature set.
> For a more complete reference of possible scenarios and solutions, please refer to the [Organizational Deployment Documentation](xref:organizational-deployment-guide).

If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.

Let's get started!

## Components

![Chocolatey for Business Server Components](/assets/images/c4b-server.png)

As illustrated in the diagram above, there are four main components to a Chocolatey For Business installation; namely:

1. **C4B Licensed components**: A licensed version of Chocolatey includes:
    * Installation of the Chocolatey OSS client package itself (`chocolatey`)
    * Chocolatey license file (`chocolatey.license.xml`) installed in the correct directory (`ProgramData\chocolatey\license`)
    a. Installation of the Chocolatey Licensed extension (`chocolatey.extension`), giving you access to features like Package Builder, Package Internalizer, etc. (full list [here](https://docs.chocolatey.org/en-us/features/)).
    <p></p>

1. **NuGet V2 Repository Server App (Nexus)**: Chocolatey works best with a NuGet V2 repository. This application hosts and manages versioning of your Chocolatey package artifacts, in their enhanced NuGet package (.nupkg) file format. This guide will help you setup [Sonatype Nexus Repository Manager (OSS)](https://www.sonatype.com/nexus-repository-oss).

1. **Chocolatey Central Management (CCM)**: CCM is the Web UI portal for your entire Chocolatey environment. Your endpoints check-in to CCM to report their package status. This includes the Chocolatey packages they have installed, and whether any of these packages are outdated. And now, with CCM Deployments, you can also deploy packages or package updates to groups of endpoints, as well as ad-hoc PowerShell commands. CCM is backed by an MS SQL Database. This guide will set up MS SQL Express for you.

1. **Automation Pipeline (Jenkins)**: A pipeline tool will help you automate repetitive tasks, such checking for updates to a set of Chocolatey Packages from the Chocolatey Community Repository (CCR). If updates exist, the pipeline task will auto-internalize your list of packages, and push them into your NuGet repository for you. This guide will help you set up Jenkins as your automation pipeline.

## Requirements

Below are the minimum requirements for setting up your C4B server via this guide:
- Windows Server 2019+ (ideally, Windows Server 2019)
    - Windows Server 2016 is technically supported, but not recommended as it is nearing End-of-Life; also, you will require an additional setup script.
- 4+ CPU cores (more preferred)
- 16 GB+ RAM (8GB as a bare minimum; 4GB of RAM is reserved specifically for Nexus)
- 500 GB+ of free space for local NuGet package artifact storage (more is better, and you may have to grow this as your packages and versions increase)
- Open outgoing (egress) Internet access
- Administrator user rights

> :exclamation:**[IMPORTANT]** All commands should be run from an Administrator PowerShell window (and **not ISE**)

## Installation

### Step 0: Preparation of C4B Server

1. Provision your C4B server on the infrastructure of your choice.

1. Install all Windows Updates.

1. If you plan on joining your domain, do so now before beginning setup below.

1. If you plan to use a Purchased/Acquired or Domain SSL certificate, please ensure the CN/Subject value matches the DNS-resolvable Fully-Qualified Domain Name (FQDN) of your C4B Server. Place this certificate in the `Local Machine > Personal` certificate store, and ensure that the private key is exportable.

1. Copy your `chocolatey.license.xml` license file (from the email you received) onto your C4B Server.

### Step 1: Begin C4B Setup

1. Open a PowerShell console with the `Run as Administrator` option, and paste and run the following code:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::tls12
    $QuickStart = 'https://raw.githubusercontent.com/chocolatey/choco-quickstart-scripts/main/Start-C4BSetup.ps1'
    Invoke-Expression -Command ((New-Object System.Net.WebClient).DownloadString($QuickStart))
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Install of Chocolatey from https://chocolatey.org</li>
    > <li>Prompt for your C4B license file location, with validation</li>
    > <li>Script to help turn your C4B license into a Chocolatey package</li>
    > <li>Setup of local `choco-setup` directories</li>
    > <li>Download of setup files from "choco-quickstart-scripts" GitHub repo</li>
    > <li>Download of Chocolatey packages required for setup)</li>
    > </ul>
    > </details>

### Step 2: Nexus Setup

1. In the same PowerShell Administrator console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4BNexusSetup.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Sonatype Nexus Repository Manager OSS instance</li>
    > <li>Prompt for your C4B license file location, with validation</li>
    > <li>Cleans up all demo repositories on Nexus</li>
    > <li>Creates a `ChocolateyInternal` NuGet repository</li>
    > <li>Creates a `ChocolateyTest` NuGet repository</li>
    > <li>Creates a `choco-install` raw repository</li>
    > <li>Sets up `ChocolateyInternal` on C4B Server as source, with API key</li>
    > <li>Sets up firewall rule for repository access</li>
    > <li>Installs MS Edge, and disable first-run experience</li>
    > <li>Outputs data to JSON to pass between scripts</li>
    > </ul>
    > </details>

### Step 3: CCM Setup

1. In the same PowerShell Administrator console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4bCcmSetup.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs MS SQL Express</li>
    > <li>Creates `ChocolateyManagement` database, and adds appropriate `ChocoUser` permissions</li>
    > <li>Installs all 3 CCM packages (`database, service, web`), with correct parameters</li>
    > <li>Outputs data to JSON to pass between scripts</li>
    > </ul>
    > </details>

### Step 4: SSL Setup

1. In the same PowerShell Administrator console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Set-SslSecurity.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Adds SSL certificate configuration for Nexus and CCM Web</li>
    > <li>Outputs data to JSON to pass between scripts</li>
    > <li>Generates a `Register-C4bEndpoint.ps1` script for you to easily set up endpoint clients</li>
    > <li>Outputs data to JSON to pass between scripts</li>
    > </ul>
    > </details>

### Step 5: Jenkins Setup

1. In the same PowerShell Administrator console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4bJenkinsSetup.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Jenkins package (pinned to a specific version)</li>
    > <li>Updates Jenkins plugins</li>
    > <li>Configures pre-downloaded Jenkins scripts for Package Internalizer automation</li>
    > <li>Sets up pre-defined Jenkins jobs for the scripts above</li>
    > <li>Auto-opens web portals for CCM, Nexus, and Jenkins in your web browser</li>
    > <li>Outputs data to JSON to pass between scripts</li>
    > </ul>
    > </details>

### Step 6: Setting up Endpoints

1. Find the `Register-C4bEndpoint.ps1` script in the `choco-setup\files\scripts\` directory on your C4B Server. Copy this script to your client endpoint.

1. Open a PowerShell Administrator console on your client endpoint, and browse (`cd`) to the location you copied the script above. Paste and run the following code:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::tls12
    .\Register-C4bEndpoint.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Chocolatey client (`chocolatey`), using a script from your raw "`choco-install`" repository</li>
    > <li>Runs the `ClientSetup.ps1` script from your raw "`choco-install`" repository, which does the following:</li>
    > <li>- Licenses Chocolatey by installing the license package (`chocolatey-license`) created during QDE setup</li>
    > <li>- Installs the Chocolatey Licensed Extension (`chocolatey.extension`) without context menus</li>
    > <li>- Configures ChocolateyInternal source</li>
    > <li>- Disables access to the `chocolatey` public Chocolatey Community Repository (CCR)</li>
    > <li>- Configures Self-Service mode and installs Chocolatey GUI (`chocolateygui`)</li>
    > <li>- - Configures Central Management (CCM) check-in, and opts endpoints into CCM Deployments</li>
    > </ul>
    > </details>

### Conclusion

Congratulations! If you followed all the steps detailed above, you should now have a fully-functioning Chocolatey for Business implementation deployed in your environment.

It is worth mentioning that some customers may have a more bespoke environment, with the presence of proxies and additional configuration management applications. Chocolatey is engineered to be quite flexible, specifically to account for these scenarios. Please refer to the many options for installation referenced on the [Installation page](xref:setup-licensed#more-install-options). Again, If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.
