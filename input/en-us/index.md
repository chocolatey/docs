---
Order: 10
xref: home
Title: Chocolatey - Software Management for Windows
Description: Chocolatey Documentation
RedirectFrom:
  - docs/home
  - docs/
  - index.html
  - docs/index.html
---

## What is Chocolatey?

tl;dr Chocolatey is a software management solution that allows you to manage 100% of your software, anywhere you have Windows, with any endpoint management tool. No other solution (including newly announced solutions) reach this level of management - most only can manage to software in Programs and Features.

Chocolatey is a software management solution unlike anything else you've ever experienced on Windows. It focuses on simplicity, security, and infinite scalability. You write a software deployment in PowerShell once for any software (not just installers), then you can deploy it everywhere you have Windows with any solution that can manage systems (configuration management, endpoint management, etc) and track and manage updates of that software over time. Manage software on-premise, in the "Cloud", or in [Docker containers](https://github.com/Microsoft/vsts-agent-docker/blob/f870fbf259a803c6a6d902e1c01f631936069d66/windows/servercore/10.0.14393/standard/VS2017/Dockerfile) with Chocolatey.

Whew, that was a mouthful! For a bit more detail into what all of that means and more, see [What is Chocolatey?](xref:getting-started#what-is-chocolatey)

## Requirements

- Windows 7+/Windows 2003+ (Server Core also, but not Windows Nano Server)
- Windows PowerShell v2+ (not PowerShell Core aka PowerShell 6 yet)
- .NET Framework 4.x+
- See [Requirements](xref:getting-started#requirements)

## Information

- [Frequently Asked Questions](xref:faqs)
- [Why Chocolatey](xref:why)
- [License Acceptance Terms](xref:legal#package-license-acceptance-terms)
- [Waiver of Responsibility](xref:legal#waiver-of-responsibility)
- [Release Notes](xref:floss-release-notes)
- [Release Notes Commercial](xref:licensed-release-notes)

## Using Chocolatey

- [Installing Chocolatey](xref:setup-choco)
- [Uninstalling Chocolatey](xref:choco-uninstallation)
- [Getting Started](xref:getting-started)
- [Command Reference](xref:choco-commands)
- Use Chocolatey to set up [source code development environments](xref:development-environment-setup)!
- What distinction does Chocolatey make between an [installable and a portable application](xref:faqs#what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application)?

## Create Packages

The Chocolatey Community Repository versus for internal use has different needs. Keep that in mind as you read over the _TODO.txt you see when you run `choco new`.

- [Creating packages](xref:create-packages)
- [Package Function and Variable Reference](xref:powershell-reference)
- [Parse PackageParameters Argument](xref:parse-package-parameters)
- [Mount an Iso in Chocolatey Package](xref:mount-an-iso)
- [Deprecate a Chocolatey Package](xref:deprecate-a-package)
- [Chocolatey Community Repository](https://community.chocolatey.org/packages)
  - Keep in Mind [Distribution Rights](xref:legal#distributions)
  - [Outdated packages? Triage process](xref:package-triage-process)
  - [Moderation Process](xref:moderation)

## Individuals

- [Installing Chocolatey for Personal Use](https://chocolatey.org/install#individual)
- [Getting Started](xref:getting-started)
- [Command Reference](xref:choco-commands)

## Organizations

- [Installing Chocolatey For Organizations](https://chocolatey.org/install#organization)
- [Quick Deployment Environment](xref:qde)
- [Host Your Own Feed](xref:host-packages)
- [Deploy Chocolatey in an Organization](xref:organizational-deployment-guide)
- [Creating packages](xref:create-packages)
  - [Package Function and Variable Reference](xref:powershell-reference)
- [Getting Started](xref:getting-started)
- [Command Reference](xref:choco-commands)

## Road Map

Where are [we](xref:roadmap)? Where are we [going](xref:roadmap)?

### Important Reference Links

- [Chocolatey Website and Community Package Repository](https://chocolatey.org)
- [Mailing List](http://groups.google.com/group/chocolatey) / [Release Announcements Only Mailing List](https://groups.google.com/group/chocolatey-announce) / [Build Status Mailing List](http://groups.google.com/group/chocolatey-build-status)
- [Twitter](https://twitter.com/chocolateynuget) / [Facebook](https://www.facebook.com/ChocolateySoftware) / [Github](https://github.com/chocolatey)
- [Blog](https://chocolatey.org/blog) / [Newsletter](https://chocolatey.us8.list-manage1.com/subscribe?u=86a6d80146a0da7f2223712e4&id=73b018498d)
- [Documentation](https://docs.chocolatey.org) / [Support](https://chocolatey.org/support) / [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/chocolatey/choco?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## See It In Action

![Chocolatey Install](/assets/images/gifs/choco_install.gif)

## Who Are We?

You can find all of the members of the Chocolatey Team [here](https://github.com/orgs/chocolatey/people).
