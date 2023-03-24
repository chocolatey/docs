---
Order: 40
xref: v1-firewall-changes
Title: Firewall Changes
Description: How has the firewall on the QDE v1 image been changed
RedirectFrom: docs/quick-deployment-firewall-changes-v1
---

> :choco-info: **NOTE**
>
> This document is for **Version 1** of the Quick Deployment Environment.
> If you're using a newer version of QDE, please refer to the [newer QDE Firewall Changes page](xref:v2-firewall-changes).

## External Ports

> :choco-warning: **WARNING**
>
> Performing this incorrectly could cause security issues and possibly cause you to be subjected to copyright law/redistribution.
> Read all of this first.
> Danger, Will Robinson! :robot:

These are ports that are opened through the corporate firewall, in case users are **not** on VPN and need to install packages from anywhere.

> :choco-info: **NOTE**
>
> You will have needed to done more to secure Nexus and the repositories ahead of this change.

See the warning below and contact support if you want to enable clients to connect from the internet and not over VPN.

* Nexus Web / API - Port 8443

> :choco-warning: **WARNING**
>
> DO NOT OPEN this port externally until you have locked down your repositories to user/pass access and updated the script in the raw client repository.
> Please contact support for the right options on how to do this FIRST.

## Internal Ports

These are the ports that are already opened on Windows Firewall on the QDE.

* Nexus Web / API - Port 8443
* CCM Web - Port 443
* Jenkins - 8080
* CCM Service - 24020

## FAQ

### Can I open up the CCM Service's port to allow machines to report in from anywhere?

While it is technically possible, we recommend using a VPN connection for client check-ins.
The CCM service connection is authenticated over SSL, but our best practice recommendation is to secure the connection over a VPN as well.

With Central Management v0.3.0, more security has been put into allowing for checking in over internet connections as long as you follow guidance for additional settings.

[Quick Deployment Environment](xref:qde)
