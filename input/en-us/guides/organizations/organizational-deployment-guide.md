---
Order: 10
xref: organizational-deployment-guide
Title: Set up Chocolatey for Internal/organizational use
Description: Full information on how to setup/use Chocolatey internally
RedirectFrom: docs/how-to-setup-offline-installation
---

> :memo: **NOTE**
>
> As an alternative to this long-form guide, we also have a [Quick-Start Implementation Guide](xref:c4b-quick-start-guide).
> This is intended for customers who have recently purchased Chocolatey for Business (C4B), or are evaluating C4B as part of a proof-of-concept.
> It illustrates only **one** method of setting up your Chocolatey environment, and is by **NO** means exhaustive.
> Our goal is to get you up-and-running quickly, and testing out the feature set.
> For a more complete reference of possible scenarios and solutions, please stick to this guide.
>
> Another thing we provide is a [Quick Deployment Environment](xref:qde) that has already taken care of everything here and also setting up the automation for package internalizer with Jenkins (covered at Automate Package Internalizer).
> It, like the quick start implementation, provides a specific solution so you should read over the summary before you decide that is the right implementation for your needs (in about 80%+ of organizational use cases it is the correct solution).

## Summary

This guide is for open source organizational users all the way up to Chocolatey for Business (C4B) customers. You can create and host your own packages with **any** edition of Chocolatey, even open source. You can even find good free solutions for package repositories that you either have on-premise which includes private cloud or hosted solutions.

Most organizations need a Chocolatey environment that does not access the internet. Fortunately, Chocolatey is a fully offline solution, we'll just need to remove the default community repository and point it to internal repositories. This walkthrough will provide you everything you need to get setup. We also have steps in this walkthrough that deal with environments that are air gapped (no access to the internet).

> Chocolatey best practices for organizations / internal use:
> * Set up one or more internal repositories
> * Bring all external packages you need in and internalize (not cache) any that download anything at runtime
> * Configure Chocolatey clients for internal use - config and removal of community package repository source
> * Create packages with resources embedded in the package - this makes for reliable, repeatable use of Chocolatey (the community repository must download at runtime due to being publicly available which means distribution rights, internal use is not subject to distribution rights)
> * Do not use the community repository. It is not fully reliable due to a required dependence on the internet at runtime.
> * Learn when new Chocolatey releases are out - register with the release announcements mailing list

## Notes on This Guide

This guide is pretty much the essential how to guide to having a successful internal Chocolatey deployment. What you will find below are walkthrough steps and scripts (!!) to really help speed up that initial setup. Some (most) of what you will find here is not meant to be automated past what is already here, most are one-time things that need to be performed, so they don't lend themselves well to being automated further than they already are with the scripts here.

That said, Exercises 2 and 6 do lend themselves well to automation with infrastructure management (configuration management) tools. You will find that Puppet likely has the most comprehensive set of ability to fully configure Chocolatey and Chocolatey.Server, with PowerShell DSC coming in there as well. Most configuration management tools do support managing the installation of Chocolatey and software packages, but side step Chocolatey configuration. We think that they should do more there, and we find it's best if you reach out to those folks to ask that they would support those things.

You also may not need to be an admin for some of this guide, there are some additional bits you will need to do to perform a non-administrative installation. Look for the `NONADMIN` tag for how to deal with these discrepancies.

There may be some exercises in here that won't apply:

* Exercise 1 almost never applies to most folks as machines they are setting up have some network access.
* Exercise 4 doesn't apply for open source, as you don't have a license file that you need to deploy. You can skip it.

### Terminology

* Internal - Areas your organization manages - this could be on premise or in a private cloud you manage
* FOSS - Chocolatey open source edition
* C4B - Chocolatey for Business
* C4BTRIAL - Chocolatey for Business Trial
* ARCHITECT - Chocolatey Architect Edition
* MSP - Chocolatey for Managed Service Providers
* NONADMIN - steps for folks who are not administrators on their machines to perform

## References

* [Offline Chocolatey Install](xref:setup-choco#completely-offline-install)
* [Licensed Install](xref:setup-licensed)
* [Host Your Own Package Server](xref:host-packages)
* [Set up Chocolatey Server](xref:set-up-chocolatey-server)
* [Security](xref:security)
* [Community Package Repository Disclaimer](xref:community-packages-disclaimer)

## Requirements

Please see  [Requirements](xref:getting-started#requirements) for the most up to date version of this.

### Chocolatey Clients

With Chocolatey clients, we ensure that Chocolatey is going to run with low memory footprints because you will have all aspects of things you will need to manage and different space and memory available across all of those clients. Chocolatey has a very wide reach into where it can be installed.

For Chocolatey clients, you will need the following:

* Windows 7+/Windows 2003+ (Server Core also, but not Windows Nano Server)
* Windows PowerShell v2+ (not PowerShell Core)
* .NET Framework 4.x+

#### Chocolatey Components

* Chocolatey CLI aka choco (or choco.exe) is a client (not a Windows service) that provides the core of Chocolatey and the installation store for locally installed packages. This is important as Chocolatey manages packages, not Programs and Features directly - Programs and Features is limited only to software that has "installers" and Chocolatey treats all aspects of Windows software as first class citizens (zips, scripts, binaries, installers), thus it needs to track and manage those things separately.
* Chocolatey GUI is an application that runs when a user runs it (also not a Windows Service).
* Chocolatey Agent (aka chocolatey-agent) is a Windows service available in Chocolatey for Business. It is used for [Self-Service Installation](xref:self-service-anywhere) and Chocolatey Central Management.

#### Space Requirements

* Chocolatey CLI has an impact of 15 MB on default install plus the space the installed packages use up.
* Chocolatey GUI takes up another 50-100 MB of space on default installation.
* Chocolatey Agent (aka chocolatey-agent) is a Windows service available in Chocolatey for Business - it has an impact of about 10 MB.

**RECOMMENDATION**: We recommend enough free space for the applications you will install plus another 1 GB for allowing Chocolatey to process that. You will want to turn on Package Reducer (commercial editions) if you have it to really reduce the impact of embedded packages, which bring reliability but also increase footprint (unless you have Package Reducer). If you don't have Package Reducer and you are embedding binaries into nupkgs, you will need 3 times the space of what you are installing unless you explicitly clean up the extracted installers/zips in your automated scripts - then you will need 2x the space when considering the nupkg will still contain embedded binaries (and the nupkg must stick around). Unfortunately, this is going to be a calculation to understand exact space requirements and it really depends on what you will install.

#### Memory Requirements

* Chocolatey CLI only runs when called. It falls into managed memory thus can work in environments with low amounts of memory provided that they have enough memory available to manage software installations.
* Chocolatey GUI only runs when the application is open and is also in managed memory. It can work on systems with low amounts of memory.
* Chocolatey Agent (aka chocolatey-agent) - it is always running but has a very low footprint unless it is processing something.

**RECOMMENDATION**: At least 2GB of RAM at a bare minimum, but recommend at least 8GB for managing installations.

### Chocolatey Repository Servers

Unfortunately it's harder to make recommendations here as it is really dependent on the repository that you choose and what requirements they have. It varies from a Windows deployment to Linux deployed repositories, from Java-based, to .NET-based, to PHP, and Rust-based repositories. The requirements vary wildly, plus you may use those repositories that address multiple types of packages and would need to figure out the space available for that.

**SPACE RECOMMENDATION**: Have enough space for 10x the size of the installers and other software you will store. This will allow for some default growth. We would recommend 100 GB at a minimum.

### Chocolatey Central Management

Requirements coming soon. Just imagine normal recommendations for an ASP.NET IIS deployment, a SQL Server back end, and 1+ Windows Services (depending on scale).

## Exercise 0: Prepare For Internal Use

The first thing we need to do is prepare. To do that we need a Windows machine with internet access so it can gather everything. If you are setting up into an air gapped network, you will be completing this on one machine, then loading it to a USB or to something else to get it over to the air gapped network (which we'll set up in Exercise 1). Check with your security teams to see if you have other steps that need to be completed prior to taking files from internet sources to the air gapped network.

From the machine with internet access:

1. Open PowerShell.exe as an administrative shell. You can type "Windows Key + X + A" (Windows 8+ - when that comes up if it is cmd.exe, simply type `powershell` to get into it). NONADMIN: Just open a PowerShell console with "Windows Key + X" and choose the non-admin version of cmd or PowerShell.
1. Type `cd /` and hit enter.
1. Type `New-Item -Path "$env:SystemDrive\choco-setup" -ItemType Directory -Force` and enter followed by `cd choco-setup` and enter.
1. In `c:\choco-setup`, type `New-Item -Path "$env:SystemDrive\choco-setup\files" -ItemType Directory -Force` and press enter.
1. In `c:\choco-setup`, type `New-Item -Path "$env:SystemDrive\choco-setup\packages" -ItemType Directory -Force` and press enter.
1. Type `cd packages` and press enter.
1. NONADMIN (**only**): We'll need to redirect Chocolatey not to install to the default location. Run `$env:ChocolateyInstall="$env:ProgramData\chocoportable"` and press enter.
1. Now run `Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))` (this will get Chocolatey installed and it is what you see at https://chocolatey.org/install). It also makes choco available in that current shell. If you run into proxy issues here, please see [installing Chocolatey behind a proxy server](xref:proxy-settings).
1. C4B / MSP / C4BTRIAL: Obtain the `chocolatey.license.xml` from the email sent from the Chocolatey team and save the license file to `c:\choco-setup\files` so we can use it here and on the offline machines.
1. C4B / MSP / C4BTRIAL: Run this command `New-Item $env:ChocolateyInstall\license -ItemType Directory -Force` - this creates the license directory.
1. C4B / MSP / C4BTRIAL: Copy the license file ("chocolatey.license.xml") into that folder that was just created. Run `Copy-Item "$env:SystemDrive\choco-setup\files\chocolatey.license.xml" $env:ChocolateyInstall\license\chocolatey.license.xml -Force`.
1. C4B / MSP / C4BTRIAL: Verify the license is recognized - run `choco`. You should see something like "Chocolatey v0.10.8 Business". You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and we can ignore that for now.
   > :warning: **WARNING**
   >
   > It is normal to see an error at this point, the next steps which install the extension resolve this.
1. C4B / MSP / C4BTRIAL: Run `choco upgrade chocolatey.extension -y`. You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and should clear up when this command completes.
1. Run `choco` - you should no longer see the error about not having chocolatey.extension installed. If you do, please circle back and use copy/paste for instructions as you may have mistyped something.
1. Run `choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache`. This moves the TEMP location in scripts to use this and makes clean up more deterministic.
1. Run `choco config set commandExecutionTimeoutSeconds 14400`. This increases the timeout more than the default 45 minutes, you may wish to set it higher.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'internalizeAppendUseOriginalLocation'"`. This sets Package Internalizer to append `-UseOriginalLocation` to the end of `Install-ChocolateyPackage` to make it behave more like `Install-ChocolateyInstallPackage`. Since the files are local, we won't need it copying them to temp prior to running it.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'reduceInstalledPackageSpaceUsage'"` to ensure Package Reducer is turned on.
1. Set proxy configuration, virus scan configuration, or other configuration as described at [Chocolatey configuration](xref:configuration).
1. C4B / C4BTRIAL: Are we installing the [optional Chocolatey Agent Service as well](xref:setup-agent)? If so, run `choco upgrade chocolatey-agent -y --pre` and then follow the link in the first sentence for other settings you will need to configure.
1. Download packages (choose one):
    * C4B / MSP / C4BTRIAL: - Run the following: `choco download chocolatey chocolatey.server dotnet4.6.1 chocolateygui --internalize`. This is going to take quite awhile.
    * FOSS only - download the following packages:
      * [Chocolatey](https://chocolatey.org/api/v2/package/chocolatey)
      * [Chocolatey GUI](https://chocolatey.org/api/v2/package/chocolateygui)
      * Download Chocolatey.Server package and dependencies:
        * [Chocolatey.Server](https://chocolatey.org/api/v2/package/chocolatey.server)
        * [dotnet4.6](https://chocolatey.org/api/v2/package/DotNet4.6) - [internalize manually]xref:recompile-packages)
        * [dotnet4.6.1](https://chocolatey.org/api/v2/package/DotNet4.6.1) - [internalize manually](xref:recompile-packages)
        * [KB2919355](https://chocolatey.org/api/v2/package/KB2919355) - [internalize manually](xref:recompile-packages)
        * [KB2919442](https://chocolatey.org/api/v2/package/KB2919442) - [internalize manually](xref:recompile-packages)
1. C4B / C4BTRIAL - Run the following additionally: `choco download chocolatey.extension chocolatey-agent --internalize`.
1. MSP - Run the following additionally: `choco download chocolatey.extension --internalize`.
1. Now we should have several packages in `c:\choco-setup\packages`. If not, type `start .` and go copy the files here to that location.
1. Obtain the PowerShell script from the [complete offline install setup section](xref:setup-choco#completely-offline-install) and copy it to `c:\choco-setup\files` as "ChocolateyLocalInstall.ps1". We will need this to install Chocolatey on the airgapped box.
1. Open `c:\choco-setup\files\ChocolateyLocalInstall.ps1` in an editor like Notepad++ or Visual Studio Code (do not use Notepad.exe!!).
1. Change this line `$localChocolateyPackageFilePath = 'c:\packages\chocolatey.0.10.0.nupkg'` to `$localChocolateyPackageFilePath = 'c:\choco-setup\packages\chocolatey.0.10.8.nupkg'` (adjust for the actual path to the Chocolatey package).
1. Air Gapped Networks / Machines without Network Access: Get those files over to that air gapped network (USB key and sneakernet if you need to).

Here is a handy script you can use for MSP / C4B / C4BTRIAL (C4BTRIAL you have some adjustments noted). If you are an open source user (FOSS), you might as well go back up to the instructions, there isn't much you are going to be able to take advantage of here. Let's be honest, you will have more work on your hands overall, but that's kind of the spirit of open source (or free versus a commercial solution).

~~~powershell
# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force

# Setting up directories for values
New-Item -Path "$env:SystemDrive\choco-setup" -ItemType Directory -Force
New-Item -Path "$env:SystemDrive\choco-setup\files" -ItemType Directory -Force
New-Item -Path "$env:SystemDrive\choco-setup\packages" -ItemType Directory -Force

# Install Chocolatey
# NONADMIN - you'll need this uncommented to redirect to a different location:
# $env:ChocolateyInstall="$env:ProgramData\chocoportable"
iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

# Are you military, government, or for some other reason have FIPS compliance turned on?
#choco feature enable --name="'useFipsCompliantChecksums'"

# Add license to setup and to local install
New-Item $env:ChocolateyInstall\license -ItemType Directory -Force
Write-Host "Please add chocolatey.license.xml to '$env:SystemDrive\choco-setup\files'."
Write-Host 'Once you do so, press any key to continue...';
$null = $Host.UI.RawUI.ReadKey('NoEcho,IncludeKeyDown');
Copy-Item $env:SystemDrive\choco-setup\files\chocolatey.license.xml $env:ChocolateyInstall\license\chocolatey.license.xml -Force

# Install Chocolatey Licensed Extension
choco upgrade chocolatey.extension -y --pre
Write-Host "If you see what looks like an error about a missing extension, that is what this step does so it will clear up on the next command."

# Set Configuration
choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache
choco config set commandExecutionTimeoutSeconds 14400
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration

# Set Licensed Configuration
choco feature enable --name="'internalizeAppendUseOriginalLocation'"
choco feature enable --name="'reduceInstalledPackageSpaceUsage'"
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration

#TODO: Are we installing the Chocolatey Agent Service? C4B Only
# https://docs.chocolatey.org/en-us/agent/setup
# choco upgrade chocolatey-agent -y --pre
#choco feature disable --name="'showNonElevatedWarnings'"
#choco feature enable --name="'useBackgroundService'"
#choco feature enable --name="'useBackgroundServiceWithNonAdministratorsOnly'"
#TODO: Check out other options and features to set at the url above.
#TODO: Also make sure you set your sources to allow for self-service

# Download and internalize packages.
choco download chocolatey chocolatey.server dotnet4.6.1 chocolateygui --internalize --output-directory="$env:SystemDrive\choco-setup\packages" --source="'https://chocolatey.org/api/v2/'"
# C4B / C4BTRIAL - use this
choco download chocolatey.extension chocolatey-agent --internalize --output-directory="$env:SystemDrive\choco-setup\packages" --source="'https://licensedpackages.chocolatey.org/api/v2/'"
# MSP - use this
#choco download chocolatey.extension --internalize --output-directory="$env:SystemDrive\choco-setup\packages" --source="'https://licensedpackages.chocolatey.org/api/v2/'"

# Download local install script - need at least PowerShell v3
$installScript = iwr -UseBasicParsing -Uri https://gist.githubusercontent.com/ferventcoder/d0aa1703a7d302fce79e7a4cc13797c0/raw/b1f7bad2441fa6c371b48b8475ef91cecb4d6370/ChocolateyLocalInstall.ps1 -UseDefaultCredentials

$installScript.Content | Out-File -FilePath "$env:SystemDrive\choco-setup\files\ChocolateyLocalInstall.ps1" -Encoding UTF8 -Force
Write-Warning "Check and adjust script at '$env:SystemDrive\choco-setup\files\ChocolateyLocalInstall.ps1' to ensure it points to the right version of Chocolatey in the choco-setup\packages folder."
~~~

## Exercise 1 (Optional): Set Up Chocolatey Installation On A Machine Without Network Access

Now that we've finished the first exercise and have those files over on our offline Windows machine, we need to get Chocolatey set up on this machine as well. This could be ultimately be a Chocolatey.Server Repository, or it could be something else. Note: [Other repository servers don't necessarily require Windows](xref:host-packages).

> :memo: **NOTE** If you are using the same machine from Exercise 0 for setting up your repository, you can skip this Exercise and go to Exercise 2 (in other words, your machine already has Chocolatey installed).

1. Ensure the folders from the other drive are set in `c:\choco-setup` here on this machine (should match with where things were set in Exercise 0).
1. Open PowerShell.exe as an administrative shell. You can type "Windows Key + X + A" (Windows 8+ - when that comes up if it is cmd.exe, simply type `powershell` to get into it).
1. Type `& $env:SystemDrive\choco-setup\files\ChocolateyLocalInstall.ps1` and press enter. This should install Chocolatey if you have everything set up correctly from the first set of instructions.
1. Run `choco source remove --name="'chocolatey'"`. This removes the default Chocolatey source.
1. Run `choco source add --name="'setup'" --source="'$env:SystemDrive\choco-setup\packages'"`
1. C4B / MSP / C4BTRIAL: Run this command `New-Item $env:ChocolateyInstall\license -ItemType Directory -Force` - this creates the license directory.
1. C4B / MSP / C4BTRIAL: Copy the license file ("chocolatey.license.xml") into that folder that was just created. Run `Copy-Item "$env:SystemDrive\choco-setup\files\chocolatey.license.xml" $env:ChocolateyInstall\license\chocolatey.license.xml -Force`.
1. C4B / MSP / C4BTRIAL: Run `choco source disable --name="'chocolatey.licensed'"`. When the license is placed, Chocolatey automatically adds the license and we don't want to use that source. Note we can't remove the license because the existence of the license file will have Chocolatey adding it right back - so we just disable it. You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and we are going to take care of that in the next step.
1. C4B / MSP / C4BTRIAL: Run `choco upgrade chocolatey.extension -y --pre`. You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and should clear up when this command completes.
1. Run `choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache`. This moves the TEMP location in scripts to use this and makes clean up more deterministic.
1. Run `choco config set commandExecutionTimeoutSeconds 14400`. This increases the timeout more than the default 45 minutes, you may wish to set it higher.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'internalizeAppendUseOriginalLocation'"`. This sets Package Internalizer to append `-UseOriginalLocation` to the end of `Install-ChocolateyPackage` to make it behave more like `Install-ChocolateyInstallPackage`. Since the files are local, we won't need it copying them to temp prior to running it.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'reduceInstalledPackageSpaceUsage'"` to ensure Package Reducer is turned on.
1. Set proxy configuration, virus scan configuration, or other configuration as described at [Chocolatey configuration](xref:configuration).
1. C4B / C4BTRIAL: Are we installing the [optional Chocolatey Agent Service as well](xref:setup-agent)? If so, run `choco upgrade chocolatey-agent -y --pre` and then follow the link for other settings you will need to configure.

~~~powershell
# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force

# Install Chocolatey
& $env:SystemDrive\choco-setup\files\ChocolateyLocalInstall.ps1

# Are you military, government, or for some other reason have FIPS compliance turned on?
#choco feature enable --name="'useFipsCompliantChecksums'"

# Sources - Remove community repository and add a local folder source
choco source remove --name="'chocolatey'"
choco source add --name="'local'" --source="'$env:SystemDrive\choco-setup\packages'"

# Add license to setup and to local install
New-Item "$env:ChocolateyInstall\license" -ItemType Directory -Force
Copy-Item -Path "$env:SystemDrive\choco-setup\files\chocolatey.license.xml" -Destination "$env:ChocolateyInstall\license\chocolatey.license.xml" -Force

# Sources - Disable licensed source
choco source disable --name="'chocolatey.licensed'"
Write-Host "You can ignore the red text in the output above, as it is more of a warning until we have chocolatey.extension installed"

# Install Chocolatey Licensed Extension
choco upgrade chocolatey.extension -y --pre

# Set Configuration
choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache
choco config set commandExecutionTimeoutSeconds 14400
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration

# Set Licensed Configuration
choco feature enable --name="'internalizeAppendUseOriginalLocation'"
choco feature enable --name="'reduceInstalledPackageSpaceUsage'"
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration


#TODO: Are we installing the Chocolatey Agent Service? C4B Only
# https://docs.chocolatey.org/en-us/agent/setup
# choco upgrade chocolatey-agent -y --pre
#choco feature disable --name="'showNonElevatedWarnings'"
#choco feature enable --name="'useBackgroundService'"
#choco feature enable --name="'useBackgroundServiceWithNonAdministratorsOnly'"
#TODO: Check out other options and features to set at the url above.
#TODO: Also make sure you set your sources to allow for self-service
~~~

## Exercise 2: Set Up A Package Repository

Now we have a machine where we have Chocolatey installed and configured, and we have the setup files we gathered in Exercise 0. So now we are going to set up a package repository for use for all of our clients - this is where you will push packages and get packages from with your Chocolatey clients. Some repositories do not require Windows as part of their setup (Artifactory Pro and Nexus come to mind, but there are others). In choosing what you will use, it's good to read over [set up a package repository](xref:host-packages) to learn about the advantages and disadvantages of each.

Pick one or more of the following paths:

* [Set Up Chocolatey.Server](#exercise-2a-set-up-chocolateyserver)
* [Set Up A Different Repository](#exercise-2b-set-up-a-different-repository)
* [Set Up A File Share Repository](#exercise-2c-set-up-a-file-share-repository)
* [Set Up An SCCM Distribution Point As A Chocolatey Source](#exercise-3d-set-up-an-sccm-distribution-point-as-a-chocolatey-source)

> Recommended Option:
> * [Set Up A Different Repository](#exercise-2b-set-up-a-different-repository)
>
> The current recommendations for most organizational use cases are Artifactory, Nexus, or ProGet. All are quite robust, and two of those options can be used without cost.

### Exercise 2A: Set Up Chocolatey.Server

> Not recommended for most organizational use cases. Please look to set up Artifactory, Nexus, or ProGet as they are much more robust (and two do can be used without cost).

> :memo: **NOTE** If you have an IIS site for WSUS administration, Chocolatey.Server website will not come up at all, even if everything looks right. We have not yet been able to determine the issue, but believe it is related to ASP.NET 4.6+. Installing all of the required components for Chocolatey.Server may also affect your WSUS admin site. Please seek a different box.

Since we put the items on this machine in the previous exercise, we can just pick up where we left off.

1. Finish Exercise 0/1 on a machine you will set up as a server.
1. Follow the [steps](xref:set-up-chocolatey-server#setup-normally)
1. Follow the [steps](xref:set-up-chocolatey-server#additional-configuration)
1. Open a web browser and navigate to http://localhost. Read over the site and take notes.
1. Change the API key in the web.config file following the instructions at http://localhost. If localhost doesn't resolve to the site, make sure the bindings include "All Unassigned". This could be a temporary change if you need it to be, but it's important to access this to see additional setup instructions.
    > :memo: **NOTE** Use a real editor, like Notepad++ when working with text files like the web.config. Do NOT, I repeat, DO NOT use notepad.exe.
1. You may wish to install an SSL certificate.
1. You may wish to set up authentication to the repository (the SSL certificate is highly recommended to not pass passwords in cleartext).

> :memo: **NOTE** It is important that you do not end with the default apikey in the web.config, as that is easily found. That would leave your install insecure in that anyone in your organization would be able to push packages. You want to keep that down to approved folks.

> Best practices with Chocolatey.Server:
> * Change the ApiKey in the web.config file
> * Set up basic auth to restrict usage to approved folks (see the web.config for instructions)
> * Use SSL if accessible from the internet
> * Store the Chocolatey nupkg and other packages from Chocolatey Software on this server (next exercise covers this)

> :memo: **NOTE** Chocolatey.Server is a one package repository per setup and only has one apikey that can be used. So if you need multiple repositories, you would setup multiple Chocolatey.Server instances to cover your needs. Another option when you need multiple repositories and want ease of management is to look into Artifactory Pro, Nexus, and ProGet. They not only have multiple Chocolatey/NuGet repositories per instance, but also other repositories types as well. See the next section.

~~~powershell
# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force

# Install Chocolatey.Server
choco upgrade chocolatey.server -y --pre

Write-Warning "Follow the steps at https://docs.chocolatey.org/en-us/guides/organizations/set-up-chocolatey-server#setup-normally and  https://docs.chocolatey.org/en-us/guides/organizations/set-up-chocolatey-server#additional-configuration for now."
# more may be added later
~~~

#### Ensure Chocolatey.Server with Configuration Managers

* Puppet has an automated way of managing a Chocolatey.Server setup (it may not be up to date as of this writing). See https://forge.puppet.com/chocolatey/chocolatey_server.
* Ansible has a unofficial role in Ansible Galaxy at https://galaxy.ansible.com/jborean93/win_chocolatey_server that can be used to setup Chocolatey.Server with custom parameters. There is also a blog post at http://frostbyte.us/using-ansible-to-install-a-chocolatey-package-repository that explains some of the steps.
* Chef has a POC at https://github.com/galenemery/chocolatey_server
* Docker image at - https://github.com/takhyon/docker-chocolatey.server. Disclaimer: This is not a recommendation - we have no affiliation nor have we verified this

### Exercise 2B: Set Up A Different Repository

> Recommended for most organizational use cases

If you are setting up something different than Chocolatey.Server, you may wish to read over [How To Set Up an Internal Repository](xref:host-packages). This will give you options and links to repositories like Artifactory Pro, Nexus, and ProGet.

> :memo: **NOTE** Some repository server options don't require Windows.

> :memo: **NOTE** Many repositories have a concept of a proxy repository. Unlike NuGet repositories, you likely **DO NOT WANT** a proxied NuGet/Chocolatey repository pointing to the community repository. They only cache packages - **cached* is not the same concept as *internalized**. To reuse packages from the community repository in a reliable way, you need to [internalize them](xref:recompile-packages). The community repository is subject to distribution rights, which means many packages need to download things from the internet at **runtime**. That's unreliable and a no go for many organizations. You can use Package Internalizer (as we are seeing above) or [manually internalize packages](xref:recompile-packages) you want to use from the community repository. More on [why (community packages repository notes)](xref:community-packages-disclaimer).

### Exercise 2C: Set Up A File Share Repository

> Not recommended for most organizational use cases. Please look to set up Artifactory, Nexus, or ProGet as they are much more robust (and two do can be used without cost). Please see notes below on file share limitations.

Setting up a file share repository is typically quite simple. You put your nupkgs into a flat folder structure (no subfolders currently) and then can access them wherever you can reach the file share. However there are a couple of things to keep in mind and be careful with when it comes to file shares as repositories. File shares can be UNC, DFS, SMB, etc, as long as it supports Windows ACL permissions.

> File Share notes:
> * ACL/Share permissions should not let anyone put packages in the share
> * ACLs control access to read permissions.
> * Packages go into the share folder, not subfolders (Chocolatey is currently based in NuGet v2, which doesn't allow subfolders)
> * Be very careful never to overwrite a version of a nupkg, especially if it has been deployed to any clients. See [package immutability](xref:host-packages#package-version-immutability)
> * Bigger-sized packages will slow down queries, so explore a different option when you see that.
> * Enough bigger packages will start timing out queries, so if you've hit this it's time to explore a different option.
> * Migration to other repo formats is easy
> * Set access properly if you need to connect from local machine accounts, Everyone share access does not give them network permission. See [local share permissions](xref:host-packages#local-folder-permissions).

> :memo: **NOTE** If you run into issues where Chocolatey can't see the packages, check the last point above.

While setting up a file share is the quickest way to get started, you may find you outgrow it quite quickly. Fortunately migration to another repository is very simple.

### Exercise 3D: Set Up An SCCM Distribution Point As A Chocolatey Source

> Not recommended for most organizational use cases. Please look to set up Artifactory, Nexus, or ProGet as they are much more robust (and two do can be used without cost).

We won't go into how to set up a distribution point, as you have places to learn how to set those up. To enable a distribution point, you are going to add a file share to it. Follow the previous exercise.

## Exercise 3: Add Packages To The Repository

1. Now we need to get the packages we have in `c:\choco-setup\packages` to the package repository. With Chocolatey.Server, we can cheat a little and simply copy the nupkg files to `$env:ChocolateyToolsLocation\Chocolatey.Server\App_Data\Packages`.
1. If we are using a different repository, we just need to run `choco push <nupkg_path> -s http://<url_to_api> -k <apikey>`

> :memo: **NOTE** We'll put Chocolatey here, and use this location of Chocolatey for all further client installations. If we are using Chocolatey.Server, we'll have an install.ps1 that it serves that is dynamic and will use a local chocolatey.nupkg if we have one in the repository (it will use the Chocolatey package at https://chocolatey.org/ otherwise, which we won't want).

Here is a script for Chocolatey.Server:

~~~powershell
# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force

# Copy the packages to the Chocolatey.Server repo folder
Copy-Item "$env:SystemDrive\choco-setup\packages\*" -Destination "$env:ChocolateyToolsLocation\Chocolatey.Server\App_Data\Packages\" -Force -Recurse

# Copy the license to the Chocolatey.Server repo (for v0.2.3+ downloads)
#New-Item "$env:ChocolateyToolsLocation\Chocolatey.Server\App_Data\Downloads" -ItemType Directory -Force
#Copy-Item "$env:SystemDrive\choco-setup\files\chocolatey.license.xml" -Destination "$env:ChocolateyToolsLocation\Chocolatey.Server\App_Data\Downloads\chocolatey.license.xml" -Force -Recurse
~~~

For other things, just loop over the nupkg files and call `choco push`.

## Exercise 4: Create a Package For the License

> :memo: **NOTE** This is for C4B / MSP / C4BTRIAL ONLY.
To make things easier for deployments, let's create a package for the license file. We are going to grab the currently installed license to do this, but you could use the one in `c:\choco-setup\files`.

Save this script and run it on a machine where you've installed the license.

~~~powershell
# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force

$licenseLocation = "$env:ChocolateyInstall\license\chocolatey.license.xml"
$packagingFolder = "$env:SystemDrive\choco-setup\packaging"
$packagesFolder = "$env:SystemDrive\choco-setup\packages"
$packageId = "chocolatey-license"
$licensePackageFolder = "$packagingFolder\$packageId"
$licensePackageNuspec = "$licensePackageFolder\$packageId.nuspec"

# Validations
if (-Not(Test-Path $licenseLocation)) {
  Write-Warning "Please add the license file manually to $licenseLocation prior to running this. Throwing error..."
  throw "No license found to use. Please add license to $licenseLocation as per instructions PRIOR to running this script."
}

Write-Warning "Prior to running this, please ensure you've updated the license file manually in the Chocolatey installation at $env:ChocolateyInstall\license\chocolatey.license.xml"
Write-Warning "REPEATED: This script will OVERWRITE the license file you might have dropped into the packaging at '$licensePackageFolder'"
& choco
Write-Warning "If there is is a note about invalid license above, you're going to run into issues."

# Get license expiration from the license file for version and validation
[xml]$licenseFile = Get-Content $env:ChocolateyInstall\license\chocolatey.license.xml
$licenseExpiration = Get-Date($licenseFile.license.expiration)

# Validate the expiration date is in the future
if ($licenseExpiration -lt $(Get-Date)) {
  Write-Warning "THE LICENSE FILE AT $env:ChocolateyInstall\license is EXPIRED. This is the file used by this script to generate this package, not at '$licensePackageFolder'"
  Write-Warning "Please update the license file correctly in the environment FIRST, then rerun this script. Throwing error..."
  throw "Please use an up to date license. License is expired as of $($licenseExpiration.ToString())."
}

# Use the license expiration as the license version
$licensePackageVersion = $licenseExpiration.ToString("yyyy.MM.dd")

# Ensure the packaging folder exists
Write-Output "Generating package/packaging folders at '$packagingFolder'"
New-Item $packagingFolder -ItemType Directory -Force | Out-Null
New-Item $packagesFolder -ItemType Directory -Force | Out-Null

# Create a new package
Write-Output "Creating package named  '$packageId'"
New-Item $licensePackageFolder -ItemType Directory -Force | Out-Null
New-Item "$licensePackageFolder\tools" -ItemType Directory -Force | Out-Null

# Set the installation script
Write-Output "Setting install and uninstall scripts..."
@"
`$ErrorActionPreference = 'Stop'
`$toolsDir              = "`$(Split-Path -parent `$MyInvocation.MyCommand.Definition)"
`$licenseFile           = "`$toolsDir\chocolatey.license.xml"

New-Item "`$env:ChocolateyInstall\license" -ItemType Directory -Force
Copy-Item -Path `$licenseFile  -Destination `$env:ChocolateyInstall\license\chocolatey.license.xml -Force
Write-Output "The license has been installed."
"@ | Out-File -FilePath "$licensePackageFolder\tools\chocolateyInstall.ps1" -Encoding UTF8 -Force

# Set the uninstall script
@"
Remove-Item -Path "`$env:ChocolateyInstall\license\chocolatey.license.xml" -Force
Write-Output "The license has been removed."
"@ | Out-File -FilePath "$licensePackageFolder\tools\chocolateyUninstall.ps1" -Encoding UTF8 -Force

# Copy the license to the package directory
Write-Output "Copying license to package from '$licenseLocation'..."
Copy-Item -Path $licenseLocation  -Destination "$licensePackageFolder\tools\chocolatey.license.xml" -Force

# Set the nuspec
Write-Output "Setting nuspec..."
@"
<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://schemas.microsoft.com/packaging/2015/06/nuspec.xsd">
  <metadata>
    <id>chocolatey-license</id>
    <version>$licensePackageVersion</version>
    <!--<owners>__REPLACE_YOUR_NAME__</owners>-->
    <title>Chocolatey License</title>
    <authors>__REPLACE_AUTHORS_OF_SOFTWARE_COMMA_SEPARATED__</authors>
    <tags>chocolatey license</tags>
    <summary>Installs the Chocolatey commercial license file.</summary>
    <description>This package ensures installation of the Chocolatey commercial license file.

This should be installed internally prior to installing other packages, directly after Chocolatey is installed and prior to installing `chocolatey.extension` and `chocolatey-agent`.

The order for scripting is this:
* chocolatey
* chocolatey-license
* chocolatey.extension
* chocolatey-agent

If items are installed in any other order, it could have strange effects or fail.
	</description>
    <!-- <releaseNotes>__REPLACE_OR_REMOVE__MarkDown_Okay</releaseNotes> -->
  </metadata>
  <files>
    <file src="tools\**" target="tools" />
  </files>
</package>
"@  | Out-File -FilePath "$licensePackageNuspec" -Encoding UTF8 -Force

# Package up everything
Write-Output "Creating a package"
choco pack $licensePackageNuspec --output-directory="$packagesFolder"

Write-Output "Package has been created and is ready at $packagesFolder"
~~~

## Exercise 5: Push A Package To The Repository

We need to ensure the repository is all set up correctly, the best way to test that is to push a package to the repository (and to test installation, which will do in the next exercise).

1. So now we'll take that package we created in the previous exercise and push it to the server.
1. Open PowerShell.exe (does not need to be admin).
1. Run `choco push $env:SystemDrive\choco-setup\packages\chocolatey-license.<insert version>.nupkg --source="'http://localhost/chocolatey'" --api-key="'<insert api key>'"` (url is different for different source repository types)
1. If you get an error about insecure channels, "The specified source '' is not secure", and you are all inside an internal network, you can add `--force` to the end of the command above.
1. If you have not already placed a package with this name/version, it should be successful. If it is not, you need to revisit earlier exercises to determine if you missed a step.

> :memo: **NOTE** If you are using open source Chocolatey, you will want to create a test package using `choco new` and use that to push and verify setup.

## Exercise 6: Installing Chocolatey On Client Machines

So now we'll install Chocolatey using all internal resources and configure Chocolatey so that it doesn't use any external sources or resources. If we've set up everything properly prior to this, this will be a breeze. If not, we are going to need to visit previous exercises to fix what we may have missed.

### Exercise 6A: Installing Chocolatey On Clients Directly Using PowerShell

Starting with Chocolatey.Server v0.2.3, you get a similar experience where you just open an Administrative PowerShell.exe and follow the instructions like you see at https://chocolatey.org/install. This ease of install is very beneficial when setting up client machines directly.

> :memo: **NOTE** Perform the following steps on a different machine, not on the machine where you've already set up Chocolatey or a repository.

1. From the client machine (not the same machine you just set up the repository on), open a browser and navigate to the url of the package repository you just set up.
1. On that page it will contain instructions on how to install. Follow those instructions and that will set up the client (Chocolatey.Server v0.2.2+ ONLY).
1. If you don't have that, you will need to use the local script pointed to download from the bare nupkg url that is available for chocolatey.nupkg (which we gathered in Exercise 0).
1. Open PowerShell.exe as an administrative shell. You can type "Windows Key + X + A" (Windows 8+ - when that comes up if it is cmd.exe, simply type `powershell` to get into it).
1. If you need FIPS compliance, run `choco feature enable --name="'useFipsCompliantChecksums'"`.
1. Run `choco source remove --name="'chocolatey'"` to remove the default community package repository.
1. Run `choco source add --name="'internal_server'" --source="'$baseUrl/chocolatey'" --priority="'1'" <other options>`. Other options noted at [source command](xref:choco-command-source).
1. C4B / MSP / C4BTRIAL: Install the license package we've pushed - `choco upgrade chocolatey-license -y`. This may be a place you see an error if things are not configured correctly. If you run into an error, be sure that you have the source added properly with the right permissions (not api key - that is for pushes only).
1. C4B / MSP / C4BTRIAL: Run `choco source disable --name="'chocolatey.licensed'"`. When the license is placed, Chocolatey automatically adds the license and we don't want to use that source. Note we can't remove the license because the existence of the license file will have Chocolatey adding it right back - so we just disable it. You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and we are going to take care of that in the next step.
1. C4B / MSP / C4BTRIAL: Run `choco upgrade chocolatey.extension -y --pre`. You will see what looks like an error message about not having chocolatey.extension installed. That's a warning and should clear up when this command completes.
1. Run `choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache`. This moves the TEMP location in scripts to use this and makes clean up more deterministic.
1. Run `choco config set commandExecutionTimeoutSeconds 14400`. This increases the timeout more than the default 45 minutes, you may wish to set it higher.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'internalizeAppendUseOriginalLocation'"`. This sets Package Internalizer to append `-UseOriginalLocation` to the end of `Install-ChocolateyPackage` to make it behave more like `Install-ChocolateyInstallPackage`. Since the files are local, we won't need it copying them to temp prior to running it.
1. C4B / MSP / C4BTRIAL: Run `choco feature enable --name="'reduceInstalledPackageSpaceUsage'"` to ensure Package Reducer is turned on.
1. Set proxy configuration, virus scan configuration, or other configuration as described at [Chocolatey configuration](xref:configuration).
1. C4B / MSP / C4BTRIAL: Are we installing the [optional Chocolatey Agent Service as well](xref:setup-agent)? If so, run `choco upgrade chocolatey-agent -y --pre` and then follow the link for other settings you will need to configure.

~~~powershell
# This is a base url and should not include the "/chocolatey" (for Chocolatey.Server) or any url path to a NuGet/Chocolatey Packages API
$baseUrl = "http://localhost"
# this is the sub path, it will combine the above with this in the script $baseUrl/$repositoryUrlPath
$repositoryUrlPath = "chocolatey"

# Ensure we can run everything
Set-ExecutionPolicy Bypass -Scope Process -Force;

# Reroute TEMP to a local location
New-Item $env:ALLUSERSPROFILE\choco-cache -ItemType Directory -Force
$env:TEMP = "$env:ALLUSERSPROFILE\choco-cache"

# Ignore proxies since we are using internal locations
$env:chocolateyIgnoreProxy = 'true'
# Set proxy settings if necessary
#$env:chocolateyProxyLocation = 'https://local/proxy/server'
#$env:chocolateyProxyUser = 'username'
#$env:chocolateyProxyPassword = 'password'

# Install Chocolatey
# This is for use with Chocolatey.Server only:
iex ((New-Object System.Net.WebClient).DownloadString("$baseUrl/install.ps1"))
# You'll need to also use the script you used for local installs to get Chocolatey installed.

# Are you military, government, or for some other reason have FIPS compliance turned on?
#choco feature enable --name="'useFipsCompliantChecksums'"

# Sources - Remove community repository
choco source remove --name="'chocolatey'"

# Sources - Add your internal repositories
# This is Chocolatey.Server specific (add other options like auth/allow self service as needed - https://docs.chocolatey.org/en-us/choco/commands/source):
choco source add --name="'internal_server'" --source="'$baseUrl/$repositoryUrlPath'" --priority="'1'" --bypass-proxy
#TODO: Add other sources here

# Add license to setup and to local install
choco upgrade chocolatey-license -y

# Sources - Disable licensed source
choco source disable --name="'chocolatey.licensed'"
Write-Host "You can ignore the red text in the output above, as it is more of a warning until we have chocolatey.extension installed"

# Install Chocolatey Licensed Extension
choco upgrade chocolatey.extension -y --pre

# Set Configuration
choco config set cacheLocation $env:ALLUSERSPROFILE\choco-cache
choco config set commandExecutionTimeoutSeconds 14400
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration

# Set Licensed Configuration
choco feature enable --name="'internalizeAppendUseOriginalLocation'"
choco feature enable --name="'reduceInstalledPackageSpaceUsage'"
#TODO: Add other items you would configure here
# https://docs.chocolatey.org/en-us/configuration

#TODO: Are we installing the Chocolatey Agent Service?
# https://docs.chocolatey.org/en-us/agent/setup
# choco upgrade chocolatey-agent -y --pre
#choco feature disable --name="'showNonElevatedWarnings'"
#choco feature enable --name="'useBackgroundService'"
#choco feature enable --name="'useBackgroundServiceWithNonAdministratorsOnly'"
#TODO: Check out other options and features to set at the url above.
#TODO: Also make sure you set your sources to allow for self-service
~~~

### Exercise 6B: Installing Chocolatey On Clients with Infrastructure Management Tools

This is likely to vary somewhat wildly based on what you have set up. We recommend choosing a tool and then looking at what is available.

We have [documentation for Puppet](xref:setup-licensed#set-up-licensed-edition-with-puppet), with some great examples. What you would do to make that work with Ansible, Chef, Salt, or PowerShell DSC would be similar. All of the different options are covered at [Infrastructure Management Integration](xref:integrations).

If you are using Chocolatey.Server, please login to that machine and check https://localhost for instructions specific to different infrastructure management tools in the admin section.

#### Chocolatey Integration Implementation with Configuration Managers

<?! Include "../../../shared/configuration-managers.txt" /?>

## Exercise 7: Subscribe To Release Announcements

In a fully internal environment, you need a way to know when new versions have been released and if they affect you so you can update those packages in your environment. Best to have a low traffic announce only type of email list you can join. Fortunately there is - `chocolatey-announce`.

You can sign up for email delivery of new release announcements at [chocolatey-announce](https://groups.google.com/forum/#!forum/chocolatey-announce).

## Conclusion

If you've made it this far, you are ready to be quite successful with Chocolatey and Windows automation in your organization. If you are using open source Chocolatey, from time to time you might check in to see what we've been adding to the [commercial options](https://chocolatey.org/compare#compare). We are building a complete software management solution with Chocolatey for Business, above and beyond the package management that Chocolatey open source does.

## More Architecture Setup

* [Setup Central Management](xref:ccm-setup)
* [Automate Internalization of Community Packages](xref:recompile-packages) - allows you to have same near hands off approach to package/software updates you might have seen before if you were using community repository directly.
* [Quick Deployment Environment](xref:qde)

## Next Steps

Now it's time to take the next steps and learn about Chocolatey and packaging itself:

* [Learn How To Build Packages](https://github.com/ferventcoder/chocolatey-workshop)
* [Learn Basic and Advanced Concepts For Software Management with Chocolatey](https://github.com/ferventcoder/chocolatey-workshop)
* [Chocolatey Documentation](https://docs.chocolatey.org)
* [Compare Features In Different Editions](https://chocolatey.org/compare#compare)
