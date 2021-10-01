---
Order: 70
xref: v2-upgrade-nexus-qde
Title: Upgrade Nexus
Description: How to upgrade Nexus installed on QDE
---

# Upgrade Nexus in Quick Deploy Environment

This document outlines the process for upgrading Nexus running inside our Quick Deployment Environment.
The script provided assumes your server has access to the internet to download the Nexus package from the community repository.
If your server is restricted then internalize the package to your internal repository and update the source in the script appropriately.

<<<<<<< HEAD
> :warning: **WARNING**
=======
> :warning:
>>>>>>> (maint) Fix markdown callouts on Upgrade Nexus documentation.
>
> The instructions on this page use parameters available to the nexus-repository package to conserve SSL configuration. If you have arrived here,
> and do not have a Nexus instance configured with SSL, leave off the package parameters.
>
> This command will backup the SSL configuration to the root of your User Profile in a NexusBackup folder.
# Instructions

1. Internalize the nexus-repository package and push to your internal repo
2. choco upgrade the nexus-repository package (Example command provided below, which preserves SSL Configuration)

## Example Upgrade Command:

<<<<<<< HEAD
> :memo: **NOTE**
=======
> :note:
>>>>>>> (maint) Fix markdown callouts on Upgrade Nexus documentation.
>
> The following command assumes your nexus instance is available at nexus.example.com. Use your actual FQDN instead

```powershell
choco upgrade nexus-repository -y --package-parameters="'/Port:8443 /Fqdn:""nexus.example.com"" /BackupSslConfig'"
```

> :memo: **NOTE**
>
>If you are upgrading from Nexus V 3.22.0.02+ to a newer version you may need to make the following change to the jetty-https.xml file.
>Change `class="org.eclipse.jetty.util.ssl.SslContextFactory">` to `class="org.eclipse.jetty.util.ssl.SslContextFactory$Server">`
