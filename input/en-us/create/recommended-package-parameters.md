---
Order: 25
xref: recommended-package-parameters
Title: Recommended Package Parameters
Description: Providing guidance and best practice on the naming of package parameters and provide a list of most commonly used ones.
---

Chocolatey's package parameters provide a way for package users to configure how the package is installed and configured.

As the parameters are handled individually by each package, establishing specific parameter names for common actions significantly simpifies the life of users and maintainers.

## Naming Convention
* Parameter names should be in [CamelCase](https://en.wikipedia.org/wiki/Camel_case). For example `NoIcon` or `DisableStartup`.
* Parameters that disable or turn off _something_ should start with 'No' (`/NoStartup`, `/NoFileAssociation`, etc.)
* Binary actions should have both Off (`/NoDesktopShortcut`) and On (`/DesktopShortcut`) parameters, overriding default behaviour.
* If there are several components sharing an action, like adding a desktop icon for programm 1 and programm 2, the name of the component should be written AFTER that common parameter action, for exmaple: `/NoDesktopShortcutProgram1`, `/DesktopShortcutProgram2` (Passing a common parameter action, like `/DesktopShortcut` or `/NoDesktopShortcut, should result in all components being enabled or disabled).

## Package Parameters

Below is a list of commonly used package parameters. These give users a consistent Chocolatey experience across packages and makes it easier for them to use them. It also allows maintainers to use parameters whose meaning has already been defined by others.

> :memo: **NOTE** Not all of these parameters are required to be checked by the package script. 
> :memo: **NOTE** Some parameters may be accessed via installer specific `--install-arguments`
* `/InstallDir:` - Changes package's installation directory.
* `/NoDesktopShortcut` and `/DesktopShortcut` - Explicitly set whether the package should or should not create a shortcut on desktop. If not specified, the installer default behaviour will apply.
* `/NoStartMenuShortcut` and `/StartMenuShortcut` - Explicitly set whether the package should or should not create an entry in start menu. If not specified, the installer default behaviour will apply.
* `/NoStartup` and `/Startup` - Explicitly set whether the packaged application should or should not launch on startup, if applicable. If not specified, the installer default behaviour will apply.
* `/NoQuickLaunchShortcut` and `/QuickLaunchShortcut` - Explicitly set whether the package should or should not create a shortcut in quick launch menu. If not specified, the installer default behaviour will apply.
* `/NoFileAssociation` and `/FileAssociation` - Whether to associate files with this application. If not specified, the installer default behaviour will apply.
* `/NoShellIntegration` and `/ShellIntegration` - Explicitly set whether the package should or should not add itself into explorer's context menu. If not specified, the installer default behaviour will apply.
* `/NoAppendPath` and `/AppendPath` - Add program folder directory to environment variable "PATH". If not specified, the installer default behaviour will apply.
* `/Components` - Select what additional components should the package install, e.g.: `/ComponentsDocs, /NoComponentsExamples`. Package maintainer must mention the complete component list.
* `/Language:` - Specifies what language should the package install, e.g `/Language:en-US`.
* `/Purge` - Remove user files before install, or after uninstall.

### Package Description Example
~~~markdown
# Package Parameters
The following package parameters can be set:

 * `/InstallDir:` - Where to install the binaries to. Default: `/InstallDir:C:\Tools\MyProgram`.
 * `/Components` - Configure what additional components to install, Possible values: `docs`, `examples`, `sources`. Default: `/ComponentsDocs`.
 * `/NoStartMenuShortcut:` and `/StartMenuShortcut:` - Whether or not to add an entry into the "All Programs" folder. Default: Yes.
 * `/NoDesktopShortcut` and `/DesktopShortcut` - Whether or not to add a shortcut on desktop. Default: No.
 * `/NoFileAssociation` and `/FileAssociation` - Whether or not to associate applicable files with the installed software. Default: No.
 * `/NoAppendPath` and `/AppendPath` - Whether or not to add this software install folder to 'PATH' environmental variable. Default: Yes.
 * `/NoShellIntegration` and `/ShellIntegration` - Whether the package should or should not add itself into explorer's context menu, Subparameters: `Files` - add to file's context menu, `Folders` - add to folder's context menu. Default: `/ShellIntegrationFolders`.

To pass parameters, use `--params "''"` (e.g. `choco install packageID [other options] --params="'/Item1:value /Item2:value2 /FlagBoolean'"`).
To remember the parameters you have set when you upgrade a package, set `choco feature enable -n=useRememberedArgumentsForUpgrades`.
~~~
