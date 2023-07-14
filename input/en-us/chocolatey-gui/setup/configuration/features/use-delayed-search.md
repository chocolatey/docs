---
Order: 40
xref: use-delayed-search
Title: Use Delayed Search
Description: Enables live search, which returns results after a short delay without clicking the search button on remote sources
---

By default, when viewing any remote source in Chocolatey GUI (for example, the Chocolatey Community Repository), in order to start a search it is necessary to press the enter button (or to click the magnifying glass icon) after entering the search string.  Some people prefer that the search is executed immediately after typing has completed, without the need to press the enter button.  Enabling this feature toggles it so that pressing the entry key is no longer a requirement for the search to be performed.

![Use Delayed Search Enabled](/assets/images/chocolatey-gui/feature_use_delayed_search_enabled.png "Use Delayed Search Enabled")

## Resources

Below is a short video which shows this feature in action:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/7v6_XCp78H0?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Example

This feature can be enabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature enable --name="'UseDelayedSearch'"
```

This feature can be disabled, for the currently logged in user, by running the following command:

```powershell
chocolateyguicli feature disable --name="'UseDelayedSearch'"
```

Or, to enable/disable it globally at the machine level, run the following commands:

```powershell
chocolateyguicli feature enable --name="'UseDelayedSearch'" --global

chocolateyguicli feature disable --name="'UseDelayedSearch'" --global
```


## Default Value

The default value for this feature is disabled.

## Availability

The ability to control this feature from the Chocolatey GUI Settings screen has existed since Chocolatey GUI v0.16.0.

The ability to control this feature from the command line using `chocolateyguicli` has existed since Chocolatey GUI
v0.17.0.
