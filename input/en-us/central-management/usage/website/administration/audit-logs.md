---
Order: 40
xref: ccm-administration-audit-logs
Title: Audit Logs
Description: Information about using the audit logs within the Chocolatey Central Management Administration section
---

## Operation logs

The Chocolatey Central Management Website stores a lot of information about the operations that have been performed on it.

It is possible to search for operations that have happened using a number of different filters:

- Date range
- User name

Expanding the `Show advanced filters` section displays the following filters:

- Service
- Duration
- Action
- Error state
- Browser

Once the required filters have been set, pressing the `Refresh` button will show the available results.

![Operation logs tab within the Audit logs section of the Administration | Settings page](/assets/images/ccm-playwright/administration/audit-logs/left-menu-active.png)

It is possible to see all available information for an operation by clicking the :mag: button to the left-hand side of the table.

If required, the available results can be exported to an Excel document using the `Export | Export to Excel` button.
This will generate a file named something similar to the following `Chocolatey_AuditLogs_20231122_095144.xlsx`.

The length of time that Operation logs are stored within the Chocolatey Central Management Website can be configured in the [Retention Policies](xref:ccm-administration-settings-retention#audit-retention) Settings tab.

## Change logs

> :choco-warning: **WARNING**
>
> This section of the Chocolatey Central Management Website does not actually provide any functionality, and will be removed in a future version.