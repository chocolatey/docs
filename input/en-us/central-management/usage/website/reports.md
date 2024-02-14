---
Order: 60
xref: ccm-reports
Title: Reports
Description: Information on reports within Chocolatey Central Management
RedirectFrom:
  - docs/central-management-reports
  - en-us/central-management/usage/reports
---

Chocolatey Central Management Reports section currently allows for the following reports to be generated:

- [Outdated Software](#outdated-software)
- [Deployment Plans](#deployment-plans)

## Outdated Software

Outdated Software Reports can be generated at any time, as long as there is at least one known Outdated Software package.
If there is no Outdated Software, a report cannot be generated.

When generating an Outdated Software Report, a snapshot of the current Outdated Software will be captured for the report.
Generated reports will be displayed in a list, showing the date and time they were created.

Reports can be exported from this screen via the :gear: **Actions** menu, and selecting the desired export type.

![Outdated Reports export to Excel](/assets/images/ccm-playwright/reports/outdated-software/table-row-button-action-dropdown-menu-export-to-excel.png)

![Outdated Reports export to PDF](/assets/images/ccm-playwright/reports/outdated-software/table-row-button-action-dropdown-menu-export-to-pdf.png)

When clicking on the date and time for a report, or selecting the :gear: **Actions** menu and then **Details**, the Outdated Software Details screen will be shown.
The report will display the name and version of any Outdated Software, along with any Computers that each Outdated Software is installed on.

![Outdated Software Details view](/assets/images/ccm-playwright/reports/outdated-software/details/screen.png)

The Outdated Software Report currently being viewed can be exported from this screen via the **Export** menu at the top-right.

![Outdated Software Details view, showing the Export button options](/assets/images/ccm-playwright/reports/outdated-software/details/button-export.png)

## Deployment Plans

The Deployment Plans Report displays all completed Deployment Plans. It allows you to search for a subset of Deployment Plans or adjust the sorting order, or filter the displayed reports by their final Status.

![Deployment Plans report page](/assets/images/ccm-playwright/reports/deployment-plans/screen.png)

Clicking the name of an individual Deployment Plan will take you to the Deployment Plan Details screen, similar to those shown on the main [Deployment Plans](xref:ccm-deployments) page.