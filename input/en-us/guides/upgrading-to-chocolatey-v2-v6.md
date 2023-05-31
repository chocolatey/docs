---
Order: 5
xref: upgrading-to-chocolatey-v2-v6
Title: Upgrading To Chocolatey Products v2.0.0 and Chocolatey Licensed Extension 6.0.0
Description: Find out what you need to know about upgrading to Chocolatey products v2.0.0 and Chocolatey Licensed Extension v6.0.0.
---

The Chocolatey v2.0.0 and v6.0.0 releases are major updates to our products that include additional functionality as well as some functionality that has changed or been removed. The major releases of these products are shown below:

* Chocolatey CLI 2.0.0
* Chocolatey Licensed Extension 6.0.0
* Chocolatey Agent 2.0.0
* Chocolatey GUI 2.0.0
* Chocolatey GUI Licensed Extension 2.0.0

## What Should You Do If You Have Questions?

If you have any doubts about upgrading, any areas that you are just uncertain about or have any questions at all about this upgrade guide, please don't proceed. Support is available:

* **Licensed Customers**. We have a Support Team that is available to help with any issues. Please run `choco support` to find the support options available to you.
* **Free and Open-Source (FOSS) Users**. The Chocolatey Team are usually available to help with community support, but there is also a vast community to help answer questions and help with issues on [Discord](https://ch0.co/community).

## Important Information You Should Know Before Upgrading Your Chocolatey Products

> :choco-warning: **WARNING**
>
> This section provides you with critical information you should be aware of before upgrading the installed Chocolatey product components. If you have any questions, please reach out for [support](#what-should-you-do-if-you-have-questions).

We have listed the bug fixes, features and improvements below that we feel you should be most aware of before upgrading. We have also highlighted critical areas that need you need to carefully consider before you continue upgrading.

### Sonatype Nexus Repository Sources

The Sonatype Nexus Repository Manager has an [issue that can cause it to go into an infinite loop of querying for packages from a NuGet v2 feed](https://issues.sonatype.org/browse/NEXUS-13426) (you will need a login for Sonatypes' Jira system to view the issue). The only affects Sonatype Nexus NuGet v2 feeds as it has been fixed for NuGet v3 feeds.

To work around this issue, please ensure that you have 29 or less package versions of any Chocolatey product in your internal Sonatype Nexus NuGet v2 feed repository _before_ you start the upgrade.

### Side-By-Side Installs Have Been Removed

This is [discussed in more depth later](#side-by-side-installs-have-been-removed-1), but we wanted to highlight it here as it is a very important consideration to make before upgrading.

### Package Version Normalization

Due to newer semantic version requirements imposed by the NuGet libraries, some version numbers may appear differently than they did in Chocolatey CLI v1.x.
As of Chocolatey CLI v2.0.0:

* Version numbers that have fewer than three parts will have the version filled out to three segments (for example, `1.2` will be normalized to `1.2.0`).
* Version numbers that have leading zeroes in any part will have those leading zeroes removed (for example, `1.001.2` will be normalized to `1.1.2`).

This normalization is applied to the generated nupkg when using `choco pack`, and will also affect any displayed versions of packages from remote sources.

### Optimizing Performance

The implementation of NuGet v3 feeds means that Chocolatey CLI now supports both NuGet v2 and v3 feed, in addition to the idiosyncrasies of some repository managers. Chocolatey CLI determines what repository manager and feed version is being used using queries to the source. In some circumstances this can cause Chocolatey CLI and Chocolatey GUI to be slower when determining outdated packages or when calculating a lengthy dependency chain.

We have thoroughly tested all Chocolatey products and have optimized many areas, but we acknowledge that there is more to do. But we need real-world experiences. Chocolatey values your privacy and our products do not use telemetry. To allow us to improve performance further, we ask for you [reach out to us and provide your performance experiences using Chocolatey products](#what-should-you-do-if-you-have-questions).

## New Features and Improvements

As this is a major release, there are breaking changes, bug fixes, features and quality of life improvements, that you should be aware of _before upgrading_. We have only included those changes that we believe affects our customers and community. Not every change has been included.

[Read the overview of changes](xref:choco-new-in-v2), or you can read the release notes for a detailed list of changes in each product:

* [Chocolatey CLI](xref:choco-release-notes#may-31-2023)
* [Chocolatey Licensed Extension](xref:licensed-extension-release-notes#may-31-2023)
* [Chocolatey Agent](xref:agent-release-notes#may-31-2023)
* [Chocolatey GUI](xref:chocolateygui-release-notes#may-31-2023)
* [Chocolatey GUI Licensed Extension](xref:chocolatey-gui-licensed-extension-release-notes#may-31-2023)

### .NET Framework 4.8 Required

In previous version of Chocolatey CLI, .NET Framework 4.0 was a minimum requirements. This has now changed to be .NET Framework 4.8.

The Chocolatey CLI installation process will try to install .NET Framework 4.8 if it's not already present on the computer. This will require a reboot before Chocolatey CLI can then be installed and means that the installation process will have to be started again.

We recommend you install .NET Framework 4.8 and reboot, before installing or upgrading to Chocolatey CLI v2.0.0.

If you are unable to upgrade to .NET Framework 4.8, **we do not recommend** you upgrade to Chocolatey CLI version 2.0.0 at this time. Please see our [Support Lifecycle](xref:chocolatey-components-dependencies-and-support-lifecycle) for Chocolatey products.

### NuGet v3 Feed Support Added

Chocolatey CLI has supported NuGet v2 feeds since its earliest days. But, like all things, time and technology marches on and NuGet v3 feeds provide new opportunities for package management. Chocolatey CLI now supports NuGet v3 package feeds and listed below are some of the repository managers that also support them:

* [GitHub Packages](https://github.com/features/packages)
* [Sonatype Nexus](https://www.sonatype.com/products/sonatype-nexus-repository)
* [JFrog Artifactory](https://jfrog.com/artifactory/)
* [ProGet](https://inedo.com/proget)

Adding NuGet v3 feed support to Chocolatey CLI has been a long-term goal that we are delighted to have completed. It required a substantial development effort and is a major change to the Chocolatey CLI internals.

### SemVer 2.0.0 Support

We have added support for [SemVer 2.0.0](https://semver.org/spec/v2.0.0.html) that allows previously invalid pre-release version numbering such as `1.0.1-alpha.23` to now be used alongside the current four part version numbering (`1.2.3.4`). The only constraint on the version number segments is that they must fit into the range `0` to `2147483647`.

The Chocolatey Community Repository does not support SemVer 2.0.0 at this time so this is supported only on third-party repositories.

### Supported Operating Systems

We have clarified the Operating Systems we support and updated our [Support Lifecycle](xref:chocolatey-components-dependencies-and-support-lifecycle) documentation.

### Side-By-Side Installs Have Been Removed

Side-by-side installs were introduced in Chocolatey CLI to help with the challenge of installing multiple versions of the same package. As use of the functionality grew and expanded beyond the boundaries of the narrow use case that it was intended to help with, the number of users running into issues with it also increased. The use of side-by-side installs began to cause more problems that it solved, and the decision was made to remove it from version 2.0.0 of Chocolatey CLI.

We do have plans for similar functionality in a future release that will allow multiple versions of a package to be installed, but do not have any timescale for that as yet.

If you need side-by-side functionality, **we do not recommend** you upgrade to Chocolatey CLI version 2.0.0 at this time. Please see our [Support Lifecycle](xref:chocolatey-components-dependencies-and-support-lifecycle) for Chocolatey products.

### The List Command Now Lists Local Packages Only and the `--local-only` and `-lo` Options Have Been Removed

In version 1.0.0 of Chocolatey CLI, we added notices that the `choco list` command will list only local packages, and deprecated the `--local-only` and `-lo` options. See this [GitHub issue for more information](https://github.com/chocolatey/choco/issues/158).

Running `choco list --local-only` or `choco list -lo` will now show this message:

```text
Invalid argument --local-only. This argument has been removed from the list command and cannot be used.
```

To ensure we do not break any existing automation, integrations or scripts using the `--limit-output` or `-r` options, we add a warning to the logs but otherwise ignore the options. As this will be removed in a future release, please ensure you remove the `--local-only` and `-lo` options from any automations or scripts that you have.

### Chocolatey Shortcut Shims Removed

In addition to the [Chocolatey shortcut shims removed in version 1.0.0](https://github.com/chocolatey/choco/issues/2468), we have removed the [remaining ones](https://github.com/chocolatey/choco/issues/2641). The shims removed (including the earlier ones) and their equivalent full commands are:

* `chocolatey`: use `choco`.
* `cinst`: use `choco install`.
* `clist`: use `choco list`.
* `cpush`: use `choco push`.
* `cuninst`: use `choco uninstall`.
* `cup`: use `choco upgrade`.
* `cver`: use `choco --version`.

If you want to add these shortcuts back, you can create a PowerShell function or batch file to provide the same functionality. An example PowerShell function, you could add to your PowerShell profile, would be:

```powershell
function cinst { choco install $args }
```

### Removed the Chocolatey Community Repository as the Default Push Source

The Chocolatey Community Repository, https://push.chocolatey.org, has been the default source for pushing packages to with Chocolatey CLI since the very first days. This has led to some accidental packages being pushed to the repository, rather than an internal organizational repository, that have had to be removed.

As the vast majority of packages being pushed with Chocolatey CLI are not to the Chocolatey Community Repository, we have removed the Chocolatey Community Repository as the default push source. A newconfiguration value, `defaultPushSource` has been added that must be set if you want a default source to push to when not specifying a source with the `choco push` command. To set a default source, run `choco config --name="'defaultPushSource'" --value="'<PUSH URL>'"`, where `<PUSH URL>` is `https://push.chocolatey.org` for the Chocolatey Community Repository, or your internal repository source.

Alternatively, you can specify the push source when pushing a package by running `choco push --source="'<PUSH URL>'"` where `<PUSH URL>` is the repository source URL.

### Modified API Key Commands

To make working with Chocolatey CLI consistent, we have changed the `choco apikey` command to add the following subcommands:

* `add`: add an API key.
* `remove`: remove an API key.
* `list`: list API keys.

As the `remove` subcommand has been added, we have removed the `--remove` option.

## Upgrading Chocolatey Products

> :choco-warning: **WARNING**
>
> The Chocolatey products are inter-dependent on each other and all the products you have installed _must_ be upgraded. You cannot upgrade one product and leave the others at older versions.

### What To Do If Upgrading Fails

The first thing you should do is not panic! Please reach out for [support](#what-should-you-do-if-you-have-questions).

### Test. Test. Test.

We recommend that you test the upgrade process on a small sample of non-production computers to ensure it works for your environment and that you are comfortable with it. _Always_ test any upgrades on a small sample of computers before deploying to a wider group, or to production.

### Latest 1.x and 5.x Stable Chocolatey Products

To upgrade, you need to ensure you are at the latest stable version of the Chocolatey products that are installed on your computer. These are:

* Chocolatey CLI 1.4.0
* Chocolatey Licensed Extension 5.0.3
* Chocolatey Agent 1.1.2
* Chocolatey GUI 1.1.3
* Chocolatey GUI Licensed Extension 1.0.3

There are two steps to go through, depending on whether you have any of the Chocolatey 2.0.0 or 6.0.0 pre-release products installed.

<video class="img-fluid" width="800" height="594" poster="/assets/images/chocolatey-upgrade-to-2-banner.png" controls preload="none">

   <source src="/assets/images/chocolatey-upgrade-to-2.mp4" type="video/mp4">
</video>

### Upgrade Using the Command Line

> :choco-warning: **WARNING**
>
> We recommend that you test the upgrade process on a small sample of non-production computers to ensure it works for your environment and that you are comfortable with it. _Always_ test any upgrades on a small sample of computers before deploying to a wider group, or to production.

If you are not using Chocolatey Central Management, Intune or a configuration management tool such as Ansible or Puppet, you will likely be using the command line to upgrade Chocolatey products.

#### Step 1 - Get to the Latest Stable 1.x and 5.x Product Versions

> :choco-warning: **WARNING**
>
> If you need to specify a `--source` option on the command line, please make sure you reference only one source value. For example, `--source="'my-internal-repo'"` and not `--source="'my-internal-repo;chocolatey.licensed'"`. Specifying multiple sources for this specific upgrade may cause the Chocolatey product packages to not be found. Note that this only affects the upgrade to version 2.0.0 or 6.0.0 of the Chocolatey products and not future packages you may install or upgrade.

If you have a pre-release version of the Chocolatey GUI 2.0.0-alpha or 2.0.0-beta, please uninstall it before continuing by running `choco uninstall chocolateygui`, from an elevated session. We will install it again in later steps. Once that is complete, follow the steps below:

1. Run `choco upgrade chocolatey --version 1.4.0 --allow-downgrade --source="'<PACKAGE SOURCE>'"`, from an elevated command-line session, where `<PACKAGE SOURCE>` is a _single source_ you install packages from.

    1. If you have a pre-release version of Chocolatey GUI 2.0.0-alpha or 2.0.0-beta installed, the upgrade of the `chocolateygui` package may fail. Please uninstall it by running `choco uninstall chocolateygui` and then `choco install chocolateygui --version 1.1.3 --source="'<PACKAGE SOURCE>'"` from an elevated session, where `<PACKAGE SOURCE>` is a _single source_ you install packages from.

1. Run `choco list --local-only` and ensure the [product versions match the above](#latest-1.x-and-5.x-stable-chocolatey-products). If they do not, you may need to install the correct versions of those specific products by running `choco install <PRODUCT NAME> --version <PRODUCT VERSION> --allow-downgrade --source="'<PACKAGE SOURCE>'"`, from an elevated command-line session, where `<PACKAGE SOURCE>` is a _single source_ you install packages from.

#### Step 2 - Upgrade to the New 2.0.0 and 6.0.0 Product Versions

> :choco-warning: **WARNING**
>
> If you need to specify a `--source` option on the command line, please make sure you reference only one source value. For example, `--source="'my-internal-repo'"` and not `--source="'my-internal-repo;chocolatey.licensed'"`. Specifying multiple sources for this specific upgrade may cause the Chocolatey product packages to not be found. Note that this only affects the upgrade to version 2.0.0 or 6.0.0 of the Chocolatey products and not future packages you may install or upgrade.

Once you have completed step 1 above, you will be ready to start the upgrade to the latest version of Chocolatey products. To start, run `choco upgrade chocolatey --source="'<PACKAGE SOURCE>'"`, from an elevated command-line session, where `<PACKAGE SOURCE>` is a _single source_ you install packages from.

### Upgrade Using Chocolatey Central Management Deployments

> :choco-warning: **WARNING**
>
> We recommend that you test the upgrade process on a small sample of non-production computers to ensure it works for your environment and that you are comfortable with it. _Always_ test any upgrades on a small sample of computers before deploying to a wider group, or to production.

#### Step 1 - Get to the Latest Stable 1.x and 5.x Product Versions

If your computers have the latest versions of Chocolatey products installed, you can immediately move onto [Step 2](#step-2-upgrade-to-the-new-2.0.0-and-6.0.0-product-versions-1).

The Chocolatey 2.0.0 and 6.0.0 pre-release versions were not recommended for production environments, and we haven't provided steps to downgrade to the latest 1.x and 5.x stable releases here. If you have the pre-release versions installed on some test computers, please follow the [steps above](#upgrade-using-the-command-line) to downgrade to the 1.x and 5.x stable versions paying particular attention to the note on downgrading Chocolatey GUI.

> :choco-warning: **WARNING**
>
> If you need to specify a `--source` option in the Advanced Deployment PowerShell script, please make sure you reference only one source value. For example, `--source="'my-internal-repo'"` and not `--source="'my-internal-repo;chocolatey.licensed'"`. Specifying multiple sources for this specific upgrade may cause the Chocolatey product packages to not be found. Note that this only affects the upgrade to version 2.0.0 or 6.0.0 of the Chocolatey products and not future packages you may install or upgrade.

1. In Chocolatey Central Management, ensure you have a group of computers to deploy to, and if necessary [create one](xref:ccm-groups).

1. [Create an Advanced Deployment](xref:ccm-deployments) with the group of computers to deploy the upgrade to the latest stable 1.x and 5.x versions of Chocolatey products. The Deployment will have 2 steps:

    1. The first Deployment Step will upgrade Chocolatey Agent and it's required dependencies. As communication with Chocolatey Central Management takes place through Chocolatey Agent, we need to ensure the service is running and so the upgrade is done by a Windows scheduled task. The Advanced Deployment PowerShell script should be:

    ```powershell
    $delayInMinutes = 1
    # If using an internal repository to install Chocolatey Agent, replace `chocolatey.licensed` below
    # with the name or URL of your internally configured source.
    choco upgrade chocolatey-agent --version 1.1.2 --source="'chocolatey.licensed'"
    # Ensure the deployment task registers as failed if the installation failed, and skip registering the
    # scheduled task.
    if ($LASTEXITCODE -ne 0) {
        Write-Error 'The upgrade failed!'
        exit $LASTEXITCODE
    }
    # Restart the Agent service after the preset delay time via a scheduled task.
    $trigger = New-ScheduledTaskTrigger -Once -At (Get-Date).AddMinutes($delayInMinutes)
    $action = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument "-WindowStyle Hidden -Command Restart-Service chocolatey-agent"
    $principal = New-ScheduledTaskPrincipal -GroupId Administrators -RunLevel Highest
    $settings = New-ScheduledTaskSettingsSet -Hidden
    Register-ScheduledTask -Action $action -Trigger $trigger -TaskName "restart chocolatey-agent" -Description "Upgrade Chocolatey Agent" -Principal $principal -Settings $settings -Verbose:$false
    ```

    If you use an internal repository, change the `--source="'chocolatey.licensed'"` on line 4 of the script above, to your internal repository location. For further information see the [documentation on upgrading Chocolatey Agent using Chocolatey Central Management](xref:upgrade-agent#using-chocolatey-central-management-to-upgrade-chocolatey-agent).

    2. The second Deployment Step ensures that all other Chocolatey products are now at their latest 1.x and 5.x versions. The Advanced Deployment PowerShell script should be `choco upgrade chocolatey --version 1.4.0 --source="'chocolatey.licensed'"`. If you use an internal repository, change the `--source="'chocolatey.licensed'"` in the command, to your internal repository location.

Once the Deployment is complete, move on to the next step.

#### Step 2 - Upgrade to the New 2.0.0 and 6.0.0 Product Versions

> :choco-warning: **WARNING**
>
> If you need to specify a `--source` option in the Advanced Deployment PowerShell script, please make sure you reference only one source value. For example, `--source="'my-internal-repo'"` and not `--source="'my-internal-repo;chocolatey.licensed'"`. Specifying multiple sources for this specific upgrade may cause the Chocolatey product packages to not be found. Note that this only affects the upgrade to version 2.0.0 or 6.0.0 of the Chocolatey products and not future packages you may install or upgrade.

Once you have completed step 1 above, you will be ready to start the upgrade to the latest version of Chocolatey products:

1. Using the same group used in Step 1 above, create an [Advanced Deployment](xref:ccm-deployments) with two Steps:

    1. The first Deployment Step will upgrade Chocolatey Agent through a Windows scheduled task. Add the [recommended code](xref:upgrade-agent#using-chocolatey-central-management-to-upgrade-chocolatey-agent) as the PowerShell script. Note that this code is different from above. If you use an internal repository, change the `--source 'chocolatey.licensed'` in the command, to your internal repository location.

    1. The second Deployment Step ensures that all other Chocolatey products are now at their latest stable 2.0.0 and 6.0.0 versions. The Advanced Deployment PowerShell script should be `choco upgrade chocolatey --source="'chocolatey.licensed'"`. If you use an internal repository, change the `--source="'chocolatey.licensed'"` in the command, to your internal repository location.

Once the Deployment is complete, all Chocolatey products will be upgraded to their latest 2.0.0 and 6.0.0 versions.

### Upgrade Using Microsoft Intune

> :choco-warning: **WARNING**
>
> We recommend that you test the upgrade process on a small sample of non-production computers to ensure it works for your environment and that you are comfortable with it. _Always_ test any upgrades on a small sample of computers before deploying to a wider group, or to production.

Please see the specific documentation on [upgrading Chocolatey products with Intune](xref:intune-upgrade).

### Other Integrations

> :choco-warning: **WARNING**
>
> You **must** upgrade Chocolatey CLI to 1.4.0 before you start your upgrade to the Chocolatey CLI 2.0.0 or Chocolatey Licensed Extension 6.0.0 versions. Failure to do this may result in Chocolatey products being non-functional.

> :choco-warning: **WARNING**
>
> We recommend that you test the upgrade process on a small sample of non-production computers to ensure it works for your environment and that you are comfortable with it. _Always_ test any upgrades on a small sample of computers before deploying to a wider group, or to production.

> :choco-warning: **WARNING**
>
> If you need to specify a `--source` option in the integration, please make sure you reference only one source value. For example, `--source="'my-internal-repo'"` and not `--source="'my-internal-repo;chocolatey.licensed'"`. Specifying multiple sources for this specific upgrade may cause the Chocolatey product packages to not be found. Note that this only affects the upgrade to version 2.0.0 or 6.0.0 of the Chocolatey products and not future packages you may install or upgrade.

There are many ways to manage Chocolatey packages using integrations such as [Ansible](https://galaxy.ansible.com/chocolatey/chocolatey) and [Puppet](https://forge.puppet.com/modules/puppetlabs/chocolatey/readme). We are unable to list specific steps for each one, but the steps to follow match those above:

1. Upgrade or downgrade as necessary, to ensure you are on the [latest 1.x and 5.x versions of Chocolatey products](#latest-1.x-and-5.x-stable-chocolatey-products). It is important that you do not skip this step.

1. Upgrade to the latest stable 2.0.0 and 6.0.0 Chocolatey product versions.

## Questions?

If you have any doubts about upgrading, any areas that you are just uncertain about or have any questions at all about this upgrade guide, please don't proceed but instead [reach out for support](#what-should-you-do-if-you-have-questions).
