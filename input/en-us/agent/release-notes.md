---
Order: 10
xref: agent-release-notes
Title: Release Notes
Description: Release Notes for Chocolatey Agent
RedirectFrom: docs/release-notes-agent
---

# Chocolatey Release Notes - Chocolatey Agent Service

## Summary

This covers the release notes for the Chocolatey Agent Service (`chocolatey-agent`) package, which covers Self-Service and Central Management client functionality. For more information, installation options, etc, please refer to [Chocolatey Agent Service](xref:setup-agent).

> :memo: **NOTE**
>
> This package is available to Chocolatey for Business (C4B) customers only.

## Other Release Notes

- Refer to [Open Source Release Notes](xref:floss-release-notes) as commercial editions build on top of open source.
- Chocolatey for Business (C4B) customers - also refer to [Chocolatey Licensed Extension Release Notes](xref:licensed-extension-release-notes) and [Chocolatey Central Management Release Notes](xref:ccm-release-notes).

## Known Issues

- Please see https://github.com/chocolatey/chocolatey-licensed-issues/labels/AgentService
- Some issues may be held internally, please follow your support routes to learn more.

## 1.0.0 (March 21, 2022)

> :warning: **WARNING**
>
> The dependencies of the chocolatey-agent package have changed in this release. It now requires Chocolatey Licensed Extension v4.0.0.

### Breaking Change

- Update Chocolatey Licensed Extension dependency to v4.0.0

## 0.13.0 (February 28, 2022)

> :warning: **WARNING**
>
> The dependencies of the chocolatey-agent package have changed in this release, and it now requires Chocolatey Licensed Extension v3.2.0+.

### Breaking Changes

- Chocolatey Central Management - Enhanced communication method for reporting information in Chocolatey Central Management.
  - **NOTE:** This version of Chocolatey Agent is backwards compatible with versions of Chocolatey Central Management earlier than 0.8.0. However, we always recommend updating to the latest version of Chocolatey Central Management.

### Improvements

- Chocolatey Central Management
  - Add logic to retry reporting of a deployment step result to Chocolatey Central Management if it initially fails.
  - Ensure that no expanded sensitive variables are captured in log that is returned to Chocolatey Central Management.

## 0.12.1 (September 14, 2021)

### Bug Fixes

- [Security] - Deployments - Sensitive arguments are included in log file when advanced deployments are executed via Chocolatey Central Management - see [licensed #255](https://github.com/chocolatey/chocolatey-licensed-issues/issues/255)

### Release Video

A short video explaining what is included in this release can be found here:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/EoliKrC_MBA?list=PLGvGJzqY88snXVlfxr8pt9WxQ4nCjB9Uj" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## 0.12.0 (September 2, 2021)

> :warning: **WARNING**
>
> The dependencies of the chocolatey-agent package have changed in this release, and it now requires chocolatey.extension v2.2.0.

### Bug Fixes

- Central Management
  - Fix - Second and subsequent deployments to an agent with PowerShell v4 come back inconclusive (possibly earlier PowerShell versions as well) - see [licensed #237](https://github.com/chocolatey/chocolatey-licensed-issues/issues/237)
  - Fix - Deployments - Log does not contain all information under error circumstances

### Improvements

- [Security] XML External Entity attack in log4net (CVE-2018-1285) - see [licensed #253](https://github.com/chocolatey/chocolatey-licensed-issues/issues/253)

### Release Video

A short video explaining what is included in this release can be found here:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/Uv59msxXzeg?list=PLGvGJzqY88snXVlfxr8pt9WxQ4nCjB9Uj" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## 0.11.2 (November 5, 2020)

### Bug Fixes

- Fix - Deployments - An execution timeout in seconds value of `0` for a deployment step is not treated as infinite

### Improvements

- Provide clarity in log messages when salt additive configuration values are misconfigured

## 0.11.1 (October 5, 2020)

### Bug Fixes

- Fix - CCM - Prevent incorrect exit code of -1 from successful PowerShell script deployment when no exit code is explicitly supplied by the script

## 0.11.0 (June 25, 2020)

### Breaking Changes

- Chocolatey Agent v0.11.0 will only work with Central Management v0.3.0+. Upgrade order doesn't matter as you'll need to be on CCM v0.3.0 and Agent v0.11.0 before things start working again. See https://docs.chocolatey.org/en-us/central-management/#ccm-component-compatibility-matrix.

### Bug Fixes

- Fix - CCM - passphrases do not match on check-in (report_computer_information) - see [Licensed #152](https://github.com/chocolatey/chocolatey-licensed-issues/issues/152)
- Fix - CCM Deployments - Deployments agent exit code of -1 reports successful deployment - see [Licensed #153](https://github.com/chocolatey/chocolatey-licensed-issues/issues/153)

## 0.10.0 (June 18, 2020)

### Breaking Changes

- Chocolatey Agent v0.10.0 will only work with Central Management v0.2.0+. Please upgrade Central Management first if you are using CCM with the agent service.

> :memo: **NOTE**
>
> Log locations have changed. Please see [Log File for Chocolatey Agent](xref:setup-agent#log-file-location-for-chocolatey-agent) for more information.

### Features

- Execution for Central Management Deployments

### Bug Fixes

- Fix - Monitoring chocolatey.config for changes could potentially lock the file from being written to by choco
- Fix - Logging - the service stops responding to calls and stops logging after choco configuration file is edited
- Fix - CCM Reporting - Do not report unfound packages as outdated

### Improvements

- Logging - Log to the root logs folder of Chocolatey Installation

## 0.9.3 (March 26, 2020)

### Bug Fixes

- Central Management Reporting:
  - Fix - Ensure best available TLS is used - see [Licensed #132](https://github.com/chocolatey/chocolatey-licensed-issues/issues/132)

## 0.9.2 (January 30, 2020)

### Improvements

- When reporting into CCM, add the URL that is being used in log to aid when debugging issues

## 0.9.1 (April 30, 2019)

### Bug Fixes

- Self-Service / Background Mode:
  - Fix - Multiple quoted options being parsed incorrectly - see [Licensed #78](https://github.com/chocolatey/chocolatey-licensed-issues/issues/78)

## 0.9.0 (March 18, 2019)

### Features

- Central Management Reporting - Clients can now report into central management on a configurable basis. For more information, please see https://docs.chocolatey.org/en-us/features/chocolatey-central-management

### Bug Fixes

- Self-Service / Background Mode:
  - Fix - Package Arguments not being passed from Agent to choco.exe properly - see [Licensed #60](https://github.com/chocolatey/chocolatey-licensed-issues/issues/60)
  - Fix - Background Service does not pass the exit code back to the console (service side) - see [Licensed #51](https://github.com/chocolatey/chocolatey-licensed-issues/issues/51)
  - Fix - Execution times out after 10 minutes - ignores configuration - see [Licensed #41](https://github.com/chocolatey/chocolatey-licensed-issues/issues/41)

## 0.8.1 (September 28, 2017)

### Bug Fixes

- Fix - bump dependency on Chocolatey Licensed Extension to ensure user is created with complex password instead of created with no password and then updated with complex password.

## 0.8.0 (September 27, 2017)

### Breaking Changes

- [Security] Use 'ChocolateyLocalAdmin' user and manage the user by default - using LocalSystem doesn't work well with all software installations. Using a local user that is an admin works much better for ensuring applications are installed. If you need the previous functionality, pass `/UseDefaultChocolateyConfigUser`. This will use whatever Chocolatey is configured to use by default for new service installations. You can also pass in a username and optionally a password for a domain account or local administrator account.

### Improvements

- Upgrade - Pass `/NoRestartService` to upgrade the service without shutting down the current running service. You will need to restart the service to take advantage of the new changes - see [#26](https://github.com/chocolatey/chocolatey-licensed-issues/issues/26).
- Install/Upgrade - Pick username/password for runtime. Pass `/Username:value /Password:value2` through package parameters.
- Install/Upgrade - Pass `/EnterPassword` through package parameters to have Chocolatey ask for the user password at runtime during installation. Captures as a secure string.

## 0.7.0 (June 27, 2017)

### Breaking Changes

- Fix - Use a URI with WCF named pipes that doesn't exclusively hold a lock on the root (blocking other services) - see [#12](https://github.com/chocolatey/chocolatey-licensed-issues/issues/12).

### Bug Fixes

- Fix - Allow chocolatey.lib (not just calls from choco.exe) to run self-service.

## 0.6.0 (March 20, 2017)

### Breaking Changes

- Sources must be opted in for self-service if the feature `UseBackgroundServiceWithSelfServiceSourcesOnly` is turned on. This is automatically the case with Chocolatey Licensed v1.10.0+ (and Chocolatey 0.10.4+).

### Bug Fixes

- Fix - Sources using nupkg/nuspec were being allowed. This is now disabled as well.

## 0.5.0 (January 14, 2017)
### Breaking Changes

- New pattern for dependencies requires a reload of the interface that works between the Agent and Chocolatey.Extension, requiring a bump in the sub v1.

## 0.4.0 (January 4, 2017)

Initial Release

### Features

- Streams logging messages back to the caller in realtime
- Audits disallowed calls / attempted abuses of the service
- Only runs Chocolatey functions
- Ensures installation from approved sources only
- Receives and passes user context to Chocolatey functions.
- Works exclusively with Chocolatey for Business - checks passcode prior to running command
- Processes one command at a time with locking algorithm
