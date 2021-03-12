---
Order: 10
xref: outdated-packages-cache-duration-in-minutes
Title: Outdated Packages Cache Duration in Minutes
Description: Information on how to use the Outdated Packages Cache Duration setting
---

In an attempt to be as efficient as possible, Chocolatey GUI caches the information about which of the installed
packages are currently outdated.  Instead of running the `choco outdated` command every time that information is
requested, the information is instead fetched from the local cache.  The length of time that the outdated packages
information is kept can be controlled via this configuration parameter.  The default is 60 minutes, which can be
increased as required.

> :memo: **NOTE**
>
> Any time a package operation is completed, i.e. install/uninstall/upgrade, the outdated package information cache will be invalidated.

## Example

To set this configuration parameter, for the currently logged in user, you can run the following:

```powershell
chocolateyguicli config set --name="'OutdatedPackagesCacheDurationInMinutes'" --value="'120'"
```

Or to set it globally at the machine level, run the following:

```powershell
chocolateyguicli config set --name="'OutdatedPackagesCacheDurationInMinutes'" --value="'120'" --global
```

## Default Value

The default value for this configuration is 60 minutes.

## Availability

The ability to control this setting from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.17.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.17.0.