---
Order: 30
xref: licensed-extension-compatibility
Title: Compatibility
Description: Compatibility Information for Chocolatey Licensed Extension
RedirectFrom:
---

## Summary

This covers the compatibility information for the Chocolatey Licensed Extension and associated Chocolatey and other product versions.
The Chocolatey Licensed Extension is designed to work with a certain corresponding version range of the Chocolatey CLI package.
Using incompatible versions of Chocolatey CLI with the Chocolatey Licensed Extension may result in undesirable behaviour.

This page serves as a reference for troubleshooting and resolving issues that may arise from having incompatible versions of the Chocolatey Licensed Extension installed.

<?! Include "../../shared/chocolatey-component-dependencies.txt" /?>

## Troubleshooting

The above table lists the compatible product versions with the most recent version of the Chocolatey Licensed Extension.
If you are working with an earlier version of Chocolatey Licensed Extension, please consult the [Chocolatey Licensed Extension](xref:licensed-extension-release-notes) release notes to determine the recommended version(s) of Chocolatey CLI for your version of the Chocolatey Licensed Extension.

> :warning: **WARNING**
>
> Chocolatey CLI v1.0.1 and up may continue to work for versions of the Chocolatey Licensed Extension older than v4.0.0, but these configurations are not supported for use in a production environment.
> We recommend all customers update to new product versions as they are able to do so in order to get the latest features and fixes.

In Chocolatey CLI versions v1.0.1 and newer, you may receive error messages from the licensed extension, but these will not prevent Chocolatey from functioning.
In order to resolve these messages, simply use `choco install` or `choco upgrade` to install, upgrade, or downgrade the Chocolatey CLI or Chocolatey Licensed Extension packages as appropriate to ensure you are using compatible versions of Chocolatey CLI and the Chocolatey Licensed Extension.

In Chocolatey CLI versions prior to v1.0.1, you may receive error messages similar to the following if there are incompatible versions of the Chocolatey Licensed Extension installed:

```error
The registered delegate for type IEnumerable<ICommand> threw an exception.
```

To resolve these errors, you will need to rename or move the Chocolatey Licensed Extension folder on your system in order to restore Chocolatey functionality.
From a PowerShell console, you can run the following command to back up your Chocolatey Licensed Extension and get basic Chocolatey CLI functionality back:

```powershell
Rename-Item -Path "$env:ChocolateyInstall\extensions\chocolatey" -NewName "chocolatey.old"
```

Once that's done, use `choco install` or `choco upgrade` to install, upgrade, or downgrade the Chocolatey CLI or Chocolatey Licensed Extension packages as appropriate to ensure you are using compatible versions of Chocolatey CLI and the Chocolatey Licensed Extension.
For example, the following command can be used to upgrade the Chocolatey Licensed Extension package to the latest version:

```powershell
choco upgrade chocolatey.extension -y
```

Add the `--version` parameter with the appropriate version if you need to install a specific version of the extension, possibly with the `--allow-downgrade` parameter if you are rolling back to an earlier version.

If you needed to back-up the existing Chocolatey Licensed Extension version in order to install the newer version, the following command can be used to remove the backed-up files after you have confirmed that the above steps have resolved the issue:

```powershell
Remove-Item -Path "C:\ProgramData\chocolatey\extensions\chocolatey.old" -Recurse -Force
```
