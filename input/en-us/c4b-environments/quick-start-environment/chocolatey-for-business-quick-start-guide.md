---
Order: 20
xref: c4b-quick-start-guide
Title: C4B Quick Start Guide
Description: Get up and running quickly with Chocolatey for Business
RedirectFrom:
- docs/chocolatey-for-business-quick-start-guide
- en-us/guides/organizations/quick-start-guide/chocolatey-for-business-quick-start-guide
---

Welcome to the Chocolatey for Business (C4B) Quick-Start Guide! This guide will walk you through the basics of configuring a C4B Server on your VM infrastructure of choice. This includes the Chocolatey Licensed components, a NuGet V2 Repository (Nexus), Chocolatey Central Management (CCM), and an Automation Pipeline (Jenkins).

> :choco-info: **NOTE**
>
> This quick-start guide is intended for customers who have recently purchased Chocolatey for Business (C4B), or are evaluating C4B as part of a proof-of-concept.
> It is **opinionated**, and thus illustrates only one method of setting up your Chocolatey environment.
> Our goal is to get you up-and-running smoothly and efficiently in order to fully test out the feature set.
> For a more exhaustive reference of possible setup scenarios, you may refer to the [Organizational Deployment Documentation](xref:organizational-deployment-guide).

If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.

Let's get started!

## Components

<br>
<img src="/assets/images/c4b-server.png" alt="Chocolatey for Business Server Components" width="600"/>
<p></p>

As illustrated in the diagram above, there are four main components to a Chocolatey for Business installation:

1. **C4B Licensed components**: A licensed version of Chocolatey includes:
    - Installation of the Chocolatey OSS client package itself (`chocolatey`)
    - Chocolatey license file (`chocolatey.license.xml`) installed in the correct directory (`ProgramData\chocolatey\license`)
    - Installation of the Chocolatey Licensed extension (`chocolatey.extension`), giving you access to features like Package Builder, Package Internalizer, etc. (full list [here](https://docs.chocolatey.org/en-us/features/)).
    <p></p>

1. **NuGet V2 Repository Server App (Nexus)**: Chocolatey works best with a NuGet V2 repository. This application hosts and manages versioning of your Chocolatey package artifacts, in their enhanced NuGet package (.nupkg) file format. The quick start guide helps you setup [Sonatype Nexus Repository Manager (OSS)](https://www.sonatype.com/products/nexus-repository).

1. **Chocolatey Central Management (CCM)**: CCM is the Web UI portal for your entire Chocolatey environment. Your endpoints check-in to CCM to report their package status. This includes the Chocolatey packages they have installed, and whether any of these packages are outdated. And now, with CCM Deployments, you can also deploy packages or package updates to groups of endpoints, as well as ad-hoc PowerShell commands. CCM is backed by an MS SQL Database. This guide will set up MS SQL Express for you.

1. **Automation Pipeline (Jenkins)**: A pipeline tool will help you automate repetitive tasks, such checking for updates to a set of Chocolatey Packages from the Chocolatey Community Repository (CCR). If updates exist, the pipeline task will auto-internalize your list of packages, and push them into your NuGet repository for you. This guide will help you set up Jenkins as your automation pipeline.

## Requirements

> :choco-danger: **ATTENTION**
>
> The server used for your Chocolatey For Business environment should be a **_fresh, dedicated machine_** that serves no other purpose in your organization. Installation of C4B on a server running mission critical enterprise applications is **NOT** recommended.

Below are the minimum requirements for setting up your C4B server via this guide:

- Windows Server 2019+ (ideally, Windows Server 2022)
- 4+ CPU cores (more preferred)
- 16 GB+ RAM (8GB as a bare minimum; 4GB of RAM is reserved specifically for Nexus)
- 500 GB+ of free space for local NuGet package artifact storage (more is better, and you may have to grow this as your packages and versions increase)
- Open outgoing (egress) Internet access
- Administrator user rights

## Installation

### Step 0: Preparation of C4B Server

> :choco-warning: **WARNING**
>
> This guide utilizes code from a GitHub repository, namely: [choco-quickstart-scripts](https://github.com/chocolatey/choco-quickstart-scripts). Though we explain what each script does in drop-down boxes, please do your due diligence to review this code and ensure it meets your Organizational requirements.

1. Provision your C4B server on the infrastructure of your choice.

1. Install all Windows Updates.

1. If you plan on joining this server to your Active Directory domain, do so now before beginning setup below.

1. If you plan to use a Purchased/Acquired or Domain SSL certificate, please ensure the CN/Subject value matches the DNS-resolvable Fully Qualified Domain Name (FQDN) of your C4B Server. Place this certificate in the `Local Machine > Personal` certificate store, and ensure that the private key is exportable.

1. Copy your `chocolatey.license.xml` license file (from the email you received) onto your C4B Server.

### Step 1: Begin C4B Setup

> :choco-danger: **IMPORTANT**
>
> All commands should be run from an **elevated** PowerShell window (and **not ISE**), by opening your PowerShell console with the `Run as Administrator` option.

1. Open a PowerShell console with the `Run as Administrator` option, and paste and run the following code:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::tls12
    $QuickStart = 'https://raw.githubusercontent.com/chocolatey/choco-quickstart-scripts/main/Start-C4bSetup.ps1'
    $Script = [System.Net.Webclient]::new().DownloadString($QuickStart)
    $sb = [ScriptBlock]::Create($Script)
    & $sb
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Chocolatey client from https://community.chocolatey.org</li>
    > <li>Prompts for your C4B license file location, with validation</li>
    > <li>Converts your C4B license into a Chocolatey package</li>
    > <li>Configures local "choco-setup" directories</li>
    > <li>Downloads setup files from "choco-quickstart-scripts" GitHub repo</li>
    > <li>Downloads Chocolatey packages required for setup</li>
    > </ul>
    > </details>

### Step 2: Nexus Setup

1. In the same **elevated** PowerShell console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4bNexusSetup.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Sonatype Nexus Repository Manager OSS instance</li>
    > <li>Cleans up all demo repositories on Nexus</li>
    > <li>Creates a "ChocolateyInternal" NuGet repository</li>
    > <li>Creates a "ChocolateyTest" NuGet repository</li>
    > <li>Creates a "choco-install" raw repository</li>
    > <li>Sets up "ChocolateyInternal" on C4B Server as source, with API key</li>
    > <li>Adds firewall rule for repository access</li>
    > <li>Installs MS Edge, and disables first-run experience</li>
    > <li>Outputs data to a JSON file to pass between scripts</li>
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
    > <li>Installs MS SQL Express and SQL Server Management Studio (SSMS)</li>
    > <li>Creates "ChocolateyManagement" database, and adds appropriate `ChocoUser` permissions</li>
    > <li>Installs all 3 CCM packages (database, service, web), with correct parameters</li>
    > <li>Outputs data to a JSON file to pass between scripts</li>
    > </ul>
    > </details>

### Step 4: SSL Setup

1. In the same **elevated** PowerShell console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Set-SslSecurity.ps1
    ```

    **ALTERNATIVE 1 : Custom SSL Certificate** - If you have your own custom SSL certificate (purchased/acquired, or from your Domain CA), you can paste and run the following script with the `Thumbprint` value of your SSL certificate specified:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Set-SslSecurity.ps1 -Thumbprint '<YOUR_CUSTOM_SSL_CERT_THUMBPRINT_HERE>' -Hardened
    ```

    > :choco-warning: **WARNING**
    >
    > If you are using your own SSL certificate, be sure to place this certificate in the `Local Machine > Personal` certificate store before running the above script, and ensure that the private key is exportable.

    > :choco-info: **NOTE**
    >
    > You may have noticed the `-Hardened` parameter we've added above. When using a custom SSL certificate, this parameter will further secure access to your C4B Server. A Role and User credential will be configured to limit access to your Nexus repositories. As well, CCM Client and Service Salts are configured to further encrypt your connection between CCM and your endpoint clients. These additional settings are also incorporated into your `Register-C4bEndpoint.ps1` script for onboarding endpoints. We do require you to enable this option if your C4B Server will be Internet-facing, with a FQDN that resolves to a public IP.

    **ALTERNATIVE 2 : Wildcard SSL Certificate** - If you have a wildcard certificate, you will also need to provide a DNS name you wish to use for that certificate:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Set-SslSecurity.ps1 -Thumbprint '<YOUR_CUSTOM_SSL_CERT_THUMBPRINT_HERE>' -CertificateDnsName '<YOUR_DESIRED_FQDN_HERE>' -Hardened
    ```

    For example, with a wildcard certificate with a thumbprint of `deee9b2fabb24bdaae71d82286e08de1` you wish to use `chocolatey.foo.org`, the following would be required:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Set-SslSecurity.ps1 -Thumbprint deee9b2fabb24bdaae71d82286e08de1 -CertificateDnsName chocolatey.foo.org -Hardened
    ```

    <br>

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Adds SSL certificate configuration for Nexus and CCM web portals</li>
    > <li>Generates a `Register-C4bEndpoint.ps1` script for you to easily set up endpoint clients</li>
    > <li>Outputs data to a JSON file to pass between scripts</li>
    > </ul>
    > </details>

### Step 5: Jenkins Setup

1. In the same **elevated** PowerShell console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4bJenkinsSetup.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Jenkins package</li>
    > <li>Updates Jenkins plugins</li>
    > <li>Configures pre-downloaded Jenkins scripts for Package Internalizer automation</li>
    > <li>Sets up pre-defined Jenkins jobs for the scripts above</li>
    > <li>Writes a Readme.html file to the Public Desktop with account information for C4B services</li>
    > <li>Auto-opens README, CCM, Nexus, and Jenkins in your web browser</li>
    > <li>Removes temporary JSON files used during provisioning</li>
    > </ul>
    > </details>

    > :choco-info: **NOTE**
    >
    > A `Readme.html` file will now be generated on your desktop. This file contains login information for all 3 web portals (CCM, Nexus, and Jenkins). This `Readme.html`, along with all 3 web portals, will automatically be opened in your browser.

### Step 6: Verification

1. In the same **elevated** PowerShell console as above, paste and run the following code:

    ```powershell
    Set-Location "$env:SystemDrive\choco-setup\files"
    .\Start-C4bVerification.ps1 -Fqdn '<Your expected fqdn here>'
    ```

    If you expect services to be available at `chocoserver.yourcompany.com`, then your command would look like: `.\Start-C4bVerification.ps1 -Fqdn 'chocoserver.yourcompany.com'`

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Verifies Nexus Repository installation</li>
    > <li>Verifies Central Management installation</li>
    > <li>Verifies Jenkins installation</li>
    > <li>Ensures system firewall is configured</li>
    > <li>Ensures Windows Features are installed</li>
    > <li>Ensures services are correctly configured</li>
    > <li>Ensured README is created</li>
    > </ul>
    > </details>

### Step 7: Setting up Endpoints

1. Find the `Register-C4bEndpoint.ps1` script in the `choco-setup\files\scripts\` directory on your C4B Server. Copy this script to your client endpoint.

1. Open an **elevated** PowerShell console on your client endpoint, and browse (`cd`) to the location you copied the script above. Paste and run the following code:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force
    [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::tls12
    .\Register-C4bEndpoint.ps1
    ```

    > <details>
    > <summary><strong>What does this script do? (click to expand)</strong></summary>
    > <ul class="list-style-type-disc">
    > <li>Installs Chocolatey client (chocolatey), using a script from your raw "choco-install" repository</li>
    > <li>Runs the "ClientSetup.ps1" script from your raw "choco-install" repository, which does the following:</li>
    > <li>Licenses Chocolatey by installing the license package (chocolatey-license) created during QDE setup</li>
    > <li>Installs the Chocolatey Licensed Extension (chocolatey.extension) without context menus</li>
    > <li>Configures "ChocolateyInternal" source</li>
    > <li>Disables access to the "chocolatey" public Chocolatey Community Repository (CCR)</li>
    > <li>Configures Self-Service mode and installs Chocolatey GUI (chocolateygui) along with its licensed extension (chocolateygui.extension)</li>
    > <li>Configures Central Management (CCM) check-in, and opts endpoints into CCM Deployments</li>
    > </ul>
    > </details>

### Conclusion

Congratulations! If you followed all the steps detailed above, you should now have a fully functioning Chocolatey for Business implementation deployed in your environment.

It is worth mentioning that some customers may have a more bespoke environment, with the presence of proxies and additional configuration management applications. Chocolatey is engineered to be quite flexible, specifically to account for these scenarios. Please refer to the many options for installation referenced on the [Installation page](xref:setup-licensed#more-install-options). Again, If you have any questions or would like to discuss more involved implementations, please feel free to reach out to your Chocolatey representative.

### See it in Action

If you'd prefer to watch and follow along, here is a recording of our Chocolatey Team going through this guide live on our Twitch stream:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/qbIclPMEgig" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>
<br>
</p>
