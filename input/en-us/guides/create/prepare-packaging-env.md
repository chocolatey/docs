---
Order: 1
xref: howto-prepare-env
Title: How To Prepare A Package Creation Environment
Description: Information on how to setup a workstation to create Chocolatey packages
---

Getting ready to create Chocolatey packages requires just a few steps. Follow along here, and you'll be creating gooey Chocolatey goodness is no time flat!

## First Things First

The very first thing you are going to need, if you've not got it already, is to install Chocolatey CLI.
You can copy the below PowerShell code into an _administrative_ PowerShell session to quickly install it.

> :memo: If you need a more advanced installation scenario, or for more information you can head over to https://chocolatey.org/install first, and then come back here when Chocolatey CLI is
> up and running.

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

## Configuring Your Development Environment

Thankfully (if not a little obviously), everything we need to configure is available via Chocolatey. We'll setup the following:

- Visual Studio Code
- The PowerShell VSCode Extension
- The Chocolatey VSCode Extension

You can run the following in an _administrative PowerShell console_ to get up an running in one go:

```powershell
choco install vscode vscode-powershell chocolatey-vscode -y --source='https://community.chocolatey.org/api/v2/
```

## Setting Up The Filesystem

We want an easy to reference place to perform any of the tutorials available in this Packaging Creation documentation. In an _administrative PowerShell console_ create a `C:\tutorials` directory with the following command:

```powershell
New-Item C:\tutorials -ItemType Directory
```

## Configure A Source For Tutorials

While working through the various tutorials here, you'll likely want to actually install, upgrade, and uninstall the packages you create to see the fruits of your labor.

The easiest way to do that is to configure a source for those packages to be stored. In an _administrative PowerShell console_ set that source up with the following:

```powershell
choco source add --name='Tutorials' --source='C:\tutorials'
```

Oh, and don't worry, the tutorials available here all ensure that the packages you create as part of the tutorial end up here. The important thing is that you actually _have_ the source!

## You're Done!

Oh, SWEET! You're all ready to begin working through the tutorials here. Before long you'll be a master Chocolatier. Happy Packaging!