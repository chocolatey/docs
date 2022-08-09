---
Order: 30
xref: gui-purge-command
Title: Purge
Description: Usage instructions on how to execute the purge command
---

Chocolatey GUI will allow you to interact with purging caches used in application.

## Usage

```powershell
chocolateyguicli purge icons|outdated [<options/switches>]
```

## Examples

```powershell
chocolateyguicli purge icons
chocolateyguicli purge outdated
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
```
## Resources

Below is a short video which shows how to use the feature command of the chocolateyguicli:

<p>
<div class="ratio ratio-16x9">
    <iframe src="https://www.youtube.com/embed/zZZw9Z2Hw0E?list=PL84yg23i9GBjAMY0OfHfn-MH4rviaccuc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
    </iframe>
</div>
<br>
</p>
