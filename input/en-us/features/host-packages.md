---
Order: 50
xref: host-packages
Title: Host packages internally
Description: How to host your own Chocolatey packages, rather than use the Chocolatey Community Repository
RedirectFrom: docs/how-to-host-feed
---

> :memo: **NOTE** Refer to [How To Set Up Chocolatey For Organizational/Internal Use](xref:organizational-deployment-guide) in tandem with this article.

## Why?

Chocolatey has had the ability to be able to work with packages from one or more sources since its inception back in 2011. With that, Chocolatey comes with a default package repository configured - the [community package repository](https://community.chocolatey.org/packages). However due to the community repository being publicly available and subject to distribution rights, it has a failure point in that it can not be 100% reliable (most packages can't contain software and must download at runtime). It's not something an organization hosting their own package repository would be subject to, so we recommend organizational use of Chocolatey should include an internal package repository. Organizations looking to use Chocolatey should review the following topics to learn more:

* [Community package repository - organizational use](xref:community-packages-disclaimer)
* [Security and the community repository](xref:security#organizational-use-of-chocolatey)

## Host your own server

There are a few types of package repositories, [folder/unc share](#local-folder--unc-share), [simple server](#simple-server), the sophisticated [package gallery](#package-gallery), and the more sophisticated [commercial package repositories](#commercial-package-repositories).

## Recommendations

From the Chocolatey Software team, our current recommendations for organizational use are Artifactory, Nexus, or ProGet. All are quite robust, and two of those options can be used without cost. For more information, see [commercial package repositories](#commercial-package-repositories).

### Known Hosting Options

Some of these options also work from a non-Windows hosting perspective. See [Non-Windows Hosting](#non-windows-hosting).

* File Share\UNC share (below)
* SCCM Distribution Points (when used as a file share)
* Sonatype Nexus - [Nexus2](https://books.sonatype.com/nexus-book/reference/nuget-nuget_hosted_repositories.html) / [Nexus3](https://books.sonatype.com/nexus-book/3.0/reference/nuget.html#nuget-hosted)- Sonatype Nexus has a built-in simple server
* [ProGet](http://inedo.com/proget/overview) - ProGet gives you a ready to go On-Premise option. Enterprise has replication
* [Artifactory Pro](https://www.jfrog.com/artifactory/) - see [Artifactory NuGet Repositories](http://www.jfrog.com/confluence/display/RTF/NuGet+Repositories)
* [MyGet](https://www.myget.org/) - MyGet offers public and private cloud-hosting options if you don't want to handle all of the pain of setup and administration. MyGet offers some stellar options like multi-feed aggregation, mirroring, and source package build services!
* [TeamCity](https://www.jetbrains.com/teamcity/) has built-in Simple Server
* NuGet.Server
* [NuGet Gallery](https://github.com/NuGet/NuGetGallery/wiki/Hosting-the-NuGet-Gallery-Locally-in-IIS)
* Chocolatey Gallery
* Visual Studio Team Services (use NuGet v2 urls)
* [Cloudsmith](https://cloudsmith.com) - Cloudsmith is a universal, cloud-native package management solution for Deployment or Distribution. All your packages, in any format, including Chocolatey, NuGet and Powershell, in one location and accessible across the organization.

#### Others

These are other known servers, but we don't know the quality or compatibility of these frameworks as they relate to Chocolatey packages.

* [Klondike](https://github.com/themotleyfool/Klondike) - Ember front-end that builds on NuGet.Lucene for private NuGet package hosting
* [PHP NuGet](http://www.kendar.org/?p=/dotnet/phpnuget) - Simple server built in PHP
* [LaGet](https://github.com/ikkentim/LaGet) - A NuGet server written using the Laravel PHP Framework
* [Hazel](https://github.com/MPIB/hazel) - Simple server built in Rust

## Package Version Immutability

A package version is immutable on some sources. This means that everybody's version 1.0.1 of a particular package is the same. You do not need to worry about this when updating with newer versions of packages, because each package version compiled nupkg has the unique version in the name (e.g `bob.1.0.0.nupkg` vs `bob.1.0.1.nupkg` ).

Package immutability is usually desired, because then you know that everyone on v1.0.0 of a package has exactly the same code as does even everyone else. Even a broken version v1.0.0 gives you a global understanding that everyone who has v1.0.0 has exactly the same bits. This really simplifies administration. Without immutability, there is no guarantee that a version of a package installed is the same as the version of the package at the source.

## Local Folder / UNC Share (CIFS)

Perhaps the easiest to set up and recommended for testing quick and dirty scenarios, local folder is easily a strong point when you need a quick source for packages.

### Advantages

* Speed of setup (can be setup almost immediately).
* Package store is filesystem.
* Can be easily upgrade to Simple Server.
* Permissions are based on file system/share permissions.
* Can manage PowerShell gallery type packages.
* There is no limitation on package sizes (or rather, it can likely handle 100MB+ file sizes, maybe even GB sized packages). Don't create multiple GB sized packages, what is wrong with you?! ;)

> :memo: **NOTE** If you must create large packages, see [Package Reducer](xref:package-reducer) for keeping used space down on client machines.

### Disadvantages

* Anyone with permission can push and overwrite packages.
* No HTTP/HTTPS pushing. Must be able to access the folder/share to push to it.
* Starts to affect choco performance once the source has over 500 packages (maybe?).
* No tracking on number of downloads / no package statistics
* **Big disadvantage**: For a file share there is not a guarantee of package version immutability. Does not do anything to keep from package versions being overwritten. This provides no immutability of a package version and no guarantee that a version of a package installed is the same as the version in the source.

### Local Folder Share Setup

No really, it's that easy. Just set your permissions appropriately and put packages in the folder (no subfolders). You are already done. Okay, two additional considerations:

* [Folder Structure](#local-folder-or-share-structure)
* [Permissions](#local-folder-permissions)

#### Local Folder Or Share Structure

The structure should just be a flat folder or share (no subfolders) with nupkgs inside that folder. You get that when you choco push to that location. No subfolders, no `nuget add` type of setup will work for Chocolatey with those local folders and shares.

> :memo: **NOTE** If you build a local NuGet folder repository using NuGet.exe v3.4+, where you use `nuget add`, you may find that it doesn't produce the results you might expect when you are using Chocolatey. It creates subfolders and adds those nupkgs in an optimized way for query. That is fine when there is a server like Chocolatey.Server that does that but has a way to translate that to an OData feed. When Chocolatey is querying those local folders and shares, it uses what is built into the Chocolatey client (choco.exe). That is currently a very enhanced version of NuGet v2, so it won't understand that optimized subfolder structure and you may get no results. So keep things simple and flat for those types of repositories.

#### Local Folder Permissions

Permissions can be interesting with a file share. If you are using machine accounts like LocalSystem, they may not have access to network resources. However there is a way to handle that in domain environments. You would need to grant access to machines or anonymous access to the share (Everyone Read is likely not enough).

A great read on your options can be found at the following Stack Exchange links:

* https://serverfault.com/q/135867/79259
* https://serverfault.com/q/41130/79259

A way to do this with LocalSystem:

1. Create a global group on the Domain
    * add all machines to this group
1. Add this group to the share permissions with "Read" Access
1. Add this group to the NTFS permissions with "Read" Access

> :memo: **NOTE**  You'll need to add this group itself and not nest it inside of another one.

## Simple Server

There is where the bulk of NuGet OData compatible servers fall (NuGet.Server, Chocolatey.Server, etc). There are simple servers that are very enhanced, which fall into the [Commercial Package Repositories](#commercial-package-repositories) section.

* Since Chocolatey just uses an enhanced version of the NuGet framework, it is compatible everywhere you can put a NuGet package.
* We recommend Chocolatey.Server if you are choosing between these options.
* A simple server typically has one repo per instance and manages only Chocolatey / NuGet packages.

### Known Simple Server Options

* NuGet.Server
* [TeamCity](https://www.jetbrains.com/teamcity/) has built-in Simple Server
* [Visual Studio Team Services (NuGet v2 endpoints)](https://docs.microsoft.com/en-us/vsts/package/overview) - [Setup](https://docs.microsoft.com/en-us/vsts/package/get-started-nuget) (Remove the part of the url that is /v3/index.json and use /v2 instead) - you may also need to [setup a personal access token](https://docs.microsoft.com/en-us/vsts/accounts/use-personal-access-tokens-to-authenticate).
* [NuGet.Java.Server](http://blog.jonnyzzz.name/2012/03/nuget-server-in-pure-java.html) ([NuGet Package](https://www.nuget.org/packages/NuGet.Java.Server)) - simple server (same tool used in TeamCity)
* [PHP NuGet](http://www.kendar.org/?p=/dotnet/phpnuget)
* [Hazel](https://github.com/MPIB/hazel)
* [LaGet](https://github.com/ikkentim/LaGet)
* [Klondike](https://github.com/themotleyfool/Klondike)
* Visual Studio Team Services (use NuGet v2 urls)

If the option you've chosen is not listed, take a look at [known hosting options](#known-hosting-options) and follow the link from there to see what the vendor provides in the way of documentation.

### Advantages

* Setup can be really simple - just a website and IIS for some simple servers.
* Windows is not required - there are at least two pure Java versions (see [Non-Windows Hosting](#non-windows-hosting)).
* Push over HTTP / HTTPS/TLS.
* Authentication / Authorization:
  * API key for pushing packages.
  * Basic Authentication with IIS.
* No direct access to packages so security can be locked down to just modify through push.
* Package store is file system.
* Can manage PowerShell gallery type packages.

### Disadvantages

* May only have one API key per repository.
* Starts to affect performance once the source has over 2,000 packages for some sources. It depends on how they keep that information (in a db or file scans).
* Authentication is typically limited to Basic Auth.
* No moderation.
* May not have a website for viewing package information. Use ChocolateyGUI for seeing package information.
* No package statistics for most of the simple server sources.
* Package size may be limited to 28.61MB by default on some simple servers. Depending on your simple server - For IIS simple servers package size can be controlled through [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462(v=vs.90).aspx) and [maxRequestLength](https://msdn.microsoft.com/en-us/library/e1f13641(v=vs.100).aspx). For others like Nexus, it may already be set very high. You can host the installer internally somewhere and access it through packaging though.

The actual limit for package sizes varies depending on what each simple server can handle (usually determined by the limitation of pushing a package to the server). If you determine what those are, we'd be happy to list each one here.

#### Chocolatey.Server Setup

Please see [Set up the Chocolatey.Server](xref:set-up-chocolatey-server). More details below on what this option provides.

[Chocolatey Simple Server](https://community.chocolatey.org/packages/chocolatey.server) is a simple Nuget.Server that is ready to rock and roll. It has already completed Steps 1-3 of NuGet's [host your own remote feed](https://docs.nuget.org/Create/Hosting-Your-Own-NuGet-Feeds#creating-remote-feeds). Some things to consider with Chocolatey.Server as compared to other options:

* Uses same enhanced NuGet that Chocolatey uses so you can see more information in search if you choose to use those things.
* Allows packages up to 2GB. Package size can be controlled through [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462(v=vs.90).aspx) and [maxRequestLength](https://msdn.microsoft.com/en-us/library/e1f13641(v=vs.100).aspx).

> :memo: **NOTE** Commercial options of Chocolatey also may have support for the Chocolatey.Server.

#### NuGet.Server Setup

Setting up NuGet.Server is very much a hands on approach for a packaging server - it requires Visual Studio as you will be adding the NuGet package to a Website project. We recommend looking at Chocolatey.Server as it is nearly the same thing but fully ready to go (and with Chocolatey enhancements).

Many google searches will throw out good ways to set up your own feed (hint: search for "host your own NuGet server feed")
Some notable references:

* Nuget Docs [Host Your Own Remote Feed](https://docs.nuget.org/Create/Hosting-Your-Own-NuGet-Feeds#creating-remote-feeds)
* itToby - [Setup Your Own Chocolatey/NuGet Repository](http://blog.ittoby.com/2014/07/setup-your-own-chocoloateynuget.html)
* Rich Hopkins - [Bake your own Chocolatey NuGet repository](https://souladin.wordpress.com/2014/12/05/bake-your-own-chocolatey-nuget-repository/)
* Brandon - [Host NuGet Server in Azure](http://netitude.bc3tech.net/2015/01/07/create-your-own-hosted-nuget-server-in-azure/)

## Package Gallery

This is like what https://community.chocolatey.org (the community feed runs on). It is the most advanced, having both a file store for packages and a database for tracking all sorts of information.

### Advantages

* Can deal with thousands of packages with no performance issues.
* Package versions are immutable - in other words you can guarantee the version installed is the same as the version in the source.
* Package store can be File system, Azure blobs, or AWS S3 (**S3 available with Chocolatey Package Gallery only**).
* Multiple users each having their own API keys.
* User registration with email confirmation.
* Interaction and collaboration based.
* Can have administrators.
* Can take advantage of moderation (**Chocolatey Package Gallery only**).
* Package statistics (download counts, etc).
* A website to view package information.
* Can be configured to send email.
* Can manage PowerShell gallery type packages.

### Disadvantages

* Speed of setup (can take longer than the rest). There are many moving parts to configure.
* Requires Windows/IIS/SQL Server/SMTP (hopefully with the proper licenses on each of those).
* Not well-documented, could require some diligence to get working.
* A package should not be bigger than 150MB. You can host the installer internally somewhere and access it through packaging though. Package size can be controlled through [maxAllowedContentLength](https://msdn.microsoft.com/en-us/library/ms689462(v=vs.90).aspx) and [maxRequestLength](https://msdn.microsoft.com/en-us/library/e1f13641(v=vs.100).aspx).

#### Package Gallery Setup

Only approach this if you are a Windows Admin with significant experience in setting up SQL Server databases and IIS for ASP.NET MVC sites. We don't have resources to help support the setup, but we can point you to [NuGet Gallery Setup](https://github.com/NuGet/NuGetGallery/wiki/Hosting-the-NuGet-Gallery-Locally-in-IIS).

##### Chocolatey Package Gallery Setup

At this time we don't have setup instructions and are not keen to answer questions specifically surrounding the setup of a Chocolatey Gallery (the code behind chocolatey.org). This is due to specific necessary settings regarding the community packages repository and tight integration to what it offers. Chocolatey for Business is likely to offer a gallery at some point, depending on prioritization.

## Commercial Package Repositories

These are simple servers that have more advanced options and authentication scenarios, plus multiple repository types. This section accounts for the following types.

### Commercial Options

* [Artifactory Pro](http://www.jfrog.com/confluence/display/RTF/NuGet+Repositories)
* [Cloudsmith](https://cloudsmith.com/nuget-feed/) ([Chocolatey Documentation](https://help.cloudsmith.io/docs/chocolatey-repository), [NuGet Documentation](https://help.cloudsmith.io/docs/nuget-feed))
* [Feedz.io](https://feedz.io/docs/package-types/chocolatey)
* [Nexus2](https://books.sonatype.com/nexus-book/reference/nuget-nuget_hosted_repositories.html) / [Nexus3](https://books.sonatype.com/nexus-book/3.0/reference/nuget.html#nuget-hosted)
* [MyGet](https://www.myget.org/)
* [ProGet](http://inedo.com/support/documentation/proget/installation/installation-guide)

If the option you've chosen is not listed, take a look at [known hosting options](#known-hosting-options) and follow the link from there to see what the vendor provides in the way of documentation.

### Advantages

* Setup can be really simple - just a website, IIS, and a local database or file to store configuration.
* May have free tier available (Artifactory is the only known option that does not have a free tier).
* Windows is not required for Nexus, Artifactory, or Cloudsmith.
* Push over HTTP / HTTPS/TLS.
* API key for pushing packages.
* No direct access to packages so security can be locked down to just modify through push or upload.
* Authentication / Authorization:
  * Multiple api keys.
  * Basic Authentication through IIS.
  * RBAC (role-based access control) available in some options.
  * LDAP authentication in some options (although Nuget/Chocolatey may not support this for package operations).
* Package stores can be file system, database, Azure blobs, and AWS S3 depending on the product.
* Website interface.
  * Uploading packages can also be done through website.
* Multiple repositories in an instance.
* Multiple repository types (not limited to just NuGet/Chocolatey types).
* HA (High Availability) available in some options.
* Replication available in some options.
* Can manage PowerShell gallery type packages.

### Disadvantages

* Still unlikely to have moderation. You may not want this anyway.
* Package size may be limited. Check with the vendor to learn what their limits are. You can host the installer internally somewhere and access it through packaging though. Many times these repository types will also support a binary/raw repository you can use to download installers from, keeping a single point of failure on the package repository server.

The actual limit for package sizes varies depending on what each server can handle (usually determined by the limitation of pushing a package to the server). If you determine what those are, we'd be happy to list each one here.

### Commercial Repository Setup

Most hosting options have great information on how to set up the package repository. Please see the documentation with each vendor to learn what options are available and how to set up.

### Commercial Repository System Requirements

For commercial options, we've compiled a list of recommended needs for your server repositories. For Chocolatey clients, please see [client requirements](xref:organizational-deployment-guide). What you will see below are not the minimum values, you can typically get that at each of the links. These are what we typically recommend for use with Chocolatey. All of these options support High Availability (HA) options as well, so if you need something like that for a geographically diverse enterprise, there are options to meet those needs. Keep in mind pricing of each of these goes up based on your needs.

#### Artifactory Pro

* Windows or Linux Server
* CPU - 8-16 cores
* RAM - 16GB+ RAM (12GB of RAM reserved specifically for JVM heap)
* Storage (HDD) - At least 2-5TB of free space for a local file store of artifacts (you need 3 times the size of artifacts you will store).
* Chocolatey Repository Type: NuGet

See https://www.jfrog.com/confluence/display/RTF/System+Requirements for more details.

**PRICING**: Starts at $2,950/year (for Artifactory Pro). No free option for Chocolatey/NuGet type packages - https://jfrog.com/pricing/.

#### Artifactory Enterprise with High Availability

* Artifactory Cluster Server (Each): Windows or Linux Server with 8-16 cores (CPU), 16GB+ RAM (12GB of RAM reserved specifically for JVM heap), and probably at least 100GB of free space (as the artifacts are stored over on the NFS). This is similar to Artifactory Pro section above.
* Network: High Speed LAN (all Artifactory Servers must be on same LAN for syncing purposes).
* Shared Storage: NFS, AWS S3, Google Cloud Storage, or Local File System - Recommend NFS with 3 times the total size of what you will store (and a backup SAN) - 2-5TB+ space.
* Database: You must use an external database (one between all nodes), and it must be VERY powerful. Pretty much the highest specs you can configure on a Windows machine if you use SQL Server. It must support the max number of connections possible from all Artifactory cluster nodes in your system. 16+ cores (CPU), 64GB+ RAM, 5TB+, etc
* Load Balancer: Assume powerful - this will be software-based (such as nginx or HAProxy) or an appliance (such as F5 or Citrix).
* May or may not support cross-datacenter replication.

See https://www.jfrog.com/confluence/display/RTF/Artifactory+High+Availability for more details.

**PRICING**: Starts at $29,500/year (for Artifactory Enterprise) - https://jfrog.com/pricing/.

#### Sonatype Nexus Repository Manager 2

* Windows, Mac OSX, or Linux Server
* CPU - 2-4 cores (Recommend 4+)
* RAM - 16GB+ (4GB of RAM reserved specifically for JRE)
* Storage (HDD) - At least 2-5TB of free space for a local file store of artifacts. [How much space do you need?](https://blog.sonatype.com/2012/01/sizing-nexus-how-much-space-do-you-need/)
* Chocolatey Repository Type: NuGet

See https://help.sonatype.com/repomanager2/system-requirements for more details.

**PRICING**: Starts at free (for Sonatype Nexus Repository Manager) - https://www.sonatype.com/nexus-product-pricing.

#### Sonatype Nexus Repository Manager 3

* Windows, Mac OSX, or Linux Server
* CPU - 4 cores (Recommend more)
* RAM - 16GB+ (4GB of RAM reserved specifically for JRE)
* Storage (HDD) - At least 2-5TB of free space for a local file store of artifacts. [How much space do you need?](https://blog.sonatype.com/2012/01/sizing-nexus-how-much-space-do-you-need/)
* Chocolatey Repository Type: NuGet

See https://help.sonatype.com/repomanager3/installation/system-requirements for more details.

**PRICING**: Starts at free (for Sonatype Nexus Repository Manager) - https://www.sonatype.com/nexus-product-pricing.

#### Sonatype Nexus Repository Manager 3 High Availability

* 3 Node Cluster of Nexus Repository Manager Pro (NXRM Pro) instances (see Nexus 3 above for requirements).
* Network: High Speed LAN (all NXRM Pro Servers must be on same LAN for syncing purposes).
* Shared Storage: Appliance-based (such as NAS), or software-based (such as SMB). This will be shared across all Servers, so they will need to be able to read and write to it at high speed. Recommend appliance-based (NAS) with 3 times the total size of what you will store (and a backup) - 2-5TB+ space.
* Load Balancer: Assume powerful - this will be software-based (such as nginx or HAProxy) or an appliance (such as F5 or Citrix).
* Does not support cross-datacenter replication - only supports single datacenter.

See https://help.sonatype.com/repomanager3/high-availability for details. It is very light on requirements, so assume similar to Artifactory's HA setup, minus a need for an external database.

**PRICING**: Please see https://www.sonatype.com/nexus-product-pricing and contact Sonatype as it is not clear. You need at least 3 NXRM (Nexus Repository Manager) Pro licenses. There may be additional costs.

#### ProGet

* Windows Server
* CPU - 4 cores (Recommend more)
* RAM - 8GB+
* Storage (HDD) - We recommend 2-5TB of free space for a local file store of artifacts (default install needs 20GB).
* Database: SQL Server. Assume high specs for SQL Server, pretty much the highest specs you can configure on a Windows machine. 16+ cores (CPU), 64GB+ RAM, 5TB+, etc
* Chocolatey Repository Type: Chocolatey or NuGet

See https://inedo.com/support/documentation/proget/installation/installation-guide for more details. There is a Linux installation guide for Docker containers, however we don't recommend it for production use - https://inedo.com/support/documentation/proget/installation/installation-guide/linux-docker.

**PRICING**: Starts at free (for ProGet) - https://inedo.com/proget/pricing.

#### ProGet Enterprise High Availability

* ProGet Server (Each): Windows Server with 4+ cores (CPU), 8GB+ RAM, and probably at least 50GB of free space (as the artifacts are stored on shared storage). This is similar to ProGet section above.
* Shared Storage: Appliance-based (such as NAS), or software-based (such as SMB). This will be shared across all Servers, so they will need to be able to read and write to it at high speed. Recommend appliance-based (NAS) with 3 times the total size of what you will store (and a backup) - 2-5TB+ space.
* Database: SQL Server with Database Clustering Recommended. Assume high specs for SQL Server, pretty much the highest specs you can configure on a Windows machine. 16+ cores (CPU), 64GB+ RAM, 5TB+, etc
* Load Balancer: Assume powerful - this will be software-based (such as nginx or HAProxy) or an appliance (such as F5 or Citrix).
* May or may not support cross-datacenter replication.

See https://inedo.com/support/documentation/proget/administration/high-availability for details.

**PRICING**: Starts at $9,995 (for ProGet Enterprise) - https://inedo.com/proget/pricing.

#### Cloudsmith

* Cloudsmith is a universal, cloud native package management solution. It is cloud hosted so no infrastructure requirements are required.
* Chocolatey Repository Type: NuGet https://help.cloudsmith.io/docs/chocolatey-repository

**PRICING**: A range of tiers are available, to suit all sizes of teams, for internal and external distribution, public and private - https://cloudsmith.com/product/pricing/.

## Non-Windows Hosting

If you don't want to host on Windows you have only the following options (from least advanced to most advanced - these options typically also work on Windows):

* CIFS share
* [NuGet.Java.Server](http://blog.jonnyzzz.name/2012/03/nuget-server-in-pure-java.html) ([NuGet Package](https://www.nuget.org/packages/NuGet.Java.Server)) - simple server (same tool used in TeamCity)
* [TeamCity](https://www.jetbrains.com/teamcity/) - contains built-in simple server
* [PHP NuGet](http://www.kendar.org/?p=/dotnet/phpnuget) - Simple server built in PHP
* [Hazel](https://github.com/MPIB/hazel) - Simple server built in Rust
* [Cloudsmith](https://cloudsmith.com) - see [Cloudsmith NuGet Repositories](https://help.cloudsmith.io/docs/nuget-feed)
* [Artifactory Pro](https://www.jfrog.com/artifactory/) - see [Artifactory NuGet Repositories](http://www.jfrog.com/confluence/display/RTF/NuGet+Repositories)
* [Sonatype Nexus](https://books.sonatype.com/nexus-book/reference/nuget-nuget_hosted_repositories.html)
