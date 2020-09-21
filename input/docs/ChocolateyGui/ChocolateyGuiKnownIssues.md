# Chocolatey GUI Known Issues

<!-- TOC -->

- [Unable to use Chocolatey GUI extension with Chocolatey GUI v0.17.1](#unable-to-use-chocolatey-gui-extension-with-chocolatey-gui-v0171)
  - [Chocolatey GUI asking for credentials for my non-administrator accounts](#chocolatey-gui-asking-for-credentials-for-my-non-administrator-accounts)

<!-- /TOC -->

## Unable to use Chocolatey GUI extension with Chocolatey GUI v0.17.1

Some business customers have reported an issue when attempting to use version `0.1.0-alpha-20200402` of the Chocolatey GUI extension (a pre-release version of the extension) in combination with Chocolatey GUI v0.17.1.

This issue was tracked in this [GitHub issue](https://github.com/chocolatey/ChocolateyGUI/issues/785) and a fix was released in Chocolatey GUI v0.17.2.

If you are running into any issues with using the Chocolatey GUI extension alongside Chocolatey GUI, please ensure that you are using at least Chocolatey GUI v0.17.2 and also using the latest pre-release version of Chocolatey GUI extension which is currently `0.1.0-GL-4-20200713`.


### Chocolatey GUI asking for credentials for my non-administrator accounts
If a user is a member of the Built-in AD group `Network Configuration Operators`, then that means they have an elevation token available and will be treated in the same way as administrative accounts. To fix this, you have two options:

* Remove the users from `Network Configuration Operators` - PowerShell offers an alternative to `ipconfig /flushdns` that does not require admin permissions - `Clear-DnsClientCache`.
* OR change the ChocolateyGui.exe.manifest file in v0.17.0+ in the Chocolatey GUI folder under Program Files to `<requestedExecutionLevel level="asInvoker" uiAccess="false" />` (from `highestAvailable`).

Please see for more details: https://github.com/chocolatey/ChocolateyGUI/issues/629
