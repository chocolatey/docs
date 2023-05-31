---
Order: 10
xref: format-filesize
Title: Format-FileSize
Description: Information on Format-FileSize function
RedirectFrom:
  - docs/helpers-format-file-size
  - docs/helpersformatfilesize
---

# Format-FileSize

<!-- This documentation is automatically generated from https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Format-FileSize.ps1 using https://github.com/chocolatey/choco/blob/master/GenerateDocs.ps1. Contributions are welcome at the original location(s). -->

DO NOT USE. Not part of the public API.

## Syntax

~~~powershell
Format-FileSize `
  -Size <Double> `
  [-IgnoredArguments <Object[]>] [<CommonParameters>]
~~~

## Description

Formats file size into a human readable format.

## Notes

This function is not part of the API.

## Aliases

None

## Examples

 **EXAMPLE 1**

~~~powershell
Format-FileSize -Size $fileSizeBytes

~~~ 

## Inputs

None

## Outputs


 * Returns a string representation of the file size in a more friendly
format based on the passed in bytes.


## Parameters

###  -Size &lt;Double&gt;
The size of a file in bytes.

Property               | Value
---------------------- | -----
Aliases                | 
Required?              | true
Position?              | 1
Default Value          | 0
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

 * [Get-WebFile](xref:get-webfile)


[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
>
> This documentation has been automatically generated from `Import-Module "$env:ChocolateyInstall\helpers\chocolateyInstaller.psm1" -Force; Get-Help Format-FileSize -Full`.

View the source for [Format-FileSize](https://github.com/chocolatey/choco/blob/master/src/chocolatey.resources/helpers/functions/Format-FileSize.ps1)
