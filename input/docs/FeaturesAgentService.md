# Chocolatey Agent Service (Business Editions Only)

## Summary

> Empower your users and give your IT folks the precious gift of time to invest into taking your organization to the next level!

The Chocolatey Agent service allows you to go further with your software management, bringing Chocolatey to desktop users in organizations that have controlled environments. This provides users in controlled environments more empowerment and instant turn around on required software. This frees up IT folks and admins time to spend on making the organization even better.

The Chocolatey agent enables multiple features:

* The Background Service, aka Self-Service Anywhere
* Conmmunication to Chocolatey Central Management (CCM)
   * Reporting information to CCM
   * Deployments from CCM (endpoint management tasks)

The Chocolatey Agent can be independently configured to support any or all of these modes of operation independently.

<!-- TOC depthTo:6 -->

- [Summary](#summary)
- [Chocolatey Background Service / Self-Service Installer](#chocolatey-background-service--self-service-installer)
  - [See It In Action](#see-it-in-action)
- [Scenarios With Self-Service](#scenarios-with-self-service)
  - [Managing Very Large Installation Media](#managing-very-large-installation-media)
    - [Option 1 - Binary/Raw Repository](#option-1---binaryraw-repository)
    - [Option 2 - File Share](#option-2---file-share)
    - [Option 3 - File Share Managed Outside of Self-Service](#option-3---file-share-managed-outside-of-self-service)
    - [Recommendation](#recommendation)
  - [Managing Non-Silent Installers](#managing-non-silent-installers)
    - [Option 1 - MSI Repackaging](#option-1---msi-repackaging)
    - [Option 2 - Use Chocolatey Software's Professional Packaging Support Services](#option-2---use-chocolatey-softwares-professional-packaging-support-services)
    - [Option 3 - Window Automation Scripting](#option-3---window-automation-scripting)
    - [Recommendation](#recommendation-1)
- [Chocolatey Central Management](#chocolatey-central-management)
- [Setup](#setup)
  - [Requirements](#requirements)
  - [Chocolatey Agent Install Options](#chocolatey-agent-install-options)
  - [Package Parameters](#package-parameters)
  - [Chocolatey Managed Password](#chocolatey-managed-password)
    - [Chocolatey Agent Service Windows Account Considerations](#chocolatey-agent-service-windows-account-considerations)
  - [Self-Service Anywhere Setup](#self-service-anywhere-setup)
  - [Background Mode Setup](#background-mode-setup)
    - [Command Customization Consideration](#command-customization-consideration)
    - [Interactive Self-Service Consideration](#interactive-self-service-consideration)
  - [Chocolatey Central Management Agent Setup](#chocolatey-central-management-agent-setup)
  - [Log File Location For Chocolatey Agent](#log-file-location-for-chocolatey-agent)
- [Chocolatey Agent Roadmap](#chocolatey-agent-roadmap)
- [FAQ](#faq)
  - [How do I take advantage of Chocolatey Agent?](#how-do-i-take-advantage-of-chocolatey-agent)
  - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
  - [Will this become available for lower editions of Chocolatey?](#will-this-become-available-for-lower-editions-of-chocolatey)
  - [I have questions regarding Agent and Central Management](#i-have-questions-regarding-agent-and-central-management)
  - [I have Puppet or some other configuration management tool (RMM tool, infrastructure automation tool, etc.) that also runs Chocolatey. Can I configure it to skip background mode?](#i-have-puppet-or-some-other-configuration-management-tool-rmm-tool-infrastructure-automation-tool-etc-that-also-runs-chocolatey-can-i-configure-it-to-skip-background-mode)
  - [How does it work?](#how-does-it-work)
  - [What's the minimum Chocolatey licensed extension version that I need to install the agent?](#whats-the-minimum-chocolatey-licensed-extension-version-that-i-need-to-install-the-agent)
  - [How is it secure?](#how-is-it-secure)
  - [Do you have an example of a message that goes across the agent service named pipe, from the client?](#do-you-have-an-example-of-a-message-that-goes-across-the-agent-service-named-pipe-from-the-client)
  - [What is the purpose of the hash that is used to protect the named pipe?](#what-is-the-purpose-of-the-hash-that-is-used-to-protect-the-named-pipe)
  - [Does the agent service or Chocolatey stop installation from unconfigured sources?](#does-the-agent-service-or-chocolatey-stop-installation-from-unconfigured-sources)
  - [We want to set up the chocolatey agent service to use a domain account that will have local admin on each box. Can we do this?](#we-want-to-set-up-the-chocolatey-agent-service-to-use-a-domain-account-that-will-have-local-admin-on-each-box-can-we-do-this)
  - [Is the password stored anywhere?](#is-the-password-stored-anywhere)
  - [We are going to use our own account with a rotating password. When we rotate the password for the account that we use for the Chocolatey Agent, what do we need to do?](#we-are-going-to-use-our-own-account-with-a-rotating-password-when-we-rotate-the-password-for-the-account-that-we-use-for-the-chocolatey-agent-what-do-we-need-to-do)
  - [Tell me more about the Chocolatey managed password.](#tell-me-more-about-the-chocolatey-managed-password)
  - [Is the managed password stored or logged anywhere?](#is-the-managed-password-stored-or-logged-anywhere)
  - [Is the managed password the same on every machine?](#is-the-managed-password-the-same-on-every-machine)
  - [How would someone potentially get access to the managed password?](#how-would-someone-potentially-get-access-to-the-managed-password)
  - [Do you rotate the managed password on a schedule?](#do-you-rotate-the-managed-password-on-a-schedule)
  - [Can I take advantage of Chocolatey managed passwords with my own Windows services?](#can-i-take-advantage-of-chocolatey-managed-passwords-with-my-own-windows-services)
  - [Can I save an image with the agent already installed that I can deploy new machines from?](#can-i-save-an-image-with-the-agent-already-installed-that-i-can-deploy-new-machines-from)
  - [Can we use an account for the service that is not a local administrator?](#can-we-use-an-account-for-the-service-that-is-not-a-local-administrator)
  - [What is Run Actual?](#what-is-run-actual)
  - [Where is the agent service installed?](#where-is-the-agent-service-installed)
- [Common Errors and Resolutions](#common-errors-and-resolutions)
  - [I have issues regarding Central Management](#i-have-issues-regarding-central-management)
  - [Installs from custom source locations are not allowed in background mode. Please remove custom source and try again using default (configured) package source locations.](#installs-from-custom-source-locations-are-not-allowed-in-background-mode-please-remove-custom-source-and-try-again-using-default-configured-package-source-locations)
  - [I'm getting the following: "There are no sources enabled for packages and none were passed as arguments."](#im-getting-the-following-there-are-no-sources-enabled-for-packages-and-none-were-passed-as-arguments)
  - [I'm having trouble seeing packages on a file share source](#im-having-trouble-seeing-packages-on-a-file-share-source)
  - [The agent service is not picking up the new license](#the-agent-service-is-not-picking-up-the-new-license)
  - [Background Service is not being used for my non-administrator accounts](#background-service-is-not-being-used-for-my-non-administrator-accounts)

<!-- /TOC -->

___
## Chocolatey Background Service / Self-Service Installer
When an administrator installs the agent, they can configure Chocolatey to use background mode so that non-administrators can still perform installations of approved software as configured by an administrator.

Why this is desirable:

* Users do not need to be administrators but are still empowered to install and upgrade software (functions are configurable with Chocolatey Extension v1.12.4+)
* Users can ***only*** run install and upgrade in an administrative context by default. This is configurable to other commands as of Chocolatey Licensed Extension 1.12.4+..
* Shortcuts, desktop icons, etc created through Chocolatey functions will end up with the proper user (still coming).
* Users can only install approved software based on admin configured sources.
* This frees up precious IT bandwidth to work on other engagements.
* Empowers users, so they feel more in control.

This makes for happy users and happy admins as they are able to move quicker towards a better organization.

### See It In Action

* Chocolatey's Self-Service Installer - Part 1:

[![Chocolatey's Self-Service Installer - Part 1](images/features/features_selfservice_video1.jpg)](https://www.youtube.com/watch?v=Thw9GpQaZ6M "Chocolatey's Self-Service Installer - Part 1")

* Chocolatey's Self-Service Installer - Part 2:

[![Chocolatey's Self-Service Installer - Part 2](images/features/features_selfservice_video2.jpg)](https://www.youtube.com/watch?v=BnnAwFftUwU "Chocolatey's Self-Service Installer - Part 2")

> :memo: **NOTE**: To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

Consider the following image:

![Attempting to install software as non-admin - if you are on https://chocolatey.org/docs/features-agent-service, see commented html below for detailed description of image](images/features/features_non_admin_installer.png)

<!--
Text in the image above:

Non-administrators need an administrator to perform installs.

This image shows attempting to install VLC as a non-administrator and having the computer show the question for an administrator username and password to continue.
-->

This is the status quo for a non-administrative user. Can't install software without the help of an administrator. That takes up time, time for both the user waiting to get work done and the IT admin that performs the work.

Now, how does that change once we have background mode?

![Installing software with Chocolatey's background mode from the command line. - if you are on https://chocolatey.org/docs/features-agent-service, see commented html below for detailed description of image](images/features/features_non_admin_selfservice.png)

<!--
Text in the image above:

Background Mode / Self-Service Installer

- Non-admin can install only from approved, configured sources
- Chocolatey Agent Service validates commands prior to running
- Output streams as it happens
- Attempted abuses are logged for further review
- Background mode only for install / upgrade by default
- GUI on roadmap

This image shows running `choco install adobereader -y`.
-->

Once you've configured background mode and configured approved sources for installation, a user can install only those approved applications using the command line or the Chocolatey GUI.

Now, if a user wants to install from a non-approved source, they are met with the following message:
![Not able to install from custom source](images/features/features_non_admin_custom_source_error.png)

This ensures non-admin users can only install from sources that you configure.

___
## Scenarios With Self-Service

We'll add more scenarios as we come across them from questions, etc. This is meant to address situations you might find yourself in and how best to apply recommendations work through them.

### Managing Very Large Installation Media

If you are managing something like SQL Server, Office, or Autodesk, you may already know you need to split the binaries away from the Chocolatey packaging. Where do you put it and how can you ensure it can be installed with background service?

#### Option 1 - Binary/Raw Repository

You can store big binaries in a raw/binary repository that comes with the following repository servers: Nexus, Artifactory, and ProGet. You could also just put things on a web host that gives bare downloads when accessed.

**Pros:**
* Very reliable - once files are in the binary/raw repository, moving them around would require being very intentional. Since the binary/raw repository sits directly next to the Chocolatey package repositories, they are going to work well together.
* Low maintenance - you don't need to remember to add new computers to any AD groups.
* Could be accessed anywhere - aside from open credentials being necessary right now, once that is adjusted in Chocolatey itself, this would allow you to get to the installation media from anywhere in the world if you chose to open it up that way.

**Cons:**
* Initial setup - it will take a moment to get this setup, but it can be done really fast if you already followed Chocolatey recommendations on using Nexus, Artifactory, or ProGet for your repository needs.
* No credentials on binary/raw repository - The Chocolatey built-in functions like `Get-ChocolateyWebFile` don't have the ability to directly pass credentials yet.
* Requires a local download - if the installation media is big enough, you may prefer installing from a network share and not want to download the components first to each machine.

#### Option 2 - File Share

You may choose that you want to store files on a network share as that is where you may have a lot of your installation media currently and you don't want to set up somewhere else that you would need to duplicate what is already done.

Just like in the cases of Puppet, Chef, or other things that run under a Windows Service, the account that runs the Chocolatey Agent by default is a local Windows account. So it is not going to have permission to see a file share by default. There are two methods you can employ to handle this situation.

Pick from one of two different methods:

1. Use a LDAP account for the service - you can always run the service under a different user. See [Agent Install Options](#chocolatey-agent-install-options).
1. Give the computer read access to the share - If you are on Active Directory, you can add all computers to a global group and give that group read access to the share. This requires being explicit on that with no nesting. See [explicit permissions to allow local accounts access to file shares](#im-having-trouble-seeing-packages-on-a-file-share-source).

**Pros:**
* Easy setup - you are simply creating a file share.
* Enables network installs - no need to download anything locally.

**Cons:**
* Not very reliable - If a file gets deleted, renamed, or moved, you now have a broken package you need to go fix. This could happen simply as the files here may be dual-purposed and other folks don't realize they are breaking your packages. You must be diligent in here that you don't mess things up.
* Can not be used outside of network - if you have clients that need to install packages but are outside your network, they are going to fail.
* Method 2 requires maintenance - every time you add new computers you need to remember to explicitly add them to the AD global group.


#### Option 3 - File Share Managed Outside of Self-Service

If you are unable to use one of the two methods to gain access to the file share, your last option is really to manage those packages that have the bigger binaries outside of self-service.

* Make sure you have the feature `useBackgroundServiceWithSelfServiceSourcesOnly` enabled.
* Create another Chocolatey/NuGet repository and put those non-self-service useable packages in that repository instead.
* When configuring that source on your machines, don't add the `--allow-self-service` to that repository. That repository is now invisible to self-service and won't be considered whenever referring back to the background service.

**Pros:**
* Same Pros as in Option 2. Additionally:
* Packages being managed separately will be skipped automatically on upgrade all.

**Cons:**
* Same Cons as seen in Option 2. Additionally:
* You must manage installs/upgrades separately.
* Still can't manage it with other infrastructure management / endpoint management tools either - most tools, like Puppet, Chef, possibly SCCM, are still going to have trouble seeing that file share. Unless of course you have given those Windows services an account that has network share access.

#### Recommendation

When you can, prefer option 1 (Binary/Raw Repository). This gives you the most flexibility. However depending on your needs, you may see a combination of any of the above.

### Managing Non-Silent Installers

Sometimes you come across non-silent installers. These are things that occur that would block an install/upgrade from finishing until there is a user interaction, like a pop-up or opening a browser and directing to a site. And it doesn't matter what you pass for silent arguments, the installer will still present these user interactions.

With Chocolatey, like with other deployment or endpoint management tools, an installer must be made completely silent/unattended to work in automated deployment scenarios.

#### Option 1 - MSI Repackaging

The best way to handle installers that do not play nice is called MSI repackaging (records installation and produces an MSI you use instead). MSI repackaging technology has been around for about 20 years and once you have that produced MSI, it will work in all deployment scenarios.

**Pros:**
* Produced MSI can be used in all automation scenarios - works with any deployment scenario, including those that are run by a Windows service.
* Produced MSI is solid - there are unlikely to be issues with deploying this in any environment.
* Not much learning required to create MSI - depending on what tool you use for MSI repackaging, it's really easy to do.
* You can trust produced MSI - you created it, you know nothing is gonna hack your environment with specially crafted scripts in the MSI.
* Can be done reasonably quickly - it doesn't take a lot of time to run MSI repackaging once you are set up, you might want to use a clean VM with a snapshot you can go back to after each time you complete.

**Cons:**
* You must repackage for each new version of the software
* Media is not the same as the original - what you actually deploy is not the same as the original installation media.
* No examples to look at - read more below.
* Produced binaries still subject to distribution rights - however if you are keeping everything internal, you never need to worry about this. You just can't share what you've done on something like the community repository as it is public.

**NOTE**: Unfortunately you are unlikely to find any packages on the Chocolatey Community Repository that are able to take advantage of MSI repackaging - this is due to both distribution rights and verification/security.

* Redistribution of installation media often requires permission - that would include anything that mimics what is done (like the produced MSI).
* Then verification and security - even if redistribution is allowed, you step into trust and verification of this unknown binary that moderators and the community at large are unlikely to trust. When you are doing MSI repackaging internally and housing the bits on your internal repo, you can typically more fully trust what you are doing there versus some random maintainer on the internet doing similar.

#### Option 2 - Use Chocolatey Software's Professional Packaging Support Services

When you are customer, you can engage with Chocolatey Software to create the MSI for you for a flat rate fee.

**Pros:**
* Same Pros as in Option 1. Additionally:
* Easy - you hand off the media to our team and you get an MSI and Chocolatey package back.
* Affordable - there is a flat rate fee associated. So you pay the same price whether it takes our team 2 hours or 5 days.
* Turnaround is fast - depending on the queue, you can have something in your hands in less than two weeks.
* Built by Chocolatey - these MSIs are produced by our team, so you can trust that it's not someone random person out there making these.

**Cons:**
* Same Cons as in Option 1. Additionally:
* Turnaround time is 5-10 business days - if you need something in a rush, you may need to complete Option 1.
* Requires prepayment - you must pay for this in advance.
* Each version counts as a use - each time you reach out, including having upgrades for a piece of software, counts as an engagement and is subject to the fee.

#### Option 3 - Window Automation Scripting

There are tools like Autohotkey (AHK) and AutoIT that can handle the user interaction for you. The bonus is that you get to use the original installation media and have a script that handles all of the failure points for the non-silent installer.

**Pros:**
* Uses original installation media - the script clicks the buttons or closes the windows for you
* Script may work with newer versions - the script may not require any updating whenever newer versions of software come out.
* Examples may already exist - the community package repository can use this method to automate badly behaved installers b/c the original installation media is being used.

**Cons:**
* Requires interactive session - will fail as soon as you have a Windows service attempt to run this in a headless operation.
* Requires learning the automation scripting syntax - if you dislike learning new tools, you will find this an issue.
* Can be fragile - whenever you have tools that are clicking on buttons for you, depending on how the scripts are written, can still be fragile.

#### Recommendation

MSI repackaging is always preferred. At the end of creating that, you have something that can be deployed silently with any method you prefer to deploy it with.

___
## Chocolatey Central Management

Chocolatey for Business has centralized reporting and supports endpoint management through [[Chocolatey Central Management (CCM)|CentralManagement]]. On machines that will take advantage of CCM, you will need the Chocolatey Agent installed and properly configured to manage them centrally.

For more information on Central Management, please see [[Chocolatey Central Management|CentralManagement]].

___
## Setup

To install the Chocolatey Agent service, you need to install the `chocolatey-agent` package. The Chocolatey Agent is only available for business edition customers to install from the licensed source (customers trialling the business edition will be provided instructions on how to install).

### Requirements

* Chocolatey (`chocolatey` package) v0.10.3+ - v0.10.4+ for better compatibility. Chocolatey v0.10.7+ is recommended and required in newer versions.
* Chocolatey for Business (C4B) Edition
* Chocolatey Licensed Extension (`chocolatey.extension` package) v1.8.4+. For chocolatey-agent v0.5.0+, licensed extension v1.9.0+. For `chocolatey-agent` v0.7.0+, licensed extension v1.11.0+.
* Chocolatey Agent Service (`chocolatey-agent` package) - 0.7.0+ is recommended.

For use with Chocolatey GUI, you must be on Chocolatey v0.10.7+, Chocolatey Licensed Extension v1.11.0+, and Chocolatey Agent v0.7.0+.

### Chocolatey Agent Install Options

Starting with Chocolatey Agent v0.8.0+, the service will install as a local administrative user `ChocolateyLocalAdmin` by default (and manage the password as well). However you can specify your own user with package parameters (or have it use `LocalSystem`). Using a local administrator account allows for more things to be installed without issues. It also will allow easier shortcuts and other items to be put back on the correct user (the original requestor). You can specify a domain account as well. Prior to `v0.8.0`, Chocolatey Agent would install as LocalSystem (`SYSTEM`) and would require additional customization.

**NOTE:** If you are using file shares for sources, you may want to ensure the account or computer has network access permissions for the file share(s).

### Package Parameters
Note items with "`:`" mean a value should be provided, items without are simply switches.

* `/Username:` - provide username - instead of using the default 'ChocolateyLocalAdmin' user. This user will need to be a member of local administrators due to the privileges needed for this service - this is typically ensured during installation. `Logon as Service` and `Logon as Batch` privileges are also ensured.
* `/Password:` - optional password for the user.
* `/EnterPassword` - receive the password at runtime as a secure string
* `/UseDefaultChocolateyConfigUser` - use the default username from Chocolatey's configuration. This may be LocalSystem.
* `/NoRestartService` - do not shut down and restart the service. You will need to restart later to take advantage of new service information.

### Chocolatey Managed Password

When Chocolatey manages the password for a local administrator, it creates a very complex password:

* It is 32 characters long.
* It uses uppercase, lowercase, numbers, and symbols to meet very stringent complexity requirements.
* The password is different for every machine.
* Due to the way that it is generated, it is completely unguessable.
* No one at Chocolatey Software could even tell you what the password is for a particular machine without local access.

See [FAQ](#faq) below for more discussion on security aspects.

#### Chocolatey Agent Service Windows Account Considerations

* Windows Account (required, defaults to `ChocolateyLocalAdmin`)
   * The Chocolatey Agent Service requires ***an*** administrative account, whether that is a domain account or a local account - it just needs to be a local admin (a member of the Administrators group).
   * The agent service doesn't specifically require the `ChocolateyLocalAdmin` account, any Windows account can be used. The `ChocolateyLocalAdmin` is used as the default if one is not specified.
   * Upon use of an account during installation, it will make that account a member of the Administrators account.
   * The account used will also be granted LogonAsService and LogonAsBatch privileges.
* Managed Password (optional, default)
   * When the `ChocolateyLocalAdmin` account is used, it generates a managed password that is different on every machine, 32 characters long, meets complexity requirements, and basically very strong.
   * To determine the managed password, it would take access to the box and someone from Chocolatey Software who has access to the algorithm used to generate the password (more information in the FAQs below).
* Rotating/Updating Passwords
   * If a different account with a rotating password is used, the service will need to be updated with the new credentials and restarted soon after changing that password.
   * The managed password is not currently updated/rotated, but it is something we are looking at how best to implement.

___
### Self-Service Anywhere Setup
See [Background Mode Setup](#background-mode-setup).

### Background Mode Setup

To set Chocolatey in background mode, you need to run the following:

* `choco upgrade chocolatey-agent <options>` (see [agent install options](#chocolatey-agent-install-options))
* `choco feature disable --name="'showNonElevatedWarnings'"` - requires Chocolatey v0.10.4+ to set.
* `choco feature enable --name="'useBackgroundService'"`
* You also need to opt in sources in for self-service packages. See [[choco source|CommandsSource]] (and `--allow-self-service`). You can also run `choco source -?` to get the help menu.
    * OPTIONAL (not recommended): Alternatively, you can allow any configured source to be used for self-service by running the following: `choco feature disable --name="'useBackgroundServiceWithSelfServiceSourcesOnly'"` (requires Chocolatey Extension v1.10.0+). We do not recommend this as it could be a security finding if you shut it off.
* OPTIONAL (highly recommended): If you want self-service to apply only to non-administrators, run `choco feature enable --name="'useBackgroundServiceWithNonAdministratorsOnly'"` (requires Chocolatey Extension v1.11.1+). Do understand this means that a real non-administrator, not an administrator in a non-elevated UAC context (that scenario will go the normal route and will not go through background mode).
* OPTIONAL (varied recommendations): If you want to configure custom commands (not just install/upgrade), use something like `choco config set backgroundServiceAllowedCommands "install,upgrade,pin,sync"` (with the commands you want to allow, requires Chocolatey Extension v1.12.4+). See [commands consideration](#command-customization-consideration) below.
* OPTIONAL (highly recommended): If you want to allow non-admins to uninstall packages, you can also restrict down to only the packages they have installed/upgraded. Run `choco feature enable --name="'allowBackgroundServiceUninstallsFromUserInstallsOnly'"` (requires Chocolatey Extension v2.0+).
* OPTIONAL (highly recommended): For use with Chocolatey GUI, you need Chocolatey Extension v1.12.4+, and at least Chocolatey GUI v0.15.0. **Uninstall any version of the GUI you already have installed first**, then run `choco upgrade chocolateygui -y --allow-downgrade` (you will also need at least .NET 4.5.2 installed)
* DOES NOT WORK WITH UAC, DO NOT USE UNTIL [FIX IS ANNOUNCED](https://groups.google.com/group/chocolatey-announce)! OPTIONAL (recommended if you use installers that are not completely silent): If you want self-service to interactively manage installations, run `choco feature enable --name="'useBackgroundServiceInteractively'"` (requires Chocolatey Extension v1.12.10+). This requires that you use the `ChocolateyLocalAdmin` account with the Chocolatey-managed password as passwords are not stored and the service would need to produce that at runtime. There are some security considerations and why this is not turned on by default. Please see [interactive self-service consideration](#interactive-self-service-consideration).

**NOTE**: Once you are all setup, please review the [Common Errors and Resolutions](#common-errors-and-resolutions) section so you will be familiar if you run into any issues with working with sources.

An example script:

This carries our typical recommendations, but you could adjust from above.

~~~powershell
choco upgrade chocolatey-agent -y
choco feature disable --name="'showNonElevatedWarnings'"
choco feature enable --name="'useBackgroundService'"
choco feature enable --name="'useBackgroundServiceWithNonAdministratorsOnly'"
# allow uninstalls as well:
#choco config set backgroundServiceAllowedCommands "install,upgrade,uninstall"
# restrict uninstalls to just packages the user has installed/upgraded (requires Chocolatey Extension v2.0+):
#choco feature enable --name="'allowBackgroundServiceUninstallsFromUserInstallsOnly'"

# TODO: opt in your sources with --allow-self-service - run choco source -? for details
~~~

> Best practices in scripts are noted here:
> * Use `upgrade` instead of `install` - upgrade is more making the script reusable when newer versions are available.
> * Always use `-y` to ensure nothing stops and prompts for more than 30 seconds.
> * When using options prefer a longer name (`--name` versus the short `-n`) to make the scripts more self-documenting
> * When using options that have a value passed, add an `=` between and surround the value with `"''"` (`--name="'value'"`). This ensures that the argument is not split between different versions/editions of Chocolatey. This also ensures that values like `.` and `\\` are not escaped by PowerShell.

#### Command Customization Consideration
Starting with Chocolatey Licensed Extension v1.12.4, you are allowed to configure what commands can be routed through the background service. Please note that Chocolatey Licensed defaults to `install` and `upgrade` as that is the most secure experience. However you can add uninstall and some other commands as well. Uninstall does have some security considerations as it would allow a non-administrator to remove software that you may have installed, including the background service itself.

**Available Commands**:

* info - do not add if you want sources hidden from non-admins
* list/search - do not add if you want sources hidden from non-admins
* outdated - do not add if you want sources hidden from non-admins
* install - default
* upgrade - default
* uninstall - keep in mind there may be security implications for this
* optimize
* pin
* sync
* download - Chocolatey Licensed Extension v1.12.12+ - keep in mind if you have shut off a non-admin's ability to run this they still won't be able to without also disabling the `adminOnlyExecutionForDownloadCommand` feature.

**Blacklisted Commands**:

* config
* feature
* source
* apikey

Chocolatey does not allow for configuration changing commands to be routed through the background service as that would allow users to be able to change configuration and that could be detrimental. For instance, a user could add a local source with a package they've created that promotes themselves to an administrator (escalation of privilege). As that constitutes a security issue, we do not allow it.

For the same reason, we do not recommend allowing sources you do not control to be allowed for self-service.

#### Interactive Self-Service Consideration
When using the self-service with `useBackgroundServiceInteractively`, it is similar to "Run As". Microsoft used to allow Windows services to interact with the desktop but removed the functionality (of "Allow Service to Interact with the Desktop") in Windows Vista and limited all services into what is known as Session 0 isolation. In Session 0, those services can access a desktop, but not the interactive user's desktop (at least it is very, very difficult to do so). Microsoft did this as a security consideration as allowing a privileged account to run executables in a non-administrative user context opens the potential to allow a non-admin to gain privileges to a system (known as escalation of privilege). Depending on what is allowed for folks to install, as long as those package installations do not open a command shell and wait for user input, the potential is quite low. However it is something to keep in mind and assess before turning on this feature (and why it is off by default).

However sometimes you work with installers that refuse to be silent. You might get them down to unattended (meaning they still have required input or window pop ups, but they are all handled and automatically closed), but they won't get to silent without a different option. Here are some options from most preferred to least preferred in getting those installers that are not fully silent to work:

* (Silent) Find a portable version of the tool that doesn't run a badly behaved installer. Looked for a zipped up version, you can easily create a Chocolatey package from these.
* (Silent) Find an alternative that does the same thing, but has silent installers. It's a consideration, but maybe not something you can or are willing to explore. Moving on...
* (Silent) Use MSI repackaging to produce a completely silent installer. It works by recording everything that happens when you run the install and creates an MSI to do the same. This would need to be done for every version. There are tools out there that can do this, some of which are VERY expensive.
* (Unattended/Interactive) Use AutoHotKey or AutoIT (or some other tool) to automate the key presses and values being sent to the interfaces. This can be brittle, but can typically be quickly implemented.

If you must run in the context of working with "unattended", non-silent installations, you need to take the above security consideration into account if you want to be able to manage those installations using the background service.

___
### Chocolatey Central Management Agent Setup
Please see [[Central Management Client Setup|CentralManagementSetupClient]] for details.

> :memo: **NOTE**: This will also contain more FAQs and Common Errors and Resolutions related to communication with Central Management.

### Log File Location For Chocolatey Agent
The Chocolatey Agent log file is located at `$env:ChocolateyInstall\logs\chocolatey-agent.log`. If you are on a version of Chocolatey Agent prior to v0.10.0, the log will be located at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service\logs\chocolatey-agent.log`.

___
## Chocolatey Agent Roadmap

* Maintenance Windows: Admins will be able to schedule when upgrades occur.
* Toast Notifications: Let users know when things are happening, and let users know when upgrades are available for Self-Served applications
* ~~Self-Service: Admins will be able to configure what commands can be run through the background service.~~ Completed with Chocolatey Extension v1.12.4.
* Self-Service: Admins will have more granular control of what certain users can install.
* ~~Report into Central Management~~ - completed May 2019
* ~~Handle tasks from Central Management Deployments~~ - completed June 2020

___
## FAQ
### How do I take advantage of Chocolatey Agent?
You must have a [Business edition of Chocolatey](https://chocolatey.org/compare). Business editions are great for organizations that need to manage the total software lifecycle.

### I'm a licensed customer, now what?
Once you have the agent service installed and Chocolatey for Business configured for background mode (see [Setup](#setup) above), most tools that use Chocolatey will automatically use the background service.

### Will this become available for lower editions of Chocolatey?
The background service and Central Management UI Console will only be available in C4B (Chocolatey for Business).

### I have questions regarding Agent and Central Management
Please see [[Central Management Client Setup|CentralManagementSetupClient]] as the FAQs related to Central Management (CCM) are kept there.

### I have Puppet or some other configuration management tool (RMM tool, infrastructure automation tool, etc.) that also runs Chocolatey. Can I configure it to skip background mode?
Yes! Add `--run-actual` to your install options. Most likely your tool won't need to be reconfigured though as it will just work with background mode. You will need Chocolatey v0.10.3+ installed across your environment so Chocolatey handles the unknown arguments appropriately.

Another (possibly better) way to handle this as of Chocolatey Extension v1.12.0, turn on the `useBackgroundServiceWithNonAdministratorsOnly` feature to make Self-Service apply only to non-administrators. See [Background Mode Setup](#background-mode-setup) for details.

### How does it work?
As a background service, it is able to call Chocolatey with an administrative account that is configured by you. It is secure communication that only starts once Chocolatey is configured to work with the background service.

### What's the minimum Chocolatey licensed extension version that I need to install the agent?
You need `chocolatey.extension` version 1.8.4+.

### How is it secure?
For Background Mode / Self-Service Installer:

* Commands are ignored unless they come from the business edition of Chocolatey.
* Chocolatey installs can only be done from approved, configured sources.
* The background service validates commands prior to running.
* Attempted abuses of the service are logged for further review by an administrator later.

For the Central Management UI / Console:

* Coming later when central console is more complete.
* Communication will be done over TLS (w/self-signed certificate) or another medium with message encryption

### Do you have an example of a message that goes across the agent service named pipe, from the client?
The message is a serialized object that contains:

* hashed passcode - SHA512 Hash of args, user, current directory, and a salt value only shared with agent and licensed edition
* command arguments to run - verified against validation checks
* username - this is what we'll use to ensure things like desktop shortcuts, etc
* timeout - how long before the command should timeout (from choco config)
* working directory - where is the context of this being executed, in case there are things to place relative to current directory

Here is the interface:

`void run_choco_command(string passcode, IEnumerable<string> arguments, string userName, int timeout, string workingDirectory);`

Keep in mind this message is only put on localhost. It does not go over any networks.

### What is the purpose of the hash that is used to protect the named pipe?
You may notice the hash changes every time based on what command is called. This is a security measure to ensure the call is coming from a configured Chocolatey client and not from another source. The agent will ignore anything that does not match up.

### Does the agent service or Chocolatey stop installation from unconfigured sources?
The agent stops unconfigured sources from installation. Right now it simply logs those abuses to the log file (that is locked down to admins for modify). The log file can be slurped into a tool like Splunk. Alternatively considering this is preview and we are waiting for feedback, we can look to providing those alerts in a different way, like the event log. We welcome any feedback on how you might like to see this.

Chocolatey doesn't stop unconfigured sources for install, it lets the agent do so. Once Chocolatey is in background mode, all commands for install/upgrade go through the agent service.

The one exception is when someone calls `--run-actual` in their arguments. But there is no escalation of privilege here because they would be running that under their own user context and thus only have the permissions granted to them already.

### We want to set up the chocolatey agent service to use a domain account that will have local admin on each box. Can we do this?
Yes, absolutely. You will pass those credentials through at install/upgrade time, and you will also want to turn on the feature `useRememberedArgumentsForUpgrades` (see [[configuration|ChocolateyConfiguration#features]]) so that future upgrades will have that information available. The remembered arguments are stored encrypted on the box (that encryption is reversible so you may opt to pass that information each time).

* `/Username:` - provide username - instead of using the default 'ChocolateyLocalAdmin' user. This user will need to be a member of local administrators due to the privileges needed for this service.
* `/Password:` - optional password for the user.
* `/EnterPassword` - receive the password at runtime as a secure string

You would pass something like `choco install chocolatey-agent -y --params="'/Username:domain\account /EnterPassword'"` to securely pass the password at runtime. You could also run `choco install chocolatey-agent -y --params="'/Username:<domain\account>'" --package-parameters-sensitive="'/Password:<password>'"` (or do it as part of `choco upgrade`).

With Puppet, this could look something like:

~~~puppet
package {'chocolatey-agent':
  ensure          => latest,
  install_options => ['-pre','--params="',"'/Username:<domain\account>'", '"','--package-parameters-sensitive="', "'/Password:<password>'", '"'],
  require         => Chocolateyfeature['useLocalSystemForServiceInstalls'],
}
~~~

where `<domain\account>` and `<password>` could be pulled from Hiera or somewhere else. If you have access to the Puppet secrets type, then you can use that here as well.

### Is the password stored anywhere?
No, that would reduce the security of the password. It exists in memory long enough to set the value on user and the service and then it is cleared.

There is no storage of the password anywhere other than how Windows stores passwords.

### We are going to use our own account with a rotating password. When we rotate the password for the account that we use for the Chocolatey Agent, what do we need to do?
Like with any service that uses rotating passwords, you will need to redeploy the service or go into the services management console and update the password. As it is much faster to deploy out that update, you can do something like `choco upgrade chocolatey-agent -y --params="'/Username:domain\account'" --package-parameters-sensitive="'/Password:newpassword'" --force` (the `--force` ensures the code is redeployed).

### Tell me more about the Chocolatey managed password.
So you've seen from above that

* It is 32 characters long.
* It uses uppercase, lowercase, numbers, and symbols to meet very stringent complexity requirements.
* The password is different for every machine.
* Due to the way that it is generated, it is completely unguessable.
* No one at Chocolatey Software could even tell you what the password is for a particular machine without local access.

Chocolatey uses something unique about each system, along with an encrypted value in the licensed code base to generate base password, then it makes some other changes to ensure that the password meets complexity requirements. We won't give you the full algorithm of how the password is generated as knowing the algorithm would be a security issue - like having a partial picture of a key, you could start working on how to break in. Unlike a picture of a key, even knowing the full algorithm doesn't get you everything you need as you would need local access to each box to determine the password for ***each*** machine.

### Is the managed password stored or logged anywhere?
No, that would reduce the security of the password. It exists in memory long enough to set the value on user and the service and then it is cleared.

There is no storage of the password anywhere other than how Windows stores passwords.

### Is the managed password the same on every machine?
No, it is different for every machine it is deployed to.

### How would someone potentially get access to the managed password?
The Chocolatey licensed code base is encrypted, so only people that work at Chocolatey Software would be able to determine the password for a particular box (just that one) ***IF*** they have local access to that box. Even with all of the information and the algorithm, it's still going to take our folks a while to determine the password. That gets them access to one machine. Of course, Chocolatey folks are not going to do this for obvious reasons.

So let's realize this to its full potential - If someone were able to hack the Chocolatey licensed codebase, they would be able to determine the full password algorithm. Then they'd also need to hack into your infrastructure and get local access to every box that they wanted to get the Chocolatey-managed password so they could get admin access to just that box. Taking this out a bit further, it's reasonable to assume that if someone has hacked into your infrastructure, it's highly unlikely they are going to be using a non-administrator account to get local access to a box so they can get the password for an administrator account for just that one box. It's more likely they would would already have a local admin account for the boxes they are attacking, and are likely to seek other attack vectors that are much less sophisticated.

### Do you rotate the managed password on a schedule?
We are looking to do this in a future release. We may make the schedule configurable.

### Can I take advantage of Chocolatey managed passwords with my own Windows services?
Yes, absolutely. If you use C4B's PowerShell Windows Services code, you will be able to install services and have Chocolatey manage the password for those as well.

### Can I save an image with the agent already installed that I can deploy new machines from?
Yes, however you need to keep in mind that there is a unique machine Id that will need to be erased so it can be regenerated.

Make sure to include the following in your provisioning script to deploy the new images:

```powershell
Write-Host "Removing Chocolatey Unique Machine GUID"
Remove-ItemProperty -Path "HKLM:\Software\Chocolatey" -Name "UniqueId" -Force
# Restart the Agent Service if it is running
```

Once you've removed this, you'll need to restart the Agent Service to get it regenerated.

### Can we use an account for the service that is not a local administrator?
Unfortunately no. The user account for the service must be a member of local administrators due to the privileges needed for this service. Typically the installation scripts will ensure the user becomes an administrator if they are not.

### What is Run Actual?
You may have seen `--run-actual`, what is that?

This is a switch that is passed to opt out of Chocolatey Self-Service. It's typically passed by the agent service back to choco to run a command for a user. You typically would not issue this, but the agent service will, so you are likely to see it in the logs if you are looking closely.

### Where is the agent service installed?
The installation folder for `chocolatey-agent` is at `$env:ChocolateyInstall\lib\chocolatey-agent\tools\service`.

___
## Common Errors and Resolutions
### I have issues regarding Central Management
Please see [[Central Management Client Setup|CentralManagementSetupClient]] as the common errors and resolutions related to Central Management (CCM) are kept there.

### Installs from custom source locations are not allowed in background mode. Please remove custom source and try again using default (configured) package source locations.
You can not pass custom source arguments to Chocolatey, it will error. You need to set up sources in the Chocolatey configuration and any that are marked as allowed for self-service will be passed by the background service.

**NOTE:** If you have run `choco feature disable -n useBackgroundServiceWithSelfServiceSourcesOnly`, then all configured sources will be passed by the background service.

### I'm getting the following: "There are no sources enabled for packages and none were passed as arguments."
This means you need to opt a source into self-service (new in Chocolatey Extension v1.10).

This just involves ensuring a source is set so that it allows self-service. To do this you run `choco source add -n name -s location <--other details need repeated> --allow-self-service`. Editing a source happens when the name is the same in `choco source add`.

To change this behavior back to the way it was previously, simply run `choco disable -n useBackgroundServiceWithSelfServiceSourcesOnly`. For feature options, run `choco feature list` or see [[Self-Service Feature Configuration|ChocolateyConfiguration#self-service-background-mode]]

### I'm having trouble seeing packages on a file share source
Starting with Chocolatey Agent v0.8.0+, the service will default an install to a local administrative user `ChocolateyLocalAdmin`, but before that it installed as LocalSystem by default. These accounts may not have network access to UNC shares. We recommend changing the service to a named account that is a local admin that would also have network access (or setting machines into an active directory group and explicitly giving that group read permissions to the share and ACL). To specify your own user, you can do that at install time with [package parameters](#chocolatey-agent-install-options), or you can do that in the Service Manager properties for the service itself (future upgrades would need you to pass that user/pass at least the first time).

So if you've set up a source like `choco source add -n="'name'" -s="'\\unc\packages'" --priority=1`, by default this may not work with the Chocolatey Agent. You would need to grant access to machines or anonymous access to the share (Everyone Read is likely not enough).

A great read on your options can be found at the following Stack Exchange links:

* https://serverfault.com/q/135867/79259
* https://serverfault.com/q/41130/79259

A way to do this with LocalSystem:

1. Create a global group on the Domain
    * add all machines to this group
1. Add this group to the share permissions with "Read" Access
1. Add this group to the NTFS permissions with "Read" Access

**Note**:  You'll need to add this group itself and not nest it inside of another one.

### The agent service is not picking up the new license
Currently, you do need to restart agents. Here's a handy script:

```powershell
Get-Service chocolatey-* | Stop-Service
Get-Service chocolatey-* | Start-Service
```

### Background Service is not being used for my non-administrator accounts
If a user is a member of the Built-in AD group `Network Configuration Operators`, then that means they have an elevation token available and will be treated in the same way as administrative accounts. To fix this, you have two options:

* Remove the users from `Network Configuration Operators` - PowerShell offers an alternative to `ipconfig /flushdns` that does not require admin permissions - `Clear-DnsClientCache`.
* OR `choco feature disable --name="'useBackgroundServiceWithNonAdministratorsOnly'"`
