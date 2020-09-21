# Package Questions, Requests, Updates, and/or Fixes For Community Feed - Triage Process

The Community Feed (https://chocolatey.org/packages) has a collection of packages provided and maintained by the community. You may have come across a package and found you have questions about it or you have found it outdated or broken.

**NOTE**: If you are a **software vendor** wanting to maintain your own software's packages, please see the [vendors maintaining packages](#i-want-to-take-overhelp-with-package-maintenance-for-my-software) below.

## Table of Contents

* [Are you a software vendor?](#are-you-a-software-vendor)
* [Questions about the package or software](#questions-about-a-package-or-software)
* [Package requests or package is missing?](#package-request-package-missing)
* [The package is broken?](#package-is-broken)
* [The package is outdated?](#package-is-outdated)
* [The Package Triage Process](#the-triage-process) - requesting updates/fixes to packages

### Are you a Software Vendor?
#### Does a Chocolatey package that installs my software violate distribution rights?

In most cases no. Most packages you will find on the community feed, also known as https://chocolatey.org/packages use automation scripts to download the software from the [[official distribution point|Legal#distributions-aka-chocolatey-packages]].

If you visit the package page and slide down to the Files heading, you can see what is included in the package. Many times you will see only a chocolateyInstall.ps1 and a chocolateyUninstall.ps1. You can also see the contents of those files right here so you can review what they are doing (the language is PowerShell, but with most packages it is typically easy to follow what they are doing).

![files section with chocolateyInstall.ps1 expanded](images/moderation-10.jpg)

If you don't trust the package page (or if the package was published before July 2014), we invite you to download the actual package and inspect the contents (the .nupkg is just a .zip file after all). On the left menu there is a download link. You can download and rename the .nupkg to a .zip file and extract it to see the contents.

![download link](images/triage-download.jpg)

Many of the packages may look like they include binaries because of the result after an install, but that's just a fantastic effect of the automation scripts working smoothly and almost unnoticeably.

We take distribution rights very seriously - see [[legal|Legal#distributions-aka-chocolatey-packages]]. If you do happen to find that the package ***is*** violating your distribution rights, please see the next section.

#### The package IS violating distribution rights
You've checked the previous section and it doesn't apply, and you've found that the package ***is*** violating distribution rights as it bundles software binaries without your permission and/or license doesn't allow for it. 

It's not often that a moderator would approved a package that violates distribution rights, but if you find one, please click the "Report Abuse" link on the left hand side of the package page, and fill out and submit the form. The site admins for the community feed will follow up with you shortly after.

![report abuse](images/triage-reportabuse.jpg)

**NOTE**: The community feed has only been moderated since October 2014. There may be some packages were created prior to this date that possibly do violate distribution rights. These packages also likely won't list the files as the community feed did not start capturing the package files until July 2014. The package page has instructions for viewing the package content (and so does the previous section).

#### I want to take over/help with package maintenance for my software
Please click the "Contact Site Admins" link on the left hand side of the package page, and fill out and submit the form. The site admins for the community feed will follow up with you shortly after. Please remember to mention that you are the software vendor interested in taking over the package.

![contact site admins](images/triage-siteadmins.jpg)

We ask that you contact the site admins directly and skip the triage process altogether because we want to get you maintaining the package as quickly as possible. There is a greater trust for packages when they are provided by the vendors.

### Questions About a Package or Software
Use the Contact Maintainers link on the package page of the community feed or the Disqus comment thread (at the bottom of the package page) to reach out to the maintainers. Neither require an account on Chocolatey.org. 

![contact maintainers link](images/triage-maintainers.jpg)

### Package Request? Package Missing?
If you are looking for packages to be added to the community feed (aka https://chocolatey.org/packages) - you are part of the community and we welcome your packages. It's super simple to create and maintain packages, see [[Creating packages|CreatePackages]].

When it comes to community packages, we really want folks who are using the software to be package maintainers versus folks who may not be using the software. So when you are asking for other folks to add packages, please consider that it may be better for you to keep the package up to date than someone else who may not be invested in ensuring it stays updated.

We now have an RFP/RFM (request for package/request for maintainership, respectively) process at [Chocolatey Package Requests (https://github.com/chocolatey/chocolatey-package-requests)](https://github.com/chocolatey/chocolatey-package-requests).

### Package is Broken?
![red ball failing testing verification](images/triage-broken.jpg)

If the ball is red, the maintainer has already been informed. See the next section on how you can ask for updates

### Package is Outdated?
Be sure of four things:

1. The newer version is a stable release - not an alpha or beta if the package is about stable releases.
1. The newer version that is cross platform is available for Windows. Sometimes the release of the Windows version may lag behind availability on other platforms.
1. It has been at least a day since the new release. Sometimes the package automatically updates - check to see if the package is an automatically updating package in the description of the package. Typically if it has been more than 48 hours since the updated version is available, it's a good time to let the maintainers know they should update the package.
1. The package doesn't already have a newer version in moderation. The maintainer(s) may already be actively working towards getting a newer version up on the community feed.
![versions awaiting moderation](images/triage-waiting.jpg)

## The Triage Process
So a package needs fixed or updated. You have reached out to the maintainer or Disqus already and are curious what the next steps are. We will elaborate on all of the steps here, including contacting the maintainers.

1. The first step is to contact the maintainers. 
1. If you are able to provide a fix, that's even better. Look for the maintainer's package source. Please look for package source url information on the package page.  
![Package source link](images/triage-packagesource.jpg)
1. If you are still looking for a way to provide a fix, but don't find a package source link on the package itself, you can try to find it in one of the maintainer's profiles (this is an older method of finding your way to a maintainer's packages source).
![maintainers are links](images/triage-maintainerlinks.jpg)
![maintainer profile with github repository link](images/triage-maintainerrepository.jpg)
1. If the maintainer(s) do[es] not respond within a few days, it's possible they haven't received your message or don't watch the repository. It's also possible they are on holiday. Use the contact site admins link to contact the site curators, who will attempt to triage the situation.   
![Contact admins link](images/triage-siteadmins.jpg)
1. If you don't hear anything back from the curators within 2 days (usually same day response), then you send a message to the Chocolatey google group (https://groups.google.com/group/chocolatey) and we work to contact the maintainers.
1. If the maintainer(s) are unresponsive after a period of time (determined by the admins), the package is considered abandoned. The curators will TOS the package and new folks can be added as maintainers. The moderators will ask if you would like to become a maintainer of the package. If you choose to become a new maintainer, see the next section.  If you choose not to become a maintainer, please create a RFM (request for maintainership) issue at [Chocolatey Package Requests (https://github.com/chocolatey/chocolatey-package-requests)](https://github.com/chocolatey/chocolatey-package-requests).

**NOTE**: We don't have non-maintainer uploads in the community feed and we haven't needed them yet.

### New Maintainers
Sometimes this results in new maintainers. You can be a maintainer updating the project at a central location that multiple maintainers share. However, if you became maintainer because the package was deemed abandoned, you will want to follow the instructions for a [Package Maintainer Handover/Switch](PackageMaintainerHandover).