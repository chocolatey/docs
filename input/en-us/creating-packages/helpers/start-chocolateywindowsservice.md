---
Title: Start-ChocolateyWindowsService
Description: Information on Start-ChocolateyWindowsService function
RedirectFrom: docs/helpers-start-chocolatey-windows-service
ShowInNavbar: false
ShowInSidebar: false
---

# Start-ChocolateyWindowsService

**NOTE**: This function requires a Chocolatey for Business License to use.

Starts a Windows Service.

## Syntax

~~~powershell
Start-ChocolateyWindowsService `
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
The name of the service to start. Will throw an error if it doesn't exist.


Property               | Value
---------------------- | ---------------------
Aliases                |
Required?              | true
Position?              | 0
Default Value          |
Accept Pipeline Input? | true (ByPropertyName)




[Function Reference](./creating-packages/helpers/reference)

***NOTE:*** This documentation has been automatically generated from licensed code.
