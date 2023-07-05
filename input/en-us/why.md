hello.chocolatey---
Order: 20
xref: why
Title: Why Chocolatey?
Description: Why should I use Chocolatey
RedirectFrom: docs/why
---

"You've never deployed software faster than you will with Chocolatey." -Rob Reynolds

Chocolatey is software management automation.

Chocolatey works with over 20+ installer technologies for Windows, but it can manage things you would normally xcopy deploy (like runtime binaries and zip files). You can also work with registry settings or managing files and configurations, or any combination. Since it uses PowerShell, if you can dream it, you can do it with Chocolatey.

Chocolatey builds on technologies that are familiar:

* PowerShell
* Unattended installations

We didn't try to reinvent the wheel with Chocolatey. We are building on technologies you know, technologies you may have been using for years. It's going to feel good knowing that time you have spent working with software deployment plugs right into Chocolatey in a much better and more manageable way. Welcome to sane software management. With those familiar technologies, Chocolatey brings the concepts of true package management to allow you to version things, manage dependencies and installation order, better inventory management, and other features.

Chocolatey also integrates with [infrastructure management tools (like Puppet, Chef or SCCM)](xref:integrations) and other remote administration tools (like LabTech or LANDesk).

You are going to find the simplicity and absolute power of Chocolatey reinvigorating for Windows software deployments. Yes, we know that is a bold statement. Yes, we have hundreds of organizations and thousands of individuals that use Chocolatey that will back that statement up.

Chocolatey is the package manager for Windows.

## What is the purpose of Chocolatey?

How many times do you hear about an awesome tool/application from your friends and want to try it out? How much effort do you go through to set a tool and all of its requirements up on your machine? Do you realize that all of this manual effort is a pain? It's a pain we are used to! It's something we just do and don't realize we are wasting time doing all of this manual process. And worse, when we install applications it's always... Next Next Next Finish.

There is a better way! Once you start to use Chocolatey to silently install applications, tools, and to quickly set up things on your machine, you will start to realize that it is more of a global automation tool. That makes it an enabler, enabling you to do just about anything. And to repeat it anywhere in the world with little more than an internet connection.

Because Chocolatey is built on top of the NuGet infrastructure, that means you can install packages from Chocolatey.org, NuGet.org, MyGet.org, file shares, directories, custom feeds and from private feeds. That means you can set up your own server (even private) and your own internal packages with more company specific packages.

[Tell me a story](xref:chocolatey-story)

## What is Chocolatey?

Chocolatey helps good developers and system administrators become outstanding developers/sysadmins. Chocolatey goes to *eleven*.

Chocolatey is something **you need if you've ever installed, upgraded, or removed software on Windows**. It is an **existing, proven**, project that was started [in 2011](https://github.com/ferventcoder/nugetpackages/commit/d16ed7ac675395b3bb8ecee90fb13efb03d4b619). For those familiar with \*nix package managers, it is a binary package manager, sort of like yum or apt-get, but for Windows. The words "binary package manager" can be confusing for those who don't know what that means, but bear with me for a few minutes. Chocolatey is a tool that automates all the mundane getting and installing software work for you. You just select what you want installed and within a few minutes, Chocolatey has downloaded and installed (or upgraded) that software without need for further input from you. So **while Chocolatey does the hard work, you can go get some coffee**. Or **sleep**. Or do other more important things.

This may not seem very powerful at first, but imagine when you want to **upgrade all** of the software on your system to the latest, most secure versions, how do you do that now? Right. **Manually**:

1. Search for most recent version
1. Pick (hopefully) the right download
1. Wait for it to download
1. Unblock it
1. Install it manually (next, next, next anyone?)
1. Hope it didn't install any malware
1. Now do it again for **EVERY** piece of software on your system.

![chris-farley-disbelief](/assets/images/gifs/chris-farley-disbelief.gif)

Now contrast that with how you do the same with **Chocolatey**:

1. Open command line.
1. Type `choco upgrade all -y`
1. Walk away

![shia-labeouf-magic-gif](/assets/images/gifs/shia-labeouf-magic.gif)

<a name="can-i-use-chocolatey-with-existing-software"></a>

## Can I use Chocolatey with existing installed software?

Yes, yes you can. Chocolatey works in a similar manner to how you would do things if you downloaded and installed things yourself. Its design and infrastructure is built that way on purpose. It takes the pain of manually doing it yourself away (see previous section).

![Yes, yes](/assets/images/gifs/clint-eastwood-nodding.gif)

Now, Chocolatey **can** take over existing installs and be able to handle uninstalls in most cases. **Can** is very dependent on packaging and the underlying software installer that is used for the install ([installer packages](xref:faqs#what-distinction-does-chocolatey-make-between-an-installable-and-a-portable-application) are the context here).

Let me start by saying that testing how a single package won't give you a warm and fuzzy about how it will work with all packages. Software installers in the wild world of Windows have many completely different ways of going about things, all of which are dependent on those creating the installers, none of which have a consistent standard (except maybe MSI). Welcome to Windows.

Now that we have baselined that - each piece of software out there is a special snowflake, so  each package has to be able to account for differences in the installers.

So when a package takes over the existing install, if the registry snapshot doesn't differ, it won't be able to automatically uninstall it (if you have autoUninstaller turned on, check `choco feature`). If there is no `chocolateyUninstall.ps1` that would uninstall the software, choco won't be able to uninstall it. At some point it will though, choco continues to get better at things. And at some point in the near future it will contain a check to do nothing for an install if a registry key exists (and record that for later uninstall).

The question I need to ask is whether you are worse off by adding choco into the mix? It handles upgrades for you. It brings about some level of consistency and a unifying interface to this madness that is the Windows installer infrastructure.

## Why not use an existing Windows package manager?

Believe me, I wanted there to be something existing on Windows that would fit the bill. Package management is not a glorious job. Especially on Windows. It's taking all of the different native installers, archives, and straight executable downloads and making a simple interface for consumers to issue the same install command for all of them. Here are/were my needs:

* Good CLI that is simple to use.
* Main repository that takes packages contributions from the community (and is being maintained).
* Ability to use additional/multiple sources.
* Meta packages that can chain dependencies.
* Virtual packages.
* Packages should be easy to create / maintain.
* Packages should be concise and be able to be created without worrying about distribution rights.
* Unattended installs
* Installation of multiple packages with one command.

To date, Chocolatey does all of this (virtual packages is coming).

## Other questions?

See the [FAQs](xref:faqs).
