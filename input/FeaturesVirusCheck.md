# Runtime Malware Protection / Virus Scanning (Licensed Editions Only)
We are pleased to offer runtime malware protection for our [customers](https://chocolatey.org/pricing)! Virus checking is available in two flavors - VirusTotal and Generic malware verification.

<!-- TOC -->

- [Usage](#usage)
  - [VirusTotal](#virustotal)
  - [Generic](#generic)
- [See It In Action](#see-it-in-action)
- [Options And Switches](#options-and-switches)
- [FAQ](#faq)
  - [How do I take advantage of this feature?](#how-do-i-take-advantage-of-this-feature)
  - [I'm a licensed customer, now what?](#im-a-licensed-customer-now-what)
  - [How do I turn this feature on?](#how-do-i-turn-this-feature-on)
  - [How do I turn this feature off?](#how-do-i-turn-this-feature-off)
  - [How do I override the minium number of positives?](#how-do-i-override-the-minium-number-of-positives)
  - [How does the VirusTotal integration work?](#how-does-the-virustotal-integration-work)
  - [How does VirusTotal verify the binary?](#how-does-virustotal-verify-the-binary)
  - [What if VirusTotal doesn't have results for a binary?](#what-if-virustotal-doesnt-have-results-for-a-binary)
  - [Do you have plans to offer better integration with particular anti-virus scanners?](#do-you-have-plans-to-offer-better-integration-with-particular-anti-virus-scanners)

<!-- /TOC -->

## Usage

When a binary is not flagged:
![Virus scan pass](images/virus_scan_normal.png)

When a binary is flagged:
![Virus scan failure](images/virus_scan_flagged.png)


### VirusTotal
We've teamed up with the amazing [VirusTotal](https://virustotal.com/) to offer a second opinion to your built-in anti-virus solution. When your packages download content from the internet, Chocolatey Pro will automatically check the executables prior to running any content. If a certain number of positives have been identified (configurable), Chocolatey will fail the install automatically (but can be overridden).

VirusTotal scans binaries against over 50 different anti-virus scanners. Chocolatey will use the information based on sending a SHA256 checksum of the binary to VirusTotal and determining what the scans have determined.

By default the virus scanner is already enabled and set to VirusTotal for Pro licenses. Organizations usually are more wary about reaching out to the internet, so the feature is set to Generic and the virus scanner may not be enabled by default (because it needs configuration). If you need to configure the virus scanner to use VirusTotal, please run the following two commands:

 * `choco config set virusScannerType VirusTotal`
 * `choco feature enable -n virusCheck`

Because some scanners can be quite aggressive and may falsely identify a binary as a false positive for malware, Chocolatey doesn't flag a binary until a certain number of scanners have identified the binary as malware. This number defaults to `5` in the configuration. This means 5 AV scanners need to flag the binary for Chocolatey to stop and fail the install/upgrade. You can adjust this value in two ways, by adjusting the configuration and per choco command.

To adjust the configuration value, which will globally set the number, please run the following replacing `##` with the value you want as a minimum:

 * `choco config set virusCheckMinimumPositives ##`

You can also adjust the default number of positives prior to flagging a binary with the `virusCheckMinimumPositives` configuration value. By default it is set to `5`, which means 5 AV scanners need to flag the binary for Chocolatey to stop and fail the install/upgrade.

If you need to override the minimum number of positives just for one install/upgrade, you can do that by passing `--virus-positives-minimum=VALUE` with your install or upgrade commands.

### Generic
If you are an organization and you do not want to reach out to the internet for virus scan verification, you will want to take advantage of hooking Chocolatey up to your existing AV solution.

Chocolatey will just need to know the full path to the AV command line executable, the arguments to pass, and valid exit codes (comma separated).
Then you will get the same benefit of runtime virus checking as an added benefit on top of the protection it is already providing.

If you need to configure the virus scanner to use your built-in antivirus solution, please run the following two commands:

 * `choco config set virusScannerType Generic`
 * `choco config set genericVirusScannerPath "full path to av command line"`
 * `choco config set genericVirusScannerArgs "[[File]]"`
 * `choco config set genericVirusScannerValidExitCodes "0, ##"`
 * `choco feature enable -n virusCheck`

The `genericVirusScannerPath` should be the full path to the anti-virus command line executable. What we are looking for is the command line interface to the scanner.

In `genericVirusScannerArgs`, these are the arguments that Chocolatey will pass to the AV console. Chocolatey will automatically replace `[[File]]` with the full path to the binary that it is scanning.

In `genericVirusScannerValidExitCodes`, these are exit codes that indicate that a binary is okay. This defaults to `0`, but you can configure this with as many exit codes as necessary by adding them to the configuration as comma separated values.

## See It In Action

![Pro install in action](images/gifs/chocopro_install_stopped.gif)

> :memo: **NOTE**: To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

## Options And Switches

The following options are added to install and upgrade commands.

~~~
    --svc, --skipvirus, --skip-virus, --skipviruscheck, --skip-virus-check
     Skip Virus Check - Skip the virus check for downloaded files on this ru-
       n. Overrides the default feature 'virusCheck' set to 'True'. Available
       in 0.9.10+. Licensed versions only.

     --virus, --viruscheck, --virus-check
     Virus Check - check downloaded files for viruses. Overrides the default
       feature 'virusCheck' set to 'True'. Available in 0.9.10+. Licensed
       versions only.

     --viruspositivesmin, --virus-positives-minimum=VALUE
     Virus Check Minimum Scan Result Positives - the minimum number of scan
       result positives required to flag a package.  Used when
       virusScannerType is VirusTotal.  Overrides the default configuration
       value 'virusCheckMinimumPositives' set to '5'. Available in 0.9.10+.
       Licensed versions only.
~~~


## FAQ

### How do I take advantage of this feature?
You must have a [licensed edition of Chocolatey](https://chocolatey.org/pricing) (Pro, Business, or MSP). Pro is a personal, named license that costs about the price of a lunch outing per month and comes with several other features. Business editions are great for organizations that need to manage the total software management lifecycle. MSP editions contain a subset of the Business edition features. MSPs are only able to use the Generic Virus Scanner.

### I'm a licensed customer, now what?
When you install package that download content, those items will automatically be verified if the feature is turned on (it is automatically turned on for Pro users). We don't turn it on automatically in Business editions because many organizations are wary about reaching out to the internet and the generic virus scanner requires additional configuration.

### How do I turn this feature on?

* Globally - `choco feature enable -n virusCheck`
* Per command - use the switch `--virus-check` with install/upgrade commands.

You need to provide additional configuration if you are using the Generic virus scanner.

### How do I turn this feature off?

* Globally - `choco feature disable -n virusCheck`
* Per command - use the switch `--skip-virus-check` with install/upgrade commands.

### How do I override the minium number of positives?

* Globally - `choco config set virusCheckMinimumPositives <value>`
* Per command - use the option `--virus-positives-minimum=<value>` with install/upgrade commands.

### How does the VirusTotal integration work?
 * After a download, Chocolatey will check a file against Virus Total's scan engines to determine how safe the file is as a secondary check to the virus scanner you may already have running.
 * If there are existing scan results, it will determine based on the number of positives whether the file is likely safe or not (you can adjust the minimum positives number up or down).
 * If the number is over the minimum positives, it will require you to make the determination on the safety of the file. In other words, it will protect you by failing the install, but it will give you instructions on how to override Chocolatey.
 * If Chocolatey doesn't find a virus scan has been completed before, it will ask you if you want to upload the file. It will default to no (some users will have things they don't want pushed publicly).
 * Whether or not you choose to upload a file when no scan is found, the virus check will fail the install as a matter of protection. Chocolatey will not make the determination if you got the file you were supposed to get from the source you thought you were getting it from, so it errors on the side of caution.
 * A scan across all of the engines can take awhile, so it will fail with an error and notes on how you can move forward immediately if you trust the file. Virus scans can take up to 15 minutes so it will request you try again in about 15 minutes.

### How does VirusTotal verify the binary?
Chocolatey gets the binary's signature by getting a SHA256 checksum of the binary. A SHA256 checksum is extremely secure and accurate, SHA256 has not been broken. It then submits that value to VirusTotal to see if there are pre-existing results. If there are, due to the checksum, the file is **the *exact* same binary**. Then Chocolatey inspects the results and determines if the file is safe or if it should fail.

### What if VirusTotal doesn't have results for a binary?
Chocolatey will ask if you want the binary submitted to VirusTotal to be scanned (if the file is under 500MB). Then it will upload the binary their servers, ask you to try the install again in 15 minutes and fail the install. If this is running as a script, the question will timeout after 30 seconds and default to no upload.

### Do you have plans to offer better integration with particular anti-virus scanners?
Yes! If you are considering or have a business edition of Chocolatey, please let us know what you need and we can get that scanner on the list. There are so many different virus checking solutions and a generic scanner provides the best opportunity to serve all of them.
