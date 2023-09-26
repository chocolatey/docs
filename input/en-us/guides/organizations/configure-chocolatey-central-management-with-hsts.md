---
Order: 60
xref: configure-chocolatey-central-management-with-hsts
Title: How To Configure Chocolatey Central Management to use HSTS
Description: How To Configure Chocolatey Central Management to use HSTS
---

## Overview

> :choco-warning: **WARNING**
>
> Although HTTP Strict Transport Security (HSTS) allows you to have reasonable certainty that your connection to Chocolatey Central Management is not intercepted, we recommend that you do not connect your Chocolatey Central Management server directly to the internet. Instead you should consider connecting through a load balancer or reverse proxy of the like.

Chocolatey Central Management is hosted by an IIS server, and can make use of the features available in IIS. Below is some general information about how to enable HSTS with IIS. You can also make use of a reverse proxy to sit between your Chocolatey Central Management server and your clients.

## Enabling HSTS Within IIS

If you are running IIS 10.0 version 1709 or later, you can enable HSTS using the `<hsts>` element of the `<site>` element. Microsoft has information as well as samples [here](https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/sites/site/hsts). If you are on newer versions of IIS, you may even have access to enabling HSTS within the IIS Management Console; steps to enable it this way are below.

1. Open the IIS Management Console
1. In the Connection pane, expand the server and then Sites to select `ChocolateyCentralManagement`
1. On the right, select HSTS  under `Configure` in the Actions pane.
1. Configure HSTS as desired.

### Enabling HSTS within IIS prior to IIS 10.0

Although it sounds like HSTS is not available in IIS prior to 10.0 version 1709, you may be able to configure it with a custom setup. There is [an external blog post](https://www.saotn.org/enable-http-strict-transport-security-hsts-on-iis/) that goes into the steps needed to configure this.

### Enabling HSTS Outside of IIS

In order to configure HSTS outside of IIS, you could use a reverse proxy and configure HSTS on the reverse proxy server. For instance nginx has an [article covering HSTS configuration](https://www.nginx.com/blog/http-strict-transport-security-hsts-and-nginx/), or you could use Apache and follow a guide such as [this one](https://www.simplified.guide/apache/enable-hsts).
