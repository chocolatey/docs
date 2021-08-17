---
Order: 40
xref: intune-push
Title: Pushing Converted Intune Packages
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

The ability to push Chocolatey Intune packages (packages with the extension `.intunewin`) has been added to the `push` command. The command will push the specified Chocolatey Intune package, any dependencies specified for the package along with the core Chocolatey Intune packages of  `chocolatey`, `chocolatey-license` and `chocolatey.extension` when the packages do not already exist on the Intune tenant. The `chocolatey-license` package will be automatically generated using the Chocolatey for Business license, from the local computer running the `push` command, if it does not exist in the Intune tenant.

## Usage

### Command Line

When using the `push` command the package path provided must be an `.intunewin` file that was previously converted to a Chocolatey Intune package using the [`convert`](xref:intune-convert) command. This will push the Chocolatey Intune package, and its dependencies if they do not already exist there, to the Intune tenant.

### Context Menu

When you right-click on a Chocolatey Intune package (which is a package with the extension of `.intunewin`), select **Upload/Push Intune Package...** to push the package to the Intune tenant. Alternatively, you can double-click the Chocolatey Intune package to upload it, and all of its dependencies, to the Intune tenant.

### Dependency Resolving

When resolving package dependencies that are specified in the converted `.intunewin` file, we first search the Intune tenant for a package that was previously uploaded that matches the same identifier and is within the same version criteria constructed during the conversion of the package. If no package matching the mentioned criteria are found in the Intune tenant, we will fall back to looking in the same directory as the original `.intunewin` file passed to the `push` command, and check for the same criteria there. If no packages are found in either of the places, the `push` command will fail with an error mentioning the missing package.

### Examples

~~~sh
choco push firefox.86.0.intunewin --source=<INTUNE TENANT GUID> --api-key=<TENANT CLIENT ID>:<TENANT CLIENT SECRET>
~~~

To use a `source` and `api-key` without specifying them each time, set them in the Chocolatey config using:

~~~sh
choco config set --name=intuneTenantGUID --value=<INTUNE TENANT GUID>
choco api-key add --source=<INTUNE TENANT GUID> --key=<TENANT CLIENT ID>:<TENTANT CLIENT SECRET>
~~~

Once that is done you can push the package as normal:

~~~sh
choco push firefox.86.0.intunewin
~~~

By specifying the path to a pre-release package, pre-release support will be enabled for the package and its dependencies. However, while the package you are pushing can be a pre-release, you cannot have a dependency on a pre-release package if the Chocolatey package you are pushing is a stable release. This is the same behaviour as the [`convert`](xref:intune-convert) command.

> :warning: **WARNING**
>
> If this is the first time pushing a package to your Intune tenant, make sure that you also have the converted packages of `chocolatey` and `chocolatey.extension` available in the same directory as the package you want to push.

> :memo: **NOTE**
>
> If a package for `chocolatey-license` does not already exist on the specified Intune tenant, a new package will be created using the Chocolatey for Business license on the local computer the command is run from.

## FAQ

### Can I push a custom version of the `chocolatey-license` package?

Yes, but there are a few things to know before doing so.

1. If there is no `chocolatey-license` package on the Intune tenant, ensure you push this package to Intune first. Otherwise, a new `chocolatey-license` package will be generated and will replace the custom one in your local directory.
1. The Chocolatey package ID must be `chocolatey-license`.
1. It must have been converted to a Chocolatey Intune package by calling `choco convert`.

### How can I update my license in the Intune tenant when I have a new Chocolatey for Business license?

Updates to Intune packages through Chocolatey is not currently supported. There is a manual process that you can follow to do this within Intune:

You have two ways you may use to achieve updating the packages.

1. Ensure the local computer that you will run the Chocolatey commands on has the new license applied to it.
1. Login to the Intune tenant and locate the `Chocolatey License` package.
1. Replace `Notes` section of the Intune package with a non-whitespace character (for example, the letter A). This will cause the Intune package not to be found by Chocolatey in the next step.
 1. Push a package to Intune as you would normally do. This will result in Chocolatey not finding a `chocolatey-license` package within the Intune tenant, and therefore automatically generating a new one using the Chocolatey for Business license of the local computer running the `push` command.
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
