---
Order: 10
xref: chocolatey-gui-licensed-extension-release-notes
Title: Release Notes
Description: Release Notes for Chocolatey GUI Extension
---

# Chocolatey Release Notes - Chocolatey GUI Licensed Extension
## Summary
This covers the release notes for the Chocolatey GUI Licensed Extension (`chocolateygui.extension`) package, where the commercial editions of Chocolatey GUI get their enhanced functionality.
Please see [Install the Licensed Edition](xref:setup-chocolatey-gui-licensed) for information on how to get and install the package.

> :memo: **NOTE** This package is available to Chocolatey for Business customers only.

## Other Release Notes

- Refer to [Open Source Release Notes](xref:floss-release-notes) as commercial editions build on top of open source.
- Chocolatey for Business (C4B) customers - also refer to [Chocolatey Agent Release Notes](xref:agent-release-notes) and [Chocolatey Central Management Release Notes](xref:ccm-release-notes).

<?! Include "../../shared/chocolatey-component-dependencies.txt" /?>

## 1.0.0 (March 21, 2022)

> :warning: **WARNING**
>
> The dependencies of the chocolateygui.extension package have changed in this release. It now requires Chocolatey GUI v1.0.0 and Chocolatey Licensed Extension v4.0.0.

### Breaking Changes

- Add Chocolatey Licensed Extension dependency to package to ensure all required dependencies are installed during upgrade
- Updates Chocolatey dependency for package to v1.0.0

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/UNayhXD_6Oc?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.4.0 (February 10, 2022)

> :warning: **WARNING**
>
> The dependencies of the chocolateygui.extension package have changed in this release, and it now requires Chocolatey GUI v0.20.0.

### Breaking Change

- Change target .NET Framework version to be 4.8 - see [#841](https://github.com/chocolatey/ChocolateyGUI/issues/841)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/hRgfe0NxVL4?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.3.0 (September 6, 2021)

> :warning: **WARNING**
>
> The dependencies of the chocolateygui.extension package have changed in this release, and it now requires Chocolatey CLI v0.11.1 and Chocolatey GUI v0.19.0.

### Features

- Add feature to allow disabling of the This PC source - see [licensed #228](https://github.com/chocolatey/chocolatey-licensed-issues/issues/228)
- Add feature to allow disabling of "Update All" button -see [licensed #240](https://github.com/chocolatey/chocolatey-licensed-issues/issues/240)

### Improvements

- [Security] XML External Entity attack in log4net (CVE-2018-1285) see [licensed #254](https://github.com/chocolatey/chocolatey-licensed-issues/issues/254)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/O0fyUHe2pb8?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.2.1 (March 29, 2021)

### Bug Fix

- Fix - Incorrect configuration database being used by Chocolatey GUI Licensed Extension when running as non-administrator user - see [licensed #209](https://github.com/chocolatey/chocolatey-licensed-issues/issues/209)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/t4h3Y9GMIrc?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.2.0 (March 9, 2021)

### Breaking Change

- Update the default value for "NonAdmin Access to Settings" feature to be false - see [#601](https://github.com/chocolatey/ChocolateyGUI/issues/601)

### Features

- Provide ability for Chocolatey GUI to respect the background service allowed commands configuration option
- Add a feature to toggle on/off a read only view for installed packages - see [licensed #201](https://github.com/chocolatey/chocolatey-licensed-issues/issues/201)
- Add a feature to toggle on/off the option to not attempt to download icons for packages - see [licensed #199](https://github.com/chocolatey/chocolatey-licensed-issues/issues/199)
- Add a configuration option to specify a default for a particular source when application loads - see [licensed #198](https://github.com/chocolatey/chocolatey-licensed-issues/issues/198)

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/tug8P1wxXmY?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>

## 0.1.0 (January 22, 2021)

Initial preview release

### Features

- Branding - Support for branding portions of the Chocolatey GUI assets from provided assets
- Provide ability to restrict access to Chocolatey GUI settings to only machine administrators
- Packaging - Extension is deployable in the same way as the Chocolatey Licensed Extension
- Provide visual indication in Chocolatey GUI when the Chocolatey GUI Licensed Extension is being used

### Release Video

A short video explaining what is included in this release can be found here:

<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/kypWt1UyVwg?list=PLGvGJzqY88slXNljm_qph3jnD2Z4bH6nx" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
