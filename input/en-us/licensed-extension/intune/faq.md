---
Order: 50
xref: intune-faq
Title: Intune Frequently Asked Questions
---

<?! Include "../../../shared/intune-note.txt" /?>

## General FAQs

### Why does the Chocolatey install in Intune require a restart of the computer

During the installation of Chocolatey, a number of environment variables are set or updated, including the `PATH` variable that tells Windows where to look for programs to run. The only reliable way to ensure that these are updated prior to running any subsequent Chocolatey commands is to inform Intune that the package requires a restart to complete installation.

## Convert FAQs

### Do I need to call convert for all dependencies of a Chocolatey package?

If a Chocolatey package has dependencies, Chocolatey will convert each of them to a Chocolatey Intune package.

### Must I have all Chocolatey package dependencies already downloaded?

You may skip the handling of dependencies when converting a package by using the `--ignore-dependencies` argument. However, it is recommended not to skip dependency handling as the package may not install or upgrade, and some software functionality may be lost. Be mindful that you may be prevented from pushing the Chocolatey package to your Intune tenant if the dependencies do not already exist locally or in Intune.

### I get an error message about `convert` not being available

The `convert` command is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled. This feature can be enabled by running:

~~~sh
choco feature enable --name=allowPreviewFeatures
~~~

## Push FAQs

### Can I push a custom version of the `chocolatey-license` package?

Yes, but there are a few things to know before doing so.

1. If there is no `chocolatey-license` package on the Intune tenant, ensure you push this package to Intune first. Otherwise, a new `chocolatey-license` package will be generated and will replace the custom one in your local directory.
1. The Chocolatey package ID must be `chocolatey-license`.
1. It must have been converted to a Chocolatey Intune package by calling `choco convert`.

### How can I update my license in the Intune tenant when I have a new Chocolatey for Business license?

Updates to Intune packages through Chocolatey is not currently supported. There is a manual process that you can follow to do this within Intune:

1. Ensure the local computer that you will run the Chocolatey commands on has the new license applied to it.
1. Login to the Intune tenant and locate the `Chocolatey License` package.
1. Replace `Notes` section of the Intune package with a non-whitespace character (for example, the letter A). This will cause the Intune package not to be found by Chocolatey in the next step.
 1. Push a package to Intune as you would normally do. This will result in Chocolatey not finding a `chocolatey-license` package within the Intune tenant, and therefore automatically generating a new one using the Chocolatey for Business license package using the license present on the local computer running the `push` command.
1. Locate the `Chocolatey Licensed Extension` package in the Intune tenant and add the new `Chocolatey License` package as a dependency and remove the previous `Chocolatey License` package as a dependency.

### What can I do if I receive an error about my file not being found or not being a `nupkg` file?

The command to `push` a Chocolatey Intune package (a package with the `intunewin` extension) is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled by running:

~~~sh
choco feature enable --name=allowPreviewFeatures
~~~

### What can I do if I receive an error about the format of the URI could not be determined?

The command to `push` a Chocolatey Intune package (a package with the `intunewin` extension) is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled by running:

~~~sh
choco feature enable --name=allowPreviewFeatures
~~~
