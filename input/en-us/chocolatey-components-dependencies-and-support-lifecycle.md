---
Order: 75
xref: chocolatey-components-dependencies-and-support-lifecycle
Title: Chocolatey Components Dependencies and Support Lifecycle
Description: Provides information about the Support Lifecycle for various Chocolatey Components, as well as the dependencies between them.
---

## Product Support Lifecycle

All of the latest released stable versions of Chocolatey products (Chocolatey CLI, Chocolatey GUI, Chocolatey Central Management, etc.) are fully supported and will periodically receive new features, bug fixes, and security fixes as appropriate.
We recommend customers update to the latest versions to benefit from new features and fixes as they are released.

### Pre-v1.0 Products

For any products that have not yet reached v1.0, **only the latest version is supported**.
We will continue to add features, fix bugs, and address security concerns as normal while we work towards a v1.0 release.

### Version 1.0+ Products

Once a product reaches v1.0, we recommend customers move to that version as soon as possible.
We will not continue to support v0.x versions once a product reaches v1.0.

### Version 2.0+ Products

Once a product reaches the second major release, the following will apply:

1. We will support the previous major version with **security fixes** for Chocolatey For Business customers.
   - For example: at v2.0, the latest v1.x version of the product will receive security fixes; at v3.0, only the latest v2.x version of the product will continue to receive security fixes.
1. We will support the previous major version with certain bug fixes (excepting bug fixes that require breaking changes) for Chocolatey For Business customers for six months following the release of the next major version.
1. No new features will be backported to the previous major version.

## Supported Windows Versions

Chocolatey products' support for Windows Operating Systems follows Microsoft's Support Lifecycle: if the Windows version is supported by Microsoft, Chocolatey products are supported on that version of Windows.

This information is up-to-date as of 6 June 2023.

### Clients

- Windows 11
- Windows 10 22H2
- Windows 10 21H2

### Servers

- Windows Server 2022
- Windows Server 2019
- Windows Server 2016
- Windows Server 2012 R2
- Windows Server 2012
- Windows Server 2008 R2 (in Azure only)

<?! Include "./shared/maintenance-and-support.txt" /?>

<?! Include "./shared/chocolatey-component-dependencies.txt" /?>
