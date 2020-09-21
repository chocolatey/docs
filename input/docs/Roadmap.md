# Roadmap
Heading down a sweet road.

<!--remove <div id="RightNav"> remove-->
<!-- TOC -->

- [Chocolatey](#chocolatey)
- [Licensed Chocolatey](#licensed-chocolatey)
- [Chocolatey.org](#chocolateyorg)
- [Thoughts for future directions (undecided directions)](#thoughts-for-future-directions-undecided-directions)
- [Legal](#legal)

<!-- /TOC -->
<!--remove </div> remove-->

**NOTE:** This is not always going to be updated, one can take a look at the issues list here and in the chocolatey.org repositories.

## Chocolatey

* Validation on choco pack (subset of the package-validator)
* GPG package signing for traceability
* Authenticode package signing
* Validating authenticode - see [#643](https://github.com/chocolatey/choco/issues/643)
* ~~Not allowing package installs that don't have checksums by default when using non-secure resources like HTTP/FTP - see [#112](https://github.com/chocolatey/choco/issues/112)~~ released in 0.10.0
* Nuspec enhancements - supported versions of Windows, etc
* Packaging enhancements - like package version, architecture
* [Virtual packages](https://github.com/chocolatey/chocolatey/issues/7)
* WSA / AppX / MSIX Support
* Windows Nano Support - on hold, waiting for official stance from Microsoft
* Official support for OneGet/PackageManagement - on hold, waiting on OneGet to support upgrades

Other items as noted at https://github.com/chocolatey/choco - be sure to check the milestone for estimated release version.

## Licensed Chocolatey

* ~~[[Self-Service Installs (Non-Admins)|FeaturesAgentService]]~~ released in Jan 2017
* ~~[[Chocolatey Central Management Console|FeaturesChocolateyCentralManagement]]~~ - reporting aspect released May 2019
* ~~Package Throttle - reduce download speeds for low bandwidth areas~~ - released in Q1 2017 (March)
* Package Modernizer
* Package Sync command:
  * finding existing packages
  * ~~building packages on the fly with sync (business edition)~~ released in Jan 2017
* ~~Package Builder - [[create packages from Programs and Features|FeaturesCreatePackagesFromInstallers#generate-packages-from-programs-and-features]]~~ - released in Q3 2016
* ~~Right Click `Create Chocolatey Package...` (business editions)~~ - released in Q3 2016
* ~~[[Package Builder UI|FeaturesCreatePackagesFromInstallers#package-builder-ui]] (business edition)~~ - released in Q3 2016
* ~~Package Builder UI (pro edition without the auto detection)~~ - released Q1 2017
* Possibly a business edition gallery with features specific to business needs.

Others as noted at https://github.com/chocolatey/chocolatey-licensed-issues.

## Chocolatey.org

* ~~Adding back in search box~~ - completed Q1 2018
* Converting rest of site
* ~~Kickstarter backers~~ - https://chocolatey.org/kickstarters
* ~~Add blog~~ - https://chocolatey.org/blog
* ~~VirusTotal scans of all packages and downloaded binaries~~ - Completed Feb 2016
* ~~Locking down non-secure downloads in packages (HTTP) without checksums~~ - completed Aug 2016
* Locking down secure downloads in packages (HTTPS) without checksums

Others as noted at https://github.com/chocolatey/chocolatey.org/issues.

## Thoughts for future directions (undecided directions)

* Pluggable compositional model


## Legal
**Disclaimer:** The information included in this roadmap does not constitute, and should not be construed as, a promise or commitment by Chocolatey Software, Inc (Chocolatey Software) to develop, market, or deliver any particular product, feature, or function. The timing and content of Chocolatey Software future product releases could differ materially from the expectations discussed in this document. Chocolatey Software reserves the right to change product plans or roadmap at any time. 
