# Chocolatey Central Mangement Deployments

> :warning: **WARNING**: This is a Work in Progress. Please check back later.
>
> Please see https://chocolatey.org/blog/announcing-deployments for now.

<!-- TOC depthFrom:2 -->

- [FAQ](#faq)
  - [What versions of components do I need for Deployments to work properly?](#what-versions-of-components-do-i-need-for-deployments-to-work-properly)
  - [What is the CCM compatibility matrix?](#what-is-the-ccm-compatibility-matrix)
  - [Why do I see some machines have not opted in for Deployments?](#why-do-i-see-some-machines-have-not-opted-in-for-deployments)
  - [I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?](#i-have-plenty-of-licenses-why-do-some-machines-show-not-opted-in-for-deployments-and-also-exceeds-your-current-license-count)
  - [Can I use Chocolatey Deployments to upgrade CCM based components?](#can-i-use-chocolatey-deployments-to-upgrade-ccm-based-components)
  - [What is Run Actual?](#what-is-run-actual)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [The updated license file is not being picked up in the website](#the-updated-license-file-is-not-being-picked-up-in-the-website)
  - [A computer or group is not showing as available for deployments but I have plenty of available licenses](#a-computer-or-group-is-not-showing-as-available-for-deployments-but-i-have-plenty-of-available-licenses)
- [Related Topics](#related-topics)

<!-- /TOC -->

***JOIN US FOR A WEBINAR on June 23rd, 2020 (or watch on demand after the fact)*** - https://chocolatey.org/events/chocolatey-deployments

___
## FAQ
### What versions of components do I need for Deployments to work properly?

While you might be able to get things to work with CCM v0.2.x and Chocolatey Agent v0.10.x, it's best to use the following:

* CCM components (`chocolatey-management-*` all 3 packages) - v0.3.0+
* Chocolatey Agents (`chocolatey-agent` package on all clients) - v0.11.0+
* Chocolatey Licensed Extension (`chocolatey.extension` on all clients) - v2.1.1+

### What is the CCM compatibility matrix?
Central Management has specific compatibility requirements with quite a few moving parts. It is important to understand that there are some Chocolatey Agent versions that may not be able to communicate with some versions of CCM and vice versa.  Please see the [[CCM Component Compatibility Matrix|CentralManagement#ccm-component-compatibility-matrix]] for details.

### Why do I see some machines have not opted in for Deployments?
If you are on the Groups screen, you may notice that some machines show up highlighted with a coloring, and one of those colorings is an orange - the legend below it mentions "Not Opted In For Deploymens (Configuration)".

![Group eligibility legend](images/groups/ccm-groups-eligibility.png)

As you can see from the text, it is meant to help you figure out the issue:

> The computer has not opted in or a group contains computers that have not opted in for deployments by configuration. Please ensure the computer has at least chocolatey-agent v0.10.0+ installed and the feature "useChocolateyCentralManagementDeployments" has been set to enabled on the client computer.

This is telling you that you need to ensure you set the client to allow for the the use of Deployments. As it is a security consideration, it requires an explicit opt-in on client machines. See [[Client Setup - Features |CentralManagementSetupClient#features]] for details on how to set it.

### I have plenty of licenses, why do some machines show not opted in for deployments and also exceeds your current license count?
Once you upgrade to at least CCM v0.2.0, every machine will show that until they check in the next time. Once they check in, that will go away. So it's basically normal to see that until those machines check in again.

### Can I use Chocolatey Deployments to upgrade CCM based components?
Likely you absolutely can, just keep in mind that there may be a specific ordering in how you would upgrade everything and adhere to that order. In some instances, you may need to upgrade agents first, then CCM components as once CCM is upgraded it may not be able to talk to the agents. However agents will stop being able to talk to CCM for a small period of time while you are upgrading CCM, but then things will start working again.

### What is Run Actual?
You may have seen `--run-actual` get attached to scripts where you are running choco commands - what is it?

This is a switch that is passed to opt out of Chocolatey Self-Service. It's typically passed by the agent service back to choco to run a command for a user. You typically would not issue this, but the agent service will, so you are likely to see it in the logs if you are looking closely.

___
## Common Errors and Resolutions
### The updated license file is not being picked up in the website
You need to restart the web executable currently. We are looking to have it automatically picked up in future releases. Here's a script to handle that:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Process ChocolateySoftware.ChocolateyManagement.Web.Mvc | Stop-Process
Get-Service chocolatey-* | Start-Service
```

### A computer or group is not showing as available for deployments but I have plenty of available licenses
Once you upgrade to Central Management v0.3.0+, you have upgraded the Agent on the machine to v0.11.0+, and it has successfully completed a check in, then that messaging should go away. Note that clients do not get a message back that there was a failure as a security feature - you'll need to consult the Central Management Service logs. You can find that at `$env:ChocolateyInstall\logs\ccm-service.log`, or if you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

___
## Related Topics

* [[Chocolatey Central Management|CentralManagement]]
* [[Central Management - Groups|CentralManagementGroups]]
* [[Central Management - Computers|CentralManagementComputers]]
* [[Central Management - Reports|CentralManagementReports]]

___
[[Chocolatey Central Management|CentralManagement]]
