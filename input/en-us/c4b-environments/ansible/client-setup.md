---
Order: 42
xref: c4b-ansible-client-setup
Title: Client Setup
Description: How to Setup a Client Machine to Use the Chocolatey for Business Ansible Environment
---

## Summary

Once you have your Chocolatey for Business environment deployed, you'll need to get clients talking to it.  
To do that, you'll need to do the following on the clients:

1. Ensure the client machine can access the Chocolatey Central Management service on port 24020, and the Sonatype Nexus service on 8443 (by default).
1. **If your certificate is self-signed:** [Install the SSL/TLS certificate](xref:c4b-azure-client-setup#ssl-certificate).
1. [Install Chocolatey components and configure the client for Chocolatey for Business](xref:c4b-ansible-client-setup#client-setup-script) (C4B) deployments and management.

## Client Setup Script

To install the Chocolatey components and on-board clients, you should run the `ClientSetup.ps1` script provided with your Chocolatey for Business Ansible Environment. By default, this script is stored in the newly created `choco-install` repository.

You will need the following values ready when running this script:

* `FQDN`: The fully qualified domain name used to access your environment.
* `ccm_client_salt`: This is the client-side salt additive. More information about this can be found in the [Config Settings](xref:ccm-client#config-settings) docs. The value will have been provided during the deployment of the Chocolatey for Business environment.
* `ccm_service_salt`: This is the service salt additive. More information about this can be found in the [Config Settings](xref:ccm-client#config-settings) docs. The value will have been provided during the deployment of the Chocolatey for Business environment.
* `chocouser_password`: The password for the `chocouser` account which is used by the client to access your environments' Sonatype Nexus service. The value will have been provided during the deployment of the Chocolatey for Business environment.

The values provided during the deployment were available in the `CCM.html` file provided in the `credentials` directory within the deployment repository.

> :choco-info: **NOTE**
>
> You can set default values for the parameters and remove the Mandatory flag if you prefer to run the script without being prompted for input.

When you're ready, run the following script on the client from an elevated (Run as Administrator) PowerShell terminal:

```powershell
param(
    # The fully qualified domain name (FQDN) of the Sonatype Nexus Repository service
    [Parameter(Mandatory)]
    $FQDN,

    # The Password for the chocouser account on Sonatype Nexus Repository service
    [Parameter(Mandatory)]
    $Password,

    # The Chocolatey Central Management client communication salt, provided during deployment
    [Parameter(Mandatory)]
    $ClientCommunicationSalt,

    # The Chocolatey Central Management service communication salt
    [Parameter(Mandatory)]
    $ServiceCommunicationSalt
)

$credential = [pscredential]::new('chocouser', ($Password | ConvertTo-SecureString -AsPlainText -Force))
$downloader = [System.Net.WebClient]::new()
$downloader.Credentials = $credential

$script =  $downloader.DownloadString("https://$($FQDN):8443/repository/choco-install/ClientSetup.ps1")

$params = @{
    Credential      = $credential
    ClientSalt      = $clientCommunicationSalt
    ServerSalt      = $serviceCommunicationSalt
}

& ([scriptblock]::Create($script)) @params
```

For example, to run this locally, save the script to an accessible location (in the example below shown as `~\Downloads\ChocoOnboarding.ps1`) and run:

```powershell
Set-ExecutionPolicy Unrestricted -Scope Process -Force
~\Downloads\ChocoOnboarding.ps1
```

You will then be prompted for each parameter value.

This script will accomplish the following on your client:

1. Install Chocolatey CLI from the installation script hosted in your internal raw Sonatype Nexus Repository.
1. Add the `ChocolateyInternal` source, and enable it for self-service.
1. Disable the default `chocolatey` source.
1. Install your Chocolatey license using the `chocolatey-license` package.
1. Install the Chocolatey Licensed Extension (without context menus for Package Builder).
1. Install the `ChocolateyGUI` package on the endpoint, for self-service support.
1. Install the `chocolatey-agent` package, which supports self-service and Chocolatey Central Management communication.
1. Enable and disable features related to configuring self-service access on the endpoint.
1. Setup the communication channel between the endpoint and Chocolatey Central Management, using the correct URL and salts.
1. Enable Chocolatey Central Management Deployments.
