# ChocolateyInstall PowerShell Script
Chocolatey uses PowerShell as a package install provider and will look for this file in the package. If it finds it, it will execute the contents of the file, attaching the helper modules. Check out the [[Helper Reference|HelpersReference]] for more information on each of the helpers you can include.

It really is just PowerShell, so you can use regular PowerShell here and it should run fine. **Note:** Please maintain compatibility with Posh v2. Not every OS we support is on Posh v2 (nor comes OOB with Posh v3+). It's best to work with the widest compatibility of systems out there.

## When is the script triggered?
If present in a package, the `ChocolateyInstall.ps1` script will be triggered at the following points:
* When a package is installed for the first time, after the package contents have been extracted.
* In an [[Upgrade|CommandsUpgrade]] scenario, the install script for the new package will be run after any `chocolateyBeforeModify.ps1` script associated with the previous version of the package.

### Example?
This is what it takes to install [StExBar](https://chocolatey.org/packages/stexbar):

```powershell
$name   = 'StExBar'
$url = 'http://stexbar.googlecode.com/files/StExBar-1.8.3.msi'
$url64 = 'http://stexbar.googlecode.com/files/StExBar64-1.8.3.msi'
$silent = '/quiet'

Install-ChocolateyPackage $name 'msi' $silent $url $url64
```

The Install-ChocolateyPackage helper uses the url, msi, and silent args to download and silently install and update StExBar.
