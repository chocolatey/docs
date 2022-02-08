---
Order: 10
xref: gui-installation
Title: Installation
Description: Instructions on how to install Chocolatey GUI
RedirectFrom:
  - en-us/chocolatey-gui/setup/installation/chocolateygui
  - en-us/chocolatey-gui/setup/installation/chocolatey-gui
---

The easiest way to install Chocolatey GUI is to use Chocolatey.  Use the
following command to install the latest version of Chocolatey GUI:

```powershell
choco install chocolateygui
```

## Upgrading Chocolatey GUI

If you already have Chocolatey GUI installed, you can upgrade to the latest
version using the following command:

```powershell
choco upgrade chocolateygui
```

## Installing Beta Versions of Chocolatey GUI

Each time a commit is made into the Chocolatey GUI repository, a build is
performed, and the output is pushed to the Chocolatey GUI MyGet feed.  If you
are interested in using the very latest version of Chocolatey GUI, you can use
the following command to install it:

```powershell
choco upgrade chocolateygui --pre --source="'https://myget.org/f/chocolateygui'"
```

 ## Package Parameters

The following package parameters can be passed into the `choco install` or `choco upgrade` command to control how the installed version of Chocolatey GUI is configured.

- `/Global` - Should the configuration change be applied globally, or for the current user
- `/AllowNonAdminAccessToSettings` - Controls whether or not a non-administrator user can access the Settings Screen. NOTE: This feature will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:allow-non-admin-access-to-settings)
- `/DefaultSourceName` - The name of the source which should be shown by default when opening application. NOTE: This configuration setting will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:default-source-name)
- `/DefaultToDarkMode` - Enables/disables whether or not Chocolatey GUI defaults to using dark mode for the Chocolatey GUI User Interface - [more info](xref:default-to-dark-mode)
- `/DefaultToTileViewForLocalSource` - Enables/disables whether or not Chocolatey GUI defaults to tile instead of list view for the local source view - [more info](xref:default-to-tile-view-for-local-source)
- `/DefaultToTileViewForRemoteSource` - Enables/disables whether or not Chocolatey GUI defaults to tile instead of list view for all remote source views - [more info](xref:default-to-tile-view-for-remote-source)
- `/ExcludeInstalledPackages` - Enables/disables whether or not Chocolatey GUI shows packages that are already installed when viewing sources - [more info](xref:exclude-installed-packages)
- `/HideAllRemoteChocolateySources` - Enable/disables whether or not all remote sources are hidden - essentially enabling a read-only view of installed packages. NOTE: This feature will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:hide-all-remote-chocolatey-sources)
- `/HidePackageDownloadCount` - Allows keyboard bindings to be used to interact with different areas of the Chocolatey GUI User Interface - [more info](xref:hide-package-download-count)
- `/HideThisPCSource` - Enable/disables whether or not This PC source is hidden. NOTE: This feature will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:hide-this-pc-source)
- `/OutdatedPackagesCacheDurationInMinutes` - The length of time, in minutes, which Chocolatey GUI will wait before invalidating the cached result of outdated packages for the machine - [more info](xref:outdated-packages-cache-duration-in-minutes)
- `/PreventAllPackageIconDownloads` - Enables/disables whether Chocolatey GUI will attempt to download the icons for packages. NOTE: This feature will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:prevent-all-package-icon-downloads)
- `/PreventAutomatedOutdatedPackagesCheck` - Prevents automated check for outdated packages on startup - [more info](xref:prevent-automated-outdated-packages-check)
- `/PreventPreload` - Prevents preloading results with a blank search when opening the remote source view - [more info](xref:prevent-preload)
- `/PreventUsageOfUpdateAllButton` - Enables/disables whether the Update All button is visible. NOTE: This feature will only work with Chocolatey for Business and the Chocolatey GUI licensed extension installed - [more info](xref:prevent-usage-of-update-all-button)
- `/ShowAdditionalPackageInformation` - Show additional package information on Local and Remote views - [more info](xref:show-additional-package-information)
- `/ShowAggregatedSourceView` - Enables/disables whether or not Chocolatey GUI shows an additional source combining all sources into one location - [more info](xref:show-aggregated-source-view)
- `/ShowConsoleOutput` - Enables/disables whether or not Chocolatey GUI shows output from the commands being executed when a job is running - [more info](xref:show-console-output)
- `/UseDelayedSearch` - Enables/disables whether or not Chocolatey GUI uses a live search, which returns results after a short delay without clicking the search button - [more info](xref:use-delayed-search)
- `/UseKeyboardBindings` - Allows keyboard bindings to be used to interact with different areas of the Chocolatey GUI User Interface - [more info](xref:use-keyboard-bindings)
- `/UseLanguage` - The preferred language for Chocolatey GUI. Defaults to Windows System Locale - [more info](xref:use-language)

As an example, the following installation command could be used to enable ShowConsoleOutput to ensure UseDelayedSearch is disabled, and set the output cache to 120 minutes:

```
choco install chocolateygui --params="'/ShowConsoleOutput=$true /UseDelayedSearch=$false /OutdatedPackagesCacheDurationInMinutes=120'"
```

If you wanted to set these options globally so that all users on the machine got these values, run the following:

```
choco install chocolateygui --params="'/ShowConsoleOutput=$true /UseDelayedSearch=$false /OutdatedPackagesCacheDurationInMinutes=120 /Global'"
```