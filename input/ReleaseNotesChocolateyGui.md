# Chocolatey GUI Release Notes - Open Source

This covers changes for the "chocolateygui" package, which is available as FOSS.

**NOTE**: For commercial editions, please also refer to [[Licensed Release Notes|ReleaseNotesLicensed]].

## [0.17.2](https://github.com/chocolatey/ChocolateyGUI/milestone/21?closed=1) (July 13, 2020)

### BUGS

* Ensure earlier versions of Chocolatey GUI assemblies can be resolved when using an older version of Chocolatey GUI extension - see [#785](https://github.com/chocolatey/ChocolateyGUI/issues/785)

## [0.17.1](https://github.com/chocolatey/ChocolateyGUI/milestone/20?closed=1) (June 11, 2020)

### BUGS

* Language localization files are missing in 0.17.0  - see [#778](https://github.com/chocolatey/ChocolateyGUI/issues/778)
* Chocolatey GUI runs as a 32 bit process when running on a 64 bit machine - see [#779](https://github.com/chocolatey/ChocolateyGUI/issues/779)

## [0.17.0](https://github.com/chocolatey/ChocolateyGUI/milestone/18?closed=1) (March 26, 2020)

### FEATURES

* Add ability to show/hide download count on remote source view - see [#710](https://github.com/chocolatey/ChocolateyGUI/issues/710)
* Create and publish additional NuGet packages for Chocolatey GUI - see [#698](https://github.com/chocolatey/ChocolateyGUI/issues/698)
* Provide integration with chocolateygui.extension - see [#679](https://github.com/chocolatey/ChocolateyGUI/issues/679)
* Create commands to allow purging of caches from CLI - see [#673](https://github.com/chocolatey/ChocolateyGUI/issues/673)
* Provide ability to purge Outdated Package cache file - see [#671](https://github.com/chocolatey/ChocolateyGUI/issues/671)
* Separate the app.manifest from the exe [Customer] - see [#629](https://github.com/chocolatey/ChocolateyGUI/issues/629)
* Provide ability to hide packages that are known to already be installed when viewing sources - see [#627](https://github.com/chocolatey/ChocolateyGUI/issues/627)
* Provide ability to refresh cached icons for packages when there are known changes to icon - see [#624](https://github.com/chocolatey/ChocolateyGUI/issues/624)
* Remove admin only sources/repos - see [#603](https://github.com/chocolatey/ChocolateyGUI/issues/603)
* Allow setting of Chocolatey GUI settings via Chocolatey package parameter - see [#592](https://github.com/chocolatey/ChocolateyGUI/issues/592)
* Search in all available repositories - see [#588](https://github.com/chocolatey/ChocolateyGUI/issues/588)
* Hide Download Counters - see [#569](https://github.com/chocolatey/ChocolateyGUI/issues/569)
* Limit non-admin list to self service only - see [#432](https://github.com/chocolatey/ChocolateyGUI/issues/432)

### C4B FEATURES

* Add footer with information about current version in bottom left hand corner - see [#705](https://github.com/chocolatey/ChocolateyGUI/issues/705)
* Add ability to strong name sign the output of the build - see [#704](https://github.com/chocolatey/ChocolateyGUI/issues/704)

### BUG FIXES

* Fix - PackageParameters are not working (when installing Chocolatey GUI via Chocolatey) - see [#716](https://github.com/chocolatey/ChocolateyGUI/issues/716)
* Fix - Context menu not displayed - see [#709](https://github.com/chocolatey/ChocolateyGUI/issues/709)
* Fix - Correctly handle incorrect license installation - see [#686](https://github.com/chocolatey/ChocolateyGUI/issues/686)
* Fix - Packages with pre-release versioning never found on list/search - see [#676](https://github.com/chocolatey/ChocolateyGUI/issues/676)
* Fix - Empty icon doesn't appear on local source view - see [#674](https://github.com/chocolatey/ChocolateyGUI/issues/674)
* Fix - IsPrerelease property is never set - see [#661](https://github.com/chocolatey/ChocolateyGUI/issues/661)
* Fix - nuspec - Remove the upper bound dependency on Chocolatey - see [#656](https://github.com/chocolatey/ChocolateyGUI/issues/656)
* Fix - Prerelease packages not being correctly labeled as "outdated" - see [#653](https://github.com/chocolatey/ChocolateyGUI/issues/653)
* Fix - Tile View - Nitpick inconsistent spacing - see [#652](https://github.com/chocolatey/ChocolateyGUI/issues/652)
* Fix - NotSupportedException:'System.NotSupportedException: UriTypeConverter cannot convert from (null) when viewing Package Details - see [#643](https://github.com/chocolatey/ChocolateyGUI/issues/643)
* Fix - nuspec - Add .NET Framework 4.x Dependency [Customer] - see [#632](https://github.com/chocolatey/ChocolateyGUI/issues/632)
* Fix - Unable to update source after making a change to another source [Customer] - see [#620](https://github.com/chocolatey/ChocolateyGUI/issues/620)
* Fix - Tile selection for Remote Sources is not being used - see [#618](https://github.com/chocolatey/ChocolateyGUI/issues/618)
* Fix - Unable to install a package that uses 64bit PowerShell Modules - see [#610](https://github.com/chocolatey/ChocolateyGUI/issues/610)
* Fix - Locking of generated packages.config file when exporting package list - see [#593](https://github.com/chocolatey/ChocolateyGUI/issues/593)
* Fix - Next/Previous First/Last buttons remain disabled when using Simple.Server [Customer] - see [#590](https://github.com/chocolatey/ChocolateyGUI/issues/590)
* Fix - Chocolatey GUI icon is a blank image - see [#589](https://github.com/chocolatey/ChocolateyGUI/issues/589)
* Fix - GUI misses update that shows in CLI - see [#585](https://github.com/chocolatey/ChocolateyGUI/issues/585)
* Fix - Chocolatey GUI crashes when opening details page for Rufus package - see [#584](https://github.com/chocolatey/ChocolateyGUI/issues/584)
* Fix - Chocolatey GUI crashes when viewing Package Details - see [#578](https://github.com/chocolatey/ChocolateyGUI/issues/578)
* Fix - Package shows as installed in GUI when it did not actually install [Customer] - see [#573](https://github.com/chocolatey/ChocolateyGUI/issues/573)
* Fix - Chocolatey GUI crashes on startup if all sources are disabled. - see [#568](https://github.com/chocolatey/ChocolateyGUI/issues/568)
* Fix - Chocolatey GUI v0.16.0 uninstall errors (but uninstalls) - see [#563](https://github.com/chocolatey/ChocolateyGUI/issues/563)
* Fix - Links in Settings/About page that result in "Page Not Found" errors - see [#562](https://github.com/chocolatey/ChocolateyGUI/issues/562)
* Fix - Icon not showing up in gallery - see [#558](https://github.com/chocolatey/ChocolateyGUI/issues/558)
* Fix - Package source link for ChocolateyGUI 0.15.0 in nuspec is wrong - see [#550](https://github.com/chocolatey/ChocolateyGUI/issues/550)
* Fix - Context Menu Position issue in the package details. - see [#548](https://github.com/chocolatey/ChocolateyGUI/issues/548)
* Fix - On Load of any source, outdated is running (logging) every time - see [#525](https://github.com/chocolatey/ChocolateyGUI/issues/525)
* Fix - Issue where Latest Version is not showing - see [#506](https://github.com/chocolatey/ChocolateyGUI/issues/506)
* Fix - Disable "Show Only Packages with Updates" while information is still loaded - see [#502](https://github.com/chocolatey/ChocolateyGUI/issues/502)

### IMPROVEMENTS

* Prelease label should not be red as this suggests an error, which isn't the case - see [#711](https://github.com/chocolatey/ChocolateyGUI/issues/711)
* Move Windows specific code into another Common library - see [#682](https://github.com/chocolatey/ChocolateyGUI/issues/682)
* Remove tilting chocolatey logo - see [#680](https://github.com/chocolatey/ChocolateyGUI/issues/680)
* Split CLI functionality into separate exe - see [#675](https://github.com/chocolatey/ChocolateyGUI/issues/675)
* Allow "safe" Chocolatey operations to happen in parallel - see [#672](https://github.com/chocolatey/ChocolateyGUI/issues/672)
* Update to Chocolatey.Lib 0.10.15 - see [#670](https://github.com/chocolatey/ChocolateyGUI/issues/670)
* Ensure all dialogs shown in Chocolatey GUI have localised text on buttons - see [#668](https://github.com/chocolatey/ChocolateyGUI/issues/668)
* Do not display password in source settings screen - see [#665](https://github.com/chocolatey/ChocolateyGUI/issues/665)
* Tile View - Prevent Version text overlap - see [#651](https://github.com/chocolatey/ChocolateyGUI/issues/651)
* Ensure that icons maintain their aspect ratio - see [#633](https://github.com/chocolatey/ChocolateyGUI/issues/633)
* Improve UI for Feature and Settings lists - see [#612](https://github.com/chocolatey/ChocolateyGUI/pull/612)
* Upgrade MahApps.Metro and MahApps.Metro.IconPacks - see [#608](https://github.com/chocolatey/ChocolateyGUI/pull/608)
* Remove multiple uses of SetCustomLogging - see [#607](https://github.com/chocolatey/ChocolateyGUI/issues/607)
* Don't allow navigation to settings or about screen while dialog is open - see [#606](https://github.com/chocolatey/ChocolateyGUI/issues/606)
* Improve the descriptions/explanations used for Chocolatey GUI settings - see [#605](https://github.com/chocolatey/ChocolateyGUI/issues/605)
* Provide separate settings and about views - see [#598](https://github.com/chocolatey/ChocolateyGUI/issues/598)
* Chocolatey GUI not found in the PATH - see [#574](https://github.com/chocolatey/ChocolateyGUI/issues/574)
* Chocolatey GUI pulls download stats only from the community feed  - see [#564](https://github.com/chocolatey/ChocolateyGUI/issues/564)
* Move version on Package view to the left column - see [#530](https://github.com/chocolatey/ChocolateyGUI/issues/530)
* Improve UI by reducing flashing when modal appears - see [#528](https://github.com/chocolatey/ChocolateyGUI/issues/528)
* Package description should use all available client space - see [#501](https://github.com/chocolatey/ChocolateyGUI/issues/501)
* Add different background for outdated packages - see [#431](https://github.com/chocolatey/ChocolateyGUI/issues/431)
* Package details view is missing the 'Gallery' link - see [#430](https://github.com/chocolatey/ChocolateyGUI/issues/430)
* Current prerelease does not display any versioning information in the ABOUT screen - see [#422](https://github.com/chocolatey/ChocolateyGUI/issues/422)
* Fix rendering of headings in package description  - see [#356](https://github.com/chocolatey/ChocolateyGUI/issues/356)
* Add option to show package id column - see [#270](https://github.com/chocolatey/ChocolateyGUI/issues/270)

### DOCUMENTATION

* Add Czech language map - see [#729](https://github.com/chocolatey/ChocolateyGUI/pull/729)
* Fix typo in readme - see [#693](https://github.com/chocolatey/ChocolateyGUI/issues/693)
* Added Chinese language map - see [#634](https://github.com/chocolatey/ChocolateyGUI/pull/634)
* Fix typo in about page - see [#583](https://github.com/chocolatey/ChocolateyGUI/pull/583)

## [0.16.0](https://github.com/chocolatey/ChocolateyGUI/milestone/17?closed=1) (February 15, 2018)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.16.0)

## [0.15.0](https://github.com/chocolatey/ChocolateyGUI/milestone/6?closed=1) (October 18, 2017)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.15.0)

## [0.13.2](https://github.com/chocolatey/ChocolateyGUI/milestone/14?closed=1) (December 14, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.13.2)

## [0.13.1](https://github.com/chocolatey/ChocolateyGUI/milestone/13?closed=1) (March 29, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.13.1)

## [0.13.0](https://github.com/chocolatey/ChocolateyGUI/milestone/3?closed=1) (March 26, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.13.0)

## [0.12.4](https://github.com/chocolatey/ChocolateyGUI/milestone/10?closed=1) (March 12, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.12.4)

## [0.12.3](https://github.com/chocolatey/ChocolateyGUI/milestone/9?closed=1) (March 3, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.12.3)

## [0.12.2](https://github.com/chocolatey/ChocolateyGUI/milestone/8?closed=1) (March 3, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.12.2)

## [0.12.1](https://github.com/chocolatey/ChocolateyGUI/milestone/7?closed=1) (March 2, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.12.1)

## [0.12.0](https://github.com/chocolatey/ChocolateyGUI/milestone/2?closed=1) (February 28, 2015)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.12.0)

## [0.11.4](https://github.com/chocolatey/ChocolateyGUI/milestone/5?closed=1) (September 16, 2014)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.11.4)

## 0.11.3 (September 16, 2014)

No release notes available.

## [0.11.2](https://github.com/chocolatey/ChocolateyGUI/milestone/4?closed=1) (September 16, 2014)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.11.2)

## [0.11.1](https://github.com/chocolatey/ChocolateyGUI/milestone/11?closed=1) (February 24, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.11.1)

## [0.11.0](https://github.com/chocolatey/ChocolateyGUI/milestone/1?closed=1) (February 24, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.11.0)

## 0.1.4 (February 10, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.1.4)

## 0.1.3 (February 10, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.1.3)

## 0.1.2 (February 10, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.1.2)

## 0.1.1 (February 10, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.1.1)

## 0.1.0 (February 9, 2013)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.1.0)

## 0.0.5 (September 10, 2011)

Release notes can be found [here](https://github.com/chocolatey/ChocolateyGUI/releases/tag/0.0.5)

## 0.0.4 (September 10, 2011)

No release notes available.

## 0.0.3 (September 10, 2011)

No release notes available.

## 0.0.2 (September 10, 2011)

No release notes available.

## 0.0.1 (September 10, 2011)

No release notes available.
