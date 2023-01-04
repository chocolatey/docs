---
Order: 20
xref: package-verifier-service
Title: Package Verifier Moderation Service
Description: Information on the Package Verifier Moderation Service
---

Here you will find a collection of more information and resources for when things fail verification.

## What is the verifier?

The verifier is a service that checks the correctness (that the package actually works), that it installs and uninstalls correctly, has the right dependencies to ensure it is installed properly and can be installed silently. The verifier runs against both submitted packages and existing packages (checking every two weeks that a package can still install and sending notice when it fails). We like to think of the verifier as integration testing. It’s testing all the parts and ensuring everything is good. On the [community feed](https://chocolatey.org), you can see the current status of a package based on a little colored ball next to the title. If the ball is green or red, the ball is a link to the results (only on the package page, not in the list screen).

* Green means good. The ball is a link to the results
* Orange if still pending verification (has not yet run).
* Red means it failed verification for some reason. The ball is a link to the results.
* Grey means unknown or excluded from verification (if excluded, a reason will be listed on the package page).

## Specifications

> :choco-info: **NOTE**
>
> We currently run against only one system. This was chosen as it will install almost all Chocolatey packages. We will be adding multiple systems in the future.

The systems we run against:
* Windows Server 2012 R2 x64
  * It's a completely stock machine, no Windows updates applied. No hotfixes. Imagine that you took the image and ran it without applying any Windows updates.
  * Has very limited things installed (bitvise sshd, git, notepad++, 7zip)
  * The Printer Spooler Service is stopped and disabled.  This can cause problems for packages that deal with software that relates to anything to do with printing, i.e. printing of PDF files.


## How can I bypass the verifier?

If your package needs to be exempted, please contact the site admins on the package page of the package that needs the bypass.

## How does the verifier work?

### Prerequisites

The verifier has the following prerequisites for it to work:

* VirtualBox installed (4.3.x series - the verifier box has 4.3.28 installed)
* Vagrant installed (right now 1.7.4 is recommended)
* Vagrant sahara plugin installed
* Vagrant box `win2012r2x64` available
* A Windows machine that can run 64bit virtual boxes. Usually a physical machine can do this. Others require vt-x

### What the verifier does at a high level

1. Checks for packages ready to be tested.
1. Runs vagrant controlling a clean windows box to test. Limits the execution of the install/uninstall commands to 20 minutes each.
1. Submits the results to a GitHub gist.
1. Submits those results with pass/fail back to https://chocolatey.org.

#### Vagrant Testing

> :choco-info: **NOTE**
>
> You can repeat the testing of the verifier at https://github.com/chocolatey/chocolatey-test-environment

##### Box Prep
* Copy `PrepareMachine.ps1` to `VagrantAction.ps1`
* Run `vagrant up`
* Run `vagrant sandbox on`

##### Steps For Each Package
* Run `vagrant sandbox rollback`
* Copy `ChocolateyAction.ps1` to `VagrantAction.ps1` - replace `{{action}}` with `install`, `{{package}}`, and `{{version}}` and forcex86.
* Run `vagrant provision` - capture output (this is the install 32bit log), note the exit code.
* Copy `ChocolateyAction.ps1` to `VagrantAction.ps1` - replace `{{action}}` with `upgrade`, `{{package}}`, and `{{version}}` and forcex86.
* Run `vagrant provision` - capture output (this is the upgrade log), note the exit code.
* Run `vagrant sandbox rollback`
* Copy `ChocolateyAction.ps1` to `VagrantAction.ps1` - replace `{{action}}` with `install`, `{{package}}`, and `{{version}}`.
* Run `vagrant provision` - capture output (this is the install log), note the exit code.
* Copy `ChocolateyAction.ps1` to `VagrantAction.ps1` - replace `{{action}}` with `uninstall`, `{{package}}`, and `{{version}}`.
* Run `vagrant provision` - capture output (this is the uninstall log), note the exit code.
* Run `vagrant sandbox rollback` to set the machine ready.
