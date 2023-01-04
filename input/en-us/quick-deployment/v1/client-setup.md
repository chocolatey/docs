---
Order: 50
xref: v1-client-setup
Title: Client Setup
Description: How to setup a client machine to use QDE v1
RedirectFrom: docs/quick-deployment-client-setup-v1
---

> :choco-info: **NOTE**
>
> This document is for **Version 1** of the Quick Deployment Environment.
> If you're using a newer version of QDE, please refer to the [newer QDE Client Setup page](xref:v2-client-setup).

## Summary

Once you have QDE set up in your environment, you'll need to get clients talking to it. To do that, we'll need to do the following:

* Setting up DNS on the client to access QDE.
* Install the QDE SSL/TLS certificate so clients can access HTTPS components
* Install Chocolatey and friends

## DNS

Typically in your environment, onces you've added QDE, it should be able to start talking to the QDE.
In some situations, you may need to add the host name with the IP address to your HOSTS file to reach your environment.

## Client Installation

On your client machines, you will be running the following script in an administrative context:

```powershell
Set-ExecutionPolicy RemoteSigned -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/Import-QuickDeployCertificate.ps1')); Set-ExecutionPolicy RemoteSigned -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocoserver:8443/repository/choco-install/ClientSetup.ps1'))
```

What does this do?

* Sets the execution policy for this script run to remote signed scripts.
  This is only in the scope of this process and not permanent.
* Imports the SSL Certificate from the Quick Deploy Environment.
    > :choco-info: **NOTE**
    >
    > This is a signed script that is used to import a certificate.
  Due to how it works and security considerations, there are very few options allowed.
* Switches execution policy to bypass for the internal script.
  This is only in the scope of this process and not permanent.
* Calls Client setup script from the QDE environment (see below for what it does).

> :choco-warning: **WARNING**
>
> If your clients are air-gapped or you have changed the hostname, you will need to find a different means to import the QDE Certificate.
>
> Please reach out to support for options.

> :choco-warning: **WARNING**
>
> If the QDE hostname has been changed, the above script most likely will fail.
>
> You won't be able to use the above script, and you will need to host your own script somewhere that is trusted so that the QDE certificates can be trusted. Please see [SSL/TLS Setup](xref:v1-ssl-setup) for options.
>
> Please contact support if you need help here.

The `ClientSetup.ps1` script will:

* Install Chocolatey
* License Chocolatey
* Install the licensed extension (without the PackageBuilder/Internalizer shims)
* Install the licensed agent
* Configure ChocolateyInternal source
* Configure Self-Service mode
* Configure Central Management check-in

[Quick Deployment Environment](xref:qde)
