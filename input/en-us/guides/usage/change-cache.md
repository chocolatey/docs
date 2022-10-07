---
Order: 20
xref: change-download-cache
Title: Change Download Cache Location aka Don't use TEMP for downloads
Description: How to change the download folder
RedirectFrom: docs/how-to-change-cache
---

# How To Change The Download Folder

By default Chocolatey uses the Temp Folder for downloads. However that is sometimes blocked by Group Policy and/or other things. To change that you need to adjust the cache location in your choco config file.

If you are on less than [0.9.9.9](https://docs.chocolatey.org/en-us/choco/release-notes#october-2-2015), you will need to do that manually by opening the config file located at `$env:ChocolateyInstall\config\chocolatey.config` and changing the `cacheLocation` value.

If you are on 0.9.9.9 and above you can simple use `choco config set --name cacheLocation --value fullPath`. See [Config](xref:choco-command-config) for more details.
