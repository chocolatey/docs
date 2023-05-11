---
Order: 10
xref: ccm-release-notes
Title: Release Notes
Description: Release Notes for Chocolatey Central Management
OgImage: https://img.chocolatey.org/social-share/release-notes-chocolatey-central-management-og.png
TwitterImage: https://img.chocolatey.org/social-share/release-notes-chocolatey-central-management-twitter.png
RedirectFrom: docs/release-notes-central-management
---

# Chocolatey Release Notes - Chocolatey Central Management

## Summary

This covers the release notes for the Chocolatey Central Management (`chocolatey-management-database`, `chocolatey-management-service`, and `chocolatey-management-web`) packages, which covers Central Management server-side functionality. For more information, installation options, etc, please refer to [Chocolatey Central Management](xref:central-management).

- Installation - [Central Management Setup](xref:ccm-setup)
- Upgrade - [Central Management Upgrade](xref:ccm-upgrade)

> :choco-info: **NOTE**
>
> This package is available to Chocolatey for Business (C4B) customers only.

## Other Release Notes

- Refer to [Open Source Release Notes](xref:floss-release-notes) as commercial editions build on top of open source.
- Chocolatey for Business (C4B) customers - also refer to [Chocolatey Licensed Extension Release Notes](xref:licensed-extension-release-notes) and [Chocolatey Agent Release Notes](xref:agent-release-notes).

## Known Issues

- Please see our [GitHub repository issues](https://github.com/chocolatey/chocolatey-licensed-issues/labels/CentralManagement).
- Some issues may be held internally, please follow your support routes to learn more.

## 0.10.1 (October 6, 2022)

### Bug Fixes

- Reporting - Internal error shown when exporting individual software report to excel - see [Licensed #323](https://github.com/chocolatey/chocolatey-licensed-issues/issues/323)
- Deployments - Recurring deployments are missing deployment steps - see [Licensed #322](https://github.com/chocolatey/chocolatey-licensed-issues/issues/322)
- API - GetComputerForView method result missing creationTime - see [Licensed #321](https://github.com/chocolatey/chocolatey-licensed-issues/issues/321)
- Multi-Factor Authentication - Email verification can be enabled while SMTP settings have not been configured
- Website - Ensure builtin accounts' default email addresses are not resolvable

## 0.10.0 (August 30, 2022)

### Features

- Added recurring Deployments.
- Add ability to duplicate an existing Deployment.
- Retention Policies - Automatically delete a computer that hasn't reported in for a configurable period of time. This defaults to 365 days.
- Implement a dark/light mode.
- API - Add a way to query licensed machine count - see [Licensed #272](https://github.com/chocolatey/chocolatey-licensed-issues/issues/272).

### Bug Fixes

- Fix - Auditing data may be lost in the database when some entries are updated.
  - Editing a Group, Software, or Computer would erase the user who created it and the time it was created. As part of this fix, entries without that information will set the creating user to the user who last modified it.
- Fix - API - Exception when retrieving a deployment from the `GetDeploymentPlanForView` method.
- Fix - The creation time on the Notifications table was incorrect.
- Fix - Excel and PDF Reports incorrectly show the time in UTC and not the local time zone.
- Fix - Non-administrative users cannot view the Login Attempts section.
- Fix - API - Group statistics were not updated when adding ComputerGroups / GroupGroups via the API.

### Improvements

- Computers tab should display Group enrolment - see [Licensed #223](https://github.com/chocolatey/chocolatey-licensed-issues/issues/223).
- Creating a Deployment and then clicking Cancel without adding steps or saving once should remove the deployment entirely.
- Add the Deployment name to its Step Details pages.
- Add visual indicators that editing/adding/removing deployment steps is disabled when the deployment schedule is outdated.
- Add option of `--version` and `--pre` for a Basic Deployment Step.
- Send email notifications when a scheduled deployment fails to start.
- Warn when Chocolatey license is due to expire.
- Remember the specified value for Show Entries dropdown on tables.
- Replace loading animation.
- Require new user passwords to be at least 6 characters long.
- Add option for email 2FA as part of authentication - see [Licensed #300](https://github.com/chocolatey/chocolatey-licensed-issues/issues/300).
- Uninstalling chocolatey-management-web should remove IIS Website and Application Pool.
- Add additional auditing fields for Deployments.

## 0.9.0 (June 15, 2022)

> :choco-warning: **WARNING**
>
> The dependencies of all the Chocolatey Central Management packages (`chocolatey-management-database`, `chocolatey-management-service`, and `chocolatey-management-web`) have changed in this release. This is to allow the installation of .NET 6.0, which is now a requirement to run Chocolatey Central Management.
>
> In addition to the above, all the Chocolatey Central Management packages now make use of the commercial cmdlets, which means that these packages _have_ to be installed on a correctly licensed machine. [Further information about why we have enabled this can be found on our blog post](https://blog.chocolatey.org/2021/09/chocolatey-licensed-changes-restricted-to-licensed-nodes/)
>
> Finally, support for SQL Server 2008 and SQL Server 2008 R2 has been removed. Any attempt to install one of the Chocolatey Central Management packages against one of these instances will results in an error. [Further information about this change can be found in our blog post](https://blog.chocolatey.org/2022/06/ccm-090-remove-sqlserver2008-support/)

### Breaking Changes

- Add support for .NET 6.0 to all Chocolatey Central Management components
  - As a result, the dependencies for all of the Chocolatey Central Management packages have changed
- Update all Chocolatey Central Management packages to make use of commercial cmdlets and license validation
  - This will mean that installation of the Chocolatey Central Management packages has to happen on a correctly licensed machine. [Further information about why we have enabled this can be found on our blog post](https://blog.chocolatey.org/2021/09/chocolatey-licensed-changes-restricted-to-licensed-nodes/)
- Remove support for SQL Server 2008
  - [Further information about this change can be found in our blog post](https://blog.chocolatey.org/2022/06/ccm-090-remove-sqlserver2008-support/)

### Features

- Add ability to update the "Friendly Name" of a computer via the API - see [Licensed #285](https://github.com/chocolatey/chocolatey-licensed-issues/issues/285)
- Provide ability to ensure that all Chocolatey Central Management Chocolatey packages are not being installed to either SQL Server 2008 or SQL Server 2008 R2 instance

### Bug Fixes

- Ensure that it is possible to hide links from login page when new user registration is disabled - see [Licensed #270](https://github.com/chocolatey/chocolatey-licensed-issues/issues/270)
- Ensure that no error is caused when viewing a large response from the website
- Ensure that the `chocolatey-management-web` Chocolatey package can be internalized using Package Internalizer

### Improvements

- [Security] Remove usage of `morris.js` due to security vulnerability
- Add ability for the CCM Admin Role, by default, to be able to edit a computer - see [Licensed #217](https://github.com/chocolatey/chocolatey-licensed-issues/issues/217)
- Add ability to see the "Friendly Name" assigned to a computer across other areas of Chocolatey Central Management - see [Licensed #221](https://github.com/chocolatey/chocolatey-licensed-issues/issues/221)
- Add colorization to the Deployment Plan / Step screens to show overall result in detail pages
- Remove "Show Log" button from Deployment Step details page for a computer with a result reason of "Unreachable"
- Provide ability to navigate to software screen from the KPI dashboard screen - see [Licensed #282](https://github.com/chocolatey/chocolatey-licensed-issues/issues/282)

## 0.8.0 (February 28, 2022)

### Features

- Ensure that a deployment step specifies whether it contains sensitive variables in the script that's to be run.
- Enhanced communication contracts that are used when communicating with Chocolatey Agent.
- Store the database package version number in a database table.

### Bug Fixes

- [Security] Fix - ASP.NET Core anti-forgery cookie doesn't use the secure flag.
- Fix - High memory/cpu consumption when there are lots of computers/software/deployments being used.

### Improvements

- Disable updating of related group information when it is not needed as computers are reporting in.

## 0.7.0 (November 17, 2021)

### Breaking Changes

- Additional steps required to change LDAP and SMTP passwords.
  -The LDAP and SMTP password is no longer present on the page so cannot be inspected.
  - We've added an additional step for confirmation of the passwords.
- Encryption passphrase is required.
  - To enhance the security of sensitive fields in the database we require the encryption passphrase to be set to a value you provide.
  - When any user with the CCM Administrator role logs in they will be redirected to the Settings page where the passphrase can be changed.
  - The passphrase change can be deferred but on the 5th login it will be required to set this passphrase before any other changes can be made.
  - Users who are not a member of the CCM Administrator role will only be shown a warning that the passphrase needs to be changed and to contact their Administrator to do so.
  - The links provided in email activation or password reset emails that were sent prior to the passphrase change will no longer be valid. The user clicking the link will be directed to a page where they can request them again.

### Improvements

- Web - Ability to add sensitive variables to advanced PowerShell deployment steps - see [documentation](https://docs.chocolatey.org/en-us/central-management/usage/website/sensitive-variables)
- API - Hide token API endpoints from Swagger documentation.
- Web - Update jQuery dependency - see [Licensed #271](https://github.com/chocolatey/chocolatey-licensed-issues/issues/271).

### Bug Fixes

- Fix - CCM - Sensitive package parameters shown in database & Deployment step page - see [Licensed #267](https://github.com/chocolatey/chocolatey-licensed-issues/issues/267).

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/WH9ecBP-1zY?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.6.3 (September 23, 2021)

### Bug Fixes

- Fix - Processing of message queue does not complete when an invalid XML file is located - see [Licensed #266](https://github.com/chocolatey/chocolatey-licensed-issues/issues/266)
- Fix - When the "Only one concurrent login per user" setting is enabled, users are locked out of CCM Web UI - see [Licensed #260](https://github.com/chocolatey/chocolatey-licensed-issues/issues/260)
- Fix - Error shown when navigating to certain pages within the CCM Web UI - see [Licensed #262](https://github.com/chocolatey/chocolatey-licensed-issues/issues/262)
- Fix - Users are unable to change IsOutdated status for software entries within CCM Web UI - see [Licensed #264](https://github.com/chocolatey/chocolatey-licensed-issues/issues/264)
- Fix - Users are unable to delete a piece of software within CCM Web UI - see [Licensed #261](https://github.com/chocolatey/chocolatey-licensed-issues/issues/261)
- Fix - Incorrect total number of affected instances within Outdated Software Details Report Details - see [Licensed #265](https://github.com/chocolatey/chocolatey-licensed-issues/issues/265)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/D3z4w3O6w8Q?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.6.2 (August 26, 2021)

### Bug Fixes

- Fix - Service - Method to determine correct SSL certificate to use between CCM Service installation script and execution is inconsistent
- Fix - Service - Exceptions thrown during CCM Service startup do not halt internal service tasks
- Fix - Service - CCM Service log file does not contain full error information - see [Licensed #247](https://github.com/chocolatey/chocolatey-licensed-issues/issues/247)
- Fix - Service - Unnecessary/unhelpful log messages are added to the CCM Service log file
- Fix - Web - Upgrading CCM Website package doesn't complete successfully due to locked files
- Fix - Web - Upgrading CCM Website package doesn't ensure creation of required configuration in appsettings.json file
- Fix - Web - Upgrading CCM Website package doesn't ensure creation of required configuration in web.config file
- Fix - Web - Unable to "see" newly created Outdated Software Report when there are greater than 10 reports
- Fix - Web - Incorrect total number of Outdated Software Reports displayed
- Fix - Database - Unable to install 0.6.0/0.6.1 database package when IIS is not installed - see [Licensed #248](https://github.com/chocolatey/chocolatey-licensed-issues/issues/248)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/UF3Z9PVh2K0?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.6.1 (August 5, 2021)

### Bug Fixes

- Fix - Service - Unable to install chocolatey-management-service package under certain conditions - see [Licensed #242](https://github.com/chocolatey/chocolatey-licensed-issues/issues/242)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/pbgpxeRQ-V4?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.6.0 (August 3, 2021)

### Breaking Changes

- Audit Retention
  - By default, Audit Logs generated within CCM will now be kept for 30 days, after which they will be removed
  - This can be [changed](https://docs.chocolatey.org/en-us/central-management/setup/website#step-4.5-audit-retention) within the Administration | Settings screen of the CCM Web Application
  - If you wish to retain all your current audit logs, we recommend that you back up the AbpAuditLogs table prior to upgrading to this release

### Improvements

- All CCM Components have been updated to use .NET Core 3.1 which is supported until [December 2022](https://dotnet.microsoft.com/platform/support/policy/dotnet-core). Previous versions of CCM used NET Core 2.2 which Microsoft ended support for in [December 2019](https://dotnet.microsoft.com/platform/support/policy/dotnet-core)
- Due to this update, the CCM Website now uses the in-process hosting model within IIS. This is enabled by [default starting with ASP.NET Core 3.0](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/iis/in-process-hosting?view=aspnetcore-5.0#enable-in-process-hosting).

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/i5_42euUABY?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.5.1 (April 12, 2021)

### Bug Fixes

- Fix - Service - Unable to process deployment report messages that contain invalid XML characters - see [Licensed #216](https://github.com/chocolatey/chocolatey-licensed-issues/issues/216)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/ED6vAz6_AHk?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.5.0 (March 25, 2021)

### Breaking Changes

- Deployments - Provide better resiliency when handling large numbers of computers within a deployment - see [Licensed #212](https://github.com/chocolatey/chocolatey-licensed-issues/issues/212)

Previously, while not recommended, the CCM Service could be run as a user with non-administrative rights on the machine, as long as certain permissions were provided to the user.  Going forward, there is now a strict requirement that the user that is running the CCM Service has administrative rights on the machine.  This is needed to ensure reliability of messages delivered into the CCM Service.

### Bug Fixes

- Fix - Web - No data is returned when logged into the website with FIPS compliant checksums enabled on the hosting server - see [Licensed #167](https://github.com/chocolatey/chocolatey-licensed-issues/issues/167)

### Improvements

- Installation - CCM Chocolatey Package scripts have been authenticode signed

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/ZeT4NxNRFwg?list=PLGvGJzqY88snxQwtZJ-OMUiMVuKHjg-br" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.4.0 (November 6, 2020)

### Breaking Changes

- Deployments - Machine contact timeout now defaults to infinite (0) to allow for semi-connected environments

Previously this value was set to a constant value of 20 and not configurable. To revert to previous behaviour, set the machine contact timeout in minutes value for a given deployment step to 20.

### Features

- Deployment Scheduling
  - Scheduled Deployments allows for starting a deployment at some point in the future
  - Maintenance Windows - Ability to specify date and time for when no more computers within a deployment can start
- API - Swagger UI allows visualization and interaction with all CCM API operations - see [Licensed #183](https://github.com/chocolatey/chocolatey-licensed-issues/issues/183)
- Long Running Deployments - Enables support for semi-connected computers

### Bug Fixes

- Fix - Deployments - Computers marked unreachable should not be picked up in future steps in same deployment
- Fix - Deployments - Adding distinct groups that share computers to a deployment results in duplicated computers within deployment steps
- Fix - Web - Authentication of external user (i.e. LDAP) fails when no email address is configured for user - see [Licensed #181](https://github.com/chocolatey/chocolatey-licensed-issues/issues/181)
- Fix - Database - Unable to upgrade database when user specific permissions (i.e. instead of assigning a role to a user) for CCM are used for any user
- Fix - Deployments - Execution timeout of infinite (0) for a deployment step is not being respected when querying for timed out computers
- Fix - Deployments - Machine contact timeout for deployment step is not being respected, deployments incorrectly wait indefinitely (due to changes in v0.3.1)
- Fix - Web - Real time notifications never reach CCM Web UI
- Fix - Web - Notifications page has no way to see entire notification

### Improvements

- Deployments - Handle deployment step activation order properly when the same computer is in multiple deployments that are active at the same time
- Service - Configuration - Provide clarity in log messages when salt additive configuration values are misconfigured
- Deployments - Round percentage complete values on report pages while deployment is in progress
- Deployments - Auto-refresh deployment report pages

## 0.3.1 (October 5, 2020)

### Bug FIxes

- Fix - Database - Upgrade fails when passing database parameters due to incorrect cmdlet name - see [Licensed #161](https://github.com/chocolatey/chocolatey-licensed-issues/issues/161)
- Fix - Service Install - Ensure that existing certificate is located in TrustedPeople certificate store
- Fix - Service Install - Netsh Entries Incorrectly Parsed ("Cannot index into a null array") when installing in different locales - see [Licensed #174](https://github.com/chocolatey/chocolatey-licensed-issues/issues/174)
- Fix - Web - Invalid LDAP credentials/URL should not prevent login for ccmadmin user
- Fix - Deployments - Start Date Time for Deployment Step is overwritten when Step is marked as inconclusive
- Fix - Deployments - Switching from Basic to Advanced script without providing package name causes validation errors - see [Licensed #164](https://github.com/chocolatey/chocolatey-licensed-issues/issues/164)

### Improvements

- Service Install - Allow skipping certificate binding with package parameter /SkipCertificateBinding
- Include CreationTime property on Deployment Plan entity - useful when querying via CCM API
- Web - Deployments UI - Add Deployment Step modal window should default to basic view

## 0.3.0 (June 25, 2020)

### Breaking Changes

- Chocolatey Central Management v0.3.0 will only work with Chocolatey Agent v0.11.0+. Upgrade order doesn't matter as you'll need to be on CCM v0.3.0 and Agent v0.11.0 before things start working again. See https://docs.chocolatey.org/en-us/central-management/#ccm-component-compatibility-matrix.

### Bug Fixes

- Fix - Service - Communication with Chocolatey Agent fails on Incorrect Passphrase - see [Licensed #152](https://github.com/chocolatey/chocolatey-licensed-issues/issues/152)
- Fix - Web - Do not recreate website w/bindings on upgrade - see [Licensed #156](https://github.com/chocolatey/chocolatey-licensed-issues/issues/156)

## 0.2.0 (June 18, 2020)

Deployments Release - we are excited to bring about managing remote machines with [Central Management Deployments](https://blog.chocolatey.org/2020/05/announcing-deployments/) coming in this release! There are quite a few things we've brought into the initial release and we think you'll agree that it is a powerful, yet easy to use interface. Read [the announcement.](https://blog.chocolatey.org/2020/05/announcing-deployments/). We've also overhauled the documentation to make it understandable and approachable. Please see https://docs.chocolatey.org/en-us/central-management/.

> :choco-info: **NOTE**
>
> Log locations have changed. Please see [Central Management FAQs](xref:central-management#faqs) for more information.

### Features

- [Central Management Deployments](https://blog.chocolatey.org/2020/05/announcing-deployments/):
  - Create target groups to deploy to
  - Create a deployment with one or more steps
  - Each step can target multiple groups, and different groups in each step if desired
  - Script a Chocolatey package
  - With additional permissions, run a full PowerShell script instead
  - Choose how failures in each step are handled
  - Reorder steps
  - Control permissions on who can deploy Chocolatey packages and who can run full scripts
  - See progress on active deployments
  - View logs for computers that executed a deployment step
  - Report on completed deployments including exporting to PDF for sharing with executive staff

### Bug Fixes

- [Security] Fix - Framework does not encrypt LDAP Password in the database - see [licensed #144](https://github.com/chocolatey/chocolatey-licensed-issues/issues/144)
- Fix - Service - Error on installation when providing existing certificate: Cannot index into a null array - see [licensed #143](https://github.com/chocolatey/chocolatey-licensed-issues/issues/143)
- Fix - Web - Do not enable recaptcha by default for site registration - see [licensed #128](https://github.com/chocolatey/chocolatey-licensed-issues/issues/128)
- Fix - Web - Create/Edit Computer and Software modals are not saving changes - see [licensed #125](https://github.com/chocolatey/chocolatey-licensed-issues/issues/125)
- Fix - Web - Remove default permission to edit software and computers
- Fix - Web - Restrict What Can Be Created or Edited For Computers and Software
- Fix - Web - Deleted/Hidden items are still being used for counts for paging purposes in Software
- Fix - Web - The license count looks clickable at times when it is not clickable
- Fix - Web - After installation of CCM, doing an iisreset breaks the site
- Fix - All - Monitoring chocolatey.config for changes could potentially lock the file from being written to by choco
- Fix - All - Logging - CCM service not responding to calls and stops logging after choco configuration file is edited
- Fix - Service - Changing CentralManagementServiceUrl value in chocolatey.config causes running management service to crash

### Improvements

- Web - Allow removing computers as a default permission for ccmadmin role - see [licensed #133](https://github.com/chocolatey/chocolatey-licensed-issues/issues/133)
- Service - On install/upgrade, write out the FQDN and link to provide to chocolatey agents
- Logging - Service and DB Migrator should log to the root logs folder of Chocolatey Installation
- All - Logging - Adjust format to match closer with other Chocolatey log file formats
- Service - Set higher encryption when available (TLS 1.2)
- Database Install - Add `/SkipDatabasePermissionCheck` parameter to skip permissions check - see [licensed #147](https://github.com/chocolatey/chocolatey-licensed-issues/issues/147)
- Trial licenses that do not include counts will allow 100 licenses - see [licensed #140](https://github.com/chocolatey/chocolatey-licensed-issues/issues/140)

## 0.1.1 (January 30, 2020)

### Bug Fixes

- [Security] Fix - Database - Don't emit Connection String information to log file
- [Security] Fix - Web - Add missing ability to use Active Directory (LDAP) for authentication
- Fix - Web - Error on installation 'HTTP Error 500.21 - Internal Server Error Handler "aspNetCore" has a bad module "AspNetCoreModule" in its module list' - see [Licensed #114](https://github.com/chocolatey/chocolatey-licensed-issues/issues/114)
- Fix - Service - Unable to parse netsh entries that contain hostname:port bindings - see [Licensed #96](https://github.com/chocolatey/chocolatey-licensed-issues/issues/96)
- Fix - Web - When setting SMTP configuration the SSL checkbox status is being ignored - see [Licensed #87](https://github.com/chocolatey/chocolatey-licensed-issues/issues/87)
- Fix - Service - "The remote server returned an unexpected response: (413) Request Entity Too Large." - see [Licensed #95](https://github.com/chocolatey/chocolatey-licensed-issues/issues/95)
- Fix - Service - Unable to install CCM service with less than PowerShell v5 due to error on New-Guid cmdlet
- Fix - Web - Time discrepancy between Computers and Computer details - see [Licensed #97](https://github.com/chocolatey/chocolatey-licensed-issues/issues/97)
- Fix - Web - Remove ability to brand sections of CCM for now as it wasn't meant to be there yet and doesn't work
- Fix - Service - Unable to uninstall chocolatey-management-service due to incorrect name in package uninstall script
- Fix - Web - License count information is not being displayed correctly (e.g. 90 / n/a) - see [Licensed #80](https://github.com/chocolatey/chocolatey-licensed-issues/issues/80)
- Fix - Service - IP Address of Computer is not updating - see [Licensed #86](https://github.com/chocolatey/chocolatey-licensed-issues/issues/86)
- Fix - Web - Unable to upload a profile picture for user
- Fix - Web - Hovering over tooltips in Internet Explorer causes the page to jump
- Fix - Web - Clicking the Chocolatey icon in top left hand corner opens new tab
- Fix - Web - Website Logs are not appearing the in Maintenance Tab
- Fix - All - Move from DEBUG level reporting by default to INFO level reporting to reduce amount of logging
- Fix - Web - Improve wording in email templates and ensure consistent naming is used

### Improvements

- Database - Check whether provided SQL Server connection string actually works prior to starting installation
- Web - Optimize/Reduce Size of Chocolatey package by removing unnecessary files - see [Licensed #62](https://github.com/chocolatey/chocolatey-licensed-issues/issues/62)
- All - Show a warning when no package parameters are passed when initially installing CCM packages
- All - Show a warning during installation when provided SQL Server connection string doesn't provide an explicit user/password to connect with
- Service - Adjust logs to provide more appropriate information for normal operations
- Web - Autofocus on new password text box on password change screen

## 0.1.0 (May 22, 2019)

Initial preview release

### Features

- Reports - Ability to view and generate report (Excel/PDF) for all currently outdated software
- Dashboard - Provide a dashboard screen with key KPI values
- Overview - Show number of machines checking into CCM and compare to number currently licensed

### Bug Fixes

- Fix - Packaging - Before upgrading Web Package ensure that dotnet process isn't running
- Fix - Web Site - Ensure that minified versions of all assets are used
- Fix - Web Site - Ensure consistent Date/Time Formatting used everywhere
- Fix - Web Site - Corrected duplicate display of search input box on some screens
- Fix - Web Site - Error when attempting to sort by any column in table on Computer Details screen
- Fix - Web Site - Error when attempting to sort by Name or Package Title column in table on Software screen
- Fix - Web Site - Tab does not sort by outdated first on Software screen
- Fix - Web Site - Timezone modification doesn't provide useful information to user
- Fix - Web Site - Only show Software that is installed on at least one machine
- Fix - Web Site - Excel Export generates errors when DateTime values are included
- Fix - Versioning - Ensure correct version number is stamped on all generated assemblies
- Fix - Service - Correct usage of default port number, which should be 24020
- Fix - Service - New-SelfSignedCertificate usage doesn't work on earlier PowerShell versions
- Fix - Service - Ensure correct error handling for incorrect/missing SQL Server credentials
- Fix - Database - Ensure SQL Server 2008 support
- Fix - Database - Migrator doesn't exit with non-zero exit code when there is an error
- Fix - Installation - Ensure usage of FQDN for all components

### Improvements

- Logging - Provided better logging during Service Certificate installation
- Installation - Verify and usage persisted appsettings.json file during upgrade
- Installation - Reduce issues unpacking web package by shortening paths in packaging
- Uninstallation - Remove modifications that were done as part of installation
- Database - Don't attempt to seed database tables every time application starts
- Packaging - Removed unnecessary files from package, making it much smaller
- Packaging - Added required dependencies to packages
- Packaging - Add information about available installation parameters to package description
- Service - Allow modification of configuration settings without the need to restart Windows Service

## 0.1.0-beta-20181009 (October 9, 2018)

### Features

- [Security] Installation - Provide encryption for all persisted configuration data
- [Security] Installation - Sign all PowerShell Scripts and assemblies shipped as part of release
- [Security] Web Site - Provide full RBAC to site and API
- Audit - Provide ability to list all computers that are currently in use across environment
- Audit - Provide ability to list all software that is currently installed across environment
- Reports - Ability to view and generate report (Excel/PDF) for all currently installed software
- Reports - Ability to view and generate report (Excel/PDF) for all computers currently in use
