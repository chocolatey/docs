---
Order: 20
xref: package-triage-process
Title: Package Triage Process
Description: The package triage process for Chocolatey Community Repository packages.
RedirectFrom: docs/package-triage-process
---

The [Chocolatey Community Repository](https://community.chocolatey.org/packages) has a collection of packages provided and maintained by the Community. You may have come across a package and found you have questions, or you have found it outdated or broken. You will find help with this below.

> :choco-info: **NOTE**
>
> If you are a **Software Vendor/Author** wanting to maintain your software's packages, please see the [Software Vendor/Author information on the Chocolatey Community Repository](xref:software-vendor).

## Package Is Outdated?

Be sure of:

1. If the package contains stable releases, the newer version is a stable release and not a prerelease (such as alpha or beta).
1. The newer version that is available, is for Windows. Sometimes the release of the Windows version may lag behind availability on other platforms.
1. Check the description on the package page of the [Chocolatey Community Repository](https://community.chocolatey.org/packages) for a timescale of when to contact the maintainer for outdated packages. Many maintainers add this information there. If there is no timescale, ensure it has been at least 2 days since the new release.
1. The [package doesn't already have a newer version in moderation](xref:ccr-faq#how-do-i-see-all-versions-of-a-package). The maintainer(s) may already be actively working towards getting a newer version up on the Chocolatey Community Repository.

If you are sure of the above list, please follow the [Package Triage Process](#the-triage-process).

## Package is Broken?

![red ball failing testing verification](/assets/images/triage-broken.jpg)

If the ball is red, the maintainer has already been informed. 

Package maintainers are unlikely to provide fixes to versions of packages that are not the latest. If the broken package is the [latest available](xref:ccr-faq#how-do-i-see-all-versions-of-a-package), please follow the [Package Triage Process](#the-triage-process).

## The Triage Process

> :choco-info: **WARNING**
>
> If the maintainer of the package is in the list below, you do not need to follow these steps. Instead, please contact the [Site Admins](xref:ccr-faq#how-do-i-contact-the-site-admins) if you wish to become the Maintainer of the package, or raise a [Request For Maintainer (RFM) package request](xref:package-request) if you do not.
> 
> * needs_new_maintainer
> * dtgm
> * adgellida

If a package needs to be fixed or updated. Here are the steps to follow:

1. The first steps are:
   1. [Contact the package Maintainers](xref:ccr-faq#how-do-i-contact-the-package-maintainers).
   1. Find the [package source](xref:ccr-faq#how-do-i-find-the-package-source) and if it is a source code repository:
      * [Raise a pull request](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request) if the repository allows it, and the package is broken, and you want to help fix it.
      * [Raise an issue](https://docs.github.com/en/issues/tracking-your-work-with-issues/creating-an-issue) if the repository allows it, and you want to report the package as broken or outdated.
      * [Ask a question about the package](xref:ccr-faq#how-do-i-ask-questions-about-a-package).
1. Wait 7 days for a response from the Maintainers.
1. If the Maintainers have not responded, there are two options:
   1. If you wish to become a Maintainer of the package, please [contact the Site Admins](xref:ccr-faq#how-do-i-contact-the-site-admins). The Site Admins will follow up with you directly. If the Site Admins add you as a Maintainer of the package, see the [Package Maintainer Handover/Switch](xref:package-maintainer-handover) documentation for more information.
   1. If you do not wish to become a Maintainer of the package, please raise a [Request For Maintainer (RFM) package request](xref:package-request), including how you contacted the existing Maintainers, links to any issues, discussions or pull requests you raised, and the dates when this contact was initiated. The Repository Administrators will review the request.

### Package Request? Package Missing?

See the [FAQ question](xref:package-request).

### Questions About a Package or Software

See the [FAQ question](xref:ccr-faq#how-do-i-ask-questions-about-a-package).

### Are You A Software Vendor?

See the documentation page for [Software Vendor/Authors](xref:software-vendor)..