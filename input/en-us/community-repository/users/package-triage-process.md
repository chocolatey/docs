---
Order: 10
xref: package-triage-process
Title: Request Package Fixes/Updates
Description: Information about the Chocolatey Community Package Repository triage process
RedirectFrom: docs/package-triage-process
---

# Package Questions, Requests, Updates, and/or Fixes For Community Feed - Triage Process

The Community Feed (https://community.chocolatey.org/packages) has a collection of packages provided and maintained by the community. You may have come across a package and found you have questions about it or you have found it outdated or broken.

> :choco-info: **NOTE**
>
> If you are a **software vendor** wanting to maintain your own software's packages, please see the [vendors maintaining packages](#i-want-to-take-overhelp-with-package-maintenance-for-my-software) below.

## Table of Contents

* [Are you a software vendor?](#are-you-a-software-vendor)
* [Questions about the package or software](#questions-about-a-package-or-software)
* [Package requests or package is missing?](#package-request-package-missing)
* [The package is broken?](#package-is-broken)
* [The package is outdated?](#package-is-outdated)
* [The Package Triage Process](#the-triage-process) - requesting updates/fixes to packages

### Are you a Software Vendor?
#### Does a Chocolatey package that installs my software violate distribution rights?

In most cases no. Most packages you will find on the community feed, also known as https://community.chocolatey.org/packages use automation scripts to download the software from the [official distribution point](xref:legal#distributions).

If you visit the package page and slide down to the Files heading, you can see what is included in the package. Many times you will see only a chocolateyInstall.ps1 and a chocolateyUninstall.ps1. You can also see the contents of those files right here so you can review what they are doing (the language is PowerShell, but with most packages it is typically easy to follow what they are doing).

![files section with chocolateyInstall.ps1 expanded](/assets/images/moderation-10.jpg)

If you don't trust the package page (or if the package was published before July 2014), we invite you to download the actual package and inspect the contents (the .nupkg is just a .zip file after all). On the left menu there is a download link. You can download and rename the .nupkg to a .zip file and extract it to see the contents.

![download link](/assets/images/triage-download.jpg)

Many of the packages may look like they include binaries because of the result after an install, but that's just a fantastic effect of the automation scripts working smoothly and almost unnoticeably.

We take distribution rights very seriously - see [legal](xref:legal#distributions). If you do happen to find that the package **is** violating your distribution rights, please see the next section.

#### The package IS violating distribution rights
You've checked the previous section and it doesn't apply, and you've found that the package **is** violating distribution rights as it bundles software binaries without your permission and/or license doesn't allow for it.

It's not often that a moderator would approved a package that violates distribution rights, but if you find one, please click the "Report Abuse" link on the left hand side of the package page, and fill out and submit the form. The site admins for the community feed will follow up with you shortly after.

![report abuse](/assets/images/triage-reportabuse.jpg)

> :choco-info: **NOTE**
>
> The community feed has only been moderated since October 2014. There may be some packages were created prior to this date that possibly do violate distribution rights. These packages also likely won't list the files as the community feed did not start capturing the package files until July 2014. The package page has instructions for viewing the package content (and so does the previous section).

#### I want to take over/help with package maintenance for my software
Please click the "Contact Site Admins" link on the left hand side of the package page, and fill out and submit the form. The site admins for the community feed will follow up with you shortly after. Please remember to mention that you are the software vendor interested in taking over the package.

![contact site admins](/assets/images/triage-siteadmins.jpg)

We ask that you contact the site admins directly and skip the triage process altogether because we want to get you maintaining the package as quickly as possible. There is a greater trust for packages when they are provided by the vendors.

### Questions About a Package or Software
Use the Contact Maintainers link on the package page of the community feed or the Disqus comment thread (at the bottom of the package page) to reach out to the maintainers. Neither require an account on Chocolatey.org.

![contact maintainers link](/assets/images/triage-maintainers.jpg)

### Package Request? Package Missing?
If you are looking for packages to be added to the community feed (aka https://community.chocolatey.org/packages) - you are part of the community and we welcome your packages. It's super simple to create and maintain packages, see [Creating packages](xref:create-packages).

When it comes to community packages, we really want folks who are using the software to be package maintainers versus folks who may not be using the software. So when you are asking for other folks to add packages, please consider that it may be better for you to keep the package up to date than someone else who may not be invested in ensuring it stays updated.

We now have an RFP/RFM (request for package/request for maintainership, respectively) process at [Chocolatey Package Requests (https://github.com/chocolatey/chocolatey-package-requests)](https://github.com/chocolatey/chocolatey-package-requests).

### Package is Broken?
![red ball failing testing verification](/assets/images/triage-broken.jpg)

If the ball is red, the maintainer has already been informed. See the next section on how you can ask for updates

### Package is Outdated?
Be sure of four things:

1. The newer version is a stable release - not an alpha or beta if the package is about stable releases.
1. The newer version that is cross platform is available for Windows. Sometimes the release of the Windows version may lag behind availability on other platforms.
1. It has been at least a day since the new release. Sometimes the package automatically updates - check to see if the package is an automatically updating package in the description of the package. Typically if it has been more than 48 hours since the updated version is available, it's a good time to let the maintainers know they should update the package.
1. The package doesn't already have a newer version in moderation. The maintainer(s) may already be actively working towards getting a newer version up on the community feed.

  ![versions awaiting moderation](/assets/images/triage-waiting.jpg)

## The Triage Process
So a package needs to be fixed or updated. Here are the steps to follow:

1. The first step is to contact the maintainers. Use the "Contact Maintainers" link on the package page.

   ![contact maintainers link](/assets/images/triage-maintainers.jpg)

1. If you are able to provide a fix, that's even better. Look for the Maintainer's "Package Source" link on the page for the package.

   ![Package source link](/assets/images/triage-packagesource.jpg)

    If the "Package Source" link is missing, you also could try to find a link to the package sources in the profile(s) of the Maintainer(s).

   ![maintainers are links](/assets/images/triage-maintainerlinks.jpg)
   ![maintainer profile with github repository link](/assets/images/triage-maintainerrepository.jpg)

1. If the maintainer(s) do[es] not respond after one week, use the "Contact Site Admins" link to contact the site Moderators, who will attempt to triage the situation and make a determination if the package is abandoned.
Please include details of how and when you attempted to contact the Maintainer(s). Also, please specify whether you would like to become a maintainer for the package or not.

   ![Contact admins link](/assets/images/triage-siteadmins.jpg)


1. Wait for a response from the Moderators. Assuming that the Moderators agree that the package is abandoned, it is at this point that a new person can be added as a maintainer.

    If you specified in the previous step that you would like to become a new maintainer, please follow the instructions for a [Package Maintainer Handover/Switch](xref:package-maintainer-handover).

    Otherwise, if you specified that you would not like to become a maintainer, please create a RFM (Request For Maintainer) issue at [Chocolatey Package Requests (https://github.com/chocolatey/chocolatey-package-requests)](https://github.com/chocolatey/chocolatey-package-requests).

> :choco-info: **NOTE**
>
> We don't have non-maintainer uploads in the community feed and we haven't needed them yet.
