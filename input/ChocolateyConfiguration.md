# Chocolatey Configuration

There are settings and features that can customize the way that Chocolatey works for you. The following is a list of config settings and features and their default values.

<!-- TOC -->

- [Config Settings](#config-settings)
  - [General](#general)
  - [Proxy](#proxy)
  - [Timeouts](#timeouts)
  - [Other](#other)
- [Config Settings - Licensed Edition](#config-settings---licensed-edition)
  - [Chocolatey Central Management](#chocolatey-central-management)
  - [Package Throttle](#package-throttle)
  - [Windows Services Installation](#windows-services-installation)
  - [Self-Service / Background Mode](#self-service--background-mode)
  - [Virus Checking](#virus-checking)
  - [Timeouts](#timeouts-1)
- [Features](#features)
  - [General](#general-1)
  - [Automatic Uninstaller](#automatic-uninstaller)
  - [Exit Codes](#exit-codes)
  - [Flow Control](#flow-control)
  - [Security](#security)
  - [Other](#other-1)
- [Features - Licensed Edition](#features---licensed-edition)
  - [General](#general-2)
  - [Access Control / Security](#access-control--security)
  - [Chocolatey Central Management](#chocolatey-central-management-1)
  - [Package Internalizer](#package-internalizer)
  - [Package Reducer](#package-reducer)
  - [Package Synchronization](#package-synchronization)
  - [Self-Service / Background Mode](#self-service--background-mode-1)
  - [Virus Checking](#virus-checking-1)
  - [Other](#other-2)

<!-- /TOC -->


## Config Settings

Config settings are adjusted using `choco config set --name="'<nameFromBelow>'" --value="'<value>'"` and set back to default with `choco config unset --name="'<nameFromBelow>'"`. For more information see [[`choco config` command|CommandsConfig]] or run `choco config -?`.

### General
* `cacheLocation` = **' '** - Cache location if not TEMP folder. Replaces `$env:TEMP` value.  It is highly recommended this be set to make Chocolatey more deterministic in cleanup.

### Proxy
* `proxy` = **' '** - Explicit proxy location. Available in 0.9.9.9+.
* `proxyUser` = **' '** - Optional proxy user. Available in 0.9.9.9+.
* `proxyPassword` = **' '**  - Optional proxy password. Encrypted. Available in 0.9.9.9+.
* `proxyBypassList` = **' '** - Optional proxy bypass list. Comma separated. Available in 0.10.4+.
* `proxyBypassOnLocal` = **'true '** - Bypass proxy for local connections. Available in 0.10.4+.

### Timeouts
* `commandExecutionTimeoutSeconds` = **'2700'** - Default timeout for command execution. '0' for infinite (starting in 0.10.4). It is recommended that organizations bump this up to at least 4 hours (14400).
* `webRequestTimeoutSeconds` = **'45'** - Default timeout for web requests. Available in 0.9.10+.


### Other
* `containsLegacyPackageInstalls` = **'true'** - Install has packages installed prior to 0.9.9 series.

## Config Settings - Licensed Edition
### Chocolatey Central Management
* `centralManagementServiceUrl` = **' '** - The URL that should be used to communicate with Chocolatey Central Management. It should look something like https://servicemachineFQDN:24020/ChocolateyManagementService.  See https://chocolatey.org/docs/features-chocolatey-central-management#fqdn-usage.  Available in business editions v2.0.0+ only.
* `centralManagementReportPackagesTimerIntervalInSeconds` = **'1800'** - Amount of time, in seconds, between each execution of the background service to report installed and outdated packages to Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `centralManagementReceiveTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to receive information from Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `centralManagementSendTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to send information to Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `centralManagementCertificateValidationMode` = **'PeerOrChainTrust'** - The certificate mode that is used in communication to Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `centralManagementMaxReceiveMessageSizeInBytes` = **'2147483647'** - The size of the permitted message, in bytes, which can be exchanged between the Chocolatey Background Agent and Chocolatey Central Management. Available in business editions v2.0.3+ only.
* `centralManagementDeploymentCheckTimerIntervalInSeconds` = **'180'** - Amount of time, in seconds, between each execution of the background service to check for a new deployment step from Chocolatey Central Management. Available in business editions v2.1.0+ only.
* `centralManagementClientCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Client Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication from an agent TO an instance of Central Management Service (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions v2.1.0+ only. Requires Chocolatey Agent v0.10.0+ and Central Management 0.2.0+. IMPORTANT: If this value is set, agents less than v0.10.0 will be unable to contact Central Management to report in.
* `centralManagementServiceCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication FROM an instance of Central Management Service to an agent (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions v2.1.0+ only. Requires Chocolatey Agent v0.10.0+ and Central Management 0.2.0+.


### Package Throttle
* `maximumDownloadRateBitsPerSecond` = **' '** - The maximum download rate in bits per second. '0' or empty means no maximum. A number means that will be the maximum download rate in bps. Defaults to ''. Available in licensed editions v1.10+ only. See https://chocolatey.org/docs/features-package-throttle


### Windows Services Installation
* `serviceInstallsDefaultUserName` = **'ChocolateyLocalAdmin'** - The default user name to use for installing services when one is not specified. Defaults to 'ChocolateyLocalAdmin'. The feature 'useLocalSystemForServiceInstalls' must be set to 'false' to use this field. Available in business editions v1.12.0+ only.
* `serviceInstallsDefaultUserPassword` = **' '** - The default user password to use for installing services when one is not specified. Defaults to ''. When '', the value will be generated as encrypted hash specific to the machine and will not be known. The feature 'useLocalSystemForServiceInstalls' must be set to 'false' to use this field. Available in business editions v1.12.0+ only.


### Self-Service / Background Mode
* `backgroundServiceAllowedCommands` = **'install,upgrade'** - Background Service Allowed Commands - The different commands that will direct through the background service separated with comma or semi-colon. Supported across all operational commands, not supported with commands that change configuration (config, source, feature, apikey, etc). Defaults to 'install,upgrade'. Available in business editions v1.12.4+ only.

### Virus Checking
* `virusCheckMinimumPositives` = **'4'** - Minimum number of scan result positives before flagging a binary as a possible virus. Used when virusScannerType is VirusTotal. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check
* `virusScannerType` = **'VirusTotal'** - Virus Scanner Type (Generic or VirusTotal). Defaults to VirusTotal for Pro. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check
* `genericVirusScannerPath` = **' '** - The full path to the command line virus scanner executable. Used when virusScannerType is Generic. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check
* `genericVirusScannerArgs` = **'`[[File]]`'** - The arguments to pass to the generic virus scanner. Use `[[File]]` for the file path placeholder. Used when virusScannerType is Generic. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check
* `genericVirusScannerValidExitCodes` = **'0'** - The exit codes for the generic virus scanner when a file is not flagged. Separate with comma, defaults to 0. Used when virusScannerType is Generic. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check
* `genericVirusScannerTimeoutInSeconds` = **'120'** - Generic Virus Scanner Timeout In Seconds - The number of seconds to allow the virus scanner to run before timing out. Used when virusScannerType is Generic. Defaults to '120'. Licensed editions v2.1.0+ only. See https://chocolatey.org/docs/features-virus-check


### Timeouts
* `centralManagementReceiveTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to receive information from Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `centralManagementSendTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to send information to Chocolatey Central Management.  Available in business editions v2.0.0+ only.
* `genericVirusScannerTimeoutInSeconds` = **'120'** - Generic Virus Scanner Timeout In Seconds - The number of seconds to allow the virus scanner to run before timing out. Used when virusScannerType is Generic. Defaults to '120'. Licensed editions v2.1.0+ only. See https://chocolatey.org/docs/features-virus-check


## Features

Features are adjusted using `choco feature enable|disable --name="'<nameFromBelow>'"`. For more information see [[`choco feature` command|CommandsFeature]] or run `choco feature -?`.

A checkbox means this feature is turned on by default.

### General
* [ ] `logWithoutColor` - Log without color - Do not show colorization in logging output. Available in 0.10.9+.
* [ ] `logEnvironmentValues` - Log Environment Values - will log values of environment before and after install (could disclose sensitive data). Available in 0.9.10+.
* [x] `showNonElevatedWarnings` - Show Non-Elevated Warnings - Display non-elevated warnings. Available in 0.10.4+.
* [x] `showDownloadProgress` - Show Download Progress - Show download progress percentages in the CLI. Available in 0.10.4+.
* [ ] `useRememberedArgumentsForUpgrades` - Use Remembered Arguments For Upgrades - when running upgrades, use arguments for upgrade that were used for installation ('remembered'). This is helpful when running upgrade for all packages. Available in 0.10.4+. This is considered in preview for 0.10.4 and will be flipped to on by default in a future release.
* [ ] `logValidationResultsOnWarnings` - Log validation results on warnings - Should the validation results be logged if there are warnings? Available in 0.10.12+.

### Automatic Uninstaller
* [x] `autoUninstaller` - Uninstall from programs and features without requiring an explicit uninstall script.
* [ ] `failOnAutoUninstaller` - Fail if automatic uninstaller fails.

### Exit Codes
* [x] `usePackageExitCodes` - Use Package Exit Codes - Package scripts can provide exit codes. With this on, package exit codes will be what choco uses for exit when non-zero (this value can come from a dependency package). Chocolatey defines valid exit codes as 0, 1605, 1614, 1641, 3010. With this feature off, choco will exit with 0, 1, or -1 (matching previous behavior). Available in 0.9.10+.
* [ ] `useEnhancedExitCodes` - Use Enhanced Exit Codes - Chocolatey is able to provide enhanced exit codes surrounding list, search, info, outdated and other commands that don't deal directly with package operations. To see enhanced exit codes and their meanings, please run `choco [cmdname] -?`. With this feature off, choco will exit with 0, 1, or -1  (matching previous behavior). Available in 0.10.12+. Default off in 0.10.14+.
* [ ] `exitOnRebootDetected` - Exit On Reboot Detected - Stop running install, upgrade, or uninstall when a reboot request is detected. Requires 'usePackageExitCodes' feature to be turned on. Will exit with either 350 or 1604. When it exits with 350, it means pending reboot discovered prior to running operation. When it exits with 1604, it means some work completed prior to reboot request being detected. Available in 0.10.12+.

### Flow Control
* [ ] `failOnInvalidOrMissingLicense` - Fail On Invalid Or Missing License - allows knowing when a license is expired or not applied to a machine. Available in 0.9.10+.
* [x] `ignoreInvalidOptionsSwitches` - Ignore Invalid Options/Switches - If a switch or option is passed that is not recognized, should choco fail? Available in 0.9.10+.
* [ ] `failOnStandardError` - Fail if install provider writes to stderr. Not recommended for use. Available in 0.9.10+.
* [ ] `failOnAutoUninstaller` - Fail if automatic uninstaller fails.
* [ ] `stopOnFirstPackageFailure` - Stop On First Package Failure - stop running install, upgrade or uninstall on first package failure instead of continuing with others. As this will affect upgrade all, it is normally recommended to leave this off. Available in 0.10.4+.
* [ ] `skipPackageUpgradesWhenNotInstalled` - Skip Packages Not Installed During Upgrade - if a package is not installed, do not install it during the upgrade process. Available in 0.10.12+.
* [ ] `ignoreUnfoundPackagesOnUpgradeOutdated` - Ignore Unfound Packages On Upgrade Outdated - When checking outdated or upgrades, if a package is not found against sources specified, don't report the package at all. Available in 0.10.9+.

### Security
* [ ] `useFipsCompliantChecksums` - Use FIPS Compliant Checksums - Ensure checksumming done by choco uses FIPS compliant algorithms. Not recommended unless required by FIPS Mode. Enabling on an existing installation could have unintended consequences related to upgrades/uninstalls. Available in 0.9.10+.
* [x] `checksumFiles` - Checksum files when pulled in from internet (based on package).
* [ ] `allowEmptyChecksums` - Allow packages to have empty/missing checksums for downloaded resources from non-secure locations (HTTP, FTP). Enabling is not recommended if using sources that download resources from the internet. Available in 0.10.0+.
* [x] `allowEmptyChecksumsSecure` - Allow packages to have empty/missing checksums for downloaded resources from secure locations (HTTPS). Available in 0.10.0+.
* [ ] `allowGlobalConfirmation` - Prompt for confirmation in scripts or bypass.

### Other
* [x] `powershellHost` - Use Chocolatey's built-in PowerShell host. Available in 0.9.10+.
* [ ] `scriptsCheckLastExitCode` - Scripts Check $LastExitCode (external commands) - Leave this off unless you absolutely need it while you fix your package scripts  to use `throw 'error message'` or `Set-PowerShellExitCode #` instead of `exit #`. This behavior started in 0.9.10 and produced hard to find bugs. If the last external process exits successfully but with an exit code of not zero, this could cause hard to detect package failures. Available in 0.10.3+. Will be removed in 0.11.0.
* [ ] `removePackageInformationOnUninstall` - Remove Stored Package Information On Uninstall - When a package is uninstalled, should the stored package information also be removed?  Available in 0.10.9+.

## Features - Licensed Edition
### General
* [x] `downloadCache` - Download Cache - use the private download cache if available for a package. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-private-cdn
* [ ] `failOnInvalidOrMissingLicense` - Fail On Invalid Or Missing License - allows knowing when a license is expired or not applied to a machine. Available in 0.9.10+.
* [x] `warnOnUpcomingLicenseExpiration` - Warn On Upcoming License Expiration - When a license expiration date is upcoming, should Chocolatey provide a warning? MSP and Business editions only (version 1.12.12+). Setting ignored in trial editions.

### Access Control / Security
* [ ] `adminOnlyExecutionForAllChocolateyCommands` - Limit to Administrator Execution Only for All Chocolatey Commands - If enabled, only administrators will be able to run 'choco' commands. Business editions only (version 1.12.2+).
* [ ] `adminOnlyExecutionForNewCommand` - Limit to Administrator Execution Only for New Command - If enabled, only administrators will be able to run 'choco new'. Business editions only (version 1.10.0+).
* [ ] `adminOnlyExecutionForDownloadCommand` - Limit to Administrator Execution Only for Download Command - If enabled, only administrators will be able to run 'choco download'. Business editions only (version 1.10.0+).
* [ ] `useBackgroundServiceWithNonAdministratorsOnly` - Use Background Service With Non-Administrators Only - When using Self-Service, only execute background mode for non-administrators. Business editions only (version 1.12.0+).
* [x] `useLocalSystemForServiceInstalls` - Use LocalSystem For Service Installs - When installing services that don't indicate a user/password, use the LocalSystem for those installations. When turned off, Chocolatey will manage a local admin with a password unique to the machine but will never know it. Business editions only (version 1.12.0+).

### Chocolatey Central Management
* [ ] `useChocolateyCentralManagement` - Use Chocolatey Central Management - Lists of installed and outdated packages will be reported to the chosen Chocolatey Central Management server.  Business editions only (version 2.0.0+). See https://chocolatey.org/docs/features-chocolatey-central-management
* [ ] `useChocolateyCentralManagementDeployments` - Use Chocolatey Central Management Deployments - Centrally managed deployments of packages and scripts can be sent from Chocolatey Central Management.  Business editions only (version 2.1.0+).  See https://chocolatey.org/docs/features-chocolatey-central-management



### Package Internalizer
* [x] `internalizeAppendUseOriginalLocation` - Append UseOriginalLocation with Package Internalizer - When `Install-ChocolateyPackage` is internalized, append the `-UseOriginalLocation` parameter to the function. Business editions (version 1.7.0+) and MSP editions (version 1.12.1+) only. Requires at least Chocolatey v0.10.1 for `Install-ChocolateyPackage` to recognize the switch appropriately. See https://chocolatey.org/docs/features-automatically-recompile-packages

### Package Reducer
* [x] `reduceInstalledPackageSpaceUsage` - Reduce Installed Package Size (Package Reducer) - Reduce size of the nupkg file to very small and remove extracted archives and installers. Licensed editions only (version 1.12.0+). See https://chocolatey.org/docs/features-package-reducer
* [ ] `reduceOnlyNupkgSize` - Reduce Only Nupkg File Size - reduce only the size of nupkg file when using Package Reducer. Licensed editions only (version 1.12.0+). Also requires 'reduceInstalledPackageSpaceUsage' to be enabled. See https://chocolatey.org/docs/features-package-reducer

### Package Synchronization
* [x] `allowSynchronization` - Synchronization - Keep installed Chocolatey packages in sync with changes in Programs and Features. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-synchronize
* [ ] `showAllPackagesInProgramsAndFeatures` - Package Synchronizer's Packages In Programs And Features Synchronization - Show all packages in Programs and Features, not just packages that use a native installer. Business editions only (version 1.10.0+).

### Self-Service / Background Mode
* [x] `useBackgroundService` - Use Background Service (Self-Service Installer) - For some commands like install and upgrade, use a background service instead of running the command directly. Business editions only (licensed version 1.8.4+). Uninstall requires Chocolatey v0.10.4. Requires the package chocolatey-agent (choco install chocolatey-agent). See https://chocolatey.org/docs/features-agent-service
* [x] `useBackgroundServiceWithSelfServiceSourcesOnly` - Use Background Service With Self-Service Sources Only - When using Self-Service, opt-in only sources configured to be used with self-service. This allows for other sources only an admin can use. Business editions only (version 1.10+). Requires Chocolatey 0.10.4+ for enabling sources with self-service only.
* [x] `useBackgroundServiceWithNonAdministratorsOnly` - Use Background Service With Non-Administrators Only - When using Self-Service, only execute background mode for non-administrators. Business editions only (version 1.12.0+).
* [ ] `useBackgroundServiceInteractively` - Use Background Service Interactively (BROKEN CURRENTLY - DO NOT USE) - When using Self-Service and installing software that cannot be completely silent, installs will need to be executed against the current desktop environment. Set this flag on for the most compatibility. To use this feature, you must be using the local 'ChocolateyLocalAdmin' account. Business editions only (version 1.12.10+).
* [x] `useBackgroundServiceWithEmptySessions` - Use Background Service With Empty Sessions - Sometimes empty sessions mean remotely run sessions, but in in newer Windows it is much more normal to see empty sessions with interactive use. Leave this flag on unless you absolutely need it off (control how remote sessions use background service by enabling the feature 'useBackgroundServiceWithNonAdministratorsOnly'). Business editions only (version 1.12.11+).
* [ ] `allowBackgroundServiceUninstallsFromUserInstallsOnly` - Allow ONLY Uninstall of Packages Installed By a Self-service User in Background Service - Allow a user to uninstall packages they've installed - they must be reported as the original user in a choco list -lo --audit. The config setting 'backgroundServiceAllowedCommands' must must have 'uninstall' added as well for this to work. Business editions only (version 2.0+).

### Virus Checking
* [x] `virusCheck` - Virus Check - perform virus checking on downloaded files. Available in 0.9.10+. Licensed editions only. See https://chocolatey.org/docs/features-virus-check

### Other
* [x] `allowPreviewFeatures` - Allow Preview Features - Turns on Preview Features. Some features become available for preview before they are released for testing purposes. Please note these should not be used for production systems as they could mess up a system.  Licensed editions only (version 1.9.0+).
