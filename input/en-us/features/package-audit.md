---
Order: 130
xref: package-audit
Title: Package Audit (C4B)
Description: Know who installed what package and when
RedirectFrom: docs/features-package-audit
---

> Know who installed what package and when.

Reporting is very important, and auditing not only when your installations occurred but who installed them can be critical. There is nothing that presents this kind of information as easily as you will be able to gather it with Chocolatey for Business (C4B) and Package Audit.

## Usage

When calling `choco list -lo`, add `--audit` to see information on who installed and when.

### Requirements

* Chocolatey (`chocolatey` package) v0.10.7+.
* Chocolatey for Business (C4B) Edition.
* Chocolatey Licensed Extension (`chocolatey.extension` package) v1.12.0+.

## See It In Action

![Package Audit - if you are on https://docs.chocolatey.org/en-us/features/package-audit, see commented html below for detailed description of image](/assets/images/features/features_package_audit.png)

When shown, the user and domain are for the user who actually performed the installation. The "Original User" is the user who requested the install (outside of [Self-Service](xref:self-service-anywhere), it would be the same as the installing user). The Installation Date and Time are in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) UTC time.

<!--
Text in the image above:

choco list -lo --audit -r

Shows output as described above.

-->

> :choco-info: **NOTE**
>
> To see all feature videos for Chocolatey for Business, please visit https://chocolatey.org/resources/features#c4b.

## Options and Switches

When calling `choco list -lo`:

~~~sh
   --audit, --showaudit, --show-audit, --show-audit-info
   Show Audit Information - Display auditing information for a package.
     Available in business editions only.
~~~

## FAQ

### How do I take advantage of this feature?

You must have a [Business edition of Chocolatey](https://chocolatey.org/compare). Business editions are great for organizations that need to manage the total software management lifecycle.

### I'm a licensed customer, now what?

Once you have Chocolatey for Business properly set up, any installations or upgrades performed will be automatically audited. All existing installs will not have audit information, so we recommend the first thing you install after Chocolatey is chocolatey.extension v1.12.0+.

### How does it work?

It just works. When you install/upgrade packages, the auditing information is automatically tracked. To see the information, you simply call `choco list -lo --audit` and if you want to see it in machine parseable format, add `-r` to the end of the command.

### I only see the audit information on packages I've installed updated since switching over to C4B.

This is expected. You need Chocolatey Licensed Extension v1.12.0+ installed and configured prior to installing/upgrading apps.

### What is the difference between user and original user?

User is the user that performed the installation/upgrade. When using the self-service feature, original user will be the original user who requested the install/upgrade.
