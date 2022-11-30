---
Order: 10
xref: script-builder
Title: Script Builder
Description: Features and benefits of Script Builder
---

Script Builder allows you to bulk install Chocolatey packages in just a few clicks by providing clear, step-by-step instructions, on how to get packages into your environment quickly and easily using generated scripts. Just add packages to the builder and choose your integration method to get started.

> :choco-info: **NOTE**
>
> Packages selected in Script Builder, the [internal repository url](#internal-repository-url) provided, and your selected integration method are saved within the browser on your computer and will not be available on other computers.

## Adding and removing packages

> :choco-info: **NOTE**
>
> Package versions are always included in generated scripts. In a future release, a toggle will be provided to remove version numbers.

Packages can be added or removed from Script Builder virtually anywhere:

1. From the main list of packages.  
  ![Add package from list of packages](/assets/images/script-builder/sb-add-list.jpg)

1. From the individual package page.  
  ![Add package from the package details page](/assets/images/script-builder/sb-add-package-page.jpg)

1. And even from the version history table on the individual package page. Multiple versions of the same package cannot be added to Script Builder.  
  ![Add package from the version history table](/assets/images/script-builder/sb-add-version.jpg)

## Specifics for Individual Use

When using Script Builder for individual use, follow these steps:

1. Review your packages.
1. Verify your chosen integration method.
1. Choose to copy the installation script or download as a `.config` file.

![Script Builder individual use](/assets/images/script-builder/sb-individual.gif)

## Specifics for Organizational Use

> :choco-warning: **WARNING** 
>
> The organizational use of the Chocolatey Community Repository is not recommended. Please see how to setup [Chocolatey for internal / organizational use](xref:organizational-deployment-guide).

When using Script Builder for an organization, follow these steps:

1. Review your packages.
1. Verify your chosen [integration method](#integration-methods). Choose from a generic PowerShell, Ansible, Chef, PowerShell DSC, or Puppet script.
1. Enter your [internal repository url](#internal-repository-url).
1. Get the [packages into your environment](#environment-setup).
1. Copy the installation scripts and configuration scripts.

![Script Builder organizational use](/assets/images/script-builder/sb-organization.gif)

### Integration Methods

Currently, Script Builder provides installation and configuration scripts as a generic PowerShell script as well as Ansible, Chef, PowerShell DSC, and Puppet.

### Internal Repository Url

The Internal Repository Url is the location of your internal package repository. Read over [How To Set Up an Internal Repository](xref:host-packages) for options and more information on using Artifactory Pro, Nexus, and ProGet.

> :choco-danger: **IMPORTANT** 
>
> An Internal Repository Url is required and you will not be able to proceed with further steps in Script Builder until one is supplied.

![Internal Repository Url](/assets/images/script-builder/sb-internal-url.jpg)

### Environment Setup

Script Builder provides the instructions on how to get your selected packages into your specific environment.

> :choco-info: **NOTE**
>
> When choosing to bulk download packages from this step, your browser may block multiple pop-ups, resulting in only 1 package being downloaded. To avoid this, be sure to add community.chocolatey.org to your list of approved sites to allow pop-ups and redirects.

## We want your feedback!

Have you found an issue or wish there was a specific feature included in Script Builder? Help us out and [file an issue on GitHub](https://github.com/chocolatey/home/issues).