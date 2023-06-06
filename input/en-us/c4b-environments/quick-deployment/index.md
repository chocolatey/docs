---
Order: 150
xref: qde
Title: Quick Deployment Environment (QDE) [DEPRECATED]
Description: High level information about QDE
RedirectFrom: docs/quick-deployment-environment
---

> :choco-danger: **DEPRECATION NOTICE**
>
> The Quick Deploy Environment(QDE) solution has been deprecated.
> As such, we do not recommend new installations of this environment solution.
> The [Quick Start Guide(QSG)](xref:c4b-quick-start-guide) has been developed as the replacement for the Quick Deploy Environment(QDE).
> If you are running QDE within your organization, it is still fine to do so.
> This notice is for any new trial or business customers.
> We formally no longer support the Quick Deploy Environment(QDE) as a valid setup option.

## Summary

This is an overview on the Chocolatey Quick Deployment Environment (QDE).
It provides a single virtual machine appliance to be imported into your hypervisor-of-choice, which contains most of the various components of a Chocolatey organizational solution.

> :choco-warning: **WARNING**
>
> This solution targets environments up to about **1000 nodes**.
> If you need a solution for a larger environment, QDE is generally suitable only as a proof-of-concept.
> For best results, we would recommend a distributed infrastructure, separating each component into its own discrete node.
> If you find yourself in need of a more scalable solution, please contact Support and we'll be more than happy to provide guidance for larger solutions.

![QDE Architecture](/assets/images/quickdeploy/QDE-architecture.gif)

## QDE Components

The QDE appliance provides a unified architecture containing the following components:

| Component                           | Description                                                                                                                                                                                                               |
| :---------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Sonatype Nexus Repository OSS**   | This is your package repository, where you'll be storing your Chocolatey packages (nupkg files). It comes pre-configured with some initial repositories to help you keep everything organized.                            |
| **Jenkins**                         | This is your automation engine, that lets you run tasks on-demand and on a schedule. It hosts the PowerShell scripts to help you auto-internalize packages from the Chocolatey Community Repository.                      |
| **Chocolatey Central Management**   | This is your web dashboard for Chocolatey, that will allow you to track and monitor Chocolatey packages on your endpoint clients. You can see what packages are installed where, and whether or not they are out-of-date. |
| **Scripts for Internal Deployment** | Various scripts to help you configure this solution are included, for your convenience.                                                                                                                                   |

## Getting QDE

To get QDE into your environment, please [reach out to us](https://chocolatey.org/contact/sales) so we can work to get you set up.

> :choco-info: **NOTE**
>
> A QDE environment is a fully functional Chocolatey for Business (C4B) environment; as such, it will require a business or trial license.

## Related Articles

A lot of what is done in QDE condenses or completely eliminates the work found in these related articles:

* [Organizational Deployment Guide](xref:organizational-deployment-guide)
* [Chocolatey Installation](https://chocolatey.org/install#organization)
* [Chocolatey Commercial Installation](xref:setup-licensed)
* [Automate Package Internalization](xref:automate-package-internalization)

If you find that QDE is only good for a proof-of-concept in your environment due to having thousands of endpoints, you will want to understand how to scale out that infrastructure.
The above articles document how that is done.

## Links

* [QDE Setup](xref:v2-qde)
* [QDE Desktop ReadMe File](xref:v2-desktop-readme) (included here for convenience)
* [QDE SSL/TLS Setup](xref:v2-ssl-setup)
* [QDE Firewall Changes](xref:v2-firewall-changes)
* [QDE Client Setup](xref:v2-client-setup) (setting up your client machines)
* [How do I upgrade QDE?](xref:qde#how-do-we-upgrade-qde).

## FAQ

### How do we take advantage of QDE?

You must have a [Business edition of Chocolatey](https://chocolatey.org/compare) or be on an active trial license. Please [reach out to us](https://chocolatey.org/contact/sales) so we can work to get you all the necessary information needed to get started.

### What OS format does QDE support?

The QDE disk image is built on **Windows Server 2019 Standard** (Evaluation). The steps to license the VM are detailed in the [QDE Desktop ReadMe File](xref:v2-desktop-readme#step-6-license-the-qde-vm). This is the **only** format that QDE is built in.

### What hypervisor formats does QDE support?

The QDE disk image comes in the following formats:

1. **VMDK** (for use with VMware vCenter, ESX/i, or VirtualBox)
1. **VHD** (for use with Microsoft Hyper-V)
1. **VHD Appliance** (as a drop-in appliance to import into Hyper-V)
1. **VHD for Azure** (this format includes a VHD disk, as well as scripts to prepare, upload, and create a VM)
1. **OVF** (this format can be converted for import into other hypervisors)

We include details for using each format on our [QDE Setup](xref:v2-qde) page. Some customers have already used formats like the OVF to create a QDE VM in Nutanix, Proxmox, KVM, or even Amazon AMI. Though we do not directly support those hypervisor formats, if your team is able to get the VM up-and-running, we can assist in setup at the OS-level as needed.

### All my endpoint workstations are now remote. Does QDE support Remote Deployment scenarios?

Yes! Chocolatey Central Management (CCM) comes with the ability to group endpoints into Deployment Groups, and then create Deployments targeting these groups. In order to utilize CCM Deployments, you must first get your endpoints checking into CCM. This can be accomplished by running the Client Setup script (included with QDE) on your endpoints.

If your QDE VM and all endpoint hosts are within the same internal network or VPN, you can follow the default [QDE Client Setup](xref:v2-client-setup) steps.

If you are exposing QDE via the Internet, you will likely need to adjust your Client Setup script, as outlined in the "[Adjusting Scripts for Client Setup](xref:v2-internet-setup#adjusting-scripts-for-client-setup)" section of the QDE Internet Setup page.  As well, please refer to the question below for further Internet considerations.

### What if I need to expose QDE via the Internet? What are the safeguards in place to help me in this process?

When initially configuring QDE using the `Set-QDEnvironment.ps1` script ([**Step 3** in the QDE Desktop ReadMe file](xref:v2-desktop-readme#run-the-set-qdenvironment.ps1-script)), you have the option to pass the `-InternetEnabled` parameter. This option will configure your connections to Nexus (your NuGet V2 package repository) and the Chocolatey Central Management (CCM) Service to utilize SSL certificates and salts. As well, a role and user credential will be added at the Nexus repository level, to further secure access between your endpoints and your repository.

Of course, in order to utilize this extra layer of security, you will be **required** to provide a trusted SSL certificate with a DNS-resolvable Fully Qualified Domain Name (FQDN). Whether you use a tool like LetsEncrypt, or purchase a certificate from a third party and set your Certificate Subject DNS name to resolve to this external IP, is entirely up to you. As well, you will need to be mindful of allowing connections to the Nexus (8443) and CCM Service (24020) ports via your firewall

You can read more about [Custom SSL Certificates](xref:v2-desktop-readme#option-2-custom-certificate) and [Firewall Ports](xref:v2-desktop-readme#firewall-ports) in the [QDE Desktop ReadMe file](xref:v2-desktop-readme). For more details on the CCM Service salt additives, please refer to the [Central Management Client Setup](xref:ccm-client) page.

### We use a reverse proxy or a load balancer in front of our Internet-facing servers. Can QDE and your Support Team help with that?

As outlined in this section of the [Central Management Service Setup](xref:ccm-service#can-we-install-central-management-service-behind-a-load-balancer) page, usage of a reverse proxy or load balancer in front of CCM is a more complex installation scenario, and therefore unsupported. As such, if you have a thorough understanding of X509 certificates and SSL termination, and are able to setup working SSL-encrypted communication, by all means proceed in that manner. However, if you run into complications, we ask that you move to a supported topology in order for our Support folks to help.

### How much time does this save?

Typically, setting up a proper Chocolatey Central Management server and any accompanying infrastructure takes somewhere between 1-5 days, even when you have everything you need to get started. Setting up a new piece of infrastructure can be pretty cumbersome, we know. The QDE contains pretty much everything you need to get started in a single image, all ready to go. Depending on download speeds and extent to which your environment is standardized to the ones the image is built on, it can potentially take as little as an hour or two to get up-and-running.

### What if we're already a C4B customer?

Please [reach out to us](https://chocolatey.org/contact/sales) so we can work to get you all the necessary information needed to get started. Be sure to mention you are already a C4B customer.

### I am an Open Source Chocolatey user. Can I also get access to QDE?

Unfortunately, no. QDE leverages a lot of the advanced functionality built into Chocolatey for Business. As such, QDE **requires** a Chocolatey for Business license as a part of initial setup.

### How do we upgrade QDE?

While we will continue to make improvements to the QDE, there is no upgrade path for the Virtual Machine itself.
You can choose to start over with a newer version, but that feels like the wrong way to go.

Alternatively, it is simple to upgrade the components themselves, and that is how we recommend upgrading aspects of QDE.
Should you want to upgrade Central Management, for example, you can follow the Central Management steps for upgrade at [Upgrade Central Management](xref:ccm-upgrade).
Upgrading Nexus can be accomplished with the steps detailed on the [QDE Nexus Upgrade](xref:upgrade-nexus) page.

### What if we have a larger environment? (> 1k nodes)

While this solution will be great to get a glimpse of what Chocolatey can really do for you, by its nature it isn't the silver bullet for every environment.
If you have a larger environment, we would strongly recommend taking the time to set up the various services on separate hosts to make them easier to manage and ensure they have the necessary resources to handle heavier loads.

### Can we brag about how fast we were able to get configured?

Please do! :slightly_smiling_face:
