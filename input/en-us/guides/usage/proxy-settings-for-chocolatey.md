---
Order: 10
xref: proxy-settings
Title: Use Chocolatey w/Proxy Server
Description: Settings up Chocolatey to use locally configured proxy server
RedirectFrom: docs/proxy-settings-for-chocolatey
---

## Installing Chocolatey behind a proxy server

When trying to install Chocolatey behind a proxy server, you may be faced with errors like

> Get Response returned: (407) Proxy Authentication Required

or

> The underlying connection was closed: Could not establish trust relationship for the SSL / TLS secure channel.

Steps to help address this:

1. Copy the [install.ps1](https://community.chocolatey.org/install.ps1) file locally.
2. Open a PowerShell command line.
3. Set the following environment variables - `$env:chocolateyProxyLocation` (with proxyserver:proxyport), `$env:chocolateyProxyUser` (if it is a domain account, ensure you have the appropriate domain prefix for the account, e.g. `AD\UserName` or `UserName`), and `$env:chocolateyProxyPassword` with your password.
4. With that same shell open where the environment variables are set, run the downloaded script to install Chocolatey.

In PowerShell, it looks like this:

~~~powershell
$env:chocolateyProxyLocation = 'https://local/proxy/server'
#$env:chocolateyProxyUser = 'username'
#$env:chocolateyProxyPassword = 'password'
# install script
~~~

> :choco-info: **NOTE**
>
> This will only work with the installation methods that call https://community.chocolatey.org/install.ps1 (or use a similar script, like Puppet/Chef scripts do) as part of the install.

### Troubleshooting Installation

You've tried everything and Chocolatey still won't install from https://community.chocolatey.org -

> The underlying connection was closed: Could not establish trust relationship for the SSL / TLS secure channel.

It could also be that your trusted root certificates are missing or not up to date (Windows 2012 does not install root certificates by default). You will need to download and install the following certificates into your LocalMachine's *Trusted Root Certification Authorities* certificate store.

To access [community.chocolatey.org](https://community.chocolatey.org):
* [Go Daddy Secure Certificate Authority - G2](https://certs.godaddy.com/repository) (File: `gdroot-g2.crt`; Thumbprint: `47BEABC922EAE80E78783462A79F45C254FDE68B`). (On the download page, this certificate is named *GoDaddy Class 2 Certification Authority Root Certificate - G2* and its listed thumbprint (`45140B3247EB9CC8C5B4F0D7B53091F73292089E6E5A63E2749DD3ACA9198EDA`) is wrong.

To access [packages.chocolatey.org](https://packages.chocolatey.org):
* [AddTrust External CA Root](https://support.comodo.com/index.php?/Default/Knowledgebase/Article/View/917/91/) (File: `addtrustexternalcaroot.crt`; Thumbprint: `02FAF3E291435468607857694DF5E45B68851868`)

## System Proxy Settings

Chocolatey by default already supports system set proxy servers

![Two screenshots showing the Internet Explorer settings for System Level Proxy configuration](/assets/images/system-proxy-settings.png)

> :choco-info: **NOTE**
>
> Unfortunately proxy bypass lists may not be available when using this method. We recommend explicit proxy settings.

## Existing Proxy Environment Variables

Starting with Chocolatey v0.10.4, Chocolatey will automatically pick up the following environment variables if they are already set:

* `http_proxy`
* `https_proxy`
* `no_proxy`

## Explicit Proxy Settings

Chocolatey has explicit proxy support starting with 0.9.9.9.

You can simply configure 1 up to 5 settings and Chocolatey will use a proxy server. `proxy` is required and is the location and port of the proxy server. The values for user/password are only used for credentials when both are present.

~~~sh
choco config set --name proxy --value <locationandport>
choco config set --name proxyUser --value <username> #optional
choco config set --name proxyPassword --value <passwordThatGetsEncryptedInFile> # optional
choco config set --name proxyBypassList --value "'<bypasslist, comma separated>'" # optional, Chocolatey v0.10.4 required
choco config set --name proxyBypassOnLocal --value true # optional, Chocolatey v0.10.4 required
~~~~

### Example

Running the following commands in 0.9.9.9:

~~~sh
choco config set --name proxy --value http://localhost:8888
choco config set --name proxyUser --value bob
choco config set --name proxyPassword --value 123Sup#rSecur3
choco config set --name proxyBypassList --value "'http://localhost,http://this.location/'" #0.10.4 required
choco config set --name proxyBypassOnLocal --value true #0.10.4 required
~~~

Results in the following items being added to the config file:

![Shows the encrypted proxy configuration information that is stored in the chocolatey.config file](/assets/images/proxy-config-changes.png)

### Explicit Proxy Settings at Runtime

Starting in 0.10.4, you can pass proxy information at runtime with each command. See https://github.com/chocolatey/choco/issues/1173

`--proxy="'value'" --proxy-user="'<user>'" --proxy-password="'<pwd>'" --proxy-bypass-list="'<comma separated, list>'" --proxy-bypass-on-local`

## What to do if my proxy is socks?

It may just work. It hasn't been validated yet.
