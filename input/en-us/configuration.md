---
Order: 60
xref: configuration
Title: Configuration
Description: Information on the different configuration options for Chocolatey
RedirectFrom: docs/chocolatey-configuration
---

There are settings and features that can customize the way that Chocolatey works for you. The following is a list of config settings and features and their default values.

> :choco-info: **NOTE**
>
> When a Chocolatey configuration or feature is removed (for example, it becomes deprecated and no longer required), it will not be removed from the chocolatey.config file automatically when you upgrade Chocolatey.
> This is in order to preserve backwards compatibility, should the user decide to go back to a previous version of Chocolatey.

## Config Settings

Config settings are adjusted using `choco config set --name="'<nameFromBelow>'" --value="'<value>'"` and set back to default with `choco config unset --name="'<nameFromBelow>'"`. For more information see [`choco config` command](xref:choco-command-config) or run `choco config -?`.

### General

* `cacheLocation` = **' '** - Cache location if not TEMP folder. Replaces `$env:TEMP` value.  It is highly recommended this be set to make Chocolatey more deterministic in cleanup.
* `upgradeAllExceptions` = **' '** - A comma-separated list of package names that should not be upgraded when running `choco upgrade all'. Defaults to empty.
* `defaultTemplateName` = **' '** - Default template name used when running [`choco new` command](xref:choco-command-new).
* `defaultPushSource` = **' '** - Default source to push packages to when running [`choco push` command](xref:choco-command-push).

### Proxy

* `proxy` = **' '** - Explicit proxy location.
* `proxyUser` = **' '** - Optional proxy user.
* `proxyPassword` = **' '**  - Optional proxy password. Encrypted.
* `proxyBypassList` = **' '** - Optional proxy bypass list. Comma separated.
* `proxyBypassOnLocal` = **'true'** - Bypass proxy for local connections.

### Timeouts

* `commandExecutionTimeoutSeconds` = **'2700'** - Default timeout for command execution. '0' for infinite. It is recommended that organizations bump this up to at least 4 hours (14400).
* `webRequestTimeoutSeconds` = **'30'** - Default timeout for web requests.

### Other

* `containsLegacyPackageInstalls` = **'true'** - Install has packages installed prior to 0.9.9 series.

## Config Settings - Licensed Edition

### Chocolatey Central Management

* `centralManagementServiceUrl` = **' '** - The URL that should be used to communicate with Chocolatey Central Management. It should look something like `https://servicemachineFQDN:24020/ChocolateyManagementService`.  See <https://docs.chocolatey.org/en-us/features/chocolatey-central-management#fqdn-usage>.  Available in business editions.
* `centralManagementReportPackagesTimerIntervalInSeconds` = **'1800'** - Amount of time, in seconds, between each execution of the background service to report installed and outdated packages to Chocolatey Central Management.  Available in business editions.
* `centralManagementReceiveTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to receive information from Chocolatey Central Management.  Available in business editions.
* `centralManagementSendTimeoutInSeconds` = **'30'** - The amount of time, in seconds, that the background agent should wait to send information to Chocolatey Central Management.  Available in business editions only.
* `centralManagementCertificateValidationMode` = **'PeerOrChainTrust'** - The certificate mode that is used in communication to Chocolatey Central Management.  Available in business editions only.
* `centralManagementMaxReceiveMessageSizeInBytes` = **'2147483647'** - The size of the permitted message, in bytes, which can be exchanged between the Chocolatey Background Agent and Chocolatey Central Management. Available in business editions only.
* `centralManagementDeploymentCheckTimerIntervalInSeconds` = **'180'** - Amount of time, in seconds, between each execution of the Chocolatey Agent service to check for a new Deployment Step from Chocolatey Central Management. Available in business editions only.
* `centralManagementClientCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Client Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication from an agent TO an instance of Central Management Service (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions only.
* `centralManagementServiceCommunicationSaltAdditivePassword` = **' '** - Chocolatey Central Management Communication Salt Additive - The salt additive to use in the salt recipe for encrypting and verifying communication FROM an instance of Central Management Service to an agent (will need to be set the same on all clients contacting that service AND the instance of the management service itself). When not set a default encryption phrase set by the system will be used. When set the unencrypted value must match exactly with what is set in the configuration for Central Management Service and every client contacting that instance of Central Management Service. Value is not shared over the wire. Because this is a much more involved process, it is recommended only setting this if you are transmitting messages over the internet. Defaults to ''. Needs to be at least 8 characters long if set or it will throw errors and use the default. Available in business editions only.

### Intune

* `intuneTenantGUID` = **' '** - The tenant to use by default when no `--source` argument is used on the `push` command. The GUID is available on the [Azure AD Application page](https://aad.portal.azure.com/). Available in business editions only.
* `intuneAuthenticationUrl` = **'https://login.microsoftonline.com'** - The URL used when authenticating to the Microsoft Intune API. _Only change this if you know what you are doing_. Available in business editions only.
* `intuneApiUrl` = **'https://graph.microsoft.com'** - The URL used when handling requests to the Intune API, for instance, when checking for available packages on Intune.  _Only change this if you know what you are doing_. Available in business editions only.
* `intuneRetryIntervalInSeconds` = **'5'** - The amount of time, in seconds, that Chocolatey should wait before retrying any calls to the Intune API. Available in business editions only.
* `intuneUploadTimeoutInSeconds` = **'600'** - The amount of time, in seconds, that Chocolatey should wait for completion while uploading files to Intune. Available in business editions only..
* `intuneUploadChunkSizeInMegabytes` = **'10'** - The size of the file, in megabytes, below which Chocolatey will split the upload into multiple chunks. Above this size, Chocolatey will make a best effort to break the upload into logical chunk sizes. Available in business editions only.

### Package Throttle

* `maximumDownloadRateBitsPerSecond` = **' '** - The maximum download rate in bits per second. '0' or empty means no maximum. A number means that will be the maximum download rate in bps. Defaults to ''. Available in licensed editions only. See <https://docs.chocolatey.org/en-us/features/package-throttle>

### Windows Services Installation

* `serviceInstallsDefaultUserName` = **'ChocolateyLocalAdmin'** - The default user name to use for installing services when one is not specified. Defaults to 'ChocolateyLocalAdmin'. The feature 'useLocalSystemForServiceInstalls' must be set to 'false' to use this field. Available in business editions only.
* `serviceInstallsDefaultUserPassword` = **' '** - The default user password to use for installing services when one is not specified. Defaults to ''. When '', the value will be generated as encrypted hash specific to the machine and will not be known. The feature 'useLocalSystemForServiceInstalls' must be set to 'false' to use this field. Available in business editions only.

### Self-Service / Background Mode

* `backgroundServiceAllowedCommands` = **'install,upgrade'** - Background Service Allowed Commands - The different commands that will direct through the background service separated with comma or semi-colon. Supported across all operational commands, not supported with commands that change configuration (config, source, feature, apikey, etc). Defaults to 'install,upgrade'. Available in business editions only.
* `logRetentionPolicyInDays` = **'30'** - The maximum age in days before a rollover log file should be cleaned up. Invalid values or a value of '0' or below is equal to the default value of '30' days.

### Virus Checking

* `virusCheckMinimumPositives` = **'4'** - Minimum number of scan result positives before flagging a binary as a possible virus. Used when virusScannerType is VirusTotal. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>
* `virusScannerType` = **'VirusTotal'** - Virus Scanner Type (Generic or VirusTotal). Defaults to VirusTotal for Pro. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>
* `genericVirusScannerPath` = **' '** - The full path to the command line virus scanner executable. Used when virusScannerType is Generic. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>
* `genericVirusScannerArgs` = **'`[[File]]`'** - The arguments to pass to the generic virus scanner. Use `[[File]]` for the file path placeholder. Used when virusScannerType is Generic. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>
* `genericVirusScannerValidExitCodes` = **'0'** - The exit codes for the generic virus scanner when a file is not flagged. Separate with comma, defaults to 0. Used when virusScannerType is Generic. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>
* `genericVirusScannerTimeoutInSeconds` = **'120'** - Generic Virus Scanner Timeout In Seconds - The number of seconds to allow the virus scanner to run before timing out. Used when virusScannerType is Generic. Defaults to '120'. Licensed editions v2.1.0+ only. See <https://docs.chocolatey.org/en-us/features/virus-check>

## Features

Features are adjusted using `choco feature enable|disable --name="'<nameFromBelow>'"`. For more information see [`choco feature` command](xref:choco-command-feature) or run `choco feature -?`.

A checkbox means this feature is turned on by default.

### General

* [ ] `logWithoutColor` - Log without color - Do not show colorization in logging output.
* [ ] `logEnvironmentValues` - Log Environment Values - will log values of environment before and after install (could disclose sensitive data).
* [x] `showNonElevatedWarnings` - Show Non-Elevated Warnings - Display non-elevated warnings.
* [x] `showDownloadProgress` - Show Download Progress - Show download progress percentages in the CLI.
* [ ] `useRememberedArgumentsForUpgrades` - Use Remembered Arguments For Upgrades - when running upgrades, use arguments for upgrade that were used for installation ('remembered'). This is helpful when running upgrade for all packages. This is considered in preview.
* [ ] `logValidationResultsOnWarnings` - Log validation results on warnings - Should the validation results be logged if there are warnings?

### Automatic Uninstaller

* [x] `autoUninstaller` - Uninstall from programs and features without requiring an explicit uninstall script.
* [ ] `failOnAutoUninstaller` - Fail if automatic uninstaller fails.

### Exit Codes

* [x] `usePackageExitCodes` - Use Package Exit Codes - Package scripts can provide exit codes. With this on, package exit codes will be what choco uses for exit when non-zero (this value can come from a dependency package). Chocolatey defines valid exit codes as 0, 1605, 1614, 1641, 3010. With this feature off, choco will exit with 0, 1, or -1 (matching previous behavior).
* [ ] `useEnhancedExitCodes` - Use Enhanced Exit Codes - Chocolatey is able to provide enhanced exit codes surrounding list, search, info, outdated and other commands that don't deal directly with package operations. To see enhanced exit codes and their meanings, please run `choco [cmdname] -?`. With this feature off, choco will exit with 0, 1, or -1  (matching previous behavior). Default off.
* [ ] `exitOnRebootDetected` - Exit On Reboot Detected - Stop running install, upgrade, or uninstall when a reboot request is detected. Requires 'usePackageExitCodes' feature to be turned on. Will exit with either 350 or 1604. When it exits with 350, it means pending reboot discovered prior to running operation. When it exits with 1604, it means some work completed prior to reboot request being detected.

### Flow Control

* [x] `ignoreInvalidOptionsSwitches` - Ignore Invalid Options/Switches - If a switch or option is passed that is not recognized, should choco fail?
* [ ] `failOnStandardError` - Fail if install provider writes to stderr. Not recommended for use.
* [ ] `stopOnFirstPackageFailure` - Stop On First Package Failure - stop running install, upgrade or uninstall on first package failure instead of continuing with others. As this will affect upgrade all, it is normally recommended to leave this off.
* [ ] `skipPackageUpgradesWhenNotInstalled` - Skip Packages Not Installed During Upgrade - if a package is not installed, do not install it during the upgrade process.
* [ ] `ignoreUnfoundPackagesOnUpgradeOutdated` - Ignore Unfound Packages On Upgrade Outdated - When checking outdated or upgrades, if a package is not found against sources specified, don't report the package at all.
* [x] `usePackageRepositoryOptimizations` - Turn on optimizations for reducing bandwidth with repository queries during package install/upgrade/outdated operations. Should generally be left enabled, unless a repository needs to support older methods of query. When disabled, this makes queries similar to the way they were done in Chocolatey v0.10.11 and before.

### Security

* [ ] `useFipsCompliantChecksums` - Use FIPS Compliant Checksums - Ensure checksumming done by choco uses FIPS compliant algorithms. Not recommended unless required by FIPS Mode. Enabling on an existing installation could have unintended consequences related to upgrades/uninstalls.
* [x] `checksumFiles` - Checksum files when pulled in from internet (based on package).
* [ ] `allowEmptyChecksums` - Allow packages to have empty/missing checksums for downloaded resources from non-secure locations (HTTP, FTP). Enabling is not recommended if using sources that download resources from the internet.
* [x] `allowEmptyChecksumsSecure` - Allow packages to have empty/missing checksums for downloaded resources from secure locations (HTTPS).
* [ ] `allowGlobalConfirmation` - Prompt for confirmation in scripts or bypass.

### Other

* [x] `powershellHost` - Use Chocolatey's built-in PowerShell host.
* [ ] `removePackageInformationOnUninstall` - Remove Stored Package Information On Uninstall - When a package is uninstalled, should the stored package information also be removed?
* [ ] `disableCompatibilityChecks` - Disable Compatibility Checks - Should a warning we shown, before and after command execution, when a runtime compatibility check determines that there is an incompatibility between Chocolatey and Chocolatey Licensed Extension. Available in 1.1.0+.

## Features - Licensed Edition

### General

* [x] `downloadCache` - Download Cache - use the private download cache if available for a package. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/private-cdn>
* [ ] `failOnInvalidOrMissingLicense` - Fail On Invalid Or Missing License - allows knowing when a license is expired or not applied to a machine.
* [x] `warnOnUpcomingLicenseExpiration` - Warn On Upcoming License Expiration - When a license expiration date is upcoming, should Chocolatey provide a warning? MSP and Business editions only. Setting ignored in trial editions.
* [ ] `excludeChocolateyPackagesDuringUpgradeAll` - Exclude Chocolatey Packages During Upgrade All - When enabled, all official Chocolatey packages will be added to the comma-separated list of package names that should not be upgraded when upgrading 'all'. Any packages specified in the 'upgradeAllExceptions' configuration setting will still be respected. Licensed editions only (version 4.1.0+).

### Access Control / Security

* [ ] `adminOnlyExecutionForAllChocolateyCommands` - Limit to Administrator Execution Only for All Chocolatey Commands - If enabled, only administrators will be able to run 'choco' commands. Business editions only.
* [ ] `adminOnlyExecutionForNewCommand` - Limit to Administrator Execution Only for New Command - If enabled, only administrators will be able to run 'choco new'. Business editions only.
* [ ] `adminOnlyExecutionForDownloadCommand` - Limit to Administrator Execution Only for Download Command - If enabled, only administrators will be able to run 'choco download'. Business editions only.
* [x] `useLocalSystemForServiceInstalls` - Use LocalSystem For Service Installs - When installing services that don't indicate a user/password, use the LocalSystem for those installations. When turned off, Chocolatey will manage a local admin with a password unique to the machine but will never know it. Business editions only.

### Chocolatey Central Management

* [ ] `useChocolateyCentralManagement` - Use Chocolatey Central Management - Lists of installed and outdated packages will be reported to the chosen Chocolatey Central Management server.  Business editions only. See <https://docs.chocolatey.org/en-us/features/chocolatey-central-management>
* [ ] `useChocolateyCentralManagementDeployments` - Use Chocolatey Central Management Deployments - Centrally managed deployments of packages and scripts can be sent from Chocolatey Central Management.  Business editions only (version 2.1.0+).  See <https://docs.chocolatey.org/en-us/features/chocolatey-central-management>

### Package Internalizer

* [x] `internalizeAppendUseOriginalLocation` - Append UseOriginalLocation with Package Internalizer - When `Install-ChocolateyPackage` is internalized, append the `-UseOriginalLocation` parameter to the function. Business editions and MSP editions only. See <https://docs.chocolatey.org/en-us/guides/create/recompile-packages>

### Package Reducer

* [x] `reduceInstalledPackageSpaceUsage` - Reduce Installed Package Size (Package Reducer) - Reduce size of the nupkg file to very small and remove extracted archives and installers. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/package-reducer>
* [ ] `reduceOnlyNupkgSize` - Reduce Only Nupkg File Size - reduce only the size of nupkg file when using Package Reducer. Licensed editions only. Also requires 'reduceInstalledPackageSpaceUsage' to be enabled. See <https://docs.chocolatey.org/en-us/features/package-reducer>

### Package Synchronization

* [x] `allowSynchronization` - Synchronization - Keep installed Chocolatey packages in sync with changes in Programs and Features. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/package-synchronization>
* [ ] `showAllPackagesInProgramsAndFeatures` - Package Synchronizer's Packages In Programs And Features Synchronization - Show all packages in Programs and Features, not just packages that use a native installer. Business editions only.

### Self-Service / Background Mode

* [x] `useBackgroundService` - Use Background Service (Self-Service Installer) - For some commands like install and upgrade, use a background service instead of running the command directly. Business editions only. Requires the package chocolatey-agent (choco install chocolatey-agent). See <https://docs.chocolatey.org/en-us/features/self-service-anywhere>
* [x] `useBackgroundServiceWithSelfServiceSourcesOnly` - Use Background Service With Self-Service Sources Only - When using Self-Service, opt-in only sources configured to be used with self-service. This allows for other sources only an admin can use. Business editions only.
* [x] `useBackgroundServiceWithNonAdministratorsOnly` - Use Background Service With Non-Administrators Only - When using Self-Service, only execute background mode for non-administrators. Business editions only.
* [ ] `useBackgroundServiceInteractively` - Use Background Service Interactively (BROKEN CURRENTLY - DO NOT USE) - When using Self-Service and installing software that cannot be completely silent, installs will need to be executed against the current desktop environment. Set this flag on for the most compatibility. To use this feature, you must be using the local 'ChocolateyLocalAdmin' account. Business editions only.
* [x] `useBackgroundServiceWithEmptySessions` - Use Background Service With Empty Sessions - Sometimes empty sessions mean remotely run sessions, but in in newer Windows it is much more normal to see empty sessions with interactive use. Leave this flag on unless you absolutely need it off (control how remote sessions use background service by enabling the feature 'useBackgroundServiceWithNonAdministratorsOnly'). Business editions only.
* [ ] `allowBackgroundServiceUninstallsFromUserInstallsOnly` - Allow ONLY Uninstall of Packages Installed By a Self-service User in Background Service - Allow a user to uninstall packages they've installed - they must be reported as the original user in a choco list -lo --audit. The config setting 'backgroundServiceAllowedCommands' must must have 'uninstall' added as well for this to work. Business editions only.
* [ ] `allowBackgroundServiceOverride` - Allows a user to request using the self-service when they are running the commands that can be run through the background service. Licensed editions only (version 5.0.0+).
* [x] `useLogRetentionPolicy` - Use Automatic Log Retention Policy - Cleans any rolled over log files once a day that are older than the configured retention policy day value. Licensed editions only (version 5.0.0+).

### Virus Checking

* [x] `virusCheck` - Virus Check - perform virus checking on downloaded files. Licensed editions only. See <https://docs.chocolatey.org/en-us/features/virus-check>

### Other

* [x] `allowPreviewFeatures` - Allow Preview Features - Turns on Preview Features. Some features become available for preview before they are released for testing purposes. Please note these should not be used for production systems as they could mess up a system.  Licensed editions only.
