---
Order: 20
xref: change-download-cache
Title: Change Download Cache Location aka Don't use TEMP for downloads
Description: How to change the download folder
RedirectFrom: docs/how-to-change-cache
---

By default, Chocolatey CLI uses the Temp Folder for downloads. However, that is sometimes blocked by Group Policy and/or other things. To change that you need to adjust the cache location in your Chocolatey CLI config file using `choco config set --name="'cacheLocation'" --value="'<CACHE LOCATION PATH>'"`. See the [config command](xref:choco-command-config) for more details.
