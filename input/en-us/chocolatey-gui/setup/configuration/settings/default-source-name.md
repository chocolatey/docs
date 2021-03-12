---
Order: 20
xref: default-source-name
Title: Default Source Name
Description: Information on how to use the Default Source Name setting
---

By default, when Chocolatey GUI opens it will show the "This PC" source, showing all of the locally installed packages.  Depending on your usage of Chocolatey GUI, it may make more sense to default to showing a different source when the application first loads.  By setting this configuration option to the name of a configured source, Chocolatey GUI will show this by default when it first opens.  If the value of the DefaultSourceName setting doesn't match the name of a configured source, then the "This PC" source will be shown.

> :memo: **NOTE**
>
> This is a Chocolatey for Business feature, and will require install of the [Chocolatey GUI Licensed Extension](xref:chocolatey-gui-licensed-extension)

> :memo: **NOTE**
>
> In order for this setting to take effect, it will be necessary to close and open Chocolatey GUI.

## Example

To set this configuration parameter, for the currently logged in user, you can run the following:

```powershell
chocolateyguicli config set --name="'DefaultSourceName'" --value="'chocolatey'"
```

Or to set it globally at the machine level, run the following:

```powershell
chocolateyguicli config set --name="'DefaultSourceName'" --value="'chocolatey'" --global
```

## Default Value

The default value for this setting is an empty string.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.18.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.18.0.