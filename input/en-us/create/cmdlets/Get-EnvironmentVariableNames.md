---
Description: Information on Get-EnvironmentVariableNames cmdlet
external help file: Chocolatey.PowerShell.dll-Help.xml
Module Name: Chocolatey.PowerShell
online version: https://docs.chocolatey.org/en-us/create/functions/get-environmentvariablenames
Order: 80
RedirectFrom: [ docs/helpers-get-environment-variable-names, docs/helpersgetenvironmentvariablenames ]
schema: 2.0.0
Title: Get-EnvironmentVariableNames
xref: get-environmentvariablenames
---

# Get-EnvironmentVariableNames

## SYNOPSIS
Gets all environment variable names.

## SYNTAX

```
Get-EnvironmentVariableNames [[-Scope] <EnvironmentVariableTarget>] [-IgnoredArguments <Object[]>]
 [<CommonParameters>]
```

## DESCRIPTION
Provides a list of environment variable names based on the scope. This can be used to loop through the list and generate names.

## EXAMPLES

### Example 1
```powershell
PS C:\> Get-EnvironmentVariableNames -Scope Machine
```

Outputs the names of all the environment variables defined in the registry for the Machine scope.

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

### -Scope
The environment variable target scope. This is `Process`, `User`, or `Machine`.

```yaml
Type: EnvironmentVariableTarget
Parameter Sets: (All)
Aliases:
Accepted values: Process, User, Machine

Required: False
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

## OUTPUTS

### System.String
Outputs the names of all the environment variables in the target scope as strings.

## NOTES
Process dumps the current environment variable names in memory / session. The other scopes refer to the registry values.

## RELATED LINKS

[Get-EnvironmentVariable](xref:get-environmentvariable)

[Set-EnvironmentVariable](xref:set-environmentvariable)

[Cmdlet Reference](xref:powershell-cmdlet-reference)

[Function Reference](xref:powershell-reference)