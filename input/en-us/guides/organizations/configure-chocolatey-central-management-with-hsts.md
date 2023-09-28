---
Order: 60
xref: configure-chocolatey-central-management-with-hsts
Title: How to Configure Chocolatey Central Management to Use HSTS
Description: How to Configure Chocolatey Central Management to Use HSTS
---

## Overview

> :choco-warning: **WARNING**
>
> Although HTTP Strict Transport Security (HSTS) allows you to have reasonable certainty that your connection to Chocolatey Central Management is not intercepted, we recommend that you do not connect your Chocolatey Central Management server directly to the internet.

Chocolatey Central Management is hosted by IIS and makes use of features available by it. Below is some general information about how to enable HSTS with both IIS and a reverse proxy.

## Enabling HSTS Within IIS

If you are running IIS 10.0 version 1709 or later, you can enable HSTS using the [documentation, and samples, provided by Microsoft](https://learn.microsoft.com/en-us/iis/configuration/system.applicationhost/sites/site/hsts). If you are on newer versions of IIS, you may even have access to enabling HSTS within the IIS Management Console; steps to enable it this way are below.

1. Open the IIS Management Console.
1. In the **Connection** pane, expand the server and then **Sites** to select `ChocolateyCentralManagement`.
1. On the right, select **HSTS**  under **Configure** in the **Actions** pane.
1. Configure HSTS as desired.

### Enabling HSTS Within IIS Prior to IIS 10.0

Although it sounds like HSTS is not available in IIS prior to 10.0 version 1709, you may be able to configure it with a custom setup. There is [an external blog post](https://www.saotn.org/enable-http-strict-transport-security-hsts-on-iis/) that goes into the steps needed to configure this.

### Enabling HSTS Outside of IIS

In order to configure HSTS outside of IIS, you could use a reverse proxy and configure HSTS on the reverse proxy server. For instance nginx has an [article covering HSTS configuration](https://www.nginx.com/blog/http-strict-transport-security-hsts-and-nginx/), or you could use Apache and follow a guide such as [this one](https://www.simplified.guide/apache/enable-hsts).
