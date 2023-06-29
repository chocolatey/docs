---
Order: 50
xref: get-chocolateyunzip
Title: Get-ChocolateyUnzip
Description: Information on Get-ChocolateyUnzip function
RedirectFrom:
  - docs/helpers-get-chocolatey-unzip
  - docs/helpersgetchocolateyunzip
---

# Get-ChocolateyUnzip

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-ChocolateyUnzip.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

Unzips an archive file and returns the location for further processing.

## Syntax

~~~powershell
Get-ChocolateyUnzip `
  [-FileFullPath <String>] `
  -Destination <String> `
  [-SpecificFolder <String>] `
  [-PackageName <String>] `
  [-FileFullPath64 <String>] `
  [-DisableLogging] `
  [-IgnoredArguments <Object[]>] [<CommonParameters>]
~~~

## Description

This unzips files using the 7-zip command line tool 7z.exe.
Supported archive formats are listed at:
https://sevenzip.osdn.jp/chm/general/formats.htm

## Notes

If extraction fails, an exception is thrown.

If you are embedding files into a package, ensure that you have the
rights to redistribute those files if you are sharing this package
publicly (like on the [community feed](https://community.chocolatey.org/packages)). Otherwise, please use
Install-ChocolateyZipPackage to download those resources from their
official distribution points.

Will automatically call Set-PowerShellExitCode to set the package exit code
based on 7-zip's exit code.

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell

# Path to the folder where the script is executing
$toolsDir = (Split-Path -parent $MyInvocation.MyCommand.Definition)
Get-ChocolateyUnzip -FileFullPath "c:\someFile.zip" -Destination $toolsDir
~~~ 

## Inputs

None

## Outputs


 * Returns the passed in $destination.


## Parameters

###  -FileFullPath [&lt;String&gt;]
This is the full path to the zip file. If embedding it in the package
next to the install script, the path will be like
`"$(Split-Path -Parent $MyInvocation.MyCommand.Definition)\\file.zip"`

`File` is an alias for FileFullPath.

This can be a 32-bit or 64-bit file. This is mandatory in earlier versions
of Chocolatey, but optional if FileFullPath64 has been provided.

Property               | Value
---------------------- | -----
Aliases                | file
Required?              | false
Position?              | 1
Default Value          | 
Accept Pipeline Input? | false
 
###  -Destination &lt;String&gt;
This is a directory where you would like the unzipped files to end up.
If it does not exist, it will be created.

Property               | Value
---------------------- | -------------
Aliases                | unzipLocation
Required?              | true
Position?              | 2
Default Value          | 
Accept Pipeline Input? | false
 
###  -SpecificFolder [&lt;String&gt;]
OPTIONAL - This is a specific directory within zip file to extract. The
folder and its contents will be extracted to the destination.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 3
Default Value          | 
Accept Pipeline Input? | false
 
###  -PackageName [&lt;String&gt;]
OPTIONAL - This will facilitate logging unzip activity for subsequent
uninstalls

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | 4
Default Value          | 
Accept Pipeline Input? | false
 
###  -FileFullPath64 [&lt;String&gt;]
Full file path to a 64-bit native installer to run.
If embedding in the package, you can get it to the path with
`"$(Split-Path -parent $MyInvocation.MyCommand.Definition)\\INSTALLER_FILE"`

Provide this when you want to provide both 32-bit and 64-bit
installers or explicitly only a 64-bit installer (which will cause a package
install failure on 32-bit systems).

Property               | Value
---------------------- | ------
Aliases                | file64
Required?              | false
Position?              | named
Default Value          | 
Accept Pipeline Input? | false
 
###  -DisableLogging
OPTIONAL - This disables logging of the extracted items. It speeds up
extraction of archives with many files. 

Usage of this parameter will prevent Uninstall-ChocolateyZipPackage
from working, extracted files will have to be cleaned up with
Remove-Item or a similar command instead.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | named
Default Value          | False
Accept Pipeline Input? | false
 
###  -IgnoredArguments [&lt;Object[]&gt;]
Allows splatting with arguments that do not apply. Do not use directly.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | false
Position?              | named
Default Value          | 
Accept Pipeline Input? | false
 
### &lt;CommonParameters&gt;

This cmdlet supports the common parameters: -Verbose, -Debug, -ErrorAction, -ErrorVariable, -OutBuffer, and -OutVariable. For more information, see `about_CommonParameters` http://go.microsoft.com/fwlink/p/?LinkID=113216 .


## Links

 * [Install-ChocolateyZipPackage](xref:install-chocolateyzippackage)


[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Get-ChocolateyUnzip -Full`.

View the source for [Get-ChocolateyUnzip](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Get-ChocolateyUnzip.ps1)
