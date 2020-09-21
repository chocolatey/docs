# Package Builder - Create Packages Automatically From Installers (Business Editions Only)

> Chocolatey's Package Builder allows you to create fully ready to go software deployments for Windows in 5-10 seconds! There is nothing faster than Chocolatey when it comes to preparing software for an unattended deployment across your organization.

* Generate packages based on installers and zips
* Generate packages by reflecting over Programs and Features
* Generate packages from the Package Builder UI

Creating packages is a pretty quick process as compared to manually installing software on multiple machines. There is still some time involved to create a package. Even the best packagers take between 5-10 minutes to create a package. Chocolatey's Package Builder creates high quality packages in 5-10 seconds when pointed to native installers and zips! You can even point package builder to both a 32-bit and 64-bit url and seconds later you have a fully functioning package using all local/embedded resources!

Chocolatey for Business is able to inspect an installer and determine silent arguments and complete packaging components for you, saving you hours of time in packaging and maintaining software!

<!-- TOC depthTo:5 -->

- [Usage](#usage)
  - [Command Line](#command-line)
  - [Package Builder UI](#package-builder-ui)
- [See It In Action](#see-it-in-action)
  - [Package Builder CLI and Scripts](#package-builder-cli-and-scripts)
  - [Package Builder UI](#package-builder-ui-1)
  - [Generate Packages from Programs and Features](#generate-packages-from-programs-and-features)
  - [More business concepts](#more-business-concepts)
- [Options and Switches](#options-and-switches)
- [FAQ](#faq)
  - [How do I take advantage of Package Builder?](#how-do-i-take-advantage-of-package-builder)
  - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
  - [Will this become available for lower editions of Chocolatey?](#will-this-become-available-for-lower-editions-of-chocolatey)
  - [How does it work?](#how-does-it-work)
  - [What types of extensions are supported?](#what-types-of-extensions-are-supported)
  - [Will it catch all types of installers?](#will-it-catch-all-types-of-installers)
  - [Does it always find the silent uninstall arguments?](#does-it-always-find-the-silent-uninstall-arguments)
  - [This was unable to detect custom installer arguments.](#this-was-unable-to-detect-custom-installer-arguments)
  - [Does it create auto unattend files?](#does-it-create-auto-unattend-files)
  - [Does it work with zip archive?](#does-it-work-with-zip-archive)
  - [Does this work with keeping the installer on a UNC share or elsewhere yet?](#does-this-work-with-keeping-the-installer-on-a-unc-share-or-elsewhere-yet)
- [Common Issues and Resolutions](#common-issues-and-resolutions)
  - [I get "Name is required. Please pass in a name for the new package."](#i-get-name-is-required-please-pass-in-a-name-for-the-new-package)

<!-- /TOC -->

## Usage

### Command Line
When calling `choco new`, just add `--file=value` to point to a native installer and Chocolatey for Business will automatically determine the silent arguments, create the packaging and wrap that all around the installer.

![Create Packages from Installers - if you are on https://chocolatey.org/docs/features-create-packages-from-installers, see commented html below for detailed description of image](images/features/features_packages_from_installers.png)

<!--
Text in the image above:

Chocolatey for Business automatically creates all packaging from an installer!

Create Packages for Installers In Seconds

- What used to take minutes or hours, is now done in seconds.
- Allows customization
- Automatically create packages for your entire organization's file share in under 15 minutes, saving you weeks of work.

This image shows running `choco new --file .\installers\1Password-4.6.0.598.exe`.

-->

### Package Builder UI

Starting in version 1.8.0 of the licensed editions, you have access to the Package Builder UI.

Simply right click on an installer, executable, or zip type and select "Create Chocolatey Package..."

![Package Builder UI](https://cloud.githubusercontent.com/assets/63502/20328042/bb944018-ab55-11e6-884f-0a45babce40a.png)

Then just add in and fill out the requested information. It uses `choco new` under the covers allowing you to really ramp up fast, especially when you don't have a lot of command line experience.

Another way to bring up the ui is to call `packagebuilder` from the command line.

## See It In Action

### Package Builder CLI and Scripts

We've prepared a short video going over the concepts:
[![Chocolatey's Package Builder - Package Builder CLI and Scripting](https://cloud.githubusercontent.com/assets/63502/20327872/b0caf0d8-ab54-11e6-8c40-8bdeeb8eb13c.png)](https://www.youtube.com/watch?v=6TXY5Ie-3wg&list=PLfn-TaDnc1us5X-PVlxW8M1h-6mXEXZSG&index=1 "Chocolatey's Package Builder - Package Builder CLI and Scripting")

Quickly script out creating packages for your entire organization's cache of software, allowing you to completely automate your Windows installations in moments, not months. You can do that with a simple script:

~~~powershell
# Path to your installers, will navigate subdirectories
$path = '\\company.file.server\installers'

# Generate packages over supported types of files
$supportedTypes = @('.exe', '.msi', '.7z', '.zip', '.msu', '.msp')
Get-ChildItem -Path $path -Recurse | ?{
  $extension = [System.IO.Path]::GetExtension($_.Name)
  $supportedTypes.Contains($extension)
  } | %{
  Write-Host "$($_.FullName)"
  # Run choco new against the installer
  & choco new --file "$($_.FullName)" --build-package --outputdirectory $pwd
}
~~~

As you see this script, it is doing the following:
* Taking a path to where installers, zips, etc are located (`$path = '\\company.file.server\installers'`)
* Setting up support types of files to use with Package Builder (`$supportedTypes = @('.exe', '.msi', '.7z', '.zip', '.msu', '.msp')`)
* Looping over all that it finds in that folder and all subdirectories (`Get-ChildItem -Path $path -Recurse`)
* Find files that apply (`$supportedTypes.Contains($extension)`)
* Run choco new, but point it to the full path to the file (`& choco new --file "$($_.FullName)"`), ask it to attempt to build the package (`--build-package`) and have the output in present working directory (` --outputdirectory $pwd`)

### Package Builder UI
Not every person is going to love the command line or may not be familiar with the command line and at Chocolatey we realize this. We've spent countless hours talking to customers and with their feedback we're introducing Package Builder UI. This also gives you an opportunity to transition from existing UI tools while taking advantage of powerful Chocolatey concepts!

We've prepared a short video to show the power of the UI:
[![Chocolatey's Package Builder - Package Builder UI](https://cloud.githubusercontent.com/assets/63502/20327926/f54ac81e-ab54-11e6-9cb1-60df170c338e.png)](https://www.youtube.com/watch?v=qJNKR_PEQqY&list=PLfn-TaDnc1us5X-PVlxW8M1h-6mXEXZSG&index=2 "Chocolatey's Package Builder - Package Builder UI")

### Generate Packages from Programs and Features
Another way Package Builder can generate packages is based on looking at what is installed on a system in Programs and Features. This gives you lightning quick ramp up time in both package and automating your Windows software installations!

[![Chocolatey's Package Builder - Generate Packages from Programs and Features Automatically!](https://cloud.githubusercontent.com/assets/63502/20327972/46c8ff3a-ab55-11e6-9c03-32b0f83540bb.png)](https://www.youtube.com/watch?v=Mw_ReipnskI&list=PLfn-TaDnc1us5X-PVlxW8M1h-6mXEXZSG&index=3 "Chocolatey's Package Builder - Generate Packages from Programs and Features Automatically!")

> :memo: **NOTE**: To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

### More business concepts

![auto package creation/synchronize](images/gifs/choco_business_features.gif)

## Options and Switches

When running `choco new` in the Business editions, pass the following:

~~~sh
     --file, --url=VALUE
     Inspect a file (native installer, zip, patch/upgrade file, or remote url
       to download first) to to completely create a package with proper silent
       arguments! Can be 32-bit or 64-bit architecture.  Available in Business
       editions only (licensed version 1.4.0+, url/zip starting in 1.6.0).

     --file64, --url64=VALUE
     Optional - used when specifying both a 32-bit and a 64-bit file. Can be
       an installer or a zip, or remote url to download. Available in Business
       editions only (licensed version 1.6.0+).

     --keepremote, --originallocation, --original-location, --useoriginallocation, --use-original-location, --useoriginalfileslocation, --use-original-files-location
     Use Original Files Location - when using file or url, use the original
       location in packaging. Available in Business editions only (licensed
       version 1.6.0+).

     --checksum, --downloadchecksum, --download-checksum=VALUE
     Download Checksum - checksum to verify File/Url with. Defaults to empty.
       Available in Business editions only (licensed version 1.7.0+).

     --checksum64, --checksumx64, --downloadchecksumx64, --download-checksum-x64=VALUE
     Download Checksum 64-bit - checksum to verify File64/Url64 with.
       Defaults to empty. Available in Business editions only (licensed version
       1.7.0+).

     --checksumtype, --checksum-type, --downloadchecksumtype, --download-checksum-type=VALUE
     Download Checksum Type - checksum type for File/Url (and optional
       separate 64-bit files when specifying both). Used in conjunction with
       Download Checksum and Download Checksum 64-bit. Available values are
       'md5', 'sha1', 'sha256' or 'sha512'. Defaults to 'sha256'.  Available in
       Business editions only (licensed version 1.7.0+).

     --pauseonerror, --pause-on-error
     Pause on Error - Pause when there is an error with creating the package.
       Available in Business editions only (licensed version 1.7.0+).

     --buildpackage, --build-package
     Build Package - Attempt to compile the package after creating it.
       Available in Business editions only (licensed version 1.7.0+).
~~~

## FAQ

### How do I take advantage of Package Builder?
You must have a [Business edition of Chocolatey](https://chocolatey.org/compare). Business editions are great for organizations that need to manage the total software lifecycle.

### I'm a licensed customer, now what?
When you run `choco new`, you can add `--file` and point Chocolatey at the installer file and let Chocolatey figure out everything for creating a package and the silent arguments and wrap that around the installer.

### Will this become available for lower editions of Chocolatey?
Package Builder will only be available in C4B (Chocolatey for Business).

### How does it work?
It inspects the installer file using a series of rules that helps determine the installer type. From there it builds a package with the information it is able to extract from the installer.

### What types of extensions are supported?
Package Builder supports `.exe`, `.msi`, `.msu`, `.msp`, `.7z`, and `.zip`.

### Will it catch all types of installers?
It is able to detect 12 types of installers currently.

### Does it always find the silent uninstall arguments?
In over 70% of the cases it will, but not always. Even with this in mind, it still removes 90% of the packaging work. When it can't create a fully unattended softare deployment, it will create a TODO file for you to complete. See the next question on how to handle cases where it can not.

### This was unable to detect custom installer arguments.
Unfortunately, some installers out there are just a pain to work with. In the case of custom installers, you may be able to find the silent arguments for install and uninstall by searching online. If you can not find anything, consider unpacking the installer and putting the software binaries directly in the package.

### Does it create auto unattend files?
Unfortunately, it is not able to do this. See the [[automatic internalize and recompile packages feature|FeaturesAutomaticallyRecompilePackages]] to take advantage of thousands of existing packages without a need for internet access.

### Does it work with zip archive?
Yes, but somewhat naively. It will generate the packaging to unpack the archive for both 7z and zip files.

### Does this work with keeping the installer on a UNC share or elsewhere yet?
Yes, as of Licensed version v1.6.0+. Use `--use-original-location`.

## Common Issues and Resolutions

### I get "Name is required. Please pass in a name for the new package."
This occurs when you are not running Chocolatey for Business or don't have your client properly licensed. Please see [licensed installation|Installation-Licensed]] for more details.
