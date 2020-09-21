# Chocolatey Central Mangement Upgrade
This will guide us through upgrading an existing Chocolatey Central Management installation to newer versions.

> :memo: **NOTE**: Looking for installation instructions? See [[Central Management Setup|CentralManagementSetup]].

> :warning: **WARNING**
>
> Unless otherwise noted, please follow these steps in ***exact*** order. These steps build on each other and need to be completed in order.

> :warning: **WARNING**
>
> All deployed components of the CCM packages should **always** be the ***SAME VERSION***. The only time you should not have this is when you are in a state of upgrading and that transition time should be quite short.

___
<!-- TOC depthFrom:2 depthTo:5 -->

- [Step 1: Download Latest Packages](#step-1-download-latest-packages)
- [Step 2: Upgrade Central Management Database](#step-2-upgrade-central-management-database)
- [Step 3: Setup Central Mangement Windows Service(s)](#step-3-setup-central-mangement-windows-services)
- [Step 4: Setup Central Management Website](#step-4-setup-central-management-website)
- [Step 5: Upgrade Agent Machines](#step-5-upgrade-agent-machines)
  - [New Deployments Feature Example](#new-deployments-feature-example)
- [FAQs](#faqs)
  - [Can I simply upgrade all three CCM packages in the same command?](#can-i-simply-upgrade-all-three-ccm-packages-in-the-same-command)
  - [If I update the license file, do I need to restart my services and web?](#if-i-update-the-license-file-do-i-need-to-restart-my-services-and-web)
  - [Can I use Chocolatey Deployments to upgrade CCM based components?](#can-i-use-chocolatey-deployments-to-upgrade-ccm-based-components)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [ERROR: There was an error deserializing the requested JSON file: C:\ProgramData\chocolatey\lib\chocolatey-management-database\tools\app\appsettings.json Padding is invalid and cannot be removed.](#error-there-was-an-error-deserializing-the-requested-json-file-c\programdata\chocolatey\lib\chocolatey-management-database\tools\app\appsettingsjson-padding-is-invalid-and-cannot-be-removed)
  - [When I upgrade the website, it wipes out any http port bindings I created](#when-i-upgrade-the-website-it-wipes-out-any-http-port-bindings-i-created)
  - [ERROR: The term ‘Install-SettingsJsonFile’ is not recognized as the name of a cmdlet, function, script file, or operable program.](#error-the-term-install-settingsjsonfile-is-not-recognized-as-the-name-of-a-cmdlet-function-script-file-or-operable-program)

<!-- /TOC -->

___
## Step 1: Download Latest Packages

> :memo: **NOTE**
>
> Make sure you have read over the [[CCM Compability Matrix|CentralManagement#ccm-component-compatibility-matrix]] prior to starting internalization as this will save you some headaches.

Similar to how we internalized in [[Setup - Internalize Packages|CentralManagementSetup#step-1-internalize-packages]], we need to get the latest editions of everything compatible. Be sure that the versions of packages you have match up with the [[Complatibility Matrix|CentralManagement#ccm-component-compatibility-matrix]].

> :warning: **TRIALS**: You need to ***first reach out*** to your sales representative to get the latest binaries - your trial license won't have direct access to the licensed repository.

```powershell
# To run this, you need Chocolatey for Business installed (chocolatey / chocolatey.extension).
# - TRIALS are fine, but there are modifications noted in the script.

# Update the values and remove the < >
$YourInternalRepositoryPushUrl = '<INSERT REPOSITORY URL HERE>'
$YourInternalRepositoryApiKey = '<YOUR API KEY HERE>'
# You get this from the chocolatey.license.xml file:
$YourBusinessLicenseGuid = '<INSERT NON-TRIAL C4B LICENSE GUID HERE>'

# Download Chocolatey community related items, no internalization necessary
choco download chocolatey chocolateygui --force --source="'https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"

# Download Licensed Packages
# TRIAL? Please reach out to your sales person to get the latest binaries.
## DO NOT RUN WITH `--internalize` and `--internalize-all-urls` - see https://github.com/chocolatey/chocolatey-licensed-issues/issues/155
choco download chocolatey-agent chocolatey.extension chocolatey-management-database chocolatey-management-service chocolatey-management-web --force --source="'https://licensedpackages.chocolatey.org/api/v2/;https://chocolatey.org/api/v2/'" --output-directory="'C:\packages'"  --user="'user'" --password="'$YourBusinessLicenseGuid'"

# Push all downloaded packages to your internal repository
Get-ChildItem C:\packages -Recurse -Filter *.nupkg | Foreach-Object { choco push $_.Fullname --source="'$YourInternalRepositoryPushUrl'" --api-key="'$YourInternalRepositoryApiKey'"}
```

___
## Step 2: Upgrade Central Management Database

> :memo: **NOTE**: Please see [[Central Management Database Setup|CentralManagementSetupDatabase]] for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-database -y
```

> :warning: **WARNING** If you are using QDE and receive an error about deserializing and padding, see the resolution below.

___
## Step 3: Setup Central Mangement Windows Service(s)

> :memo: **NOTE**: Please see [[Central Management Service Setup|CentralManagementSetupService]] for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-service -y
```

> :warning: **WARNING**: If you passed non-default options for any of the following:
> * `/Username:` / `/Password:` / `/EnterPassword`
> * `/PortNumber:`
>
> You ***will need to pass*** those items again for upgrades in current releases of CCM.


> :warning: **WARNING**: If you passed a non-default option for the following:
> * `/CertificateDnsName:` / `/CertificateThumbprint:`
>
> You ***may need to pass*** those items again under the following conditions:
> * Your certificate's DNS name does not match `<hostname>*`(a certficate that at least starts with the hostname).

> :memo: **NOTE**: Database details that have not changed will not need to be passed.

There may be additional (new) things you will want to configure. Please see [[Central Management Service Setup|CentralManagementSetupService]] for details.

___
## Step 4: Setup Central Management Website

> :memo: **NOTE**: Please see [[Central Management Web Setup|CentralManagementSetupWeb]] for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-web -y
```

> :warning: **WARNING**
>
> You may need to adjust permissions/roles for your user if not using the default `ccmadmin` account. Please see the roles and permissions your account has versus what is available in `Administration -> Users`.

___
## Step 5: Upgrade Agent Machines

> :memo: **NOTE**: Please see [[Central Management Client Setup|CentralManagementSetupClient]] for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-agent -y
```

There may be additional (new) things you will want to configure. Please see [[Central Management Client Setup|CentralManagementSetupClient]] for details.

> :memo: **NOTE**: This could include the agent(s) on the CCM machine(s).

> :warning: **WARNING**: The Chocolatey Agent installed on the same machine that has the CCM Service installed will share the `centralManagementServiceUrl` setting, so that agent can only report into that CCM Service.

### New Deployments Feature Example
As an example, configuring using Deployments would have the folllowing:

```powershell
# Requires Chocolatey Licensed Extension v2.1.0+, Chocolatey-Agent v0.10.0+, and Chocolatey Central Management v0.2.0+:
choco feature enable --name="'useChocolateyCentralManagementDeployments'"
```

> :warning: **WARNING**
>
> As these features have security considerations (it is enabling cross-machine communication), they must be turned on explicitly.
> If you decide you want to open this up for over the internet communication, you should also set `centralManagementClientCommunicationSaltAdditivePassword` and `centralManagementServiceCommunicationSaltAdditivePassword`.
> For more in-depth configuration options and settings for your endpoints, you can view the [[CCM Client Setup page|CentralManagementSetupClient]]


___
## FAQs
### Can I simply upgrade all three CCM packages in the same command?
We strongly advise against it as there is an explicit order that things must be upgraded in. Since CCM components can be installed on separate machines, there is no explicit dependency that can be taken. Just note that running

```powershell
# !!!DO NOT DO THIS!!!
# choco upgrade chocolatey-management-database chocolatey-management-service chocolatey-management-web -y
```

when you have everything on the same box may work, but it may not. Please follow the steps here for best success.

### If I update the license file, do I need to restart my services and web?
Yes, you do need to restart the agents, the service, and the web to pick up the license. Here's a script to handle that:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Process ChocolateySoftware.ChocolateyManagement.Web.Mvc | Stop-Process
Get-Service chocolatey-* | Start-Service
```

### Can I use Chocolatey Deployments to upgrade CCM based components?
Likely you absolutely can, just keep in mind that there may be a specific ordering in how you would upgrade everything and adhere to that order. In some instances, you may need to upgrade agents first, then CCM components as once CCM is upgraded it may not be able to talk to the agents. However agents will stop being able to talk to CCM for a small period of time while you are upgrading CCM, but then things will start working again.


___
## Common Errors and Resolutions
### ERROR: There was an error deserializing the requested JSON file: C:\ProgramData\chocolatey\lib\chocolatey-management-database\tools\app\appsettings.json Padding is invalid and cannot be removed.
This means that the Chocolatey Unique Machine GUID has been changed since you installed the database, as you might see with some versions of QDE (which might be corrected in a version you have.)

In that case you should run the following script:

```powershell
Remove-Item -Force -Path "$env:ChocolateyInstall\lib\chocolatey-management-database\tools\app\appsettings.json" -ErrorAction SilentlyContinue
choco upgrade chocolatey-management-database -y --package-parameters="'/SqlServerInstance:localhost\SQLEXPRESS'" --source="'c:\choco-setup\packages'"
```

### When I upgrade the website, it wipes out any http port bindings I created
This was an issue in releases prior to upgrading to CCM v0.3.0 - see  https://github.com/chocolatey/chocolatey-licensed-issues/issues/156.
If you run into this, please recreate the bindings again.

### ERROR: The term ‘Install-SettingsJsonFile’ is not recognized as the name of a cmdlet, function, script file, or operable program.
This is https://github.com/chocolatey/chocolatey-licensed-issues/issues/161.

There are two workarounds noted:
* Delete the appsettings.json file prior to upgrade
* Do not pass database details if they have not changed during upgrade.

___
[[Central Management Setup|CentralManagementSetup]] | [[Chocolatey Central Management|CentralManagement]]
