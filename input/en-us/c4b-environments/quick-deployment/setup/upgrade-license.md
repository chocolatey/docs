---
Order: 60
xref: v2-upgrade-license
Title: Upgrade License
Description: How to upgrade and deploy the Chocolatey License package
RedirectFrom: docs/quick-deployment-upgrade-license
---

## Upgrading your license in the Quick Deployment Environment

You may receive a trial extension license, or a new license when you renew your currently purchased license. Upon receiving that new file, you will need to upgrade the `chocolatey-license` package in your Nexus repository (or repository server if you've moved to your own separate from QDE).

On the QDE server in the `C:\choco-setup\files` folder you will find a `CreateLicensePackage.ps1` script. This script will have been updated when you provisioned the QDE server with the proper hostname for your environment. This script will package the new license file on the server and push it to your repository.

### Upgrade Process

Steps:

1. Copy the new license file named `chocolatey.license.xml` to the `C:\ProgramData\chocolatey\license` folder, and ensure that it is the _only_ file in the directory.
2. Run `& C:\choco-setup\files\CreateLicensePackage.ps1 -NexusApiKey 'PutYourApiKeyHere'`
3. On any _already provisioned_ client workstations run `choco upgrade chocolatey-license` to have them retrieve and apply the new license file automatically. Newly provisioned clients from this point forward will use the newly updated license file.
