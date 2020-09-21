# Package Throttle (Licensed Editions Only)

> Use Chocolatey in low bandwidth environments

By default, Chocolatey downloads packages and any resources the packages use as fast as it can. In most cases, this is exactly the behavior you want. However, low bandwidth areas would be overwhelmed with this behavior and so you need to slow Chocolatey down. Package Throttle covers these low bandwidth scenarios automatically.

<!-- TOC -->

- [Usage](#usage)
  - [Requirements](#requirements)
- [See It In Action](#see-it-in-action)
- [Options and Switches](#options-and-switches)
- [FAQ](#faq)
  - [How do I take advantage of this feature?](#how-do-i-take-advantage-of-this-feature)
  - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
  - [How does it work?](#how-does-it-work)
  - [Package Throttle didn't slow down the downloads of resources in my package](#package-throttle-didnt-slow-down-the-downloads-of-resources-in-my-package)
  - [How do I turn this feature on?](#how-do-i-turn-this-feature-on)
  - [How do I turn this feature off?](#how-do-i-turn-this-feature-off)

<!-- /TOC -->

## Usage
Adding the option or config setting for maximum download rate will slow down the speed a package and any resources are downloaded to a particular machine. This is done in "bit per second" (b/s or bps), which is a common unit of data transmission rate (bandwidth) in computers. The symbol bps is often pronounced "bips."

A good way to find what you need is to translate from Kbps to bits: [Google Kbps to bps](https://www.google.com/search?q=2+Kb/s+%3D+?+bps) or KB/s (bytes) to bits: [Google KB/s to bps](https://www.google.com/search?q=2+KB/s+%3D+bps).

### Requirements
* Chocolatey (`chocolatey` package) v0.10.7+.
* Chocolatey Licensed Edition.
* Chocolatey Licensed Extension (`chocolatey.extension` package) v1.10.0+.

## See It In Action
![Package Throttle downloading a package and resources - - if you are on https://chocolatey.org/docs/features-package-throttle, see commented html below for detailed description of image](images/features/features_package_throttle.png)

<!--
Text in the image above:
Package Throttle - Slow Downloads of Packages and Downloaded Resources

- Great for low bandwidth environments
- Will not overwhelm bandwidth pipes
- Set in configuration and forget
- Future Licensed editions: set auto and let Windows determine this value automatically

-->

> :memo: **NOTE**: To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

## Options and Switches
Global Config Setting:

 * `maximumDownloadRateBitsPerSecond` - The maximum download rate in bits per second. '0' or empty means no maximum. A number means that will be the maximum download rate in bps. Defaults to ''.


`choco install` / `choco upgrade` provide the following option(s):

~~~sh
     --bps, --maxdownloadrate, --max-download-rate, --maxdownloadbitspersecond, --max-download-bits-per-second, --maximumdownloadbitspersecond, --maximum-download-bits-per-second=VALUE
     Maximum Download Rate Bits Per Second - The maximum download rate in
       bits per second. '0' or empty means no maximum. A number means that will
       be the maximum download rate in bps. Defaults to config setting of '0'.
       Available in [licensed editions](https://chocolatey.org/compare) v1.10+ only. See https://chocolate-
       y.org/docs/features-package-throttle
~~~

## FAQ

### How do I take advantage of this feature?
You must have a [licensed edition of Chocolatey](https://chocolatey.org/pricing) (Pro, MSP, or Business) and use the community package repository to install/upgrade packages. Pro is a personal, named license that costs about the price of a lunch outing per month and comes with several other features. Business editions are great for organizations that need to manage the total software management lifecycle. MSP editions are for managed service providers and contain the same features as Pro (minus VirusTotal integration).

### I'm a licensed customer, now what?
It works to slow the download rate when you provide the maximum download rate as an argument or as a set feature.

### How does it work?
It sees a resource being downloaded and throttles the download to lower download speeds, ensuring it doesn't go over a set number of bits per second during the entire course of the download.

### Package Throttle didn't slow down the downloads of resources in my package
Package Throttle only works for resources downloaded with built-in Chocolatey PowerShell functions. It will not be able to slow down downloads using WebClient, and it's an anti-pattern in packaging to use WebClient anyways.

### How do I turn this feature on?
* Globally - `choco config set maximumDownloadRateBitsPerSecond <value>`
* Per command - use the option `--max-download-bits-per-second="'<value>'"` with install/upgrade commands.

### How do I turn this feature off?
* Globally - `choco config unset maximumDownloadRateBitsPerSecond`
* Per command - don't specify the `--max-download-bits-per-second` option (and don't have the config set) or `--max-download-bits-per-second="'0'"` if you want to temporarily disable it but keep the config setting.
