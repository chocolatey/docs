---
Order: 163
xref: intune-push
Title: Pushing Converted Intune Packages
---

> :warning: **WARNING**
>
> This solution is planned to be released together with the v3.0.0 release of Chocolatey license, and is thus not yet available.

## Summary

The ability to push Intune specific packages has been added to the enhanced Chocolatey `push` command, and will be used when a file with the extension `.intunewin` has been passed to the command.
This functionality will push the specified command, any dependencies specified for the package, core packages such as `chocolatey`, `chocolatey-license` (Auto generated) and `chocolatey.extension` when the packages do not already exist on the Intune tenant.

## Usage

### Command Line

When calling `choco push`, just add the path to the `.intunewin` file that was previously converted using the [`convert`](xref:intune-convert) command.
This will push the wanted package, and any dependencies that do not already exist on the Intune tenant.

### Context Menu

For convenience, a new entry to the context menu has been added when you right click a file with the extension of `.intunewin`.
Just select **Upload/Push Intune Package...**, or double click the file to upload it and all dependencies to the Intune tenant.

## FAQ

### Can I push my own custom version of chocolatey-license?

You are able to push a custom version of any package, however there are a few things for the `chocolatey-license` package you will need to observe in this case.

1. If there is no package named `chocolatey-license` on intune, make sure you are explicitly pushing this package first, otherwise a new package will be generated and replace the local custom edition.
2. It must have been converted by calling `choco convert`
3. The original identifier for the Chocolatey package must have been `chocolatey-license`.

### I have a new license and want to update the license on Intune, how can I do this?

Currently, updates are not supported for Intune packages and doing so is a manual process, or semi-manual process.

You have two ways you may use to achieve updating the packages.

1. Manual aproach.
   - Create a custom Chocolatey package that will install the license in the correct location.
   - Convert this Chocolatey package to a supported Intune package using `choco convert`.
   - Call `choco push` with the path to the created Intune package (*you may want to use `--force` if only the node count has been updated*)
   - Navigate to the Intune tenant, and update the dependencios for `Chocolatey Licensed Extension` to point to the new package (*remember to remove the dependency on the old package*)
2. Semi-Manual aproach.
   - Navigate to the Intune Tenant and locate the `Chocolatey License` package.
   - Remove everything in the `Notes` section of the package (*This will cause the package note to be picked up by `choco push`*).
   - Push a normal package to Intune as you would normally do.
   - Navigate once again to the Intune tenant, and update the dependencies for `Chocolatey Licensed Extension` to point to the new package (*remember to remove the dependency on the old package*).