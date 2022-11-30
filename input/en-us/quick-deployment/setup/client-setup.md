---
Order: 40
xref: v2-client-setup
Title: Client Setup
Description: How to setup a client machine to use QDE
RedirectFrom: docs/quick-deployment-client-setup
---

> :choco-info: **NOTE**
>
> This document is for **Version 2** of the Quick Deployment Environment.
> If you're using an older version of QDE, please refer to the [QDEv1 Client Setup page](xref:v1-client-setup).

## Summary

Once you have QDE set up in your environment, you'll need to get clients talking to it.
To do that, you'll need to do the following on the clients:

1. Setup DNS to allow access to QDE.
1. Install the QDE SSL/TLS certificate so clients can access HTTPS components.
1. Install Chocolatey components.

## DNS

In most environments, once you've added the QDE server, clients should be able to access it.
In some situations, you may need to add the host name with the IP address to your HOSTS file to reach your environment.

## Client Installation

On your client machines, you will need to run the following PowerShell scripts in an administrative context:

> :choco-info: **NOTE**
>
> `chocoserver` is the default hostname for QDE.
> If you've adjusted the QDE server hostname or added custom HOSTS mappings, use the appropriate hostname instead.

### Import Self-Signed Certificate from QDE Server

> :choco-warning: **WARNING**
>
> - If you're using a CA-signed or domain certificate that is already trusted by client machines for QDE, you can skip this step.
> - If your clients are air-gapped, you will need to ensure that they can at least access the QDE server itself in order to import the QDE Certificate.

```powershell
$downloader = New-Object -TypeName System.Net.WebClient
Invoke-Expression ($downloader.DownloadString('http://chocoserver:80/Import-ChocoServerCertificate.ps1'))
```

### Run ClientSetup.ps1

```powershell
$downloader = New-Object -TypeName System.Net.WebClient
Invoke-Expression ($downloader.DownloadString('https://chocoserver:8443/repository/choco-install/ClientSetup.ps1'))
```

The `ClientSetup.ps1` script executed here will:

1. Install Chocolatey
1. License Chocolatey by installing the license package (`chocolatey-license`) created during QDE setup
1. Install the Chocolatey Licensed Extension (`chocolatey.extension`) without context menus
1. Install the Chocolatey Agent service (`chocolatey-agent`)
1. Configure ChocolateyInternal source
1. Configure Self-Service mode
1. Configure Central Management check-in

> :choco-info: **NOTE**
>
> For internet enabled client setup please refer to [Quick deployment Environment Internet Setup](xref:v2-internet-setup) for additional information.

[Quick Deployment Environment](xref:qde)
