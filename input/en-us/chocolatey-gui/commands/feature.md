---
Order: 20
xref: gui-feature-command
Title: Feature
Description: Usage instructions on how to enable/disable Chocolatey GUI features
---

Chocolatey GUI will allow you to interact with features.

## Usage

```powershell
chocolateyguicli feature [list]|disable|enable [<options/switches]
```

## Examples

```powershell
chocolateyguicli feature
chocolateyguicli feature list
chocolateyguicli feature disable --name="'bob'"
chocolateyguicli feature enable --name="'bob'"
```

## Exit Codes

Exit codes that normally result from running this command.

Normal:

- 0: operation was successful, no issues detected
- -1 or 1: an error has occurred

## Options and Switches

```powershell
-?, --help, -h
     Prints out the help menu.

-n, --name=VALUE
     Name - the name of the feature. Required with some actions. Defaults to empty.
```

## Resources

Below is a short video which shows this in action:

<iframe width="700" height="506" src="https://www.youtube.com/embed/_AkDNQFoCtc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

## Feature Options

The available feautres that can be configured are:

* [Allow Non Admin Access to Settings](xref:allow-non-admin-access-to-settings)
* [Default to Tile View for Local Source](xref:default-to-tile-view-for-local-source)
* [Default to Tile VIew for Remote Source](xref:default-to-tile-view-for-remote-source)
* [Exclude Installed Packages](xref:exclude-installed-packages)
* [Hide Package Download Count](xref:hide-package-download-count)
* [Show Additional Package Information](xref:show-additional-package-information)
* [Show Aggregated Source](xref:show-aggregated-source-view)
* [Show Console Output](xref:show-console-output)
* [Use Delayed Search](xref:use-delayed-search)
* [Use Keyboard Bindings](xref:use-keyboard-bindings)