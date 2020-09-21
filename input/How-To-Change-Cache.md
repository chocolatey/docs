# How To Change The Download Folder

By default Chocolatey uses the Temp Folder for downloads. However that is sometimes blocked by Group Policy and/or other things. To change that you need to adjust the cache location in your choco config file.

If you are on less than [0.9.9.9](https://github.com/chocolatey/choco/blob/master/CHANGELOG.md#0999-october-2-2015), you will need to do that manually by opening the config file located at `$env:ChocolateyInstall\config\chocolatey.config` and changing the `cacheLocation` value.

If you are on 0.9.9.9 and above you can simple use `choco config set cacheLocation fullPath`. See [[Config|CommandsConfig]] for more details.
