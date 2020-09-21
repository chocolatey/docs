# Chocolatey Central Mangement Client Setup
This will guide us through getting an agent installed and configured to check into Central Management and to be set up for handling deployment tasks.

___
<!-- TOC depthFrom:2 -->

- [Setup](#setup)
  - [Step 1: Install Chocolatey Agent](#step-1-install-chocolatey-agent)
  - [Step 2: Update Configuration](#step-2-update-configuration)
    - [Config Settings](#config-settings)
    - [Features](#features)
  - [Step 3: Verify Installation](#step-3-verify-installation)
- [FAQ](#faq)
  - [Can I run Self-Service and Central Management Deployments at the same time?](#can-i-run-self-service-and-central-management-deployments-at-the-same-time)
  - [How can I increase the level of logging for Chocolatey Central Management?](#how-can-i-increase-the-level-of-logging-for-chocolatey-central-management)
  - [Can I save an image with the agent already installed that I can deploy new machines from?](#can-i-save-an-image-with-the-agent-already-installed-that-i-can-deploy-new-machines-from)
  - [What is the CCM compatibility matrix?](#what-is-the-ccm-compatibility-matrix)
  - [What is Run Actual?](#what-is-run-actual)
  - [Where is the agent service installed?](#where-is-the-agent-service-installed)
- [Common Errors And Resolutions](#common-errors-and-resolutions)
  - [Unable to report computer information to CCM](#unable-to-report-computer-information-to-ccm)
  - [Unable to check for deployments from CCM](#unable-to-check-for-deployments-from-ccm)
  - [We are seeing the error "attempted to call report_computer_information with an improper passphrase" in the CCM Service log](#we-are-seeing-the-error-attempted-to-call-report_computer_information-with-an-improper-passphrase-in-the-ccm-service-log)
  - [The client reports successful checkin, but nothing is showing up in CCM](#the-client-reports-successful-checkin-but-nothing-is-showing-up-in-ccm)
  - [Chocolatey Agent Service is unable to communicate with Chocolatey Central Management Service](#chocolatey-agent-service-is-unable-to-communicate-with-chocolatey-central-management-service)
  - [The remote server returned an unexpected response: (413) Request Entity Too Large](#the-remote-server-returned-an-unexpected-response-413-request-entity-too-large)
  - [Computers checking in are overwriting each other](#computers-checking-in-are-overwriting-each-other)
  - [The agent services are not picking up the new license](#the-agent-services-are-not-picking-up-the-new-license)

<!-- /TOC -->

___
## Setup
### Step 1: Install Chocolatey Agent
First you need Chocolatey Agent installed. As there may be some steps involved with the install of the agent, please see [[Chocolatey Agent Setup|FeaturesAgentService#setup]].

___
### Step 2: Update Configuration
At a minimum you need the following items set to be able to have a Chocolatey Agent be "opted-in" for both checking into Central Management and Deployments:

```powershell
choco config set CentralManagementServiceUrl https://<FQDN_CCM_SERVICE>:24020/ChocolateyManagementService
choco feature enable --name="'useChocolateyCentralManagement'"
# Requires Chocolatey Licensed Extension v2.1.0+, Chocolatey-Agent v0.10.0+, and Chocolatey Central Management v0.2.0+:
choco feature enable --name="'useChocolateyCentralManagementDeployments'"
```

> :warning: **WARNING**: The Chocolatey Agent installed on the same machine that has the CCM Service installed will share the `centralManagementServiceUrl` setting, so that agent can only report into that CCM Service.


Please see config settings and features below for a full list.

> :memo: **NOTE**
>
> As these features have security considerations as it is enabling cross-machine communication, they must be turned on explicitly.
> If you decide you want to open this up for over the internet communication, you should also set `centralManagementClientCommunicationSaltAdditivePassword` and `centralManagementServiceCommunicationSaltAdditivePassword` - see [Configuration](#configuration) below.

#### Config Settings
* `centralManagementServiceUrl` = **' '** - The URL that should be used to communicate with Chocolatey Central Management. It should look something like https://servicemachineFQDN:24020/ChocolateyManagementService. See https://chocolatey.org/docs/features-chocolatey-central-management#fqdn-usage. Defaults to '' (empty). Available in business editions v2.0.0+ only.
* `centralManagementReportPackagesTimerIntervalInSeconds` = **'1800'** - Amount of time, in seconds, between each execution of the background service to report installed and outdated packages to Chocolatey Central Management. Defaults to '1800'. Available in business editions v2.0.0+ only.
* `centralManagementReceiveTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to receive information from Chocolatey Central Management. Defaults to '30'. Available in business editions v2.0.0+ only.
* `centralManagementSendTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to send information to Chocolatey Central Management. Defaults to '30'. Available in business editions v2.0.0+ only.
* `centralManagementCertificateValidationMode` = **'PeerOrChainTrust'** - The certificate mode that is used in communication to Chocolatey Central Management. Defaults to 'PeerOrChainTrust'. Available in business editions v2.0.0+ only.
* `centralManagementMaxReceiveMessageSizeInBytes` = **'2147483647'** - The size of the permitted message, in bytes, which can be exchanged between the Chocolatey Background Agent and Chocolatey Central Management. Defaults to '2147483647'. Available in business editions v2.0.3+ only.
* `centralManagementDeploymentCheckTimerIntervalInSeconds` = **'180'** - Amount of time, in seconds, between each execution of the background service to check for a new deployment step from Chocolatey Central Management. Defaults to '180'. Available in business editions v2.1.0+ only.
* `centralManagementClientCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Client Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication from an agent TO an instance of Central Management Service (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions v2.1.0+ only. Requires Chocolatey Agent v0.10.0+ and Central Management 0.2.0+. IMPORTANT: If this value is set, agents less than v0.10.0 will be unable to contact Central Management to report in.
* `centralManagementServiceCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication FROM an instance of Central Management Service to an agent (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions v2.1.0+ only. Requires Chocolatey Agent v0.10.0+ and Central Management 0.2.0+.

> :warning: **WARNING**: The Chocolatey Agent installed on the same machine that has the CCM Service installed will share the `centralManagementServiceUrl` setting, so that agent can only report into that CCM Service.


Also found at [[Chocolatey Configuration|ChocolateyConfiguration]].

#### Features
* [ ] `useChocolateyCentralManagement` - Use Chocolatey Central Management - Lists of installed and outdated packages will be reported to the chosen Chocolatey Central Management server.  Business editions only (version 2.0.0+). See https://chocolatey.org/docs/features-chocolatey-central-management
* [ ] `useChocolateyCentralManagementDeployments` - Use Chocolatey Central Management Deployments - Centrally managed deployments of packages and scripts can be sent from Chocolatey Central Management.  Business editions only (version 2.1.0+). See https://chocolatey.org/docs/features-chocolatey-central-management

Also found at [[Chocolatey Configuration|ChocolateyConfiguration]].

___
### Step 3: Verify Installation

* Open the services snap-in (services.msc) and check for the presence of the `Chocolatey Agent` which should be in the started state.
* The installation folder for `chocolatey-agent` is at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service`.
* Open the Service log file located at `$env:ChocolateyInstall\logs\chocolatey-agent.log` and verify that there are no recently reported errors. If you are on a version of Chocolatey Agent prior to 0.10.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service\logs\chocolatey-agent.log`.
* There should be messages of connecting to the ccm server and checking in. It will be similar to this:
  ![Agent Setup For CCM](images/features/ccm/agent_ccm_setup_good.png)
  Connection to report in:
  ![Agent Checkin to CCM](images/features/ccm/agent_ccm_communication.png)

___
## FAQ
### Can I run Self-Service and Central Management Deployments at the same time?
Yes

### How can I increase the level of logging for Chocolatey Central Management?
This can be done by changing the level value, which should be currently `INFO`, to use `DEBUG`, as per the following:

~~~xml
<root>
  <level value="DEBUG" />
  <appender-ref ref="ColoredConsoleAppender" />
  <appender-ref ref="RollingLogFileAppender" />
</root>
~~~

In the following files:

* `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\log4net.config`. If you are on a version less than 0.2.0, then it will be in `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\chocolatey-central-management.exe.config`.
* `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service\chocolatey-agent.exe.config`

When the value is changed, the services may also need restarted.

### Can I save an image with the agent already installed that I can deploy new machines from?
Yes, however you need to keep in mind that there is a unique machine Id that will need to be erased so it can be regenerated.

Make sure to include the following in your provisioning script to deploy the new images:

```powershell
Write-Host "Removing Chocolatey Unique Machine GUID"
Remove-ItemProperty -Path "HKLM:\Software\Chocolatey" -Name "UniqueId" -Force
# Restart the Agent Service if it is running
```

Once you've removed this, you'll need to restart the Agent Service to get it regenerated.

> :information_source: You may ***also*** need to remove the ChocolateyLocalAdmin user (if you are using it for services) and reinstall the Agent service (and CCM service if on this machine) to get that password corrected.

### What is the CCM compatibility matrix?
Central Management has specific compatibility requirements with quite a few moving parts. It is important to understand that there are some Chocolatey Agent versions that may not be able to communicate with some versions of CCM and vice versa.  Please see the [[CCM Component Compatibility Matrix|CentralManagement#ccm-component-compatibility-matrix]] for details.

### What is Run Actual?
You may have seen `--run-actual`, what is that?

This is a switch that is passed to opt out of Chocolatey Self-Service. It's typically passed by the agent service back to choco to run a command for a user. You typically would not issue this, but the agent service will, so you are likely to see it in the logs if you are looking closely.

### Where is the agent service installed?
The installation folder for `chocolatey-agent` is at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service`.

___
## Common Errors And Resolutions
### Unable to report computer information to CCM
You may see messaging like the following in the chocolatey-agent.log:

```sh
[INFO ] - Creating secure channel to https://ccmserver:24020/ChocolateyManagementService ahead of CCM check-in...
[ERROR] - Unable to report computer information to CCM.:
 The message with Action 'http://tempuri.org/IChocolateyManagementService/report_computer_information' cannot be
 processed at the receiver, due to a ContractFilter mismatch at the EndpointDispatcher. This may be because of either a
 contract mismatch (mismatched Actions between sender and receiver) or a binding/security mismatch between the sender
 and the receiver.  Check that sender and receiver have the same contract and the same binding (including security
 requirements, e.g. Message, Transport, None).
```

This is due to having a Chocolatey Agent that is v0.10.0+ versus an older Central Management Service (< v0.2.0). Newer agents are incompatible because they use newer and more secure methods of communication. Please upgrade Central Management to v0.2.0+ at your earliest convenience. Or if you are on CCM v0.3.0+, your agents need to be on v0.11.0+. Please refer to the [[CCM Compability Matrix|CentralManagement#ccm-component-compatibility-matrix]].

### Unable to check for deployments from CCM
This will provide similar messaging as the above. The fix is the same, upgrade Chocolatey Central Management to v0.2.0+. Or if you are on CCM v0.3.0+, your agents need to be on v0.11.0+. Please refer to the [[CCM Compability Matrix|CentralManagement#ccm-component-compatibility-matrix]]. You may need to be on at least v0.3.0 and agents on v0.11.0+ if you are experiencing improper passphrase issues noted below, it means you need to likely upgrade to v0.3.0+ / v0.11.0 across your infrastructure.

### We are seeing the error "attempted to call report_computer_information with an improper passphrase" in the CCM Service log
If you are in the CCM service logs, you may be seeing the above error. That is a bug that was found with the communication of CCM v0.2.0 and Chocolatey Agent v0.10.0. That was resolved in CCM v0.3.0 and Chocolatey Agent v0.11.0. Please see the [[CCM Component Compatibility Matrix|CentralManagement#ccm-component-compatibility-matrix]] and [Licensed Issue #152](https://github.com/chocolatey/chocolatey-licensed-issues/issues/152) for more details.

### The client reports successful checkin, but nothing is showing up in CCM
You need to check the CCM service logs. The agent will always report success when it communicates with the service successfully. The service may reject what it receives, but due to security settings, it won't tell the client about that.

The logs are located at `$env:ChocolateyInstall\logs\ccm-service.log`. If you are on a version of CCM prior to 0.2.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-management-service\tools\service\logs\chocolatey.service.host.log`.

### Chocolatey Agent Service is unable to communicate with Chocolatey Central Management Service
There is a known issue with the beta release of Chocolatey Central Management where an inconsistent Port Number is used between these two services.  One used 24020 and the other used 24040.  The correct default Port Number is 24020, and this is used in the 0.1.0 release of Chocolatey Central Management.  If required, the Port Number can be explicitly set during the installation of the Chocolatey Central Management packages using the following option when installing `chocolatey-management-service`:

```powershell
--params="'/PortNumber=24020'"
```

### The remote server returned an unexpected response: (413) Request Entity Too Large
When reporting a larger number of packages (approximately 200), this error may be reported.  This is due to the size of the information, in bytes, being too large to send between the Chocolatey Agent Service and the Chocolatey Central Management Service.  This has been identified as a [bug](https://github.com/chocolatey/chocolatey-licensed-issues/issues/95), which is due to be corrected in version 0.1.1 of Chocolatey Central Management

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

### The agent services are not picking up the new license
Currently, you do need to restart agents. Here's a handy script:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Service chocolatey-* | Start-Service
```

___
[[Central Management Setup|CentralManagementSetup]] | [[Chocolatey Central Management|CentralManagement]]
