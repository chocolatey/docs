---
Order: 45
xref: intune-upgrade
Title: Upgrading Chocolatey versions through Intune
---

<?! Include "../../../shared/intune-note.txt" /?>

## Upgrade considerations

As with all upgrades, it is highly recommended that you do a test deployment to ensure the upgrade process works in your environment prior to deploying it to all systems.

## Minor / Patch version upgrades

### Chocolatey CLI upgrade

The upgrade of Chocolatey CLI versions that have been deployed through Intune is relatively straightforward.
For example when upgrading from **v1.3.1** to **v1.4.0** of Chocolatey CLI, the process looks like this:

1. Ensure you have downloaded Chocolatey CLI v1.4.0: `choco download chocolatey --version 1.4.0`.
1. Convert the Chocolatey CLI Package: `choco convert chocolatey.1.4.0.nupkg --to=intune`.
1. Push the converted package to Intune: `choco push chocolatey.1.4.0.intunewin --to=intune`.
1. Deploy the upgrade to a group of test systems before deploying to all systems.
1. When the deployment is ready for broad deployment, you can replace this version as the dependency on your Chocolatey Licensed Extension and Chocolatey License packages to make it more streamlined.

### Chocolatey License Extension upgrade

The upgrade of Chocolatey Licensed Extension versions that have been deployed through Intune is relatively straightforward.
For example when upgrading from **v5.0.0** to **v5.0.3** of Chocolatey Licensed Extension, the process looks like this:

1. Ensure you have downloaded Chocolatey Licensed Extension v5.0.3: `choco download chocolatey.extension --version 5.0.3`.
1. Convert the Chocolatey Licensed Extension Package: `choco convert chocolatey.extension.5.0.3.nupkg --to=intune`.
1. Push the converted package to Intune: `choco push chocolatey.extension.5.0.3.intunewin --to=intune`.
1. Deploy the upgrade to a group of test systems before deploying to all systems.

When your deployment is ready for broad deployment, you have a few options:

1. Deploy it stand alone.
1. [Update your existing packages](#updating-existing-chocolatey-packages).

### Updating Existing Chocolatey Packages

When you've updated and done a test deployment of your Chocolatey Licensed Extension package, you might consider updating the Chocolatey Licensed Extension that your packages depend on. A way to do this in an upgrade from Chocolatey Licensed Extension v5.0.0 to v5.0.3 manually might look like this:

1. Navigate to the [Intune Windows apps pane](https://endpoint.microsoft.com/#view/Microsoft_Intune_DeviceSettings/AppsWindowsMenu/~/windowsApps) and search for the package you want to update.
1. Navigate to the Properties pane, scroll to Dependencies and click "Edit".
1. Select the three dots to the right of your Chocolatey Licensed Extension package (Chocolatey Licensed Extension (v5.0.0)) and select "Remove".
1. Click "+ Add".
1. Find and Select the new Chocolatey Licensed Extension package (Chocolatey Licensed Extension (v5.0.3)).
1. Click "Review + save" twice followed by "Save".

## Major Versions

### Chocolatey Products

Due to the related dependencies and how they are typically specific across major versions of Chocolatey products, a specific upgrade process must be followed.
For example, when upgrading from **v1.x** to a **v2.x** version of a Chocolatey product, the process looks like this:

1. For each of the Chocolatey products that you have deployed: Ensure you are on the latest stable **v1.x** version of Chocolatey CLI, **v5.x** version of Chocolatey Licensed Extension, **v1.x** version of Chocolatey GUI, **v1.x** version of Chocolatey GUI Licensed Extension, and **v1.x** version of Chocolatey Agent.
1. Verify what your "Chocolatey License" package version is in Intune (It will be in the format of `Year.Month.Day.NodeCount` with leading zeroes. For example a 100 node count license expiring June 15 2024 will be version 2024.06.15.100).
1. Ensure you have downloaded all of the Chocolatey products to your working directory (`choco download chocolatey chocolatey.extension chocolateygui chocolateygui.extension chocolatey-agent --ignore-depenedencies`).
1. Convert Chocolatey CLI: `choco convert chocolatey.<version>.nupkg --to=intune`.
1. Convert Chocolatey Licensed Extension: `choco convert chocolatey.extension.<version>.nupkg --to=intune`.
1. Push Chocolatey CLI to Intune: `choco push chocolatey.<version>.intunewin`.
1. Push Chocolatey Licensed Extension to Intune: `choco push chocolatey.extension.<version>.intunewin`.
1. If your Chocolatey License package version contains a leading 0 see the [next section](#chocolatey-license-considerations).
1. You can now deploy any other Chocolatey application.

### Chocolatey License Considerations

> :choco-info: **NOTE**
>
> Due to version number normalization in Version 2.x of Chocolatey, care must be taken when upgrading if your license expires on a date with a single digit day or month (for example: July 31, 2024 (2024-7-31) or October 5, 2023 (2023-10-5)).

If your Chocolatey License package version contains a leading 0; follow the preceding steps for updating Chocolatey Products, then:

1. Navigate to the [Intune Windows apps pane](https://endpoint.microsoft.com/#view/Microsoft_Intune_DeviceSettings/AppsWindowsMenu/~/windowsApps) and search for `Chocolatey Licensed Extension`.
1. For each entry here navigate to the Properties pane, scroll to Dependencies and click "Edit".
1. Select the three dots to the right of your License Package ("Chocolatey License (v2024.6.15.100)" in above example) and select "Remove".
1. Click "+ Add".
1. Find and Select the license with the leading zeroes ("Chocolatey License (v2024.06.15.100)" in above example).
1. Click "Review + save" twice followed by "Save".
