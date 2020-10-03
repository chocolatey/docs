---
Order: 40
Title: Central Management Upgrade
Description: How to upgrade CCM
RedirectFrom: docs/central-management-setup-upgrade
---

This will guide us through upgrading an existing Chocolatey Central Management installation to newer versions.

> 📝 **NOTE**: Looking for installation instructions? See [Central Management Setup](./setup).

> ⚠️ **WARNING**
>
> Unless otherwise noted, please follow these steps in ***exact*** order. These steps build on each other and need to be completed in order.

> ⚠️ **WARNING**
>
> All deployed components of the CCM packages should **always** be the ***SAME VERSION***. The only time you should not have this is when you are in a state of upgrading and that transition time should be quite short.

## Step 1: Download Latest Packages

> 📝 **NOTE**
>
> Make sure you have read over the [CCM Compability Matrix](./index#ccm-component-compatibility-matrix) prior to starting internalization as this will save you some headaches.

Similar to how we internalized in [Setup - Internalize Packages](./setup#step-1-internalize-packages), we need to get the latest editions of everything compatible. Be sure that the versions of packages you have match up with the [Complatibility Matrix](./index#ccm-component-compatibility-matrix).

> ⚠️ **TRIALS**: You need to ***first reach out*** to your sales representative to get the latest binaries - your trial license won't have direct access to the licensed repository.

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

## Step 2: Upgrade Central Management Database

> 📝 **NOTE**: Please see [Central Management Database Setup](./setup-database) for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-database -y
```

> ⚠️ **WARNING** If you are using QDE and receive an error about deserializing and padding, see the resolution below.

## Step 3: Setup Central Management Windows Service(s)

> 📝 **NOTE**: Please see [Central Management Service Setup](./setup-service) for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-service -y
```

> ⚠️ **WARNING**: If you passed non-default options for any of the following:
> * `/Username:` / `/Password:` / `/EnterPassword`
> * `/PortNumber:`
>
> You ***will need to pass*** those items again for upgrades in current releases of CCM.


> ⚠️ **WARNING**: If you passed a non-default option for the following:
> * `/CertificateDnsName:` / `/CertificateThumbprint:`
>
> You ***may need to pass*** those items again under the following conditions:
> * Your certificate's DNS name does not match `<hostname>*`(a certficate that at least starts with the hostname).

> 📝 **NOTE**: Database details that have not changed will not need to be passed.

There may be additional (new) things you will want to configure. Please see [Central Management Service Setup](./setup-service) for details.

## Step 4: Setup Central Management Website

> 📝 **NOTE**: Please see [Central Management Web Setup](./setup-web) for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-management-web -y
```

> ⚠️ **WARNING**
>
> You may need to adjust permissions/roles for your user if not using the default `ccmadmin` account. Please see the roles and permissions your account has versus what is available in `Administration -> Users`.

## Step 5: Upgrade Agent Machines

> 📝 **NOTE**: Please see [Central Management Client Setup](./setup-client) for details about all arguments that can be passed and set.

```powershell
choco upgrade chocolatey-agent -y
```

There may be additional (new) things you will want to configure. Please see [Central Management Client Setup](./setup-client) for details.

> 📝 **NOTE**: This could include the agent(s) on the CCM machine(s).

> ⚠️ **WARNING**: The Chocolatey Agent installed on the same machine that has the CCM Service installed will share the `centralManagementServiceUrl` setting, so that agent can only report into that CCM Service.

### New Deployments Feature Example

As an example, configuring using Deployments would have the folllowing:

```powershell
# Requires Chocolatey Licensed Extension v2.1.0+, Chocolatey-Agent v0.10.0+, and Chocolatey Central Management v0.2.0+:
choco feature enable --name="'useChocolateyCentralManagementDeployments'"
```

> ⚠️ **WARNING**
>
> As these features have security considerations (it is enabling cross-machine communication), they must be turned on explicitly.
> If you decide you want to open this up for over the internet communication, you should also set `centralManagementClientCommunicationSaltAdditivePassword` and `centralManagementServiceCommunicationSaltAdditivePassword`.
> For more in-depth configuration options and settings for your endpoints, you can view the [CCM Client Setup page](./setup-client)

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

[Central Management Setup](./setup) | [Chocolatey Central Management](./)
