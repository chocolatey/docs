# Quick Deployment Environment Firewall Setup

> :memo: **Note**
>
> This document is for **Version 2** of the Quick Deployment Environment.
> If you're using an older version of QDE, please refer to the [[QDEv1 Firewall Changes page|QuickDeploymentFirewallChangesV1]].

<!-- TOC depthFrom:2 -->

- [External Firewall Ports (Optional)](#external-firewall-ports-optional)
- [Internal Firewall Ports](#internal-firewall-ports)
- [FAQ](#faq)
  - [Can I open up the CCM Service's port to allow machines to report in from anywhere?](#can-i-open-up-the-ccm-services-port-to-allow-machines-to-report-in-from-anywhere)

<!-- /TOC -->

---

## External Firewall Ports (Optional)

> :warning: **WARNING**
>
> * Performing this incorrectly could cause security issues and possibly cause you to be subjected to copyright law/redistribution.
>   Read all of this first.
>   Danger, Will Robinson! :robot:
> * DO NOT OPEN these ports externally until you have locked down your repositories to user/pass access and updated the script in the raw client repository.
>   In QDE version 2.0, this can be done with the `Set-QDEnvironmentInternetSecurity.ps1` script that is provided with the VM, if you did not initially setup your QDE instance as internet enabled.

These are ports that need to be opened through the corporate firewall, if users are **not** on VPN and need to install packages from anywhere.

| Port  | Application                |
| :---: | :------------------------- |
| 8443  | Nexus Web UI               |
| 24020 | Central Management Service |

---

## Internal Firewall Ports

These are the ports that are already opened on Windows Firewall in QDE.

| Port  | Application   |
| :---: | :------------ |
| 8443  | Nexus Web UI  |
|  443  | CCM Dashboard |
| 24020 | CCM Service   |

---

## FAQ

### Can I open up the CCM Service's port to allow machines to report in from anywhere?

For best results, we recommend using a VPN connection for client check-ins.
The CCM service connection is authenticated over SSL, but our best practice recommendation is to secure the connection over a VPN as well.
With Central Management v0.3.0, more security has been put into allowing for checking in over internet connections as long as you follow guidance for additional settings.

As of QDE version 2.0, you can enable CCM (and Nexus) internet accessibility by using the `Set-QDEnvironmentInternetSecurity.ps1` script provided with the VM.
If you run the `Set-QDEnvironment.ps1` script with the `-InternetEnabled` switch (which requires you to provide your own certificate), this will happen automatically.

---

[[Quick Deployment Environment|QuickDeploymentEnvironment]]
