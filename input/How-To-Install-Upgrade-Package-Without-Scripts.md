# How To Install or Upgrade a Package Without Running Scripts

So you've updated your applications manually or through some other means or you want to make Chocolatey aware of some previously installed applications without actually running the installation scripts.

**NOTE**: [Chocolatey Pro+](https://chocolatey.org/compare) has [[automatic sync|FeaturesSynchronize]] to handle this. [Chocolatey for Business](https://chocolatey.org/compare) also has `choco sync` that can generate packages on the fly and baseline them to the system. The [[sync command|FeaturesSynchronize]] is also able to link up installed packages that are installed through this manner so they track the package to the software (something you won't get without running the install script).

**NOTE**: This is considered an advanced scenario - make sure you read and understand everything here before trying it. You may mess something up if you don't understand the full implication of what you are doing.

<!-- TOC -->

- [Installing a Package Without Running Install Script](#installing-a-package-without-running-install-script)
  - [Community Feed has a package with your version](#community-feed-has-a-package-with-your-version)
  - [Community feed has newer version than you](#community-feed-has-newer-version-than-you)
  - [Community Feed has a package older than your version](#community-feed-has-a-package-older-than-your-version)
- [Upgrade a Package Without Running Scripts](#upgrade-a-package-without-running-scripts)
  - [Application is self-updating (like Google Chrome)](#application-is-self-updating-like-google-chrome)
  - [The software was upgraded but not the package](#the-software-was-upgraded-but-not-the-package)
  - [The software was upgraded but not the package and Community Feed is outdated](#the-software-was-upgraded-but-not-the-package-and-community-feed-is-outdated)

<!-- /TOC -->

## Installing a Package Without Running Install Script

The first thing to understand is that in most instances when you want to bring Chocolatey knowledgeable about an already installed application, if there is a version match out there (wherever your sources point), then this process is so much better.

We normally recommend just calling the install as usual with no special switches and letting it handle the install - normally this turns into a no state change scenario for the computer (that is, the end state is that your application is still installed and Chocolatey now knows about it). In most cases it will ensure that the link for tracking the package to the software for automatic uninstalls is covered.

**NOTE**: If no scripts are run, Chocolatey cannot link the package to the software, so things like AutoUninstaller will not be able to be used until you have also run an upgrade (unless you use [["choco sync"|FeaturesSynchronize]] - see above).

However if you are sold on skipping the automation scripts and tricking Chocolatey into believing that a script is installed, then continue reading.

If you wander over to [[install switches|CommandsInstall#options-and-switches]] you will see

~~~
-n, --skippowershell, --skip-powershell
  Skip Powershell - Do not run chocolateyInstall.ps1. Defaults to false.
~~~

This switch is going to be very important for you. Now we will go through some scenarios to help you make the best decision.

### Community Feed has a package with your version
Consider the following scenario:

* You have Firefox version 1.0.0 installed
* You do not have a package installed for Firefox.
* You see Chocolatey.org (the community feed) has a version of Firefox 1.0.0 (package id is firefox). It may or may not be the latest version.

Your command could be

`choco install firefox -n -y --version 1.0.0`

**Recommendation**: You should try to just install the package first and see what happens. In some cases the package may do additional things like update the path or do some helpful configuration for you (although this is not usually the case). If it fails or doesn't work, you can always fall back to skipping the install script as in the command above.

### Community feed has newer version than you
Consider the following scenario:

* You have Firefox version 1.0.0 installed.
* You do not have a package installed for Firefox.
* You see Chocolatey.org (the community feed) has a newer version of Firefox 2.0.0 (package id is firefox) as the latest version.

**Recommendation**: You should run the regular choco install (without the skip powershell argument) for Firefox and allow Chocolatey to upgrade the installed version. Check the package files first to be sure it is the same type of install (native installer versus zip archives). You can download the package and review the install script. You can also use `--noop` as part of your install arguments to see the script.

### Community Feed has a package older than your version
Consider the following scenario:

* You have Firefox version 2.0.0 installed.
* You do not have a package installed for Firefox.
* You see Chocolatey.org (the community feed) has a latest version of Firefox 1.8.0 (package id is firefox).
* There is no newer version than this available.

Your command could be:

`choco install firefox -n -y --version 1.8.0`

**Recommendation**: Ask the maintainer to update the package. Don't allow choco to know about an older version of a package. If the maintainer provides an update of 1.9.0 without also providing an update at or above your currently installed version, running upgrade later may put your installed software down to the version that is installed by the package. This is definitely not a situation you want to be in.

Additional thoughts: You could install the older version of the package (with the `-n` argument) and promptly [[pin|CommandsPin]] that version until the newer version is available. If you don't already have the package installed though, it's better to wait for the newer version to become available.

## Upgrade a Package Without Running Scripts

### Application is self-updating (like Google Chrome)
Consider the following scenario:

* You have installed Google Chrome from Chocolatey.org (package id is googlechrome)
* Google Chrome self-updates
* Choco version is out of sync with installed version

**Recommendation**: You should [[pin|CommandsPin]] the package to suppress upgrades. The self-updating scenario is keeping you on the latest version and you want to stay up to date with the latest version that may have security fixes in addition to other things.

You should run

`choco pin add -n=googlechrome`

For more information see [[Pin Command|CommandsPin]].

### The software was upgraded but not the package

Similar to the above scenario, but perhaps you upgraded the software manually outside of Chocolatey.

Consider the following scenario:

* You have Firefox version 1.0.0 installed.
* The install came from installing the firefox 1.0.0 package.
* You upgraded Firefox manually to 2.0.0 (ignore for a second that real-world Firefox auto-upgrades, this is an example for pete's sake ;) )
* Chocolatey.org also has 2.0.0.

See [Install when community feed has a package with your version](#community-feed-has-a-package-with-your-version) - substitute `upgrade` for `install` if you must. Follow the recommendation.

### The software was upgraded but not the package and Community Feed is outdated

Similar to the above scenario, but perhaps you upgraded the software manually outside of Chocolatey.

Consider the following scenario:

* You have Firefox version 1.0.0 installed.
* The install came from installing the firefox 1.0.0 package.
* You upgraded Firefox manually to 2.0.0 (ignore for a second that real-world Firefox auto-upgrades, this is an example for pete's sake ;) )
* Chocolatey.org only has up to 1.8.0.

See [Community Feed has a version older than your version](#community-feed-has-a-package-older-than-your-version) - substitute `upgrade` for `install` if you must. Follow the recommendation.

**Additional Recommendation**: You may also want to bump it to 1.8.0 using the skip argument (`-n`) and then promptly [[pin|CommandsPin]] the package until a newer version is available.

~~~
choco upgrade firefox -n -y --version 1.8.0
choco pin add -n=firefox
~~~
