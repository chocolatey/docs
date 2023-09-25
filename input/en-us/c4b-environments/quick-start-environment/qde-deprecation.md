---
Order: 10
xref: qde-deprecation
Title: Quick Deploy Environment Deprecation Notice
Description: Landing page for old QDE links
ShowInNavbar: false
ShowInSidebar: false
RedirectFrom:
- en-us/c4b-environments/quick-deployment/release-notes
- en-us/c4b-environments/quick-deployment/setup
- en-us/c4b-environments/quick-deployment/setup/desktop-readme
- en-us/c4b-environments/quick-deployment/setup/ssl-setup
- en-us/c4b-environments/quick-deployment/setup/client-setup
- en-us/c4b-environments/quick-deployment/setup/internet-setup
- en-us/c4b-environments/quick-deployment/setup/upgrade-license
- en-us/c4b-environments/quick-deployment/v1/
- en-us/c4b-environments/quick-deployment/v1/setup
- en-us/c4b-environments/quick-deployment/v1/desktop-readme
- en-us/c4b-environments/quick-deployment/v1/ssl-setup
- en-us/c4b-environments/quick-deployment/v1/client-setup
---

## Why Has the Quick Deploy Environment Been Deprecated

The Quick Deploy Environment(QDE) solution has been deprecated in favor of our [Chocolatey For Business Quick Start Guide(QSG)](xref:c4b-quick-start-guide) and [Chocolatey For Business Azure Environment](xref:c4b-azure) offerings. The reasoning behind this is the Quick Deploy Environment became too complex and cumbersome to support given the need to build out several different format VM images to work across the ever increasing number of Hypervisors being used by our customer base. The Quick Start Guide was created as a solution to this problem. It allows deploying the same components you find in a Quick Deploy Environment, but installing them as PowerShell steps as apposed to needing to bundle them all as a full Windows Server VM image. This allows customers to bring their own Windows Server VM setup in the hypervisor of their choice, we just simply install the needed components onto the VM provided. Thus taking away the requirement for us to ship new VM images with up to date Windows Server and package components every time they saw an update.

The Chocolatey For Business Azure Environment was later developed as our replacement for the Quick Deployment Environment Hyper-V to Azure offering. The Azure Environment is a completely cloud native solution offered through the [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/chocolateysoftwareinc1605695330527.c4b_azure_qde). It stands up the same components of the previous Quick Deploy Environment and current Quick Start Guide solutions. Just using Azure cloud tooling for the host VM and networking.

## I have a Quick Deploy Environment Solution in place. What do I do now?

While we don't support the Quick Deploy Environment as a new deployment option, if already deployed you have the same components (Sonatype Nexus, Jenkins, and Chocolatey Central Management) as our current environment solutions. You simply need to keep them up to date going forward.

### How Do I Handle SSL Certificate Renewal?

Our [certificate renewal documentation](xref:quick-start-guide-cert-renewal) for Quick Start Guide works on the older Quick Deploy Environment.

### How Do I Upgrade My Nexus Instance?

The same [nexus upgrade documentation](xref:upgrade-nexus) works for Quick Start Guide and Quick Deploy Environment solutions.

### How Do I Upgrade Chocolatey Central Management(CCM)?

See [Chocolatey Central Management Upgrade Documentation](xref:ccm-upgrade).

### How Do I Upgrade Jenkins?

See [Jenkins Upgrade Documentation](xref:upgrade-jenkins)
