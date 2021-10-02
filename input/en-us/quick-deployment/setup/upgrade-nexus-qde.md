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

# Instructions

1. Internalize the nexus-repository package and push to your internal repo
2. Stop the nexus service
3. Backup any SSL configuration if it exists
4. Remove the C:\ProgramData\nexus folder recursively
5. choco upgrade the nexus-repository package
6. Restore the SSL configuration if it exists
7. Restart the nexus service

## Automatic Upgrade
> :memo: **NOTE**
>
>  With newer versions of nexus-repository (3.30.0.01 and up) use ```/BackupSslConfig``` parameter to automatically backup and restore SSL config.

```
choco upgrade nexus-repository --params "'/BackupSslConfig'" --source "'https://community.chocolatey.org/api/v2/'" --no-progress --force --yes
```

Regardless of above, it would be advisable to backup your SSL config (see below).

## Manual Upgrade
⚠️ With this method your nexus server might not start up after upgrading and will not register nexus-repository as installed package on your QDE instance.

```powershell
Stop-Service nexus

#Backup SSL Configuration
if(-not (Test-Path C:\nexusbackup)){
  New-Item C:\nexusbackup -ItemType Directory
}

if(Test-Path C:\ProgramData\nexus\etc\ssl\keystore.jks){
  Copy-Item C:\ProgramData\nexus\etc\ssl\keystore.jks C:\nexusbackup
}

if(Test-Path C:\ProgramData\nexus\etc\jetty\jetty-https.xml){
  Copy-Item C:\ProgramData\nexus\etc\jetty\jetty-https.xml C:\nexusbackup
}

#Remove the current Nexus folder
Remove-Item C:\ProgramData\nexus -Recurse -Force -ErrorAction SilentlyContinue

#Upgrade the package
choco upgrade nexus-repository -y -f -s "'https://community.chocolatey.org/api/v2/'" --no-progress

#Restore SSL Configuration
if(Test-Path C:\nexusbackup\keystore.jks){
  Copy-Item C:\nexusbackup\keystore.jks C:\ProgramData\nexus\etc\ssl
}

if(Test-Path C:\nexusbackup\jetty-https.xml){
  Copy-Item C:\nexusbackup\jetty-https.xml C:\ProgramData\nexus\etc\jetty
}

#Restart the nexus service to apply the configuration
Restart-Service nexus

#Cleanup backup folder
Remove-Item C:\nexusbackup -Recurse -Force
```

:memo: **NOTE**

If you are upgrading from Nexus V 3.22.0.02+ to a newer version you may need to make the following change to the jetty-https.xml file.

Change `class="org.eclipse.jetty.util.ssl.SslContextFactory">` to `class="org.eclipse.jetty.util.ssl.SslContextFactory$Server">`
