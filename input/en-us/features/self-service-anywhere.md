---
Order: 90
xref: self-service-anywhere
Title: Self Service Anywhere (C4B) - Support modern workforce
Description: Install packages as a non-administrator user
RedirectFrom: docs/features-agent-service
---

## Summary

> Empower your users and give your IT folks the precious gift of time to invest into taking your organization to the next level!

The Chocolatey Agent service allows you to go further with your software management, bringing Chocolatey to desktop users in organizations that have controlled environments. This provides users in controlled environments more empowerment and instant turn around on required software. This frees up IT folks and admins time to spend on making the organization even better.

The Chocolatey agent enables multiple features:

* The Background Service, aka Self-Service Anywhere
* Conmmunication to Chocolatey Central Management (CCM)
   * Reporting information to CCM
   * Deployments from CCM (endpoint management tasks)

The Chocolatey Agent can be independently configured to support any or all of these modes of operation independently.

## Chocolatey Background Service / Self-Service Installer

When an administrator installs the agent, they can configure Chocolatey to use background mode so that non-administrators can still perform installations of approved software as configured by an administrator.

Why this is desirable:

* Users do not need to be administrators but are still empowered to install and upgrade software (functions are configurable with Chocolatey Extension v1.12.4+)
* Users can **only** run install and upgrade in an administrative context by default. This is configurable to other commands as of Chocolatey Licensed Extension 1.12.4+..
* Shortcuts, desktop icons, etc created through Chocolatey functions will end up with the proper user (still coming).
* Users can only install approved software based on admin configured sources.
* This frees up precious IT bandwidth to work on other engagements.
* Empowers users, so they feel more in control.

This makes for happy users and happy admins as they are able to move quicker towards a better organization.

### See It In Action

* Chocolatey's Self-Service Installer - Part 1:

[![Chocolatey's Self-Service Installer - Part 1](/assets/images/features/features_selfservice_video1.jpg)](https://www.youtube.com/watch?v=Thw9GpQaZ6M "Chocolatey's Self-Service Installer - Part 1")

* Chocolatey's Self-Service Installer - Part 2:

[![Chocolatey's Self-Service Installer - Part 2](/assets/images/features/features_selfservice_video2.jpg)](https://www.youtube.com/watch?v=BnnAwFftUwU "Chocolatey's Self-Service Installer - Part 2")

> :memo: **NOTE** To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

Consider the following image:

![Attempting to install software as non-admin - if you are on https://docs.chocolatey.org/en-us/features/self-service-anywhere, see commented html below for detailed description of image](/assets/images/features/features_non_admin_installer.png)

<!--
Text in the image above:

Non-administrators need an administrator to perform installs.

This image shows attempting to install VLC as a non-administrator and having the computer show the question for an administrator username and password to continue.
-->

This is the status quo for a non-administrative user. Can't install software without the help of an administrator. That takes up time, time for both the user waiting to get work done and the IT admin that performs the work.

Now, how does that change once we have background mode?

![Installing software with Chocolatey's background mode from the command line. - if you are on https://docs.chocolatey.org/en-us/features/self-service-anywhere, see commented html below for detailed description of image](/assets/images/features/features_non_admin_selfservice.png)

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
![Not able to install from custom source](/assets/images/features/features_non_admin_custom_source_error.png)

This ensures non-admin users can only install from sources that you configure.

## Scenarios With Self-Service

We'll add more scenarios as we come across them from questions, etc. This is meant to address situations you might find yourself in and how best to apply recommendations work through them.

### Managing Very Large Installation Media

If you are managing something like SQL Server, Office, or Autodesk, you may already know you need to split the binaries away from the Chocolatey packaging. Where do you put it and how can you ensure it can be installed with background service?

#### Option 1 - Binary/Raw Repository

You can store big binaries in a raw/binary repository that comes with the following repository servers: Nexus, Artifactory, ProGet, and Cloudsmith. You could also just put things on a web host that gives bare downloads when accessed.

**Pros:**
* Very reliable - once files are in the binary/raw repository, moving them around would require being very intentional. Since the binary/raw repository sits directly next to the Chocolatey package repositories, they are going to work well together.
* Low maintenance - you don't need to remember to add new computers to any AD groups.
* Could be accessed anywhere - aside from open credentials being necessary right now, once that is adjusted in Chocolatey itself, this would allow you to get to the installation media from anywhere in the world if you chose to open it up that way.

**Cons:**
* Initial setup - it will take a moment to get this setup, but it can be done really fast if you already followed Chocolatey recommendations on using Nexus, Artifactory, ProGet, or Cloudsmith for your repository needs.
* No credentials on binary/raw repository - The Chocolatey built-in functions like `Get-ChocolateyWebFile` don't have the ability to directly pass credentials yet.
* Requires a local download - if the installation media is big enough, you may prefer installing from a network share and not want to download the components first to each machine.

#### Option 2 - File Share

You may choose that you want to store files on a network share as that is where you may have a lot of your installation media currently and you don't want to set up somewhere else that you would need to duplicate what is already done.

Just like in the cases of Puppet, Chef, or other things that run under a Windows Service, the account that runs the Chocolatey Agent by default is a local Windows account. So it is not going to have permission to see a file share by default. There are two methods you can employ to handle this situation.

Pick from one of two different methods:

1. Use a LDAP account for the service - you can always run the service under a different user. See [Agent Install Options](xref:setup-agent#chocolatey-agent-install-options).
1. Give the computer read access to the share - If you are on Active Directory, you can add all computers to a global group and give that group read access to the share. This requires being explicit on that with no nesting. See [explicit permissions to allow local accounts access to file shares](xref:setup-agent#im-having-trouble-seeing-packages-on-a-file-share-source).

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

> :memo: **NOTE** Unfortunately you are unlikely to find any packages on the Chocolatey Community Repository that are able to take advantage of MSI repackaging - this is due to both distribution rights and verification/security.

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

## Chocolatey Central Management

Chocolatey for Business has centralized reporting and supports endpoint management through [Chocolatey Central Management (CCM)](xref:central-management). On machines that will take advantage of CCM, you will need the Chocolatey Agent installed and properly configured to manage them centrally.

For more information on Central Management, please see [Chocolatey Central Management](xref:central-management).
