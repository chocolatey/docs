# Frequently Asked Questions
<!-- TOC insertAnchor:true -->

- [General](#general)
  - [Can't find your answer here?](#cant-find-your-answer-here)
  - [What is Chocolatey?](#what-is-chocolatey)
  - [I need a tool that manages software - using scripts to work with those unattended installs. Is that Chocolatey?](#i-need-a-tool-that-manages-software---using-scripts-to-work-with-those-unattended-installs-is-that-chocolatey)
  - [What is the purpose of Chocolatey?](#what-is-the-purpose-of-chocolatey)
  - [How does Chocolatey work?](#how-does-chocolatey-work)
  - [Why Chocolatey?](#why-chocolatey)
  - [Can I use Chocolatey at my organization?](#can-i-use-chocolatey-at-my-organization)
  - [Are you redistributing software?](#are-you-redistributing-software)
  - [Where does Chocolatey install by default?](#where-does-chocolatey-install-by-default)
  - [What kind of package types does Chocolatey support?](#what-kind-of-package-types-does-chocolatey-support)
  - [Do you have a roadmap I can see?](#do-you-have-a-roadmap-i-can-see)
- [Security](#security)
  - [Is Chocolatey secure?](#is-chocolatey-secure)
  - [Why do I have to confirm packages now? Is there a way to remove this?](#why-do-i-have-to-confirm-packages-now-is-there-a-way-to-remove-this)
  - [What doesn't the website implement x security standard?](#what-doesnt-the-website-implement-x-security-standard)
  - [I have other security questions](#i-have-other-security-questions)
- [Using Chocolatey](#using-chocolatey)
  - [Can I use Chocolatey in a cmd.exe shell?](#can-i-use-chocolatey-in-a-cmdexe-shell)
  - [Tab-completion?](#tab-completion)
  - [What is the difference between Open Source Chocolatey, Chocolatey Pro, and Chocolatey for Business?](#what-is-the-difference-between-open-source-chocolatey-chocolatey-pro-and-chocolatey-for-business)
  - [I'm interested in C4B (Chocolatey for Business) but I have questions.](#im-interested-in-c4b-chocolatey-for-business-but-i-have-questions)
  - [Does Chocolatey require administrative permissions to run?](#does-chocolatey-require-administrative-permissions-to-run)
  - [I would like to be able to offer my non-admin desktop users an option for self-service type of installations.](#i-would-like-to-be-able-to-offer-my-non-admin-desktop-users-an-option-for-self-service-type-of-installations)
  - [Can I use Chocolatey with existing installs?](#can-i-use-chocolatey-with-existing-installs)
  - [What is the default package source repository URL (community feed url)?](#what-is-the-default-package-source-repository-url-community-feed-url)
  - [What can I install?](#what-can-i-install)
  - [What if I install X and I already have X installed?](#what-if-i-install-x-and-i-already-have-x-installed)
  - [Can I override the installation directory?](#can-i-override-the-installation-directory)
  - [What distinction does Chocolatey make between an installable and a portable application?](#what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application)
    - [Installable application](#installable-application)
    - [Portable application – something that doesn't require a system install to use](#portable-application--something-that-doesnt-require-a-system-install-to-use)
  - [Why doesn't a package install software to Program Files?](#why-doesnt-a-package-install-software-to-program-files)
  - [What is the difference between packages no suffix as compared to *.install *.portable?](#what-is-the-difference-between-packages-no-suffix-as-compared-to-install-portable)
  - [When I install a portable app like autohotkey.portable, how is it on my path? Without littering my path?](#when-i-install-a-portable-app-like-autohotkeyportable-how-is-it-on-my-path-without-littering-my-path)
  - [Is there a PowerShell Module for Chocolatey?](#is-there-a-powershell-module-for-chocolatey)
  - [Does Chocolatey run on macOS/Linux?](#does-chocolatey-run-on-macoslinux)
- [Troubleshooting](#troubleshooting)
  - [I'm running into some issue with Chocolatey, packaging, or something else.](#im-running-into-some-issue-with-chocolatey-packaging-or-something-else)
- [Organizational Use](#organizational-use)
  - [I would like to use Chocolatey in my organization, is the licensing friendly?](#i-would-like-to-use-chocolatey-in-my-organization-is-the-licensing-friendly)
  - [Should my organization depend on (use) the community feed (https://chocolatey.org/packages)?](#should-my-organization-depend-on-use-the-community-feed-httpschocolateyorgpackages)
  - [Chocolatey is great! I need it to do something additional for my organization.](#chocolatey-is-great-i-need-it-to-do-something-additional-for-my-organization)
- [Licensed Editions](#licensed-editions)
  - [What is the difference between FOSS and the licensed editions?](#what-is-the-difference-between-foss-and-the-licensed-editions)
  - [Are the licensed editions costs annual?](#are-the-licensed-editions-costs-annual)
  - [Can you do monthly?](#can-you-do-monthly)
  - [What is C4B?](#what-is-c4b)
  - [I have not received my license.](#i-have-not-received-my-license)
  - [I just purchased and I need my license sooner!](#i-just-purchased-and-i-need-my-license-sooner)
  - [I have a different question about the licensed edition.](#i-have-a-different-question-about-the-licensed-edition)
- [Packaging](#packaging)
  - [What can a Chocolatey Package consist of?](#what-can-a-chocolatey-package-consist-of)
  - [Tell me about packaging](#tell-me-about-packaging)
  - [How do I create packages?](#how-do-i-create-packages)
  - [I'm creating packages with the software contained in the package.](#im-creating-packages-with-the-software-contained-in-the-package)
  - [I'm creating internal or offline packages, what do I need?](#im-creating-internal-or-offline-packages-what-do-i-need)
- [Videos / Reference](#videos--reference)
  - [Where can I learn more?](#where-can-i-learn-more)
  - [Do you have any references or videos I can see?](#do-you-have-any-references-or-videos-i-can-see)
  - [Is there a video I can watch to show me Chocolatey in action?](#is-there-a-video-i-can-watch-to-show-me-chocolatey-in-action)
- [Community Package Repository](#community-package-repository)
  - [I just took over as the primary maintainer of a package. What do I need to do?](#i-just-took-over-as-the-primary-maintainer-of-a-package-what-do-i-need-to-do)
  - [What is moderation?](#what-is-moderation)
  - [How does the moderation review process work?](#how-does-the-moderation-review-process-work)
  - [What is a trusted package?](#what-is-a-trusted-package)
  - [How do I install a package version under moderation?](#how-do-i-install-a-package-version-under-moderation)
  - [How do I install an unlisted package / package version?](#how-do-i-install-an-unlisted-package--package-version)
  - [How do I install a rejected package?](#how-do-i-install-a-rejected-package)
  - [How do I self-reject a package?](#how-do-i-self-reject-a-package)
  - [What is the validator?](#what-is-the-validator)
  - [What is the verifier?](#what-is-the-verifier)
  - [What is the package scanner?](#what-is-the-package-scanner)
  - [What is the package cacher?](#what-is-the-package-cacher)
- [Comparison](#comparison)
  - [How is Chocolatey different than OneGet/PowerShell Package Management?](#how-is-chocolatey-different-than-onegetpowershell-package-management)
  - [How is Chocolatey different than Ninite?](#how-is-chocolatey-different-than-ninite)
  - [How is Chocolatey different than NuGet and/or OpenWrap?](#how-is-chocolatey-different-than-nuget-andor-openwrap)
  - [How is/will Chocolatey be different than apt?](#how-iswill-chocolatey-be-different-than-apt)

<!-- /TOC -->

<a id="markdown-general" name="general"></a>
## General

<a id="markdown-cant-find-your-answer-here" name="cant-find-your-answer-here"></a>
### Can't find your answer here?
Feel free to reach out to us on [Gitter](https://gitter.im/chocolatey/choco) or by the [email distribution list / forum](https://groups.google.com/group/chocolatey).

<a id="markdown-what-is-chocolatey" name="what-is-chocolatey"></a>
### What is Chocolatey?
Chocolatey is kind of like apt-get, but for Windows (with Windows comes limitations). It is a machine level package manager that is built on top of nuget command line and the nuget infrastructure.
[[More behind the name|History]]

"Okay, machine package manager, that's nice. What does that mean though?" It means you can simply install software with a few keystrokes and go get coffee while your co-workers are downloading and running an install manually (and I do mean something like an MSI).

How about updates? Wouldn't it be nice to update nearly everything on your machine with a few simple keystrokes? We think so, too. Chocolatey does that. `choco upgrade all -y`

<a id="markdown-i-need-a-tool-that-manages-software---using-scripts-to-work-with-those-unattended-installs-is-that-chocolatey" name="i-need-a-tool-that-manages-software---using-scripts-to-work-with-those-unattended-installs-is-that-chocolatey"></a>
### I need a tool that manages software - using scripts to work with those unattended installs. Is that Chocolatey?
Yes, in a nutshell that is what Chocolatey does. Nearly exactly what you may already be doing, except wrapped up into a package file that allows you to modularize and easily manage order with dependencies on other packages.

<a id="markdown-what-is-the-purpose-of-chocolatey" name="what-is-the-purpose-of-chocolatey"></a>
### What is the purpose of Chocolatey?

Great question! See [[The purpose of Chocolatey|Why#what-is-the-purpose-of-chocolatey]]

<a id="markdown-how-does-chocolatey-work" name="how-does-chocolatey-work"></a>
### How does Chocolatey work?

See [[What is Chocolatey?|Why#what-is-chocolatey]]

<a id="markdown-why-chocolatey" name="why-chocolatey"></a>
### Why Chocolatey?
First a [[story|ChocolateyStory]]. Then [[Why Chocolatey?|Why]]

<a id="markdown-can-i-use-chocolatey-at-my-organization" name="can-i-use-chocolatey-at-my-organization"></a>
### Can I use Chocolatey at my organization?
Absolutely! The licensing is very business friendly (plus we have [paid options](https://chocolatey.org/compare) to better help organizations - *hint, hint*). We typically recommend organizations depending Chocolatey look to managing their own packaging as opposed to using the Community Package Repository (https://chocolatey.org/packages) - packages there are not 100% reliable due to distribution rights with publicly available packages (which causes a major failure point). See the next question for details.

<a id="markdown-are-you-redistributing-software" name="are-you-redistributing-software"></a>
### Are you redistributing software?
No. Packages on Chocolatey's community repository (https://chocolatey.org/packages) are publicly available and as such they are subject to software distribution rights. With those packages the following applies:

> Chocolatey does the same thing that you would do based on the package instructions. This usually means going out and downloading an installer from the official distribution point and then silently installing it on your machine. With most packages this means Chocolatey is not redistributing software because they are going to the same distribution point that you yourself would go get the software if you were performing this process manually.

To put it another way, Microsoft would be quite upset if the Office 365 packages on the community repository actually contained the Office 365 binaries. This is not something organizations would be subject to when hosting their own internal package.

When you host internal packages, those packages can embed software and/or point to internal shares. You are not subject to software distribution rights, thus you can create packages that are more reliable, offline, and secure. See [[What are Chocolatey Packages|GettingStarted#what-are-chocolatey-packages]] for more details.

For more information on organizational cautions about the community package repository, see [[the community repository disclaimer|CommunityPackagesDisclaimer]].

<a id="markdown-where-does-chocolatey-install-by-default" name="where-does-chocolatey-install-by-default"></a>
### Where does Chocolatey install by default?
As of version 0.9.8.24, binaries, libraries and Chocolatey components install in ```C:\ProgramData\chocolatey``` (environment variable %ProgramData%) by default. This reduces the attack surface on a local installation of Chocolatey and limits who can make changes to the directory.

**NOTE:** Historically, Chocolatey installed to ```C:\Chocolatey``` and currently, performing an update of Chocolatey doesn't change the installation location, except for when the install path is `C:\chocolatey`. It will upgrade that path and all variables automatically.  For more information about why Chocolatey used ```C:\Chocolatey``` as the default location, look here - [[Default Install Reasoning|DefaultChocolateyInstallReasoning]]

<a id="markdown-what-kind-of-package-types-does-chocolatey-support" name="what-kind-of-package-types-does-chocolatey-support"></a>
### What kind of package types does Chocolatey support?
* Binary Packages – Installable/portable applications – This is 98% of the Chocolatey packages – most are pointers to the real deal native installers and/or zipped software.
* PowerShell Command Packages – Packages that have the suffix **.powershell** will install PowerShell scripts as commands for you to call from anywhere.
* Development Packages – Packages that have the suffix **.dev**. For instance [dropkick.dev](http://nuget.org/list/packages/dropkick.dev).
* Roadmap – Virtual Packages – Packages that are like a category, and you just want one package from that category. [Read more …](https://github.com/chocolatey/chocolatey/issues/7)

<a id="markdown-do-you-have-a-roadmap-i-can-see" name="do-you-have-a-roadmap-i-can-see"></a>
### Do you have a roadmap I can see?
We do, take a look at the [[roadmap|Roadmap]]



<a id="markdown-security" name="security"></a>
## Security

<a id="markdown-is-chocolatey-secure" name="is-chocolatey-secure"></a>
### Is Chocolatey secure?
Yes, it is. You can read more at [[security|Security]] to understand the important details.

<a id="markdown-why-do-i-have-to-confirm-packages-now-is-there-a-way-to-remove-this" name="why-do-i-have-to-confirm-packages-now-is-there-a-way-to-remove-this"></a>
### Why do I have to confirm packages now? Is there a way to remove this?
tl;dr - Yes, completely possible. Use `-y` or turn on `allowGlobalConfirmation`.

Also check out the help menus now - `choco -h`, `choco install -h`

Longer answer, we've moved a little closer towards other package managers for security reasons, where by default we stop and confirm if you are okay with the state change. We always communicate changes in the [[release notes|ReleaseNotes]] / [Changelog](https://github.com/chocolatey/choco/blob/master/CHANGELOG.md), which also end up in the [nuspec file](https://chocolatey.org/packages/chocolatey#releasenotes), so we highly recommend folks scan at least one of those to see anything tagged breaking changes. Always scan from your current version up to the one you are upgrading to so that you catch all changes.

The one that is the most important right now is the `x.y.z` release (in this case 0.9.9), once we reach v1 we will be fully SemVer compliant and breaking changes will constitute a major version bump (we're still SemVer in a less than v1), so you can scan breaking changes and major new features in an `x` release, new compatible features in a `.y` release, and `.z` releases will only contain compatible fixes for the current release.

0.9.9 introduced a new compiled client that was/is a total rewrite. 0.9.10 will have complete feature parity with the older client - see [FeatureParity](https://github.com/chocolatey/choco/labels/FeatureParity). Why the rewrite? For a more maintainable, faster client that can run on mono now, so you are not completely tied to Windows. We've started adding support for other install providers (like [Scriptcs](https://github.com/chocolatey/choco/issues/247)).

The [relevant bits of the release notes](ReleaseNotes#099-march-3-2015) for the FAQ:

 - [Security] Prompt for confirmation: For security reasons, we now stop for confirmation before changing the state of the system on most commands. You can pass `-y` to confirm any prompts or set a value in the config that will globally confirm and behave like older versions of Chocolatey (`allowGlobalConfirmation`, see `choco feature -h` for how to enable).

Some folks may find the change quite annoying. The perspective of some folks isn't the perspective of everyone and we have some very security-conscious folks that want a verification of what they requested is what they end up with. So this prompt is extremely important for them. We are moving to a more secure by default approach so this change was important to get us there. Security related changes are some of the only things you will see that affect Chocolatey in such a way.

We spent many months stressing over this change because of the breaking part and decided it wasn't going to get easier to change later. We've added the ability for you to set Chocolatey back to the way it was before with `allowGlobalConfirmation` and if the prompts annoy you, you should probably look at making this change.

<a id="markdown-what-doesnt-the-website-implement-x-security-standard" name="what-doesnt-the-website-implement-x-security-standard"></a>
### What doesn't the website implement x security standard?
While we keep up with most security aspects, sometimes we miss things. Always feel free to reach out to us if you feel there is something we should implement to make that better.

<a id="markdown-i-have-other-security-questions" name="i-have-other-security-questions"></a>
### I have other security questions
Please see [[security|Security]]. Please reach out to us if you cannot find answers to what you are looking for.



<a id="markdown-using-chocolatey" name="using-chocolatey"></a>
## Using Chocolatey

<a id="markdown-can-i-use-chocolatey-in-a-cmdexe-shell" name="can-i-use-chocolatey-in-a-cmdexe-shell"></a>
### Can I use Chocolatey in a cmd.exe shell?
Yes, Chocolatey has some official clients, one of which is `choco.exe` and it is a command line tool, so it works equally well in Powershell.exe and cmd.exe. However if you have the PowerShell profile installed, you also get tab completion in Powershell.exe.

<a id="markdown-tab-completion" name="tab-completion"></a>
### Tab-completion?
See the [[troubleshooting|Troubleshooting]] page if `choco <tab>` doesn't work for you when you are using PowerShell.

<a id="markdown-what-is-the-difference-between-open-source-chocolatey-chocolatey-pro-and-chocolatey-for-business" name="what-is-the-difference-between-open-source-chocolatey-chocolatey-pro-and-chocolatey-for-business"></a>
### What is the difference between Open Source Chocolatey, Chocolatey Pro, and Chocolatey for Business?
Great question, we have a comparison table listed at [compare](https://chocolatey.org/compare). There is also an FAQ section related specifically to licensing.

<a id="markdown-im-interested-in-c4b-chocolatey-for-business-but-i-have-questions" name="im-interested-in-c4b-chocolatey-for-business-but-i-have-questions"></a>
### I'm interested in C4B (Chocolatey for Business) but I have questions.
Please see [licensed editions](#licensed-editions) section below.

<a id="markdown-does-chocolatey-require-administrative-permissions-to-run" name="does-chocolatey-require-administrative-permissions-to-run"></a>
### Does Chocolatey require administrative permissions to run?
It does by default - based on where it is installed. However there is an non-administrative installation for Chocolatey under More Options at [[installation|Installation]]. Do keep in mind that there is pass through to what packages are doing that makes a determination for whether the package needs administrative permissions, and Chocolatey works within the context of Windows permissions, so you are not going to get around that (aside from what is provided with self-service, see question below).

<a id="markdown-i-would-like-to-be-able-to-offer-my-non-admin-desktop-users-an-option-for-self-service-type-of-installations" name="i-would-like-to-be-able-to-offer-my-non-admin-desktop-users-an-option-for-self-service-type-of-installations"></a>
### I would like to be able to offer my non-admin desktop users an option for self-service type of installations.
Yes, we absolutely support that scenario in Chocolatey for Business. See [Licensed Editions](#licensed-editions) for more information.

<a id="markdown-can-i-use-chocolatey-with-existing-installs" name="can-i-use-chocolatey-with-existing-installs"></a>
### Can I use Chocolatey with existing installs?
Fantastic question, see [[Can I use Chocolatey with existing software?|Why#can-i-use-chocolatey-with-existing-software]]

<a id="markdown-what-is-the-default-package-source-repository-url-community-feed-url" name="what-is-the-default-package-source-repository-url-community-feed-url"></a>
### What is the default package source repository URL (community feed url)?
That would be https://chocolatey.org/api/v2/ aka the Community Package Repository.

<a id="markdown-what-can-i-install" name="what-can-i-install"></a>
### What can I install?
You can package and install anything on Windows using Chocolatey - if it can be automated, Chocolatey and PowerShell can install, upgrade, and uninstall it.

However, if you are just curious on what is available in the community, check out the community package repository at http://chocolatey.org/packages. Note that it does have one large limitation, distribution rights, which makes the community package repository not fully reliable like an internal repository which is not subject to distribution rights.

You can also install packages from other sources (nuget.org, rubygems.org, web pi tools, etc).

<a id="markdown-what-if-i-install-x-and-i-already-have-x-installed" name="what-if-i-install-x-and-i-already-have-x-installed"></a>
### What if I install X and I already have X installed?
With most packages when you already have something installed, the Chocolatey process will just perform the install again silently. Most times this means that it does nothing and in the end you have what you already had.

<a id="markdown-can-i-override-the-installation-directory" name="can-i-override-the-installation-directory"></a>
### Can I override the installation directory?
Yes you can, see [[Overriding install directory|GettingStarted#overriding-default-install-directory-or-other-advanced-install-concepts]] and [[Ubiquitous Install Directory Option|FeaturesInstallDirectoryOverride]].

<a name="AppVsTool"></a>
<a id="markdown-what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application" name="what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application"></a>
### What distinction does Chocolatey make between an installable and a portable application?
<a id="markdown-installable-application" name="installable-application"></a>
#### Installable application
An installable application is something that comes with a native installer and ends up in the add/remove programs (in control panel of the system).
Installable applications end up where the native installer wants them to end up (i.&nbsp;e. Program Files). If you want to override that, please feel free to with the proper commands using InstallArgs (-ia) at the command line and possibly override – Install Command. Yes this does mean you will need to have intimate knowledge of the installer. Having Chocolatey itself make the override directory is likely at some point, but it is wwwwaaaaayyyy out on the radar (like after Rob is somehow paid to work on Chocolatey full time ;) ).

<a id="markdown-portable-application--something-that-doesnt-require-a-system-install-to-use" name="portable-application--something-that-doesnt-require-a-system-install-to-use"></a>
#### Portable application – something that doesn't require a system install to use
A portable application is something that doesn't require a native installer to use. In other words, it is not “installed” on your system (where you can go to uninstall in the control panel). It also requires no administrative access for the package install.

Portable applications end up in the %ChocolateyInstall%/lib (i.&nbsp;e. C:\ProgramData\Chocolatey\lib) folder yes, but they get a "shim" to put them on the path of the machine. This behavior is very much to how Chocolatey works and is not configurable (the directory). Where the portable apps end up is still going to be %ChocolateyInstall%/lib no matter where you move the directory, unless a package itself unpacks the portable app elsewhere (as in the case of [git-tfs](http://chocolatey.org/packages/gittfs)).

<a id="markdown-why-doesnt-a-package-install-software-to-program-files" name="why-doesnt-a-package-install-software-to-program-files"></a>
### Why doesn't a package install software to Program Files?
Most packages that use native installers (MSI, InnoSetup, etc) will install to Program Files, but there are packages that do not. There are two really important reasons why:

* Program Files is synonymous with software that has uninstall registry keys - or put another way, applications that have native installers that you can find for uninstall in the Control Panel under Programs and Features.
* Writing to Program Files requires administrative permissions and the package you are installing is likely a portable package (even if not explicitly named so, it may have a zip that it extracts). There is also a way for non-administrators to use Chocolatey and these types of packages need to work for them as well.

It really depends on the underlying software the package "installs". If the underlying software is a native installer, then it has a machine install (meaning it gets an uninstall registry key and shows up in Programs and Features) and Program Files is the appropriate place for it.

Chocolatey has a different avenue for portable packages that allows both admins and non-admins to be able to use these packages, after all they are just downloading and unzipping an archive. These packages either go into a Tools Root location or just get shims (executables are put on the path) and continue to stay in the Chocolatey lib directory. If we restricted a non-admin for an avenue that would work for them manually, it wouldn't make choco useful for them at all. Since we support non-admin usage of Chocolatey, packages that can support the portable model should support it.

Also consider that if the package **is** using `$env:ChocolateyBinRoot` (which will later be named `$env:ChocolateyToolsRoot`) you can set the root under Program Files and then you get the better of both worlds.

<a id="markdown-what-is-the-difference-between-packages-no-suffix-as-compared-to-install-portable" name="what-is-the-difference-between-packages-no-suffix-as-compared-to-install-portable"></a>
### What is the difference between packages no suffix as compared to *.install *.portable?

What is the difference between packages named *.install (i.&nbsp;e. [autohotkey.install](https://chocolatey.org/packages/autohotkey.install)), *.portable (i.&nbsp;e. [autohotkey.portable](https://chocolatey.org/packages/autohotkey.portable)) and * (i.&nbsp;e. [autohotkey](https://chocolatey.org/packages/autohotkey))?

tl;dr: Nearly 100% of the time, the package with no suffix (autohotkey in this example) is going to ensure the *.install. The package without the suffix is for both discoverability and for other packages to take a dependency on.

Hey, good question! You are paying attention! Chocolatey has the concept of virtual packages (coming) and meta packages. Virtual packages are packages that represent other packages when used as a dependency. Metapackages are packages that only exist to provide a grouping of dependencies.

A package with no suffix that is surrounded by packages with suffixes is to provide a virtual package. So in the case of git, git.install, and git.commandline (deprecated for .portable) – git is that virtual package (currently it is really just a metapackage until the virtual packages feature is complete). That means that other packages could depend on it and you could have either git.install or git.portable installed and you would meet the dependency of having git installed. That keeps Chocolatey from trying to install something that already meets the dependency requirement for a package.

Talking specifically about the *.install package suffix – those are for the packages that have a native installer that they have bundled or they download and run.

**NOTE:** the suffix *.app has been used previously to mean the same as *.install. But the *.app suffix is now deprecated and should not be used for new packages.

The *.portable packages are the packages that will usually result in an executable on your path somewhere but do not get installed onto the system (Add/Remove Programs). Previously the suffixes *.tool and *.commandline have been used to refer to the same type of packages.

**NOTE:** now *.tool and *.commandline are deprecated and should not be used for new packages.

Want more information? See http://ferventcoder.com/archive/2012/02/25/chocolatey---guidance-on-packaging-apps-with-both-an-install.aspx

<a id="markdown-when-i-install-a-portable-app-like-autohotkeyportable-how-is-it-on-my-path-without-littering-my-path" name="when-i-install-a-portable-app-like-autohotkeyportable-how-is-it-on-my-path-without-littering-my-path"></a>
### When I install a portable app like autohotkey.portable, how is it on my path? Without littering my path?
When you install portable apps that have executables in the package, Chocolatey automatically creates a "shim" file and puts that in a folder that is on the path. That allows you to run a portable application by asking for it on the command line.

When you take an application with a native installer, say like WinDirStat, it is only on your path if the native installer has put it there or the instructions in the Chocolatey package itself has requested for it to be on the path. In this case, this is the “littering” the path concept.

<a id="markdown-is-there-a-powershell-module-for-chocolatey" name="is-there-a-powershell-module-for-chocolatey"></a>
### Is there a PowerShell Module for Chocolatey?
There is not any official ones from Chocolatey Software. If and when there is, it will be provided as a binary DLL likely.

The main Chocolatey client (choco.exe) is an executable client that has runs a PowerShell host in proc and has a PowerShell module it loads for those PowerShell automation scripts. Trying to get all of these ideas into a higher PowerShell module could be kind of difficult.

Even through it was originally written *in* PowerShell, **Chocolatey was NEVER a PowerShell module, it just used PowerShell as a programming language and was meant to be a CLI app.** I bolded this so it might get read twice. ;)

A little history - Chocolatey up until 0.9.9 was provided completely written in PowerShell, with the approach above. We know of no other app/tool that tried this approach when we did, which made the original Chocolatey client a rarity indeed. It paved the way for things like mocking in [Pester](https://github.com/pester/Pester) ([Matt Wrock](https://github.com/mwrock) [added mocking](https://github.com/pester/Pester/compare/b103a3db951f123c485289f02eaa1d6ef686c21b...4178c343a6574a8a9521be8a77006572fc49e311) after [Rob Reynolds](https://github.com/ferventcoder) [determined](https://github.com/chocolatey/chocolatey/commit/5b2887240dfbda86629d6a1a296129f3a561e86a#diff-b61a6d542f9036550ba9c401c80f00ef) [the](https://github.com/chocolatey/chocolatey/commit/cc4aca0dc48840c7113167bd08aeddcaf83f65c0#diff-b61a6d542f9036550ba9c401c80f00ef) [general way](https://github.com/chocolatey/chocolatey/commit/ee883242c962dc886cd1282e4dbe4121d4fcc6cd#diff-b61a6d542f9036550ba9c401c80f00ef) [it works](https://github.com/chocolatey/chocolatey/commit/654703b9d4388eb385776986ce6d0ee53485a146#diff-b61a6d542f9036550ba9c401c80f00ef) in PowerShell back in 2012).

<a id="markdown-does-chocolatey-run-on-macoslinux" name="does-chocolatey-run-on-macoslinux"></a>
### Does Chocolatey run on macOS/Linux?
Speaking of POSIX environments, ever since we released 0.9.9 back in 2015, we've had it running in Mono which allows you to do package maintenance and simple things outside of managing software installations on Linux and macOS environments.

In fact we first showed it off at PuppetConf 2014 (prior to the official March 2015 release!) - https://www.youtube.com/watch?v=cZl_wKSciVk

Do we have plans to support fully running on POSIX environments? We've discussed it, but have no official stance on it yet. Keep your eyes on the [[roadmap|Roadmap]]


<a id="markdown-troubleshooting" name="troubleshooting"></a>
## Troubleshooting

<a id="markdown-im-running-into-some-issue-with-chocolatey-packaging-or-something-else" name="im-running-into-some-issue-with-chocolatey-packaging-or-something-else"></a>
### I'm running into some issue with Chocolatey, packaging, or something else.
See [[Troubleshooting|Troubleshooting]]



<a id="markdown-organizational-use" name="organizational-use"></a>
## Organizational Use

<a id="markdown-i-would-like-to-use-chocolatey-in-my-organization-is-the-licensing-friendly" name="i-would-like-to-use-chocolatey-in-my-organization-is-the-licensing-friendly"></a>
### I would like to use Chocolatey in my organization, is the licensing friendly?

Yes, it is. Chocolatey carries a FOSS Apache 2.0 license, which is extremely business friendly. You can use Chocolatey and most of its infrastructure completely free. Chocolatey also has a business edition with features organizations need for better software management . See [Compare](https://chocolatey.org/pricing) for details.

<a id="markdown-should-my-organization-depend-on-use-the-community-feed-httpschocolateyorgpackages" name="should-my-organization-depend-on-use-the-community-feed-httpschocolateyorgpackages"></a>
### Should my organization depend on (use) the community feed (https://chocolatey.org/packages)?

For production-level scenarios, I couldn't justify giving up that level of control and trust to the internet in an organization. It's recommended that you copy and modify existing packages and/or create your own internal packages and host them internally. That way you can completely guarantee that an install/upgrade/uninstall will always work every time. See [[Security|Security#chocolateyorg-the-community-feed]] for more details.

If you are just setting up or updating developer workstations and can tolerate things breaking every once in awhile because internet/uncertainty, it's fine to use the community feed.

<a id="markdown-chocolatey-is-great-i-need-it-to-do-something-additional-for-my-organization" name="chocolatey-is-great-i-need-it-to-do-something-additional-for-my-organization"></a>
### Chocolatey is great! I need it to do something additional for my organization.
Please see https://chocolatey.org/compare - we may already support it doing that for the business edition. If not, feel free to reach out to our team.

Also see the [Licensed Editions](#licensed-editions) section below.



<a id="markdown-licensed-editions" name="licensed-editions"></a>
## Licensed Editions

<a id="markdown-what-is-the-difference-between-foss-and-the-licensed-editions" name="what-is-the-difference-between-foss-and-the-licensed-editions"></a>
### What is the difference between FOSS and the licensed editions?
A lot of that is covered in the FAQ on the [pricing](https://chocolatey.org/pricing#faq), but also be sure to check out the [comparison table](https://chocolatey.org/compare).

<a id="markdown-are-the-licensed-editions-costs-annual" name="are-the-licensed-editions-costs-annual"></a>
### Are the licensed editions costs annual?
They are, but we can also do multi-year if you need to support something closer to that model. We also have a perpetual for Chocolatey for Business. For more detail, please see the [pricing FAQ](https://chocolatey.org/pricing#faq).

<a id="markdown-can-you-do-monthly" name="can-you-do-monthly"></a>
### Can you do monthly?
Not at this current time. Please see the [pricing FAQ](https://chocolatey.org/pricing#faq) for more details.

<a id="markdown-what-is-c4b" name="what-is-c4b"></a>
### What is C4B?
That is the short name for Chocolatey for Business.

<a id="markdown-i-have-not-received-my-license" name="i-have-not-received-my-license"></a>
### I have not received my license.
The license email is sent from a support email at chocolatey dot io with an xml file (the license) attachment within 1-3 business days. If it has been 3 business days and you have not received your business license, please reach through the [sales contact](https://chocolatey.org/contact) (choose "Other") (or any method you may already have for contacting sales) to get this resolved.

Any number of things could have happened:

* The message could be block by your servers
* The message could be misidentified as spam

To reduce these kind of occurrences, please make sure you have whitelisted the following email domains:

* `chocolatey.io`
* `chocolatey.org`

Once you receive a few emails from there, it will give you an idea of how to lock that down further to fewer email addresses.

<a id="markdown-i-just-purchased-and-i-need-my-license-sooner" name="i-just-purchased-and-i-need-my-license-sooner"></a>
### I just purchased and I need my license sooner!
Just reply to the order email you receive and let us know so we can bump the priority of your order.

<a id="markdown-i-have-a-different-question-about-the-licensed-edition" name="i-have-a-different-question-about-the-licensed-edition"></a>
### I have a different question about the licensed edition.
Check out the FAQ on the [pricing](https://chocolatey.org/pricing#faq). If it doesn't answer your questions, please feel free to reach out to the sales team from there!



<a id="markdown-packaging" name="packaging"></a>
## Packaging

<a id="markdown-what-can-a-chocolatey-package-consist-of" name="what-can-a-chocolatey-package-consist-of"></a>
### What can a Chocolatey Package consist of?
See [[What are Chocolatey Packages?|GettingStarted#what-are-chocolatey-packages]]

<a id="markdown-tell-me-about-packaging" name="tell-me-about-packaging"></a>
### Tell me about packaging
Chocolatey packages are what we like to think of as just fancy zip files. Zip files that have package metadata about the package and the underlying software a package may represent, dependencies, and optional binaries, files, and/or optional PowerShell automation scripts.

<a id="markdown-how-do-i-create-packages" name="how-do-i-create-packages"></a>
### How do I create packages?
Try running `choco new test` from a command shell and inspect the output. You will find quite a bit of helpful information and just in time documentation in there.

<a id="markdown-im-creating-packages-with-the-software-contained-in-the-package" name="im-creating-packages-with-the-software-contained-in-the-package"></a>
### I'm creating packages with the software contained in the package.
Great! This is the most reliable use of Chocolatey, to embed the binaries directly in the package. See the next question for more details.

<a id="markdown-im-creating-internal-or-offline-packages-what-do-i-need" name="im-creating-internal-or-offline-packages-what-do-i-need"></a>
### I'm creating internal or offline packages, what do I need?
Well, if you are not creating packages for the community package repository, you have different rules that apply. Embed as much as possible into the package (as long as it is under 500MB you should see no issues). We typically recommend 500MB as the threshhold for organizations for the following reasons:

* a nupkg file size takes up some space
* files in the package directory (can be cleaned up as part of the script)
* the actual install location if using an installer
* MSI cache for MSIs - Windows caches the complete MSI binaries (and now you know where all that space went)

If you are on a licensed edition of Chocolatey, you can turn on Package Reducer and the first two items above no longer take up any significant space. This can reduce space usage in the order of GBs for some installations of Chocolatey. See [[Package Reducer|FeaturesPackageReducer]] for more details.



<a id="markdown-videos--reference" name="videos--reference"></a>
## Videos / Reference

<a id="markdown-where-can-i-learn-more" name="where-can-i-learn-more"></a>
### Where can I learn more?
We have a documentation section of the site at https://chocolatey.org/docs

<a id="markdown-do-you-have-any-references-or-videos-i-can-see" name="do-you-have-any-references-or-videos-i-can-see"></a>
### Do you have any references or videos I can see?
Yes we do, take a look at [[videos|Videos]] and [[known posts, presentations, etc|Resources]].

<a id="markdown-is-there-a-video-i-can-watch-to-show-me-chocolatey-in-action" name="is-there-a-video-i-can-watch-to-show-me-chocolatey-in-action"></a>
### Is there a video I can watch to show me Chocolatey in action?
There is! This is a long video due to slow internet connections, but watch the first 1:30ish minutes and the last 1:30ish minutes and that will give you a general idea. [http://www.youtube.com/watch?v=N-hWOUL8roU](http://www.youtube.com/watch?v=N-hWOUL8roU)

**NOTE:** This video shows dependency chaining, so you are seeing it install 11 applications/tools. It's also 6+ years old and there have been many, many improvements since then.



<a id="markdown-community-package-repository" name="community-package-repository"></a>
## Community Package Repository

<a id="markdown-i-just-took-over-as-the-primary-maintainer-of-a-package-what-do-i-need-to-do" name="i-just-took-over-as-the-primary-maintainer-of-a-package-what-do-i-need-to-do"></a>
### I just took over as the primary maintainer of a package. What do I need to do?
See [[Package Maintainer Handover|PackageMaintainerHandover]]

<a id="markdown-what-is-moderation" name="what-is-moderation"></a>
### What is moderation?
Related to the community package repository only (aka the default feed aka https://chocolatey.org/packages), we have a concept called moderation, where submitted packages are held until they are considered safe and of minimal quality for regular consumption.

Moderation involves checking a package version for quality (validation) and correctness, whether it installs and uninstalls correctly (verification). We have two automated services that validate and verify packages. The validator checks the quality of a package. If no requirements are flagged as failing review, it will be passed on to the verifier, which checks that the package actually works as intended (it may help to think of the validator as unit testing and the verifier as integration testing). If both of these automated reviews pass the package version is submitted to a moderator for final review and approval.

Things to note:
* We have trusted packages, and those packages skip human review/moderation.
* A maintainer can not moderate his/her own pkgs.
* You can see if a package has been verified by the green circle next to its name on the package page. If it is green or red, it will also be a clickable link. To see all packages verified, see https://gist.github.com/choco-bot
* Besides trusted packages, a package version is never approved without a moderator clicking approve.

<a id="markdown-how-does-the-moderation-review-process-work" name="how-does-the-moderation-review-process-work"></a>
### How does the moderation review process work?
See [[Review Process|Moderation#package-review-process]].

<a id="markdown-what-is-a-trusted-package" name="what-is-a-trusted-package"></a>
### What is a trusted package?
Related to the community package repository only (aka the default feed aka https://chocolatey.org/packages).

A package that is considered trusted comes from the original software creator or is maintained by someone in the community who has a track record for high quality and safe packages.

Two ways your packages can become trusted:
* You write the underlying software that the package installs. For instance the ReSharper package that comes directly from JetBrains.
* You put in a lot of good packages and your packages will eventually become trusted.

For a package to switch to trusted, a moderator must manually make the change. It is not an automated process.

**Note:** Once everything is ready, all packages will go under automated verification and validation and be held for fixes if they don't pass, even trusted packages.

**Note:** Another note, we've been setting trust per package. That is planned to change at some point for the most part as the trust level has always been about the maintainer and not always the package itself.

<a id="markdown-how-do-i-install-a-package-version-under-moderation" name="how-do-i-install-a-package-version-under-moderation"></a>
### How do I install a package version under moderation?
Related to the community package repository only (aka the default feed aka https://chocolatey.org/packages).

You can install a version of a package version that's still under moderation - however know that if the maintainer needs to fix the package version during the review process, you will never get those fixes locally since they are updating the ***SAME*** version. Package versions are not immutable until they are approved. The caveat for "never" is that if you know it changed (likely you won't and there is no notification, *what you have installed technically never existed*), you could force the reinstall of that same version of the package.

Another thing to consider: if the package version or the package as a whole is rejected (usually for renaming the package to something better to better meet naming standards), you are likely to get weird warnings later and won't see updates at all. Remember, you have installed something that technically never existed, so any thing you see related to choco not knowing about it is to be expected and not a bug.

To actually install, see the next question.

<a id="markdown-how-do-i-install-an-unlisted-package--package-version" name="how-do-i-install-an-unlisted-package--package-version"></a>
### How do I install an unlisted package / package version?
You need to specify name AND version to any package to install the unlisted/unapproved version. This goes for any NuGet compatible feed that understands unlisted packages.

<a id="markdown-how-do-i-install-a-rejected-package" name="how-do-i-install-a-rejected-package"></a>
### How do I install a rejected package?
Related to the community package repository only (aka the default feed aka https://chocolatey.org/packages), we have a concept of packages that have been rejected. You cannot install a rejected package. It could do bad things to your system so we don't allow install from the community repository.

<a id="markdown-how-do-i-self-reject-a-package" name="how-do-i-self-reject-a-package"></a>
### How do I self-reject a package?
**NOTE**: This applies during the moderation process only on the community repository. Once approved, there is no reject.

If you are a maintainer of a package and you would like to self-reject an older version of a package that is failing verification or validation, we support that. If however you just want to reject a working package because it is older, we don't support that. Rejected != Obsolete. It's really about when the underlying software has the same download url for every release so the older versions do not apply. If you are using checksums to verify the download (and you should be), then your older versions should start failing.

![image](https://cloud.githubusercontent.com/assets/63502/12429736/8c67689c-beb1-11e5-83e9-02fe1db91272.png)

* Failing verification -
![image](https://cloud.githubusercontent.com/assets/63502/12429697/509d2b94-beb1-11e5-9e1d-73a156117672.png)
* Failing validation - a message from the validator telling you it failed validation.

<a id="markdown-what-is-the-validator" name="what-is-the-validator"></a>
### What is the validator?
The [validator](https://github.com/chocolatey/package-validator) is a service that checks the quality of a package based on requirements, guidelines and suggestions for creating packages for Chocolatey’s community feed. Many of the validation items will automatically roll back into choco and will be displayed when packaging a package. We like to think of the validator as unit testing. It is validating that everything is as it should be and meets the minimum requirements for a package on the community feed.

What does the validator check? https://github.com/chocolatey/package-validator/wiki

<a id="markdown-what-is-the-verifier" name="what-is-the-verifier"></a>
### What is the verifier?
The [verifier](https://github.com/chocolatey/package-verifier) is a service that checks the correctness (that the package actually works), that it installs and uninstalls correctly, has the right dependencies to ensure it is installed properly and can be installed silently. The verifier runs against both submitted packages and existing packages (currently checking once a month that a package can still install and sending notice when it fails). We like to think of the verifier as integration testing. It’s testing all the parts and ensuring everything is good. On the site, you can see the current status of a package based on a little colored ball next to the title. If the ball is green or red, the ball is a link to the results (only on the package page, not in the list screen).

![Passing verification](https://cloud.githubusercontent.com/assets/63502/11872220/bf58f590-a499-11e5-84bb-6fcf6d320227.png)

* Green means good. The ball is a link to the results
* Orange if still pending verification (has not yet run).
* Red means it failed verification for some reason. The ball is a link to the results.
* Grey means unknown or excluded from verification (if excluded, a reason will be listed on the package page).

<a id="markdown-what-is-the-package-scanner" name="what-is-the-package-scanner"></a>
### What is the package scanner?
All packages (and the binaries they contain or download at runtime) on community repository are scanned by 50-60 antivirus scanners. We have partnered with [VirusTotal](https://virustotal.com) to provide this information back to the website so you can know when you are on a package page whether it is something you should be concerned with or not. It falls just under the files section of the package pages.

**NOTE**: Only en-US installers are tested by default via Chocolatey's Package Scanner

**NOTE**: Did you know that 60% or more of the sofware that is submitted to the community repository has its first scans by VirusTotal through Chocolatey's package scanner submissions? It's helped many of those anti-virus manufacturers get a clearer picture of heuristics and hopefully ends up in better anti-virus products with less false positives.

**NOTE**: Need runtime malware protection? Learn more about [[runtime malware protection|]]

<a id="markdown-what-is-the-package-cacher" name="what-is-the-package-cacher"></a>
### What is the package cacher?
On the community repository, we have a CDN cache for those files that would be downloaded by packages - those remote urls are overridden by default in licensed editions of Chocolatey to use those cached binaries. This is to avoid 404 errors you would normally see if those urls changed or were removed. See [[Customer CDN Download Cache|FeaturesPrivateCdn]] for more details.



<a id="markdown-comparison" name="comparison"></a>
## Comparison

<a id="markdown-how-is-chocolatey-different-than-onegetpowershell-package-management" name="how-is-chocolatey-different-than-onegetpowershell-package-management"></a>
### How is Chocolatey different than OneGet/PowerShell Package Management?
OneGet is a package manager ***manager***, which means [it is not really a package manager at all](http://blogs.msdn.com/b/garretts/archive/2015/05/05/10-things-about-oneget-that-are-completely-different-than-you-think.aspx). Chocolatey will have a provider that plugs right into OneGet. At the current time there is a CTP available, but it is based on 2 year old Chocolatey technology (we've had security fixes since then, plus a world of features), so we can't really recommend it. But if you must use it, make sure your PowerShell execution policy is set correctly and you are in an administrative console. See http://www.hanselman.com/blog/AptGetForWindowsOneGetAndChocolateyOnWindows10.aspx for more details.

Use ChocolateyGet for now.

<a id="markdown-how-is-chocolatey-different-than-ninite" name="how-is-chocolatey-different-than-ninite"></a>
### How is Chocolatey different than Ninite?
Great question, see [[Chocolatey vs Ninite|ChocolateyVsNinite]].

<a id="markdown-how-is-chocolatey-different-than-nuget-andor-openwrap" name="how-is-chocolatey-different-than-nuget-andor-openwrap"></a>
### How is Chocolatey different than NuGet and/or OpenWrap?
Chocolatey is a machine package manager. Where NuGet/OW are focused on developer library packages, Chocolatey is focused on applications and tools, and not necessarily developer focused.

A typical way of stating the difference is "Developers use NuGet to get 3rd party libraries that they use to build the .NET tools and applications that they release with Chocolatey!"

<a id="markdown-how-iswill-chocolatey-be-different-than-apt" name="how-iswill-chocolatey-be-different-than-apt"></a>
### How is/will Chocolatey be different than apt?

 * Chocolatey does not support the idea of source packages, which are packages that must be built to be used. For someone interested in that, check out https://github.com/Microsoft/vcpkg.
 * Library packages are not completely off the plate, but mostly. How would you link the library up to the application/tool?
