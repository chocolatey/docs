---
Order: 70
xref: ccm-general
Title: General
Description: Top level, general, information about Chocolatey Central Management Website functionality
---

## Dark/Light Mode

> :choco-info: **NOTE**
>
> This feature became available starting with Chocolatey Central Management 0.10.0

Once signed into the Chocolatey Central Management website, you can select whether you want to use a dark or a light mode across all the web pages.  This select is made using the button at the top right hand corner, as shown in the next screenshot.

![Chocolatey Central Management dark/light mode selection](/assets/images/ccm/general/dark-light-mode-selection.png)

The selection that is made here is persisted, meaning that it will be remembered after you sign out of the Chocolatey Central Management website.

### Dashboard in Dark Mode

![Chocolatey Central Management dashboard using dark mode](/assets/images/ccm/general/dark-mode-dashboard.png)

### Dashboard in Light Mode

![Chocolatey Central Management dashboard using light mode](/assets/images/ccm/general/light-mode-dashboard.png)

## Remembered number of table entries

> :choco-info: **NOTE**
>
> This feature became available starting with Chocolatey Central Management 0.10.0

Across the various pages within the Chocolatey Central Management website, there are a number of different tables. Showing, for example, all the [computers](xref:ccm-computers) that are currently reporting into Chocolatey Central Management service, or all of the [deployments](xref:ccm-deployments) that have been created.  For each of these tables, it is possible to select the number of entries that you want to see in the table.  The selection will be remembered between logged in sessions to the Chocolatey Central Management website (assuming you are using the same browser).

![Drop down list showing available options for how many entries to show in a table](/assets/images/ccm/general/number-of-table-entries-selection.png)

## License Expiration Warning

> :choco-info: **NOTE**
>
> This feature became available starting with Chocolatey Central Management 0.10.0

When your Chocolatey license is approaching its expiration date, a new banner will be shown on the [Dashboard](xref:ccm-dashboard) screen once you sign into the Chocolatey Central Management website.

![License expiration warning shown on the Chocolatey Central Management dashboard once signed in](/assets/images/ccm/general/license-expiration-warning.png)

For a normal license, this will start showing when there are 90 days remaining on your license.

For a trial license, this will start showing when there are 7 days remaining on your license.

It is possible to dismiss this warning using the "x" on the far right of the banner, however, the banner will re-appear again in 2 days' time to remind you.  This will repeat until the license is renewed, or until the license expires.