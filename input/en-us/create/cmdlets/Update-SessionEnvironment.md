---
Description: Information on Update-SessionEnvironment cmdlet
external help file: Chocolatey.PowerShell.dll-Help.xml
Module Name: Chocolatey.PowerShell
online version: https://docs.chocolatey.org/en-us/create/functions/update-sessionenvironment
Order: 400
RedirectFrom:
  - docs/helpers-update-session-environment
  - docs/helpersupdatesessionenvironment
  - en-us/create/functions/update-sessionenvironment
schema: 2.0.0
Title: Update-SessionEnvironment
xref: update-sessionenvironment
---

# Update-SessionEnvironment

## SYNOPSIS
Updates the environment variables of the current powershell session with any environment variable changes that may have occurred during a Chocolatey package install.

## SYNTAX

```
Update-SessionEnvironment [-IgnoredArguments <Object[]>] [<CommonParameters>]
```

## DESCRIPTION
When Chocolatey installs a package, the package author may add or change certain environment variables that will affect how the application runs or how it is accessed.
Often, these changes are not visible to the current PowerShell session.
This means the user needs to open a new PowerShell session before these settings take effect which can render the installed application nonfunctional until that time.

Use the Update-SessionEnvironment command to refresh the current PowerShell session with all environment settings possibly performed by Chocolatey package installs.

## EXAMPLES

### Example 1
```powershell
PS C:\> Update-SessionEnvironment
```

Updates the current session environment variables.

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

## NOTES

This method is also added to the user's PowerShell profile as `refreshenv`. When called as `refreshenv`, the method will provide additional output.

Preserves `PSModulePath` as set by the process.

## RELATED LINKS

[Cmdlet Reference](xref:powershell-cmdlet-reference)

[Function Reference](xref:powershell-reference)