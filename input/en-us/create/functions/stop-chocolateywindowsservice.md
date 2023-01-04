---
Order: 336
xref: stop-chocolateywindowsservice
Title: Stop-ChocolateyWindowsService
Description: Information on Stop-ChocolateyWindowsService function
RedirectFrom: docs/helpers-stop-chocolatey-windows-service
---

# Stop-ChocolateyWindowsService

> :choco-info: **NOTE**
> 
> This function requires a Chocolatey for Business License to use.

Stops a Windows Service.


## Syntax

~~~powershell
Stop-ChocolateyWindowsService `
  -Name <string> `
  [<CommonParameters>]
~~~



## Aliases

None

## Notes
Requires Chocolatey for Business.

## Inputs

None

## Outputs

None

## Parameters

###  -Name &lt;string&gt;
The name of the service to stop. Will not throw an error if it doesn't exist.


Property               | Value
---------------------- | ---------------------
Aliases                |
Required?              | true
Position?              | 0
Default Value          |
Accept Pipeline Input? | true (ByPropertyName)




[Function Reference](xref:powershell-reference)

> :choco-info: **NOTE**
> 
> This documentation has been automatically generated from licensed code.