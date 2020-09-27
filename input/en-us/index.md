---
Order: 10
Title: Chocolatey - Software Management for Windows
Description: Chocolatey Documentation
RedirectFrom:
  - docs/home
  - docs/
---

## What is Chocolatey?

tl;dr Chocolatey is a software management solution that allows you to manage 100% of your software, anywhere you have Windows, with any endpoint management tool. No other solution (including newly announced solutions) reach this level of management - most only can manage to software in Programs and Features.

Chocolatey is a software management solution unlike anything else you've ever experienced on Windows. It focuses on simplicity, security, and infinite scalability. You write a software deployment in PowerShell once for any software (not just installers), then you can deploy it everywhere you have Windows with any solution that can manage systems (configuration management, endpoint management, etc) and track and manage updates of that software over time. Manage software on-premise, in the "Cloud", or in [Docker containers](https://github.com/Microsoft/vsts-agent-docker/blob/f870fbf259a803c6a6d902e1c01f631936069d66/windows/servercore/10.0.14393/standard/VS2017/Dockerfile) with Chocolatey.

Whew, that was a mouthful! For a bit more detail into what all of that means and more, see [What is Chocolatey?](./usage/getting-started#what-is-chocolatey)

## Requirements

- Windows 7+/Windows 2003+ (Server Core also, but not Windows Nano Server)
- Windows PowerShell v2+ (not PowerShell Core aka PowerShell 6 yet)
- .NET Framework 4.x+
- See [Requirements](./usage/getting-started#requirements)

## Information

- [Frequently Asked Questions](./general/faqs)
- [Why Chocolatey](./why)
- [License Acceptance Terms](./additional-information/legal#package-license-acceptance-terms)
- [Waiver of Responsibility](additional-information/legal#waiver-of-responsibility)
- [Release Notes](./general/release-notes/open-source)
- [Release Notes Commercial](./general/release-notes/licensed)

## Using Chocolatey

- [Installing Chocolatey](./usage/installation)
- [Uninstalling Chocolatey](./usage/uninstallation)
- [Getting Started](./usage/getting-started)
- [Command Reference](./usage/commands/reference)
- Use Chocolatey to set up [source code development environments](./use-cases/development-environment-setup)!
- What distinction does Chocolatey make between an [installable and a portable application](./general/faqs#what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application)?

## Create Packages

The Chocolatey Community Repository versus for internal use has different needs. Keep that in mind as you read over the _TODO.txt you see when you run `choco new`.

- [Creating packages](./creating-packages/create-packages)
- [Package Function and Variable Reference](./creating-packages/helpers/reference)
- [Parse PackageParameters Argument](./how-tos/parse-packageparameters-argument)
- [Mount an Iso in Chocolatey Package](./how-tos/mount-an-iso-in-chocolatey-package)
- [Deprecate a Chocolatey Package](./how-tos/deprecate-a-chocolatey-package)
- [Chocolatey Community Repository](https://chocolatey.org/packages)
  - Keep in Mind [Distribution Rights](./additional-information/legal#distributions-aka-chocolatey-packages)
  - [Outdated packages? Triage process](./how-tos/package-triage-process)
  - [Moderation Process](./general/moderation)

## Individuals

- [Installing Chocolatey for Personal Use](https://chocolatey.org/install#individual)
- [Getting Started](./usage/getting-started)
- [Command Reference](./usage/commands/reference)

## Organizations

- [Installing Chocolatey For Organizations](https://chocolatey.org/install#organization)
- [Quick Deployment Environment](./quick-deployment)
- [Host Your Own Feed](./features/free/how-to-host-feed)
- [Deploy Chocolatey in an Organization](./how-tos/setup-offline-installation)
- [Creating packages](./creating-packages/create-packages)
  - [Package Function and Variable Reference](./creating-packages/helpers/reference)
- [Getting Started](./usage/getting-started)
- [Command Reference](./usage/commands/reference)

## Road Map

Where are [we](./roadmap)? Where are we [going](./roadmap)?

### Important Reference Links

- [Chocolatey Website and Community Package Repository](https://chocolatey.org)
- [Mailing List](http://groups.google.com/group/chocolatey) / [Release Announcements Only Mailing List](https://groups.google.com/group/chocolatey-announce) / [Build Status Mailing List](http://groups.google.com/group/chocolatey-build-status)
- [Twitter](https://twitter.com/chocolateynuget) / [Facebook](https://www.facebook.com/ChocolateySoftware) / [Github](https://github.com/chocolatey)
- [Blog](https://chocolatey.org/blog) / [Newsletter](https://chocolatey.us8.list-manage1.com/subscribe?u=86a6d80146a0da7f2223712e4&id=73b018498d)
- [Documentation](https://docs.chocolatey.org) / [Support](https://chocolatey.org/support) / [![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/chocolatey/choco?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## See It In Action

![Chocolatey Install](https://raw.githubusercontent.com/wiki/chocolatey/choco/images/gifs/choco_install.gif)

## Who Are We?

You can find all of the members of the Chocolatey Team [here](https://github.com/orgs/chocolatey/people).
