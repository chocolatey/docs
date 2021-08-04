---
Order: 40
xref: intune-push
Title: Pushing Converted Intune Packages
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

The ability to push Intune specific packages has been added to the enhanced Chocolatey `push` command and will be used when a file with the extension `.intunewin` has been passed to the command.
This functionality will push the specified command, any dependencies specified for the package, core packages such as `chocolatey`, `chocolatey-license` (Auto-generated), and `chocolatey.extension` when the packages do not already exist on the Intune tenant.

## Usage

### Command Line

When calling `choco push`, add the path to the `.intunewin` file previously converted using the [`convert`](xref:intune-convert) command.
This will push the wanted package and any dependencies that do not already exist on the Intune tenant.

### Context Menu

For convenience, a new entry to the context menu has been added when you right-click a file with the extension of `.intunewin`.
Just select **Upload/Push Intune Package...**, or double click the file to upload the package and all dependencies to the Intune tenant.

### Dependency Resolving

When resolving package dependencies that are specified in the converted `.intunewin` file, we first search the Intune tenant
for a package that was previously uploaded that matches the same identifier and is within the same version criteria constructed during
the conversion of the package.
If no package matching the mentioned criteria are found in the Intune tenant, we will fall back to looking in the same directory as the original
`.intunewin` file passed to the `push` command, and check for the same criteria there.
If no packages are found in either of the places, the `push` command will fail with an error mentioning the missing package.

### Examples

To push a converted Intune package to your intune tenant, you first need to set the necessary configuration values that the `push` command will use.
These values can be set with the following commands:

~~~sh
choco config set --name=intuneTenantGUID --value=<INTUNE TENANT GUID OR FQDN>
choco api-key add --source=<INTUNE TENANT GUID OR FQDN> --key=<TENANT CLIENT ID>:<TENTANT CLIENT SECRET>
~~~

After these two is set, you are now able to push a package with the command

~~~sh
choco push firefox.86.0.intunewin
~~~

Alternatively, one or both of the configuration values can be specified when calling the `push` command

~~~sh
choco push firefox.86.0.intunewin --source=<INTUNE TENANT GUID OR FQDN> --api-key=<TENANT CLIENT ID>:<TENANT CLIENT SECRET>
~~~

Similar to the [`convert`](xref:intune-convert) command, no additional arguments are needed if the package in question is a pre-release.
By specifying the path to a pre-release package, pre-release support will be enabled for the package and its dependencies.
However, you cannot depend on a pre-release if the package passed in is a stable release.

> :warning: **WARNING**
>
> If this is the first time pushing a package to your Intune tenant, make sure that you also
> have the converted packages of `chocolatey` and `chocolatey.extension` available in the same
> directory as the package you want to push.

> :memo: **NOTE**
>
> If a package for `chocolatey-license` do not already exist on the specified Intune tenant,
> a new package is created with the license that Chocolatey is currently using.

## FAQ

### Can I push my custom version of chocolatey-license?

You can push a custom version of any package; however, there are a few things for the `chocolatey-license` package you will need to observe in this case.

1. If there is no package for the License on intune, make sure you are explicitly pushing this package first; otherwise, a new package will be generated and replace the local custom edition.
2. It must have been converted by calling `choco convert`
3. The original identifier for the Chocolatey package must have been `chocolatey-license`.

### I have a new license and want to update the license on Intune. How can I do this?

Currently, updates are not supported for Intune packages, and doing so is a manual or semi-manual process.

You have two ways you may use to achieve updating the packages.

1. Manual approach.
   - Create a Chocolatey custom package that will install the license in the correct location.
   - Convert this Chocolatey package to a supported Intune package using `choco convert`.
   - Call `choco push` with the path to the created Intune package (*you may want to use `--force` if only the node count has been updated*)
   - Navigate to the Intune tenant, and update the dependencies for `Chocolatey Licensed Extension` to point to the new package (*remember to remove the dependency on the old package*)
2. Semi-Manual approach.
   - Navigate to the Intune Tenant and locate the `Chocolatey License` package.
   - Replace everything in the `Notes` section of the package with a non-whitespace character (*This will cause the package note to be picked up by `choco push`*).
   - Push the package to Intune as you would typically do.
   - Navigate once again to the Intune tenant, and update the dependencies for `Chocolatey Licensed Extension` to point to the new package (*remember to remove the dependence on the old package*).

### I get an error message about my file not being found of not a `nupkg` file

The command to `push` an `intunewin` file is currently a preview feature, and the feature configuration `allowPreviewFeatures` needs to be enabled.
This feature can be enabled by running
~~~sh
choco feature enable --name=allowPreviewFeatures
~~~
