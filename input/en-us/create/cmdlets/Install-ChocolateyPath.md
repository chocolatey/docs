---
Description: Information on Install-ChocolateyPath cmdlet
external help file: Chocolatey.PowerShell.dll-Help.xml
Module Name: Chocolatey.PowerShell
online version: https://docs.chocolatey.org/en-us/create/functions/install-chocolateypath
Order: 250
RedirectFrom:
  - docs/helpers-install-chocolatey-path
  - docs/helpersinstallchocolateypath
  - en-us/create/functions/install-chocolateypath
schema: 2.0.0
Title: Install-ChocolateyPath
xref: install-chocolateypath
---

# Install-ChocolateyPath

## SYNOPSIS
> :choco-info: **NOTE**
>
> Administrative Access Required when `-PathType 'Machine'.`

This puts a directory to the PATH environment variable.

## SYNTAX

```
Install-ChocolateyPath [-Path] <String> [[-PathType] <EnvironmentVariableTarget>]
 [-IgnoredArguments <Object[]>] [<CommonParameters>]
```

## DESCRIPTION
Looks at both PATH environment variables to ensure a path variable correctly shows up on the right PATH.

## EXAMPLES

### Example 2
```powershell
PS C:\> Install-ChocolateyPath -PathToInstall "$($env:SystemDrive)\tools\gittfs"
```

Adds the target path to the current user's PATH.

### Example 1
```powershell
PS C:\> Install-ChocolateyPath "$($env:SystemDrive)\Program Files\MySQL\MySQL Server 5.5\bin" -PathType 'Machine'
```

Adds the target path to the system-wide PATH.

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

### -Path
The full path to a location to add / ensure is in the PATH.

```yaml
Type: String
Parameter Sets: (All)
Aliases: PathToInstall

Required: True
Position: 0
Default value: None
Accept pipeline input: False
Accept wildcard characters: False
```

### -PathType
Which PATH to add it to. If specifying `Machine`, this requires admin privileges to run correctly.

```yaml
Type: EnvironmentVariableTarget
Parameter Sets: (All)
Aliases: Scope, Type
Accepted values: Process, User, Machine

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
`-PathType 'Machine'`.

This is used when the application/tool is not being linked by Chocolatey
(not in the lib folder).

## RELATED LINKS

[Uninstall-ChocolateyPath](xref:uninstall-chocolateypath)

[Install-ChocolateyEnvironmentVariable](xref:install-chocolateyenvironmentvariable)

[Get-EnvironmentVariable](xref:get-environmentvariable)

[Set-EnvironmentVariable](xref:set-environmentvariable)

[Get-ToolsLocation](xref:get-toolslocation)

[Cmdlet Reference](xref:powershell-cmdlet-reference)

[Function Reference](xref:powershell-reference)