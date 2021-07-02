---
Order: 25
xref: recommended-package-parameters
Title: Recommended Package Parameters
Description: The standart of naming package parameters and the list of most commonly used ones.
---

Chocolatey's package parameters provide a way for package users to configure how the package is installed and configured.

As the parameters are handled individualy by each package, establishing specific parameter names for common actions significantly simpifies the life of a user.

## Naming convention
* Parameter names should be in CamelCase
* Disabling parameters should start with 'No' (`/NoStartup`, `/NoFileAssociation`, etc.)
* Binary actions should have both Off (`/NoDesktopShortcut`) and On (`/DesktopShortcut`) parameters, overriding default behaviour.
* In cases where there are multiple binary actions of the same type (e.g. multiple components, desktop shortcuts) they should be separated by a comma (`/NoShellIntegration:GuiHere,ShellHere`, `/NoDesktopShortcut:AllUsers,CurrentUser`) 
* Actions expanding on exsting parameter behaviour should create subparameters, not create new ones (e.g. `/DesktopShortcut:Component1Shortcut,Component2Shortcut`, not `/DesktopShortcutComponent1 /DesktopShortcutComponent2`)

## Package Parameters
> :memo: **NOTE** Not all of these parameters are required to be checked by the package script. 
* `/InstallDir:` - Changes package's installation directory.
* `/NoDesktopShortcut` and `/DesktopShortcut` - Explicitly set whether the package should or should not create a shortcut on desktop, if not specified the installers default parameter is used.
* `/NoStartMenuShortcut` and `/StartMenuShortcut` - Explicitly set whether the package should or should not create an entry in start menu.
* `/NoStartup` and `/Startup` - Explicitly set whether the packaged application should or should not launch on start up(Applicable to installers that already can startup by default).
* `/NoQuickLaunchShortcut` and `/QuickLaunchShortcut` - Explicitly set whether the package should or should not create a shortcut in quick launch menu.
* `/NoFileAssociation` and `/FileAssociation` - Whether to associate files with this application.
* `/NoShellIntegration:` and `/ShellIntegration:` - Explicitly set whether the package should or should not add itself into explorer's context menu
* `/NoAppendPath` and `/AppendPath` - Add program folder directory to environment variable "PATH"
* `/Components:` - override default installation components (every optional component is turned off, and allowed selectively), e.g.: `/Components:Include_pip,CompileAll`. Package maintainer must mention the default components list.
* `/Language:` - Specifies the language to use in the form of Language code (ISO 639-1), Hyphen (-) and Country code (ISO 3166-1 alpha-2), e.g.: en-US, en-UK
* `/LicenseUsername:`, `/LicenseKey:` and `/LicensePath:` - Registration information required for package installation.
* `/Username:` and `/Password:` - Parameters to allow login into the remote download server for the package or the program, it should be allowed for the password to be read from the prompt.
* `/Purge` - Remove user files before install, or after uninstall.

## Package Example
### Package Description
~~~markdown
# Package Parameters
The following package parameters can be set:

 * `/InstallDir:` - Where to install the binaries to, Default: `$env:ProgramFiles\GreatInnoProgram`
 * `/Components:` - Configure what additional components to install, Possible values: `docs`, `examples`, `sources`, Default: `/Components:docs,examples` 
 * `/NoStartMenuShortcut:` and `/StartMenuShortcut:` - Whether to add an entry into the "All Programs" folder, Default: Yes
 * `/NoDesktopShortcut` and `/DesktopShortcut` - Whether to add a shortcut on desktop, Default: No
 * `/NoFileAssociation` and `/FileAssociation` - Whether to associate applicable files with this program, Default: No
 * `/NoAppendPath` and `/AppendPath` - Whether to add this programm's folder to 'PATH' environmental variable, Default: Yes
 * `/NoShellIntegration` and `/ShellIntegration` - Whether the package should or should not add itself into explorer's context menu, Subparameters: `addcontextmenufiles` - add to file' context menu, `addcontextmenufolders` - add to folder' context menu, Default: `/NoShellIntegration:addcontextmenufiles /ShellIntegration:addcontextmenufolders`

To pass parameters, use `--params "''"` (e.g. `choco install packageID [other options] --params="'/Item1:value /Item2:value2 /FlagBoolean'"`).
To have choco remember parameters on upgrade, be sure to set `choco feature enable -n=useRememberedArgumentsForUpgrades`.
~~~
### ChocolateyInstall.ps1
~~~powershell
$pp = Get-PackageParameters

$packageArgs = 
@{ 
  packageName    = 'my-amazing-package'
  fileType       = 'exe'
  softwareName   = 'greatInnoProgram*'
  file           = "$toolsDir\greatInnoProgram-1.0-x86.exe"
  file64         = "$toolsDir\greatInnoProgram-1.0-x64.exe"
  silentArgs     = '/VERYSILENT /SUPPRESSMSGBOXES /NORESTART /SP-'
  validExitCodes = @(0)
}

$paramToTask = # The hashtabble for converting external parameter names to the Inno setup tasks
@{
  DesktopShortcut     = 'desktopicon'
  QuickLaunchShortcut = 'quicklaunchicon'
  FileAssociation     = 'associate'
  AppendPath          = 'addtopath'
  # Example of a parameter with subparemeters, where only specifiyng a flag results in selection of all subparameters
  ShellIntegration    = @{ def="addcontextmenufiles","addcontextmenufolders"; files="addcontextmenufiles"; folders="addcontextmenufolders" }
}

if ($pp["InstallDir"]) { $packageArgs.silentArgs += " /dir=`"$($pp["InstallDir"])`"" }
if ($pp["Components"]) { $packageArgs.silentArgs += " /COMPONENTS=`"$($pp["Components"])`"" } # As the components are alredy package specific we can leave it to the user to specify the correct component names
if ($pp["NoStartMenuShortcut"]) { $packageArgs.silentArgs += " /NOICONS" } # There is no way to explicitly enable start menu entries so we will ignore '/StartMenuShortcut'

$packageArgs.silentArgs += " /MERGETASKS="
foreach ($entry in $paramToTask.GetEnumerator())
{
  if (($pp.ContainsKey($entry.Name)) -or ($pp.ContainsKey("No$($entry.Name)")))
  {
    # If it's a disabling parameter (starting with No), 
    # Add 'No' to every reference to $entry.name and '!' to every task name to make Inno setup negate it
    if ($pp.ContainsKey("No$($entry.Name)")) { $noParam="No"; $noTask="!" }
    else { $noParam=""; $noTask="" }

    # Test if we passed a flag e.g. "/NoShellIntegration"
    if ($pp["$noParam$($entry.Name)"] -is [bool]) 
    {
      # Add task, if it's a disabling parameter append '!' to the begining of task name
      if ($entry.Value -is [string]) { $packageArgs.silentArgs += "$noTask$($entry.Value)," }
      # If task, has subparameters, add default value (with all tasks enabled/disabled)
      # For each subparameter in def, add $noTask and separate them with commas
      elseif ($entry.Value -is [Hashtable])  { $packageArgs.silentArgs += "$(($entry.Value['def'] | ForEach-Object {"$noTask$_"}) -join ',')," }
    }
    # Test if we passed a string e.g. "/NoShellIntegration:files"
    elseif ($pp["$noParam$($entry.Name)"] -is [string]) 
    {
      # Only works if parameter has subparameters ($entry.Value is a hash table)
      if ($entry.Value -is [string]) { Write-Warning "Parameter /$noParam$($entry.Name) doesn't accept subparameters" }
      elseif ($entry.Value -is [Hashtable])
      {
        foreach ($subParam in $pp["$noParam$($entry.Name)"].Split(',')) # Iterate through all passed subparametrs
        {
          # If passed subparameter is in entry's, add subparameter to tasks
          if ($entry.Value.ContainsKey($subParam)) { $packageArgs.silentArgs += "$($entry.Value[$subParam])," }
          else { Write-Warning "Unknown subparameter: /$noParam$($entry.Name):$subParam" }          
        }
      }      
    }    
  }
}

Install-ChocolateyInstallPackage @packageArgs # Install application with our parameters
~~~
