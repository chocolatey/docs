# Package Reducer (Licensed Editions Only)
> Reduce the size of your package installations automatically!

If you have a significant number of Chocolatey packages you manage, you may notice that you also may have a pretty significant space usage under the Chocolatey lib directory. Package reducer automatically decreases the size of nupkg files to around 5KB and removes installers and zips automatically from your package install directories. This may allow you to save GBs of usage for a large amount of packages being managed!

<!-- TOC -->

- [Automatic](#automatic)
  - [Usage](#usage)
    - [Requirements](#requirements)
    - [Setup](#setup)
  - [See It In Action](#see-it-in-action)
  - [Options and Switches](#options-and-switches)
  - [FAQ](#faq)
    - [How do I take advantage of this feature?](#how-do-i-take-advantage-of-this-feature)
    - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
    - [How does it work?](#how-does-it-work)
    - [How do I turn this feature on?](#how-do-i-turn-this-feature-on)
    - [How do I turn this feature off?](#how-do-i-turn-this-feature-off)
    - [Can I just deflate nupkg file sizes?](#can-i-just-deflate-nupkg-file-sizes)
    - [Can I apply reducer to already installed packages?](#can-i-apply-reducer-to-already-installed-packages)
- [Optimize Command](#optimize-command)
  - [Usage](#usage-1)
    - [Requirements](#requirements-1)
  - [Examples](#examples)
  - [See It In Action](#see-it-in-action-1)
  - [Options and Switches](#options-and-switches-1)
  - [FAQ](#faq-1)
    - [How do I take advantage of this feature?](#how-do-i-take-advantage-of-this-feature-1)
    - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what-1)
    - [How does it work?](#how-does-it-work-1)

<!-- /TOC -->

## Automatic
### Usage
When you normally create packages that embed or download resources, the impact on a system includes the following:

* A nupkg file size takes up some space - this is like a fancy zip file and may contain binaries
* Files extracted or downloaded to the package directory - this may include zips and installers
* The actual install location if using an installer
* MSI cached by Windows - Windows caches the complete MSI binaries

Typically with this in mind, the size of nupkg could account for an up to 4x impact on a system considering the above. So we typically recommend organizations set a comfortable threshold for package sizes (around 500MB) before splitting out binaries to downloaded resources.

Package Reducer nearly removes that need as it reduces the nupkg file to 5KB by removing all the embedded files. Then it takes it a step further and removes zip and installers from the package directory automatically (configurable by a feature switch, see [Setup](#setup)).

When you turn on Package Reducer, the first two items above no longer take up any significant space. This can reduce space usage in the order of GBs for some installations of Chocolatey.

With Package Reducer:

* nupkg file is reduced to 5KB or less, no matter the size on install
* zips / installers are automatically removed from the package directory if they are found

The following file extensions are removed automatically:

* 7z / zip / rar / gz / tar / sfx
* iso
* msi / msu / msp
* exe files if they are detected to be an installer

So the space usage impact changes to what you'd normally experience outside of Chocolatey:

* the actual install location (package directory, Program Files, etc)
* MSI cache for MSIs

#### Requirements

* Chocolatey (`chocolatey` package) v0.10.7+.
* Chocolatey Licensed Edition
* Chocolatey Licensed Extension (`chocolatey.extension` package) v1.12.0+.

#### Setup

To turn on Package Reducer, you need to run the following:

* `choco upgrade chocolatey.extension <options>`
* `choco feature enable -n reduceInstalledPackageSpaceUsage`
* If you want to limit to just nupkg files being reduced and not automatically removing zips and installers, run the following: `choco feature enable -n reduceOnlyNupkgSize`

### See It In Action

![Package Reducer - if you are on https://chocolatey.org/docs/features-package-reducer, see commented html below for detailed description of image](images/features/features_package_reducer.png)

<!--
Text in the image above:

Package Reducer - Reduce Space Usage Automatically on Install/Upgrade

- Nupkg file is reduced to 5KB or less, no matter the size
- Zips / installers are automatically removed from the package directory if found
- Zips / installers are removed from TEMP cache if found

The image shows an installation without and with package reducer. The difference in size is over 20MB, as the package included the binaries.

-->

> :memo: **NOTE**: To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

### Options and Switches

Global Config Setting:

 * `reduceInstalledPackageSpaceUsage` - Reduce Installed Package Size (Package Reducer) - Reduce size of the nupkg file to very small and remove extracted archives and installers.


`choco install` / `choco upgrade` provide the following option(s):

~~~
     --reduce, --reduce-package-size, --deflate, --deflate-package-size
     Reducer Installed Package Size (Package Reducer) - Reduce size of the
       nupkg file to very small and remove extracted archives and installers.
       Overrides the default feature 'reduceInstalledPackageSpaceUsage' set to
       'False'. Licensed editions only (version 1.12.0+). See
       https://chocolatey.org/docs/features-package-reducer

     --no-reduce, --no-reduce-package-size, --no-deflate, --no-deflate-package-size
     Do Not Reduce Installed Package Size - Leave the nupkg and files alone
       in the package. Overrides the default feature
       'reduceInstalledPackageSpaceUsage' set to 'False'. Licensed editions
       only (version 1.12.0+). See https://chocolatey.org/docs/features-package-reducer

     --reduce-nupkg-only, --deflate-nupkg-only
     Reduce Only Nupkg File Size - reduce only the size of nupkg file when
       using Package Reducer. Overrides the default feature
       'reduceOnlyNupkgSize' set to 'False'. Licensed editions only (version -
       1.12.0+). See https://chocolatey.org/docs/features-package-reducer
~~~


### FAQ

#### How do I take advantage of this feature?
You must have a [licensed edition of Chocolatey](https://chocolatey.org/pricing) (Pro, MSP, or Business) and use the community package repository to install/upgrade packages. Pro is a personal, named license that costs about the price of a lunch outing per month and comes with several other features. Business editions are great for organizations that need to manage the total software management lifecycle. MSP editions are for managed service providers and contain the same features as Pro (minus VirusTotal integration).

#### I'm a licensed customer, now what?
Once you have set up the feature(s), it will automatically reduce the size of the packaging on install and upgrade.

#### How does it work?
It just works. When you install or upgrade a package, it will automatically reduce the size of the installation directory if you've set up Package Reducer properly.

#### How do I turn this feature on?
* Globally - `choco feature enable -n reduceInstalledPackageSpaceUsage`
* Per command - use the option `--reduce-package-size` with install/upgrade commands.

#### How do I turn this feature off?
* Globally - `choco feature disable -n reduceInstalledPackageSpaceUsage`
* Per command - use the option `--no-reduce-package-size` with install/upgrade commands.

#### Can I just deflate nupkg file sizes?
Yes!

* Globally - `choco feature disable -n reduceInstalledPackageSpaceUsage`
* Per command - use the option `--reduce-nupkg-only` with install/upgrade commands.

#### Can I apply reducer to already installed packages?
See the next section, the `choco optimize` command.



## Optimize Command

Package Reducer's Package Optimizer is available in all licensed editions starting at Chocolatey Licensed Extension v1.12.0. It is similar to the automatic reduction, except it reduces the size of existing installations.

With Package Optimizer:

* nupkg file is reduced to 5KB or less, no matter the size.
* zips / installers are automatically removed from the package directory if they are found.
* zips / installers are removed from TEMP cache if found.

The following file extensions are removed automatically:

* 7z / zip / rar / gz / tar / sfx
* iso
* msi / msu / msp
* exe files if they are detected to be an installer

### Usage

~~~sh
choco optimize [<options/switches>]
~~~

#### Requirements

* Chocolatey (`chocolatey` package) v0.10.7+.
* Chocolatey Licensed Edition
* Chocolatey Licensed Extension (`chocolatey.extension` package) v1.12.0+.

### Examples

~~~sh
choco optimize
choco optimize --reduce-nupkg-only
~~~

### See It In Action

![choco optimize - if you are on https://chocolatey.org/docs/features-package-reducer, see commented html below for detailed description of image](images/features/features_package_reducer_optimize.png)

<!--
Text in the image above:

Package Reducer's Package Optimizer (choco optimize) - Reduce Space for Existing Package Installs

- Great for reducing MB and even GB of space with Chocolatey installations!
- Nupkg file is reduced to 5KB or less, no matter the size
- Zips / installers are automatically removed from the package directory if found
- Zips / installers are removed from TEMP cache if found

This image shows a display of `choco optimize` reducing space for 34 existing installed packages. It shows what it is doing for each package, and shows how much space each package has now been saved. It shows a summary which shows the total space reduced for the machine overall.
-->


### Options and Switches

~~~sh
    --reduce-nupkg-only, --deflate-nupkg-only
    Reduce Only Nupkg File Size - reduce only the size of nupkg file when
      using Package Optimizer. Licensed editions only (version 1.12.0+).
~~~


### FAQ

#### How do I take advantage of this feature?
You must have a [licensed edition of Chocolatey](https://chocolatey.org/pricing) (Pro, MSP, or Business) and use the community package repository to install/upgrade packages. Pro is a personal, named license that costs about the price of a lunch outing per month and comes with several other features. Business editions are great for organizations that need to manage the total software management lifecycle. MSP editions are for managed service providers and contain the same features as Pro (minus VirusTotal integration).

#### I'm a licensed customer, now what?
You can just run `choco optimize`. Couple it with package reducer features to automatically ensure your Chocolatey installation stays very small.

#### How does it work?
It goes through all existing packages and removes unnecessary installers and zips. It also deflates nupkg files down to 5KB or less.
