# Quick Deployment Environment SSL Setup

> :memo: **NOTE**
>
> This document is for **Version 1** of the Quick Deployment Environment.
> If you're using a newer version of QDE, please refer to the [[newer QDE SSL Setup page|QuickDeploymentSslSetup]].

All services have been protected with Self-Signed SSL certificates and are placed in the appropriate stores.
Under the following situations you would want to run the script that follows:

* If you want to expose this to the internet so clients can connect from outside your network.
* If you change the hostname of this server.
* If you add the QDE to a domain.
* If you would like to use your own SSL/TLS certificates.

> :warning: **WARNING**
>
> This script will seemingly prompt for input, and have other strange output.
> This is due to poor Java tooling and console output which cannot be suppressed.
> Just let things happen, as things are working as expected.


> :warning: **WARNING**
>
> If you provide your own certificate, it needs to include the private key to allow for export. Nexus requires this.

> :memo: **NOTE**: Please run the below from an administrative PowerShell session.

Once complete, this script will generate new SSL certificates for all services and move them to the appropriate locations and configure the services to use them.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; . C:\choco-setup\files\New-SslCertificates.ps1
```
> :warning: **WARNING**
>
> Timezones are super important here and time synchronization is really important when generating SSL Certificates. You want to make sure you have this correct and good. Otherwise there is a potential edge case you could generate an SSL Certificate that is not yet valid.



> :warning: **WARNING**
>
> tl;dr: Think long and hard before changing the QDE hostname
>
> Renaming the QDE host requires a lot of things and needs to be completed FIRST prior to ANYTHING that is done on the QDE box. It is strongly recommended **NOT** to rename unless you absolutely need to. The most important reason has to do with how a client installs from QDE - it must learn to trust the QDE certificate. Once renamed, the easy option that's provided for you goes away and you will need to provide a hosted solution with an already trusted certificate.
> You can provide your own certificate that is already trusted on machines as part of the [[SSL/TLS Setup|QuickDeploymentSslSetupV1]]. Your other option is to host the script to trust the certificate with an already trusted certificate. You will find a template that you will need to edit at `c:\choco_setup_files` (in the QDE) named `Import-ChocoServerCertificate.ps1`.
>
> Please contact support if you need help here.


[[Quick Deployment Environment|QuickDeploymentEnvironment]]
