# Package Parameters

When installing a Chocolatey Package, it is possible to use a number of arguments to control how the package is installed.  Each one of these arguments is detailed [here](CommandsInstall).

Package parameters provide a way for a package consumer to make choices about how they want things installed and configuration of the underlying software.

You can use package parameters to set up arguments to the native installer, but that is typically done from the consumer end with Install Arguments. It does offer a nice way of providing that information for folks.

* [Walkthrough](#walkthrough)
   * [Step 1 - Determine Parameters](#step-1---determine-your-package-parameters)
   * [Step 2 - Add to Package Description](#step-2---add-package-parameters-to-the-description)
   * [Step 3 - Use `Get-PackageParameters`](#step-3---use-get-packageparameters)
   * [DEPRECATED - Step 3 (alternative) - Parse Your Own](#step-3-alternative---set-up-your-own-parsing)
   * [Review](#review-set-parameters)
* [Installing With Package Parameters](#installing-with-package-parameters)

**NOTE:** There is also the concept of "Install Arguments", or silent arguments you can pass through transparently to the native installer. This is more of a way for a package consumer to override the default silent arguments that are passed to the native installer.

**NOTE:** Package parameters are not meant to be a substitute for sensible default values. A package installation should require no arguments and the default values should just happen. This is especially true of the packages on the community feed. If you are hosting your own internal feeds, it is recommended you follow this behavior, but not required.

**NOTE:** `Get-PackageParameters` is available now with a dependency on `chocolatey-core.extension`, and in a future version of Chocolatey (see [#312](https://github.com/chocolatey/choco/issues/312)), it will also be one of Chocolatey's built-in functions.

## Walkthrough

Let's customize a package with a call similar to `choco install <pkg_id> --params "'/LICENSE:value'"``.

### Example

Here's an example of what we can achieve.

~~~powershell
# command line call: `choco install <pkg_id> --params "'/LICENSE:value'"`
$pp = Get-PackageParameters

# Read-Host, PromptForChoice, etc are not blocking calls with Chocolatey.
# Chocolatey has a custom PowerShell host that will time these calls
# after 30 seconds, allowing headless operation to continue but offer
# prompts to users to ask questions during installation.
if (!$pp['LICENSE']) { $pp['LICENSE'] = Read-Host 'License key?' }
# set a default if not passed
if (!$pp['LICENSE']) { $pp['LICENSE'] = '1234' }
if (!$pp['UserName']) { $pp['UserName'] = "$env:UserName" }
# Requires 0.10.8 for Read-Host -AsSecureString
if (!$pp['Password']) { $pp['Password'] = Read-Host "Enter password for $($pp['UserName']):" -AsSecureString}
# fail the install/upgrade if not value is not determined
if (!$pp['Password']) { throw "Package needs parameter 'Password' to install, that must be provided in params or in prompt." }

# put the value into a file that you write out every install/upgrade
@"
<license>$($pp['LICENSE'])</license>
"@ | Out-File "$toolsDir\config.xml" -Encoding UTF8 -Force

# put a value into a registry key

$someKey = 'HKLM:\Software\SomeCompany\SomeProduct\Subkey'
if (!(Test-Path $someKey)) {
  New-Item -Path $someKey  -Force | Out-Null
}
New-ItemProperty $someKey -Name 'LICENSE' -Value $pp['LICENSE'] -Force | Out-Null

# pass the arguments to the installer
# (although installer arguments work well for this and
# are completely transparent to the package)

# EXAMPLE COMING LATER

#[..snip..]

~~~

### Step 1 - Determine your Package Parameters
One thing you will need is a good idea of what package parameters and defaults for those parameters what you would offer. Let's say the following package parameters can be set:

 * Port - defaults to "81"
 * Edition - defaults to "LicenseKey"
 * AdditionalTools (boolean switch) - all booleans default to false
 * InstallationPath - defaulting to "c:\temp" (or `$env:SystemDrive\temp`)

### Step 2 - Add Package Parameters to the Description

Be sure to let folks know about the package parameters (**Note:** this will be a holding review item by moderators).

Set up your nuspec appropriately:

~~~xml
    <description>
Main description here about the software

### Package Specific
#### Package Parameters
The following package parameters can be set:

 * `/Port:` - determines what port to listen on - defaults to "81"
 * `/Edition:` - What edition to install - defaults to "LicenseKey"
 * `/AdditionalTools` - install additional tools
 * `/InstallationPath:` - Where to install the binaries to - defaults to "`$env:SystemDrive\temp`"

To pass parameters, use `--params "''"` (e.g. `choco install packageID [other options] --params="'/ITEM:value /ITEM2:value2 /FLAG_BOOLEAN'"`).
To have choco remember parameters on upgrade, be sure to set `choco feature enable -n=useRememberedArgumentsForUpgrades`.
    </description>
~~~

**NOTE**: Package parameters can be passed as `--params`, but also as a few different ways including `--package-parameters`. See [[install options|CommandsInstall#options-and-switches]]:

~~~sh
 --params, --parameters, --pkgparameters, --packageparameters, --package-parameters=VALUE
     PackageParameters - Parameters to pass to the package. Defaults to unspecified.
~~~

<a name="step-3---use-core-community-extension"></a>
### Step 3 - Use Get-PackageParameters

This is the recommended way to work with Package Parameters. For consistency and understanding, please only use this method when building packages.

#### Built-In
Starting in Chocolatey v0.10.8, `Get-PackageParameters` is built into Chocolatey - see the [[`Get-PackageParameters` documentation|HelpersGetPackageParameters]]. If you are using Chocolatey internally, you can use this without needing the community extension (below). If you are pushing packages externally (e.g. the community package repository), you must add the core extension as a polyfill for 6 months after release of Chocolatey v0.10.8. Follow the next section below.

#### Core Community extension

If you want to do this simply, take a dependency on the [core community extension](https://chocolatey.org/packages/chocolatey-core.extension), which already has the above function `Get-PackageParameters` built in.

Open the nuspec back up and add a dependency on `chocolatey-core.extension`. This will be inserted just above the closing "metadata" tag (`</metadata>`).

~~~xml
  <dependencies>
      <dependency id="chocolatey-core.extension" version="1.1.0" />
  </dependencies>
~~~

**NOTE**: The version specified without brackets (`[]`) means this is a minimum version dependency. So in this case, 1.1.0 or newer (`>=1.1.0`). If it was `[1.1.0]`, that would mean exactly version 1.1.0 (`=1.1.0`).

#### Prepare The Code

Now use `Get-PackageParameters` to parse the parameters as it will automatically be added to the functions when Chocolatey adds the `chocolatey-core.extension`.

Let's open and add the following to `tools\chocolateyInstall.ps1`:

~~~powershell

$pp = Get-PackageParameters

if (!$pp['Port']) { $pp['Port'] = '81' }
if (!$pp['Edition']) { $pp['Edition'] = 'LicenseKey' }
# you can also use the values like this:
if (!$pp.InstallationPath) { $pp.InstallationPath = "$env:SystemDrive\temp" }


$silentArgs = "/S /Port:$($pp['Port']) /Edition:$($pp['Edition']) /InstallationPath:$($pp['InstallationPath'])"
if ($pp['AdditionalTools'] -eq 'true') { $silentArgs += " /Additionaltools" }

Write-Debug "This would be the Chocolatey Silent Arguments: $silentArgs"
~~~

**NOTE**: In the above example, `Get-PackageParameters` will already be available because chocolatey-core.extensions is an extension package. Chocolatey automatically loads up PowerShell modules installed as extensions (so you don't need the Import-Module in your chocolateyInstall.ps1 script). See [[Extensions|How-To-Create-Extensions]].

<a name="step-3-alternative---set-up-your-own-parsing"></a>
### Step 3 (alternative) - Set up Your Own Parsing [DEPRECATED]
This _How-To_ focuses on how a package creator can make use of the PackageParameters argument within their package, and how they can parse the string which is passed through into their package from the installation command.

#### Code Sample

~~~powershell

  $arguments = @{}

  # Let's assume that the input string is something like this, and we will use a Regular Expression to parse the values
  # /Port:81 /Edition:LicenseKey /AdditionalTools

  # Now we can use the $env:chocolateyPackageParameters inside the Chocolatey package
  $packageParameters = $env:chocolateyPackageParameters

  # Default the values
  $port = "81"
  $edition = "LicenseKey"
  $additionalTools = $false
  $installationPath = "c:\temp"

  # Now parse the packageParameters using good old regular expression
  if ($packageParameters) {
      $match_pattern = "\/(?<option>([a-zA-Z]+)):(?<value>([`"'])?([a-zA-Z0-9- _\\:\.]+)([`"'])?)|\/(?<option>([a-zA-Z]+))"
      $option_name = 'option'
      $value_name = 'value'

      if ($packageParameters -match $match_pattern ){
          $results = $packageParameters | Select-String $match_pattern -AllMatches
          $results.matches | % {
            $arguments.Add(
                $_.Groups[$option_name].Value.Trim(),
                $_.Groups[$value_name].Value.Trim())
        }
      }
      else
      {
          Throw "Package Parameters were found but were invalid (REGEX Failure)"
      }

      if ($arguments.ContainsKey("Port")) {
          Write-Host "Port Argument Found"
          $port = $arguments["Port"]
      }

      if ($arguments.ContainsKey("Edition")) {
          Write-Host "Edition Argument Found"
          $edition = $arguments["Edition"]
      }

      if ($arguments.ContainsKey("AdditionalTools")) {
          Write-Host "You want Additional Tools installed"
          $additionalTools = $true
      }

      if ($arguments.ContainsKey("InstallationPath")) {
          Write-Host "You want to use a custom Installation Path"
          $installationPath = $arguments["InstallationPath"]
      }
  } else {
      Write-Debug "No Package Parameters Passed in"
  }

  $silentArgs = "/S /Port:" + $port + " /Edition:" + $edition + " /InstallationPath:" + $installationPath
  if ($additionalTools) { $silentArgs += " /Additionaltools" }

  Write-Debug "This would be the Chocolatey Silent Arguments: $silentArgs"
~~~

## Review Set Parameters

We've set up package parameters now for a package and have added information for consumers to know what is offered.

The code samples above assume that there will be no PackageParameters passed into it by default and have set sensible defaults for the values. In this case, the `port`, the `edition`, the `additionalTools` and the `installationPath`.

Once that is done, assuming that the PackageParameters contains "something", use a Regular Expression to parse each of the values into a dictionary.  Here, we are assuming that the package parameters will come through in a pre-defined format, such as `/Port:82 /Edition:LicenseKey1 /AdditionalTools /InstallationPath:'C:\temp\folder with spaces'` (note how you values with spaces is highly determined by your shell - cmd.exe and powershell.exe do it differently - see [[options with spaces|CommandsReference#how-to-pass-options--switches]].  Now, this format can be anything you want it to be.  What is shown here is just **one** way of doing it.  If you need to deviate from this sample structure, it is likely that you will need to update the regular expression to account for this.

Having collected all the arguments into the dictionary, we can then inspect the values of each parameter that we are interested in.  If it exists in the dictionary, replace the corresponding default value, otherwise, continue to use the default value.

## Installing With Package Parameters

Typically this is handled in the following way:

~~~sh
choco install <packageName> --params "'/key:value key2:value'"
~~~

**NOTE**: `<packageName>` is synonymous with the value you put in the nuspec `<id />` field. It is NEVER `name.version.nupkg` or `name.nuspec`. If you are testing a package locally, always use `choco install <pkgid> -d -s .`. That is a literal `-s .` (set source to local folder where the compiled nupkg is located), unless you have a dependency on another package, then use `-s "'.;other feeds here'"` - when you override the source (`--source` or `-s`), it means use ONLY this source for resolving packages.

Now, in this example, if we were to call:

`choco install <packageName> -d`

The output would be:

~~~sh
This would be the Chocolatey Silent Arguments: /S /Port:81 /Edition:LicenseKey /InstallationPath:c:\temp
~~~

**NOTE**: If you have a prerelease (has a `-` in the version value e.g. `1.0.0-beta1`), make sure you add `--pre` to the install/upgrade arguments.

i.e. it is using the default values which we made at the top of the file

However, if we instead used:

~~~sh
# See NOTE below, shell affects the way to pass args when you need to include quotes
choco install <packageName> -d --package-parameters '/Port:82 /Edition:LicenseKey1 /InstallationPath:""C:\temp\folder with space"" /AdditionalTools'
~~~

**NOTE:** How you pass options with spaces varies with shell (cmd.exe vs powershell.exe) and other related information with choco options is important to keep in mind here. See [[how to pass options/switches|CommandsReference#how-to-pass-options--switches]].

The output would be:

~~~
This would be the Chocolatey Silent Arguments: /S /Port:82 /Edition:LicenseKey1 /InstallationPath:"C:\temp\folder with space" /Additionaltools
~~~
