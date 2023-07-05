---
Order: 20
xref: c4b-azure
Title: Azure Environment
Description: High level information about the Chocolatey for Business Azure Environment
RedirectFrom:
  - en-us/quick-deployment/azure
  - en-us/quick-deployment/azure/index.html
---

## Summary

This is an overview of the Chocolatey for Business Azure Environment.

It is a deployable resource in the [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/chocolateysoftwareinc1605695330527.c4b_azure_qde), allowing for the speedy creation of an opinionated, pre-configured environment containing Chocolatey Central Management (CCM), a package repository (Nexus OSS), and an automation engine (Jenkins).

> :choco-info: **NOTE**
>
> A Chocolatey for Business Azure Environment is a fully functional Chocolatey for Business environment; as such, it will require a business or trial license.

## Prerequisites

Currently, to deploy the Chocolatey for Business Azure Environment you will need:

* A Chocolatey for Business License, or Trial License
* An account with [Contributor](https://docs.microsoft.com/en-us/azure/role-based-access-control/built-in-roles#contributor) access to an Azure subscription
* The ability to create a CNAME DNS record for your chosen FQDN
* A valid certificate for your chosen FQDN, in PFX format, with exportable private key

For portions of this document using PowerShell, we assume you have installed a recent version of the [Az modules](https://www.powershellgallery.com/packages/Az/) (easily available by running `choco install az.powershell` in an elevated prompt), and have logged in to your account using `Connect-AzAccount`. You can also set a variable, `$ResourceGroupName`, to the name of the resource group you deployed the Chocolatey for Business Azure Environment to as we will use this with the PowerShell code snippets below.

## Deploying the Chocolatey for Business Azure Environment

The Chocolatey for Business Azure Environment is available as a deployable resource in the [Microsoft Azure Marketplace](https://azuremarketplace.microsoft.com/en-us/marketplace/apps/chocolateysoftwareinc1605695330527.c4b_azure_qde).

Find the [Chocolatey for Business Azure Environment](https://portal.azure.com/#blade/Microsoft_Azure_Marketplace/GalleryItemDetailsBladeNopdl/id/chocolateysoftwareinc1605695330527.c4b_azure_qde) resource, and click `Create`. You will be taken to the `Create Chocolatey for Business Azure Environment` page.

### Basics

Select the subscription, resource group, and region you intend to deploy to. As you need to deploy this to an empty resource group, you may need to create a new one by clicking the `Create new` button below the selector.

![Resource Group Selector](/assets/images/c4b-azure/BasicsView-ResourceGroupSelector.png)

By default, all resources in the resource group are deployed with 'choco' prefixing the resource name. If you'd prefer to use something else for identification you can change it here.

> :choco-info: **NOTE**
>
> Due to constraints in naming some resources, the prefix must be 8 characters or less and contain only alphanumeric characters.

![Naming Prefix](/assets/images/c4b-azure/BasicsView-InstanceDetails.png)

For the environment to deploy successfully, you must have a valid Chocolatey for Business license. Select and upload your license here.

![License Upload](/assets/images/c4b-azure/BasicsView-LicenseUpload.png)

### Domain Configuration

In order to connect to your new Chocolatey for Business Azure Environment, you will need to select a DNS name. Though you can connect to the Microsoft provided FQDN, there would be additional work involved in trusting the self-signed certificate used (i.e. adding the Public IP addresses' FQDN to a self-signed certificate, and ensuring this certificate was in the `Trusted Root Certification Authorities` store).

Fill your intended domain name in, select and upload your PFX certificate, and enter the password for the certificate.

![Custom Domain Configuration](/assets/images/c4b-azure/DomainView-CustomDomain.png)

> :choco-info: **NOTE**
>
> The PFX certificate must contain the exportable private key, and should be protected with a password.
> Suggestions for creating a PFX certificate can be found [here](xref:c4b-azure#ssl-certificate).

### Internalize Packages

You can select packages to directly internalize from the [Chocolatey Community Repository](https://community.chocolatey.org/packages/).

We offer bundles of recommended packages (see [recommendations](xref:c4b-azure-packages#recommendations) for the exact content of each bundle).

You can then select any of the **Additional Packages**, which will be added to the bundle you choose.

Finally, you can specify _any other_ package from the Chocolatey Community Repository in the `Specify any other packages` textbox.

Please provide a list of Package IDs, separated with commas.

![Package Internalization Screen](/assets/images/c4b-azure/InternalizePackagesView.png)

### Review + create

At this point, Azure will validate your inputs and allow you to deploy the resource.

If there are any validation errors (e.g. missing fields), Azure will highlight the tab the issue is on.

When validation succeeds, click `Create`. The specified environment will be deployed. This can take around half an hour, depending on how many packages are being internalized.

## DNS Configuration

You should create a CNAME DNS record for the domain you specified on the earlier Domain Configuration page.

You can get the FQDN using the [Azure Portal](https://portal.azure.com), or via PowerShell:

**Portal:**

1. Navigate to the Resource Group
1. Select the resource with type `Public IP Address`
1. Copy the `DNS name` from the `Essentials` panel at the top of the blade

![Public IP Address](/assets/images/c4b-azure/PublicIPAddress-EssentialsView.png)

**PowerShell:**

1. Run the following PowerShell:

```PowerShell
if (-not $ResourceGroupName) {$ResourceGroupName = Read-Host 'Enter the ResourceGroupName'}
Get-AzPublicIpAddress -ResourceGroupName $ResourceGroupName | Select-Object -ExpandProperty DnsSettings | Select-Object -ExpandProperty Fqdn
```

### Creating a CNAME record

You should now create a CNAME record for this FQDN. The exact method for this will vary depending on your domain registrar.
Please see the table below for links to help from some popular registrars:

| Registrar  | Documentation |
| ---------- | ------------- |
| GoDaddy    | [Add a CNAME record](https://godaddy.com/help/add-a-cname-record-19236) |
| NameCheap  | [How to Create a CNAME Record For Your Domain](https://www.namecheap.com/support/knowledgebase/article.aspx/9646/2237/how-to-create-a-cname-record-for-your-domain/) |
| Cloudflare | [Managing DNS records in Cloudflare](https://support.cloudflare.com/hc/en-us/articles/360019093151-Managing-DNS-records-in-Cloudflare#h_60566325041543261564371) |
| Bluehost   | [How To Create & Edit CNAME](https://my.bluehost.com/hosting/help/resource/714) |
| 123-reg    | [Creating a CNAME record](https://www.123-reg.co.uk/support/domains/how-do-i-set-up-a-cname-record-on-my-domain-name/) |

If you need help with another registrar, we recommend searching for their documentation, or reaching out to their support.

### Configuring CCM

> :choco-warning: **WARNING**
>
> You cannot create users in CCM until you have configured an SMTP server. To do this, please see [how to configure SMTP in CCM](xref:ccm-website#step-4.2-smtp-configuration).
> You can log in to CCM using the credentials provided in the KeyVault (see [Accessing Services](#accessing-services), below).

## Accessing Services

At this point, your environment should be deployed. You should be able to access the following services:

| Service                           | Address                  | Initial Username |
| --------------------------------- | :----------------------- | ---------------- |
| **Chocolatey Central Management** | https://\<FQDN\>/        | ccmadmin         |
| **Sonatype Nexus**                | https://\<FQDN\>/nexus   | admin            |
| **Jenkins**                       | https://\<FQDN\>/jenkins | admin            |

Passwords to log in to the services have been stored in the KeyVault deployed to your Resource Group.

You can access these passwords either via the Azure Portal, or with PowerShell.

**Portal:**

1. Navigate to the Resource Group
1. Select the KeyVault
1. Under `Settings` on the left of the blade, select `Access Policies`
1. Click `+ Add Access Policy`

    ![Vault Access Policies](/assets/images/c4b-azure/KeyVault-AccessPolicies.png)

1. Select, at a minimum, `Secret Permissions`: `Get` and `List` *(You can use a Template such as `Secret Management`)*

    ![Secret Permissions](/assets/images/c4b-azure/KeyVault-SecretPermissions.png)

1. Under `Select Principal`, click `None Selected` and find your current user, and select it
1. Click `Add`

    ![Add Principal](/assets/images/c4b-azure/KeyVault-AddPrincipal.png)

1. Back on the `Access Policies` blade, hit `Save` and wait for the operation to complete

You can now view and access the secrets in this KeyVault.

![Secrets in Vault](/assets/images/c4b-azure/KeyVault-Secrets.png)

1. Under `Settings` on the left of the blade, select `Secrets`
1. For each Password you want to retrieve (e.g. nexusPassword)
    1. Select the secret
    1. Select the current version
    1. Either click `Show Secret Value` or use the `Copy to Clipboard` button to retrieve the secret

**PowerShell:**

1. Run PowerShell similar to the following:

```PowerShell
if (-not $ResourceGroupName) {$ResourceGroupName = Read-Host 'Enter the ResourceGroupName'}
$CurrentUser = (Get-AzContext).Account.Id

# Grant access to the KeyVault, if missing
$KeyVault = Get-AzKeyVault -ResourceGroupName $ResourceGroupName | ForEach-Object {Get-AzKeyVault -VaultName $_.VaultName}
if ($KeyVault.AccessPolicies.Where{$_.DisplayName -like "*$CurrentUser*"}.PermissionsToSecrets -notcontains 'get') {
    Set-AzKeyVaultAccessPolicy -VaultName $KeyVault.VaultName -UserPrincipalName $CurrentUser -PermissionsToSecrets @('get')
}

Write-Host "Chocolatey for Business Azure Environment Passwords for '$($KeyVault.ResourceGroupName)':"
@{
    CCM     = Get-AzKeyVaultSecret -VaultName $KeyVault.VaultName -Name ccmPassword -AsPlainText
    Nexus   = Get-AzKeyVaultSecret -VaultName $KeyVault.VaultName -Name nexusPassword -AsPlainText
    Jenkins = Get-AzKeyVaultSecret -VaultName $KeyVault.VaultName -Name jenkinsPassword -AsPlainText
}
```

*or* Download and use [Get-AzLabCredential.ps1](https://gist.githubusercontent.com/JPRuskin/a8e438c534a471749fe3c38c948882e8/raw/Get-AzLabCredential.ps1) (which automatically handles permissions), as follows:

```PowerShell
if (-not $ResourceGroupName) {$ResourceGroupName = Read-Host 'Enter the ResourceGroupName'}
$CcmCredential     = .\Get-AzLabCredential.ps1 -ResourceGroupName $ResourceGroupName -SecretPrefix ccm
$NexusCredential   = .\Get-AzLabCredential.ps1 -ResourceGroupName $ResourceGroupName -SecretPrefix nexus
$JenkinsCredential = .\Get-AzLabCredential.ps1 -ResourceGroupName $ResourceGroupName -SecretPrefix jenkins
```

## FAQ

### SSL Certificate

You will need an SSL certificate for the domain you intend to use. This certificate:

* Needs to be in the PFX format
* Needs to include an exportable Private Key
* Must have a password

You can either provide a self-signed SSL certificate, or a purchased or acquired certificate from a Certificate Authority (CA).

Though you can reference the previous Quick Deployment Environment documentation on [SSL Certificates](xref:v2-internet-setup#ssl-certificate-scenarios), there are some differences as you need to have the certificate before deploying the Chocolatey for Business Azure Environment.

#### Self-Signed SSL Certificates

You can quickly generate a self-signed certificate on any recent Windows computer, using PowerShell.

**PowerShell:**

1. Open an elevated PowerShell console
1. Run code similar to the following, modifying the filepath if necessary:

```PowerShell
$Domain   = Read-Host "Enter the FQDN you plan to use to access the Chocolatey for Business Azure Environment sites"
$Password = Read-Host "Enter a password to use for the PFX" -AsSecureString

$Cert = New-SelfSignedCertificate -DnsName $Domain -CertStoreLocation cert:\LocalMachine\My
$Cert | Export-PfxCertificate -FilePath ~\Desktop\$($Domain).pfx -Password $Password
```

You can then use this generated file and the password you set to deploy your Chocolatey for Business Azure Environment.

You can also use a Microsoft Azure KeyVault to create a self-signed certificate by following the steps in Microsoft's documentation using the [Portal](https://docs.microsoft.com/en-us/azure/key-vault/certificates/quick-create-portal) or [Azure PowerShell](https://docs.microsoft.com/en-us/azure/key-vault/certificates/quick-create-powershell).

> :choco-info: **NOTE**
>
> Your browser will display warnings when accessing the Chocolatey for Business Azure Environment sites with a self-signed certificate. To stop these warnings, you need to import this certificate to the `Trusted Root Certification Authorities` store on machines used to access the management sites.

#### Purchased/Acquired Certificates from CA

Organizations can also opt to purchase or acquire a certificate from an external Certificate Authority (e.g. [LetsEncrypt](https://github.com/win-acme/win-acme)).
As mentioned before, you will need to ensure that the "Subject/Common Name" attribute on the SSL certificates matches the FQDN you are using.
If you have a preferred vendor for certificates, you should refer to their documentation for best practices in acquiring a certificate.

You can also use a Microsoft Azure KeyVault and one of the [partnered CA Providers](https://docs.microsoft.com/en-us/azure/key-vault/certificates/create-certificate#partnered-ca-providers) to create and fulfil a certificate request, though this may require additional configuration for your environment.

### How much does it cost?

A ballpark estimate comes to around $170 per month for the deployed infrastructure.

Using methods such as [Azure Reservations](https://docs.microsoft.com/en-us/azure/cost-management-billing/reservations/save-compute-costs-reservations), [Hybrid Benefit](https://azure.microsoft.com/en-gb/pricing/hybrid-benefit/), or [Dev-Test Subscriptions](https://azure.microsoft.com/en-gb/pricing/dev-test/#overview) can cut this cost significantly.

This is based on:

* Using a `Standard D2s v3` VM size
* Deploying to a standard Pay-As-You-Go subscription
* Deploying to the `East US` location

## Common Errors and Resolutions

### Jenkins jobs fail to run after upgrade to Chocolatey CLI v2.0.0

As of version 2.0.0 of Chocolatey CLI, the `choco list` command only lists local packages. The Jenkins scripts included in the C4B Azure Environment prior to version 0.19.0 used this command when interrogating the environment's Nexus repositories. This results in the Jenkins jobs that use these scripts failing to run after updating Chocolatey CLI on ChocoServer itself to version 2.0.0 or above.

To fix these scripts, you need to install a package called `chocolatey-licensed-jenkins-scripts` on ChocoServer. Start by internalizing it:

1. Ensure you have your login credentials for Jenkins and Chocolatey Central Management, as described in the [Accessing Services](#accessing-services) section.
1. Log into Jenkins at `https://<FQDN>/jenkins`
1. Click the green "play" triangle to the right of the `Internalize packages from the Chocolatey Community and Licensed Repositories` job

    ![Location of Jenkins job play button](/assets/images/c4b-azure/Jenkins-Play-Button.png)

1. Enter `chocolatey-licensed-jenkins-scripts` under the `P_PKG_LIST` parameter
1. Change the `P_DST_URL` parameter so that it ends with `ChocolateyInternal` rather than `ChocolateyTest`, this is being changed because the job that promotes packages between these repositories will not work if you have already upgraded to Chocolatey CLI v2.0.0 or above
1. Click `Build`

    ![Example of settings for the Internalize Packages Jenkins job](/assets/images/c4b-azure/Jenkins-Job-Fix-Internalize.png)

> :choco-info: **NOTE**
>
> You may wish to run this job a second time, leaving the `P_DST_URL` as its default value. This will allow future updates to the `chocolatey-licensed-jenkins-scripts` package to be automatically internalized.

Now you need to deploy the `chocolatey-licensed-jenkins-scripts` package to ChocoServer:

1. Log into Chocolatey Central Management at `https://<FQDN>/`
1. Navigate to `Groups` and create a group the contains only ChocoServer if that does not already exist
1. Create a [deployment](xref:ccm-deployments) that targets the group containing ChocoServer
1. Add a basic step, selecting the `choco install` command and specifying the package name `chocolatey-licensed-jenkins-scripts`
1. Move this deployment to the Ready [state](xref:ccm-deployments#deployment-states) and then run it

### Status Message: Exist soft deleted vault with the same name.  (Code:ConflictError)

This can happen when you've deployed a Chocolatey for Business Azure Environment, deleted the Resource Group, and then redeployed it with the same name.

You can either purge the KeyVault in the GUI, or use the PowerShell Az modules as follows:

**PowerShell:**

```PowerShell
if (-not $ResourceGroupName) {$ResourceGroupName = Read-Host 'Enter the ResourceGroupName'}
Get-AzKeyVault -InRemovedState | Where-Object {
    $_.ResourceId -match "/resourceGroups/$($ResourceGroupName)/"
} | ForEach-Object {
    Remove-AzKeyVault -Name $_.VaultName -Location $_.Location -InRemovedState -Force
}
```

**Portal:**

1. Open the [Azure Portal](https://portal.azure.com) in a browser, and navigate to the [KeyVault](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.KeyVault%2Fvaults) resource view.
1. Click `Manage Deleted Vaults`
1. Select the Subscription the KeyVault was contained in
1. Select the KeyVault to purge, and click `Purge`, then confirm by clicking `Delete`

### Wait-CCM: 'http://ChocoServer/' was not accessible

We have seen an occasional issue with IISReset that cannot be replicated. This results in CCM setup stalling.

> Restart attempt failed.
> Access denied, you must be an administrator of the remote computer to use this
> command. Either have your account added to the administrator local group of
> the remote computer or to the domain administrator global group.

If you see this error, you should redeploy the resource.

### Environment VM unable to start due to missing secret  (Error: KeyVaultSecretDoesNotExist)

During the deployment of the Chocolatey for Business Azure Environment your supplied certificate is converted from a [secret](https://learn.microsoft.com/en-us/azure/key-vault/secrets/about-secrets) object to a [certificate](https://learn.microsoft.com/en-us/azure/key-vault/certificates/about-certificates) object within the environment's [KeyVault](https://portal.azure.com/#blade/HubsExtension/BrowseResource/resourceType/Microsoft.KeyVault%2Fvaults)

The Chocolatey for Business Azure Environment's Virtual Machine may retain a reference to the certificate from prior to the conversion, and if it is shut down then it will not be able to start again due to the referenced secret no longer existing.

To fix this, use the PowerShell Az modules as follows:

```PowerShell
if (-not $ResourceGroupName) {
    $ResourceGroupName = Read-Host 'Enter the ResourceGroupName'
}
Get-AzVM -ResourceGroupName $ResourceGroupName | Remove-AzVMSecret | Update-AzVM
```
