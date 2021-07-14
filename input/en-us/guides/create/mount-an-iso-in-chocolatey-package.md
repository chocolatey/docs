---
Order: 30
xref: mount-an-iso
Title: Mount Iso
Description: How to mount an iso in Chocolatey package
RedirectFrom: docs/how-to-mount-an-iso-in-chocolatey-package
---

## Mounting ISOs - The Problem

There are times when using an installer file directly is not an option as what you need is contained in an ISO. In later versions of the Windows Operating System (defined in [Mount-DiskImage](#mount-diskimage) below), PowerShell provides the ability to mount this ISO file directly using the `Mount-DiskImage` cmdlet.  However, in earlier versions of Windows, this is not possible. In order to maintain backwards compatibility with older Operating Systems, when using an ISO file, you can use ImDisk Virtual Disk Driver.

## chocolatey-isomount.extension

One of the community maintainers has created an extension package to automate the installation of software from inside an ISO file. This extension is based on the [Mount-DiskImage](#mount-diskimage) method below and therefore has the same [Requirements](#requirements).

### Step 1: Get chocolatey-isomount.extension Package

You will need to take a dependency on the [chocolatey-isomount.extension package](https://chocolatey.org/packages/chocolatey-isomount.extension) If you are using Chocolatey in an organizational context, be sure to cache the chocolatey-isomount.extension package and place it on your internal sources.

1. MSP/C4B: Run `choco download chocolatey-isomount.extension`
1. FOSS: Download [chocolatey-isomount.extension](https://chocolatey.org/api/v2/package/chocolatey-isomount.extension)
1. Deploy the package to your internal repository.

> :memo: **NOTE** MSP stands for Managed Service Provider. It along with Chocolatey for Business (C4B) are commercial editions of Chocolatey that come with [Package Internalizer](xref:recompile-packages) to convert existing packages to be 100% offline and reliable. FOSS (free open source software) is short for the open source edition.

### Step 2: Add chocolatey-isomount.extension Dependency

Open your package's nuspec up and add a dependency on `chocolatey-isomount.extension`. This will be inserted just above the closing "metadata" tag (`</metadata>`).

~~~xml
  <dependencies>
      <dependency id="chocolatey-isomount.extension" version="1.0.0" />
  </dependencies>
~~~

> :memo: **NOTE** The above version is a minimum version dependency. Your version may be newer, you can substitute it there.

### Step 3: Add chocolatey-isomount.extension Code

Now in your chocolateyInstall.ps1, you will want something similar to the following:

#### Embedded ISO or on a fileshare

~~~powershell
$packageName= 'bob'
$toolsDir   = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"
$fileLocation = Join-Path $toolsDir 'ISO_EMBEDDED_IN_PACKAGE'

$packageArgs = @{
    packageName   = $packageName
    fileType      = 'msi'
    file          = 'setup.msi'
    file64        = 'x64\setup64.msi'
    silentArgs    = "/qn /norestart"
    validExitCodes= @(0, 3010, 1641)
    softwareName  = 'Bob*'
    isoFile       = $fileLocation
}

Install-ChocolateyIsoInstallPackage @packageArgs
~~~

#### Download ISO from an URL

~~~powershell
$packageName= 'bob'
$toolsDir   = "$(Split-Path -Parent $MyInvocation.MyCommand.Definition)"
$url        = 'https://somewhere.com/file.iso'

$packageArgs = @{
    packageName   = $packageName
    fileType      = 'msi'
    url           = $url
    file          = 'setup.msi'
    file64        = 'x64\setup64.msi'
    silentArgs    = "/qn /norestart"
    validExitCodes= @(0, 3010, 1641)
    softwareName  = 'Bob*'
    checksum      = '12345'
    checksumType  = 'sha256'
}

Install-ChocolateyIsoPackage @packageArgs
~~~

## ImDisk

The most compatible with all versions of Windows option is to use ImDisk. ImDisk Virtual Disk Driver (imdisk) is a software package that allows an ISO file to be mounted, but more importantly, it works for Windows NT/2000/XP/Vista/7/8/8.1 or Windows Server 2003/2008/2012/2016 (so basically, everything!). That means that you can use one, common, method, for mounting ISO files when required within your Chocolatey Packages.

### Step 1: Get ImDisk Package

You will need to take a dependency on the [ImDisk package](https://chocolatey.org/packages/imdisk). If you are using Chocolatey in an organizational context, be sure to [internalize](xref:recompile-packages) (not cache) the ImDisk package and place it on your internal sources.

1. MSP/C4B: Run `choco download imdisk --internalize`
1. FOSS: Download [imdisk](https://chocolatey.org/api/v2/package/imdisk) - [internalize manually](xref:recompile-packages)
1. Deploy the package to your internal repository.

> :memo: **NOTE** MSP stands for Managed Service Provider. It along with Chocolatey for Business (C4B) are commercial editions of Chocolatey that come with [Package Internalizer](xref:recompile-packages) to convert existing packages to be 100% offline and reliable. FOSS (free open source software) is short for the open source edition.

### Step 2: Add ImDisk Dependency

Open your package's nuspec up and add a dependency on `imdisk`. This will be inserted just above the closing "metadata" tag (`</metadata>`).

~~~xml
  <dependencies>
      <dependency id="imdisk" version="2.0.9" />
  </dependencies>
~~~

> :memo: **NOTE** The above version is a minimum version dependency. Your version may be newer, you can substitute it there.

### Step 3: Add ImDisk Code

Now in your chocolateyInstall.ps1, you will want something similar to the following:

~~~powershell
# Internal use:
# - Option 1: If the ISO is smaller than 1GB, embed the binary directly into the package for the most reliable use skip this
# - Option 2: Store ISO on a file share and skip this
# - Option 3: Download from internal sources, like a binary (raw) repository in Artifactory, Cloudsmith, Nexus, or ProGet.
# Community repo: Download the ISO file from the internet if you don't have distribution rights or the file is larger than 250MB.
Get-ChocolateyWebFile 'WindowsSDK2008' "$env:temp\winsdk2008.iso" 'http://download.microsoft.com/download/f/e/6/fe6eb291-e187-4b06-ad78-bb45d066c30f/6.0.6001.18000.367-KRMSDK_EN.iso'

# Next, mount the ISO file, ready for using it's contents (NOTE: the last parameter here is the drive letter that will be assigned to the mounted ISO)
imdisk -a -f "$env:temp\winsdk2008.iso" -m "w:"

# Run commands against the mounted ISO, in this case, run the setup.exe
Install-ChocolateyInstallPackage 'WindowsSDK2008' 'exe' '/q' 'w:\Setup.exe'

# Unmount the ISO file when finished
imdisk -d -m w:

~~~

## Mount-DiskImage

[Mount-DiskImage](https://docs.microsoft.com/en-us/powershell/module/storage/mount-diskimage)
is an alternative that is built-in, so no package dependencies required. However it may need admin permission to perform (with VHDs it will) and is only available in certain versions of PowerShell/Windows.

### Requirements

* PowerShell v3+
* Windows 8+/Windows Server 2012+

It is both an Operating System version dependency **and** a PowerShell version dependency (although by default those operating systems will have the right version of PowerShell already available). The great news is if you have that, it becomes as simple as the following code.

### Step 1: Add Mount-DiskImage Code

In your chocolateyInstall.ps1, you will want something similar to the following:

~~~powershell
# Internal use:
# - Option 1: If the ISO is smaller than 1GB, embed the binary directly into the package for the most reliable use skip this
# - Option 2: Store ISO on a file share and skip this
# - Option 3: Download from internal sources, like a binary (raw) repository in Artifactory, Cloudsmith, Nexus, or ProGet.
# Community repo: Download the ISO file from the internet if you don't have distribution rights or the file is larger than 250MB.
Get-ChocolateyWebFile 'WindowsSDK2008' "$env:temp\winsdk2008.iso" 'http://download.microsoft.com/download/f/e/6/fe6eb291-e187-4b06-ad78-bb45d066c30f/6.0.6001.18000.367-KRMSDK_EN.iso'

# Next, mount the ISO file, ready for using it's contents
$iso = Get-Item "$env:temp\winsdk2008.iso"

Mount-DiskImage -ImagePath $iso

#Get the drive letter where iso is mounted
$driveLetter = (Get-DiskImage $iso | Get-Volume).DriveLetter

# Run commands against the mounted ISO, in this case, run the setup.exe
Install-ChocolateyInstallPackage 'WindowsSDK2008' 'exe' '/q' "${driveLetter}:\Setup.exe"

# Unmount the ISO file when finished
Dismount-DiskImage -ImagePath $iso

~~~

> :memo: **NOTE** Code sample was taken from this [package](https://chocolatey.org/packages/WindowsSDK2008/6.0.6001), thanks to [dave42](https://chocolatey.org/profiles/dave42) for sharing.