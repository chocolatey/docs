---
Order: 10
xref: v2-desktop-readme
Title: Desktop Readme
Description: Online copy of what ships on desktop of QDE image
RedirectFrom: docs/quick-deployment-desktop-readme
---

> :memo: **NOTE**
>
> This document is for **Version 2** of the Quick Deployment Environment.
> If you're using an older version of QDE, please refer to the [QDEv1 Desktop Readme page](xref:v1-desktop-readme).

Thanks for trying Chocolatey for Business!
This system has been pre-configured as a fully functioning C4B environment.
To finish setting up QDE (Quick Deployment Environment), you'll need to closely follow the steps outlined in this document.

## Summary

> :warning: **WARNING**
>
> - The commands outlined in this document need to be run from an administrative PowerShell session.
>   Many of these scripts will function poorly or not at all in a non-administrative shell.
> - Ensure you go through these steps in **exact** order.
>   If you miss out on a step or two, and something breaks, it's very likely you'll need to re-import the QDE VM from scratch and start over.
>   You may want to take a snapshot before continuing just in case.

To finish setting up QDE (Quick Deployment Environment), you'll need to work through this document and run the different commands you find here.

If you run into any issues as you set up your QDE and clients, please reach out to support and we can set up a session to work with you on this.

## Step 0: Complete Prerequisites

There are some initial steps you will need to have taken before you work through this document.
Please make sure you have taken those steps ahead of time.
See the [Online Documentation](#step-3-virtual-environment-setup) for the most up to date information.

* [QDE Setup](xref:v2-qde)

## Step 1: Expand Disk Size

By default, QDE is provisioned with a 100GB hard disk drive.
We typically recommend around 2TB of storage space to be available for a package repository server, which is part of QDE's services.
Before starting the VM, you may want to expand the hard drive to a size suitable for your purposes.
After starting the VM, you can run the below command to resize the Windows partition to fill any additional available space you have allocated.

```powershell
Resize-Partition -DriveLetter C -Size ((Get-PartitionSupportedSize -DriveLetter C).SizeMax)
```

## Step 2: Environment Setup

### 1. Add Your Chocolatey License

Copy your Chocolatey license file to: `C:\ProgramData\chocolatey\license\chocolatey.license.xml`

### 2. (Optional) Change the VM Hostname

If you would like to change the hostname of this VM, please do so **before** going any further with setup.

### 3. Run the Set-QDEnvironment.ps1 Script

> :memo: **NOTE**
>
> When running the `Set-QDEnvironment` script ensure you are logged into the QDE VM with the _local admininistrator_ account.
> This is necessary for SQL to work properly initially.
>
> Do _NOT_ attempt to run this script from the Powershell ISE. It will not work. Aspects of the script output
> are treated as part of the error stream incorrectly when ran from ISE, which causes the script to terminate unexpectedly.

First, you'll need to open PowerShell as Administrator.

#### Option 1: Default Self-Signed Certificate

This is the standard method of setup, and will initialize all the services using a newly-generated self-signed certificate.
Enter the following command:

```powershell
& C:\choco-setup\files\Set-QDEnvironment.ps1 -NexusApiKey "INSERT_NUGET_API_KEY_HERE"
```

#### Option 2: Custom Certificate

If you have a domain certificate or you have otherwise already created / obtained a certificate you'd like to use,
please ensure the certificate is present in either the `Cert:\LocalMachine\My` or `Cert:\LocalMachine\TrustedPeople` stores before continuing.
If you're not familiar with how to do this, please refer to [this DigiCert article for instructions](https://www.digicert.com/kb/managing-client-certificates.htm).

> :warning: **WARNING**
>
> The private key of the certificate you're using **must** be exportable.
> If it is not, configuring Nexus will fail, as Nexus does not work with the Windows certificate store directly and maintains its own certificate store.

You will need either the certificate thumbprint or the subject in order to use the certificate for setup:

> :memo: **NOTE**
>
> * `-CertificateDnsName` is optional if you're providing the `-CertificateSubject`, but only if the subject does **not** contain wildcards.
> * You can also optionally provide the `-InternetEnabled` switch if your QDE instance has a certificate with a public hostname and will be operating over the internet.
>   This will enable additional security features; take note of the additional output and do not lose the newly-generated passwords or salt values.

```powershell
# If you have the thumbprint, run:
& C:\choco-setup\files\Set-QDEnvironment.ps1 -NexusApiKey "INSERT_NUGET_API_KEY_HERE" -CertificateThumbprint "INSERT_CERTIFICATE_THUMBPRINT_HERE" -CertificateDnsName "INSERT_DNS_NAME_HERE"

# If you have the subject instead, run:
& C:\choco-setup\files\Set-QDEnvironment.ps1 -NexusApiKey "INSERT_NUGET_API_KEY_HERE" -CertificateSubject "INSERT_CERTIFICATE_SUBJECT_HERE" -CertificateDnsName "INSERT_DNS_NAME_HERE"
```

Parameter descriptions are provided below for your convenience.
You can also call `Get-Help C:\choco-setup\files\Set-QDEnvironment.ps1 -Full` for more information.

| Parameter Name           | Description                                                                                                                                                                          |
| :----------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-NexusApiKey`           | The api key for your nexus installation. This can be found in the Readme file on the desktop of your QDE.                                                                            |
| `-CertificateThumbprint` | If using a thumbprint, specify it with this parameter.                                                                                                                               |
| `-CertificateSubject`    | If using a subject name for your certificate, specify it with this parameter (**NOTE** this does not include the 'CN=' portion of the subject returned by the certificate provider). |
| `-CertificateDnsName`    | If using a wildcard certificate this _must_ be included with either `-CertificateThumbprint` or `-CertificateSubject`.                                                               |
| `-InternetEnabled`       | When this parameter is used, the QDE Server is configured for internet-facing clients.                                                                                               |

### 4. Select Community Packages to Internalize

> :memo: **NOTE**
>
> - If your environment is air-gapped or you have otherwise locked down access to the Community Repository, you will need to ensure the community repository is accessible for this part of the script to work.
>   It is completely optional, and you're more than welcome to skip this by selecting **Cancel** and only utilize the built in Jenkins tasks for internalization.
> - This will **not** currently update the builtin Jenkins configuration.
>   If you intend to setup automatic updates for Jenkins, you will need to use the Jenkins jobs

When the script completes, you will be shown an Out-GridView prompt where you can select any of the most popular community packages to automatically internalize.
Use `Shift` or `Ctrl` and click to select multiple.
When you're happy with your selections (don't worry, you can always use the built-in Jenkins tasks to internalize additional packages at any time) select OK, or select Cancel to opt-out.

This internalization will happen automatically in the background, and will generally take about a minute or two per package, depending on the size of the package.
We recommend you leave the VM running while it's happening; you can keep tabs on its progress by opening Nexus to the ChocolateyInternal repository and checking the available packages.

## Step 3: Review & Configure Host Services

### Nexus Repository

> :memo: **NOTE**
>
> If you have changed the hostname from the default, or you're using a FQDN for the server setup, this hostname will have changed.
> In that case, substitute the hostname for the new FQDN.

|            URL             |  Login  |  Initial Password   |      API Key      |
| :------------------------: | :-----: | :-----------------: | :---------------: |
| <https://chocoserver:8443> | `admin` | `{{NexusPassword}}` | `{{NugetApiKey}}` |

If you have not setup QDE as internet-enabled, Nexus will be initially configured with anonymous authentication enabled.
On first logging in to the admin account, you will be prompted to change your password and then select whether or not to enable anonymous authentication going forward.
If you intend to set up QDE as an internet-facing server, we recommend you keep anonymous authentication **OFF**.
If your QDE instance will **not** be internet-facing and only used over a VPN or other secured network, it is generally safe to leave anonymous authentication turned on.

Unless security requirements in your organization stipulate that role-based access controls be in place, this is our recommended configuration for QDE in its default configuration.

Sources configured in Chocolatey can only read data from their remote endpoints, and cannot delete items.
If you need to limit the packages people have access to, control this with separate Hosted and Group repositories.
Consult the [Nexus documentation](https://help.sonatype.com/repomanager3) or reach out to Chocolatey Support for more information.

### Jenkins

|           URL           |  Login  |   Initial Password    |
| :---------------------: | :-----: | :-------------------: |
| <http://localhost:8080> | `admin` | `{{JenkinsPassword}}` |

For using Jenkins, please refer to our [online documentation](xref:automate-package-internalization).

At most, you will need to:

1. Login to Jenkins and complete first-time setup (see below).
1. Change your password (by going to `People > admin > Configure` on the sidebar, scroll down to change password section).
1. Enable the pre-configured jobs to run on the schedule of your choosing.
   Our documentation can assist with ensuring this is done correctly.

<details>
    <summary><strong>First-Time Setup</strong></summary>

In order to begin using Jenkins, the following steps will need to be performed:

1. Visit <http://localhost:8080> in a web browser
1. Enter the administrator password into the textbox and click `Continue`
1. From the Plugin Installation Page select "Install Suggested Plugins"

   > :memo: **NOTE**
   >
   > Some of these may fail to install, and that is OK.

1. Once the plugin installation completes, select `Continue`
1. Click `Continue As Admin` on the Create First Admin User page
1. Update the Jenkins URL _if_ you have changed the hostname of the server prior to beginning with this setup document.
1. Click `Save and Finish`
1. Click `Restart` to restart your Jenkins instance.
   This _does_ take a while.
   If after 30 seconds you don't see your browser auto-refresh, go ahead and do so manually.

</details>

### Chocolatey Central Management

> :memo: **NOTE**
>
> If you have changed the hostname from the default, or you're using a FQDN for the server setup, this hostname will have changed.
> In that case, substitute the hostname for the new FQDN.

|            URL            |   Login    | Initial Password |
| :-----------------------: | :--------: | :--------------: |
| <https://chocoserver:443> | `ccmadmin` |     `123qwe`     |

### Firewall ports

To allow access to all services, the following firewall ports have been opened on QDE by default.

| Port  | Service                                                                                               |
| :---: | :---------------------------------------------------------------------------------------------------- |
| 8443  | Nexus (HTTPS)                                                                                         |
|  443  | Central Management Dashboard (HTTPS)                                                                  |
| 24020 | Central Management Service communications for Agent communication over HTTPS                          |
|  80   | QDE Certificate script endpoint (HTTP), to allow client machines to import the QDE HTTPS certificate. |

### Browser Considerations

We recommend you use either Mozilla Firefox or Google Chrome to interact with all Web interfaces for the different services installed.
You will find Google Chrome pre-installed in the environment.

> :warning: **WARNING**
>
> There is a known issue in some QDE configurations where Firefox will be unable to load Nexus correctly.
> If this occurs, you need to disable the `Block dangerous and deceptive content` option under **Security** in order to load Nexus.

## Step 4: Change the API Key (Recommended)

You may wish to change the API key before you start using things.
To do so, log in to Nexus using the information above, or your new credentials if you have already gone through the first run wizard.
Once logged in perform the following steps:

<details>
    <summary>Click to show animated summary</summary>

![changing the choco API key](/assets/images/gifs/choco_qde_update_apikey.gif)
</details>

1. Click on your username in the upper right-hand side of the homepage
1. Select **NuGet API Key** from the left-hand navigation window
1. Select **Reset API Key**
1. Enter your password
1. Select **Access API Key**
1. Enter your password again
1. Take note of the new API key

If you change your API key, you will need to change the key in the Jenkins jobs that are pre-configured for you.
See the next section for information on how to connect to Jenkins.

### Choco Apikey Command

To help make pushing packages easier, the `choco apikey` command is available.
This will store your API key for a specific source as part of Chocolatey's configuration.
This will be encrypted. To setup, do the following:

> :memo: **NOTE**
>
> If you have changed the hostname from the default, or you're using a FQDN for the server setup, this hostname will have changed.
> In that case, substitute the hostname for the new FQDN.

```powershell
choco apikey add --key="'{{NugetApiKey}}'" --source="'https://chocoserver:8443/repository/ChocolateyInternal/'"
```

### Update pre-configured Jenkins jobs with the new API Key

After updating the Nexus API Key, you'll need to ensure that the preconfigured Jenkins jobs are also updated with the new API key.
To do so:

1. Login to Jenkins after completing the first-time setup (see [above](#jenkins))
1. For each of the pre-existing jobs shown (e.g., `Internalize packages from the Community Repository`), do the following:
   1. Hover over the name of the job and select the drop-down arrow that shows up
   1. Select :gear: **Configure**
   1. Scroll down until you see the **Password Parameter**; these will be named either `P_API_KEY`, `P_PROD_REPO_API_KEY`, or `P_LOCAL_REPO_API_KEY`, depending on the job you're editing
   1. Select **Change Password** next to the :lock: **Concealed** Default Value
   1. Replace the contents of the field with the new API key
   1. Press the **Save** button at the bottom of the page

## Step 5: Install and Configure Chocolatey On Clients

Refer to [the Client Setup documentation](xref:v2-client-setup).

## Step 6: License the QDE VM

This VM is running an **UNACTIVATED** Server 2019 Standard Operating System.
If you plan to use this virtual machine long-term, you _will_ need to apply a license to the VM.
If you use a KMS server in your environment, and have it configured on clients via Group Policy, you likely have nothing to do here, but verify.

If you rely on Retail or MAK licensing, you will need to apply the license using the following command, replacing the `x`'s with your actual product key:

> :memo: **NOTE**
>
> Please run the below from an administrative PowerShell session.

```powershell
slmgr.vbs /ipk xxxxx-xxxxx-xxxxx-xxxxx
```

## Common Errors and Resolutions

> :memo: **NOTE**
>
> This document is for **Version 2** of the Quick Deployment Environment.
> If you're using an older version of QDE, please refer to the [document for that version](xref:v1-desktop-readme).

### "Server Error" warning when resetting "admin" credential in Nexus

When attempting to reset the `admin` account credential in Nexus, you receive a "Server Error" warning in the top right corner of the page, as shown below:

![QDE Nexus pw error](/assets/images/quickdeploy/QDE-nexus-pw-error.png)

Though it may not be obvious, this is actually caused by Nexus not having enough disk space to function properly.
We sometimes see this occur if [Step 1: Expand Disk Size](#step-1-expand-disk-size) was skipped.
Confirm that you have completed that step and then try again.

Keep in mind, this step is **NOT** the same as expanding the disk at the hypervisor level.
You will need to both expand the hypervisor disk space allocation, _and_ expand the partition within the VM.

### Context menu items for Package Builder and Package Uploader not available

When right-clicking an exe or msi file on QDE, you may notice that the context menu items for Package Builder are missing.
As well, when right-clicking on a nupkg file, you may also see the Package Uploader context menu entry is missing.
This feature can be controlled by passing a custom parameter when installing the Chocolatey Licensed Extension package, but can be restored to its default state quite simply.

Assuming the latest `chocolatey.extension.nupkg` is in your `C:\choco-setup\packages` folder, open up an Administrative PowerShell window and reinstall the Chocolatey Licensed Extension.
Then, restart Explorer for your changes to take effect immediately.

```powershell
choco upgrade chocolatey.extension -y --source="'C:\choco-setup\packages'"
Stop-Process -Name explorer -Force
```

## See Also

* [Quick Deployment Environment](xref:qde)
* [QDE Setup](xref:v2-qde)
* [QDE Desktop ReadMe File](xref:v2-desktop-readme)
* [QDE SSL/TLS Setup](xref:v2-ssl-setup)
* [QDE Firewall Changes](xref:v2-firewall-changes)
* [QDE Client Setup](xref:v2-client-setup) (setting up your client machines)
