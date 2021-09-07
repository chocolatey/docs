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

-r, --limitoutput, --limit-output
     Limit the output to essential information

-n, --name=VALUE
     Name - the name of the feature. Required with some actions. Defaults to empty.

-g, --global
     Should the command be applied to the global (machine) level?  Defaults
       to false.
```

## Resources

Below is a short video which shows how to use the feature command of the chocolateyguicli:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/Zsyr51jr4QY?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>

## Feature Options

The available features that can be configured are:

<?! Include "../../../shared/available-features.txt" /?>
