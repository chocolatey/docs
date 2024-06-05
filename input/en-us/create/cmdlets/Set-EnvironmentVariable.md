---
Description: Information on Set-EnvironmentVariable cmdlet
external help file: Chocolatey.PowerShell.dll-Help.xml
Module Name: Chocolatey.PowerShell
online version: https://docs.chocolatey.org/en-us/create/functions/set-environmentvariable
Order: 320
RedirectFrom:
  - docs/helpers-set-environment-variable
  - docs/helperssetenvironmentvariable
  - en-us/create/functions/set-environmentvariable
schema: 2.0.0
Title: Set-EnvironmentVariable
xref: set-environmentvariable
---

# Set-EnvironmentVariable

## SYNOPSIS
> :choco-info: **NOTE**
>
> Administrative Access Required when `-Scope 'Machine'.`

DO NOT USE. Not part of the public API. Use `Install-ChocolateyEnvironmentVariable` instead.

## SYNTAX

```
Set-EnvironmentVariable [-Name] <String> [[-Value] <String>] [[-Scope] <EnvironmentVariableTarget>]
 [-IgnoredArguments <Object[]>] [<CommonParameters>]
```

## DESCRIPTION
Saves an environment variable.

## EXAMPLES

### Example 1
```powershell
PS C:\> Set-EnvironmentVariable -Name MyApplicationPath -Value C:\test -Scope Machine
```

Sets the `MyApplicationPath` environment variable to `C:\test` at the system level.

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

### -Name
The name of the environment variable to set.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Scope
The scope to set the environment variable at.

```yaml
Type: EnvironmentVariableTarget
Parameter Sets: (All)
Aliases:
Accepted values: Process, User, Machine

Required: False
Position: 2
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -Value
The value to set the named environment variable to.

```yaml
Type: String
Parameter Sets: (All)
Aliases:

Required: False
Position: 1
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### CommonParameters
This cmdlet supports the common parameters: -Debug, -ErrorAction, -ErrorVariable, -InformationAction, -InformationVariable, -OutVariable, -OutBuffer, -PipelineVariable, -Verbose, -WarningAction, and -WarningVariable. For more information, see [about_CommonParameters](http://go.microsoft.com/fwlink/?LinkID=113216).

## INPUTS

## OUTPUTS

## NOTES
This command will assert UAC/Admin privileges on the machine if
`-Scope 'Machine'`.

## RELATED LINKS

[Install-ChocolateyEnvironmentVariable](xref:install-chocolateyenvironmentvariable)

[Uninstall-ChocolateyEnvironmentVariable](xref:uninstall-chocolateyenvironmentvariable)

[Install-ChocolateyPath](xref:install-chocolateypath)

[Get-EnvironmentVariable](xref:get-environmentvariable)

[Cmdlet Reference](xref:powershell-cmdlet-reference)

[Function Reference](xref:powershell-reference)