# Quick Deployment Environment SSL Setup

> :memo: **NOTE**
>
> This document is for **Version 2** of the Quick Deployment Environment.
> If you're using an older version of QDE, please refer to the [[QDEv1 SSL Setup page|QuickDeploymentSslSetupV1]].

During normal setup, all required SSL certificates are retrieved or generated as needed.
You will only need to run this script yourself in the following cases:

* You want to expose this to the internet so clients can connect from outside your network, and you didn't set this up initially.
  See [[the Firewall Changes document|QuickDeploymentFirewallChanges]] document for more information and additional scripts to run in this case.
* If you change the hostname of the QDE server, or add it to a domain after having already completed setup.
* If you would like to change/replace the initial SSL/TLS certificates that were provided or generated during setup, for example to replace an expiring certificate.

> :warning: **Warning**
>
> * This script will seemingly prompt for input, and have other strange output.
>   This is due to poor Java tooling and console output which cannot be suppressed.
>   Just let things happen, as things are working as expected.
> * If you provide your own certificate, it **must** include a private key / be exportable.
>   This is required in order for Nexus to be able to utilise the certificate.

Once complete, this script will generate new SSL certificates for all services and move them to the appropriate locations and configure the services to use them.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; . C:\choco-setup\files\New-SslCertificates.ps1
```

| Parameter     | Description                                                                                                                                            |
| :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-Subject`    | The subject of the certificate to retrieve from the local machine store. Overrides a -Thumbprint if both are specified.                                |
| `-Thumbprint` | The thumbprint of the certificate to retrieve from the local machine store. Ignored if -Subject is also provided.                                      |
| `-Hostname`   | The hostname of the QDE instance. Only required if you want to generate self-signed certificates.                                                      |

> :warning: **Warning**
>
> Timezones are super important here and time synchronization is really important when generating SSL Certificates.
> You will need make sure you have this correct, otherwise there is a potential edge case you could generate an SSL Certificate that is not yet valid.

[[Quick Deployment Environment|QuickDeploymentEnvironment]]
