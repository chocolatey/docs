---
Order: 79
xref: roadmap
Title: Roadmap
Description: Information about what is on the roadmap for Chocolatey
RedirectFrom: docs/roadmap
ShowInNavbar: false
ShowInSidebar: false
---

> :choco-warning: **WARNING**
>
> This does not represent a complete listing. Links are provided for more detailed set of backlog items. Some items will not be shared publicly.

## Community

### Chocolatey CLI (choco)

- Validation on choco pack (subset of the package-validator)
- GPG package signing for traceability
- Authenticode package signing
- Validating authenticode - see [#643](https://github.com/chocolatey/choco/issues/643)
- ~~Not allowing package installs that don't have checksums by default when using non-secure resources like HTTP/FTP - see [#112](https://github.com/chocolatey/choco/issues/112)~~ released in 0.10.0
- Nuspec enhancements - supported versions of Windows, etc
- Packaging enhancements - like package version, architecture
- [Virtual packages](https://github.com/chocolatey/chocolatey/issues/7)
- WSA / AppX / MSIX direct Support

Other tickets as noted at [https://github.com/chocolatey/choco](https://github.com/chocolatey/choco) - be sure to check the milestone for estimated release version.

Release Notes / Changelog at [Chocolatey CLI Release Notes](xref:choco-release-notes).

### Chocolatey GUI

- ~~Dark Mode~~ - completed March 2021
- WCAG compliance - est. H2 2021

Other tickets as noted at [https://github.com/chocolatey/ChocolateyGUI/issues](https://github.com/chocolatey/ChocolateyGUI/issues) - be sure to check the milestone for estimated release version.

Release Notes / Changelog at [Chocolatey GUI Release Notes](xref:chocolateygui-release-notes).

### Chocolatey Community Repository aka community.chocolatey.org

- ~~Adding back in search box~~ - completed Q1 2018
- Converting rest of site
- ~~Kickstarter backers~~ - [https://chocolatey.org/kickstarter](https://chocolatey.org/kickstarter)
- ~~Add blog~~ - [https://blog.chocolatey.org/](https://blog.chocolatey.org/)
- ~~VirusTotal scans of all packages and downloaded binaries~~ - Completed Feb 2016
- ~~Locking down non-secure downloads in packages (HTTP) without checksums~~ - completed Aug 2016
- Locking down secure downloads in packages (HTTPS) without checksums

Other tickets as noted at [https://github.com/chocolatey/home](https://github.com/chocolatey/home).

## Commercial

- ~~[Chocolatey Central Management Console](xref:ccm)~~ - reporting aspect released May 2019 / Deployments released June 2020
- ~~[Self-Service Installs (Non-Admins)](xref:self-service-anywhere)~~ released in Jan 2017

Other tickets as noted at [https://github.com/chocolatey/chocolatey-licensed-issues](https://github.com/chocolatey/chocolatey-licensed-issues).

### Chocolatey Licensed Extension

- ~~Package Throttle - reduce download speeds for low bandwidth areas~~ - released in Q1 2017 (March)
- Package Modernizer
- Package Sync command:
  - finding existing packages
  - ~~building packages on the fly with sync (business edition)~~ released in Jan 2017
- ~~Package Builder - [create packages from Programs and Features](xref:package-builder#generate-packages-from-programs-and-features)~~ - released in Q3 2016
- ~~Right Click `Create Chocolatey Package...` (business editions)~~ - released in Q3 2016
- ~~[Package Builder UI](xref:package-builder#package-builder-ui) (business edition)~~ - released in Q3 2016
- ~~Package Builder UI (pro edition without the auto detection)~~ - released Q1 2017

Other tickets as noted at [https://github.com/chocolatey/chocolatey-licensed-issues/labels/LicensedExtension](https://github.com/chocolatey/chocolatey-licensed-issues/labels/LicensedExtension).

Release Notes / Changelog at [Chocolatey Licensed Extension Release Notes](xref:licensed-extension-release-notes).

### Chocolatey Central Management

- ~~Reporting~~ - released May 2019
- ~~Deployments~~ - released June 2020
  - ~~Scheduled Deployments~~ - released November 2020
  - ~~Maintenance Windows~~ - released November 2020
  - ~~Semi-connected environments~~ - released November 2020
  - Recurring Deployments
  - Retry
  - Templates
- Groups Active Directory Integration (Auto-groups)
- WCAG compliance

Other tickets as noted at [https://github.com/chocolatey/chocolatey-licensed-issues/labels/CentralManagement](https://github.com/chocolatey/chocolatey-licensed-issues/labels/CentralManagement).

Release Notes / Changelog at [Chocolatey Central Management Release Notes](xref:ccm-release-notes).

## Legal

**Disclaimer:** The information included in this roadmap does not constitute, and should not be construed as, a promise or commitment by Chocolatey Software, Inc (Chocolatey Software) to develop, market, or deliver any particular product, feature, or function. The timing and content of Chocolatey Software future product releases could differ materially from the expectations discussed in this document. Chocolatey Software reserves the right to change product plans or roadmap at any time.
