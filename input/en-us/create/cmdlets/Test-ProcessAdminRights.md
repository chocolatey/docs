---
Description: Information on Test-ProcessAdminRights cmdlet
external help file: Chocolatey.PowerShell.dll-Help.xml
Module Name: Chocolatey.PowerShell
online version: https://docs.chocolatey.org/en-us/create/functions/test-processadminrights
Order: 350
RedirectFrom:
  - docs/helpers-test-process-admin-rights
  - docs/helperstestprocessadminrights
  - en-us/create/functions/test-processadminrights
schema: 2.0.0
Title: Test-ProcessAdminRights
xref: test-processadminrights
---

# Test-ProcessAdminRights

## SYNOPSIS
Tests whether the current process is running with administrative rights.

## SYNTAX

```
Test-ProcessAdminRights [-IgnoredArguments <Object[]>] [<CommonParameters>]
```

## DESCRIPTION
This function checks whether the current process has administrative rights by checking if the current user identity is a member of the Administrators group.
It returns `$true` if the current process is running with administrative rights, `$false` otherwise.

On Windows Vista and later, with UAC enabled, the returned value represents the actual rights available to the process, for example if it returns `$true`, the process is running elevated.

## EXAMPLES

### Example 1
```powershell
PS C:\> Test-ProcessAdminRights
```

Outputs `$true` if the current process is elevated, otherwise `$false`.

## PARAMETERS

### -IgnoredArguments
Allows splatting with arguments that do not apply. Do not use directly.

```yaml
Type: Object[]
Parameter Sets: (All)
Aliases:

Required: False
Position: Named
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

## OUTPUTS

### System.Boolean
Outputs `$true` if the current process has admin rights, otherwise `$false`.

## NOTES

## RELATED LINKS

[Cmdlet Reference](xref:powershell-cmdlet-reference)

[Function Reference](xref:powershell-reference)