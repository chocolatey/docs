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

> :choco-info: **NOTE**
>
> This information is up-to-date as of 17 April 2024.

| Windows Operating System                                                                                                 | End Of Support                               |
|------------------------------------------------------------------------------------------------------------------------- |----------------------------------------------|
| [Windows Server 2022][serv2022]                                                                                          | 14 October 2031                              |
| [Windows Server 2019][serv2019]                                                                                          | 9 January 2029                               | 
| [Windows Server 2016][serv2016]                                                                                          | 12 January 2027                              |
| [Windows Server 2012 R2][serv2012r2]                                                                                     | 13 October 2026                              |
| [Windows Server 2012][serv2012]                                                                                          | 13 October 2026                              |
| Windows 11 23H2<br>&nbsp;&nbsp;- [Enterprise and Education][11entedu]<br>&nbsp;&nbsp;- [Home and Pro][11homepro]         | <br>10 November 2026<br>11 November 2025     |
| Windows 11 22H2<br>&nbsp;&nbsp;- [Enterprise and Education][11entedu]<br>&nbsp;&nbsp;- [Home and Pro][11homepro]         | <br>14 October 2025<br>8 October 2024        |
| Windows 11 21H2<br>&nbsp;&nbsp;- [Enterprise and Education][11entedu]                                                    | <br>8 October 2024                           |
| Windows 10 22H2<br>&nbsp;&nbsp;- [Enterprise and Education][11entedu]<br>&nbsp;&nbsp;- [Home and Pro][11homepro]         | <br>14 October 2025<br>14 October 2025       |
| Windows 10 21H2<br>&nbsp;&nbsp;- [Enterprise and Education][11entedu]                                                    | <br>11 June 2024                             |

## Supported PowerShell Versions

Chocolatey products' support for PowerShell follows the lifecycle of the operating system where it was first introduced.

> :choco-info: **NOTE**
>
> This information is up-to-date as of 17 April 2024.

| PowerShell Version          | End Of Support    | First Introduced                                                          |
|-----------------------------|-------------------|---------------------------------------------------------------------------|
| Windows PowerShell 5.1      | TBD               | Windows 10 Anniversary Update and Windows Server 2016, WMF 5.1.           |
| Windows PowerShell 5.0      | TBD               | WMF 5.0                                                                   |
| Windows PowerShell 4.0      | 13 October 2026   | Windows 8.1 and Windows Server 2012 R2, WMF 4.0                           |
| Windows PowerShell 3.0      | 13 October 2026   | Windows 8 and Windows Server 2012, WMF 3.0.                               |

<?! Include "./shared/maintenance-and-support.txt" /?>

<?! Include "./shared/chocolatey-component-dependencies.txt" /?>

[11homepro]: https://learn.microsoft.com/en-us/lifecycle/products/windows-11-home-and-pro
[11entedu]: https://learn.microsoft.com/en-us/lifecycle/products/windows-11-enterprise-and-education
[10homepro]: https://learn.microsoft.com/en-us/lifecycle/products/windows-10-home-and-pro
[10entedu]: https://learn.microsoft.com/en-us/lifecycle/products/windows-10-enterprise-and-education
[serv2022]: https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2022
[serv2019]: https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2019
[serv2016]: https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2016
[serv2012r2]: https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2012-r2
[serv2012]: https://learn.microsoft.com/en-us/lifecycle/products/windows-server-2012