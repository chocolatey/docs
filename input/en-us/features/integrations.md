---
Order: 60
xref: integrations
Title: Integrates with everything
Description: Information on how Chocolatey can integrate with almost every tool
RedirectFrom: docs/features-infrastructure-automation
---

Chocolatey integrates with several infrastructure automation tools!

With most of these tools, the interface you would interact with Chocolatey would be through the tool or through the interfaces of the tool, like in scripts.

## Summary

### Chocolatey Integration Implementation with Common Configuration Managers

<?! Include "../../shared/configuration-managers.txt" /?>

## Ansible

Ansible has the `win_chocolatey` module that manages both packages and the installation of Chocolatey itself.

```yaml
win_chocolatey:
  name: git
  source: https://my.internal.repository/api/v2/
```

[Read More...](https://docs.ansible.com/ansible/latest/collections/chocolatey/chocolatey/win_chocolatey_source_module.html)

## Boxstarter

Boxstarter is a lightweight configuration management utility.

> Repeatable, **reboot resilient** Windows environment installations made easy using Chocolatey packages. When its time to repave either **bare metal or virtualized instances**, locally or on a **remote machine**, Boxstarter can automate both trivial and highly complex installations. Compatible with all Windows versions from **Windows 7/2008 R2 forward**.

[Read more...](http://boxstarter.org/)

## Chef

Chef 12.7+ has a [built-in](https://www.chef.io/blog/2016/02/12/chef-client-12-7-released/) `chocolatey_package` resource to use with Chocolatey.

```ruby
chocolatey_package 'git' do
  action :install
  source 'https://my.internal.repository/api/v2'
end
```

[Resource - Read More...](https://docs.chef.io/resource_chocolatey_package.html)

When you need to also install Chocolatey, you would use the community cookbook to do so. The cookbook is maintained by the Chocolatey team. It has a package resource that can be used with older Chef versions.

```ruby
include_recipe 'chocolatey'
```

[Cookbook - Read More...](https://supermarket.chef.io/cookbooks/chocolatey/)

### Example

Here's a more in depth example from [Nordstrom](https://github.com/Nordstrom/chefdk_bootstrap/blob/master/recipes/windows.rb):

```ruby
include_recipe 'chocolatey'

home = Dir.home
%W(
  #{home}/.chef
  #{home}/chef
  #{home}/chef/cookbooks
).each do |directory|
  directory directory
end

packages = node['chefdk_bootstrap']['package']

packages.each do |pkg, install|
  include_recipe "#{cookbook_name}::#{pkg}" if install
end
```

Another example from [Facebook](https://github.com/facebook/IT-CPE/tree/master/chef/cookbooks/cpe_choco):

```ruby
node.default['cpe_choco']['sources']['bacon'] =
  'source' => 'http://bacon.es.yummy',
}
```

## Octopus Deploy

Octopus is a friendly deployment automation tool for .NET developers. It integrates with lots of utilities, and they have a template for installing Chocolatey packages: https://library.octopusdeploy.com/step-template/actiontemplate-chocolatey-install-package

[Read more...](https://octopus.com/)

## Otter

Otter has an [open source Chocolatey extension](https://github.com/Inedo/inedox-chocolatey) that allows installing and uninstalling packages, specifying package versions, chocolatey sources, chocolatey features, and installing chocolatey itself.

Otter also keeps an inventory of Chocolatey packages installed on any or all servers.

```otter
Chocolatey::Ensure-Package
(
    Name: 7zip.install,
    Version: 18.5,
    Source: https://proget.local/chocolatey
);

Chocolatey::Ensure-Installed
(
    Version: latest,
    Source: https://proget.local/chocolatey
);

Chocolatey::Ensure-Source
(
    Name: Internal,
    Url: https://proget.local/chocolatey,
    Credential: DomainCred
);

Chocolatey::Ensure-Feature
(
    Feature: checksumFiles,
    Enabled: false
);
```

[Read More...](https://inedo.com/den/otter/chocolatey)

## PowerShell DSC

PowerShell DSC (Desired State Configuration) has a cChoco module that can manage both packages and the installation of Chocolatey itself.

```powershell
  cChocoInstaller installChoco
  {
    InstallDir = "c:\ProgramData\chocolatey"
  }

  cChocoPackageInstaller installGit
  {
     Name = "git"
     DependsOn = "[cChocoInstaller]installChoco"
  }
```

[Read More...](http://www.powershellgallery.com/packages/cChoco/)

## PowerShell PackageManagement

> :memo: **NOTE** Chocolatey has a prototype provider for the built-in package manager on Windows 10/Windows Server 2016 that was created by Microsoft awhile back. It is not fully functional and it may have security issues. If you want to use Chocolatey with PackageManagement, we recommend using ChocolateyGet, which is a nice bridge until an official one is implemented. No ETA has been defined.

[PowerShell PackageManagement (aka OneGet)](https://github.com/OneGet/oneget) is a package manager **aggregator** that depends on the existence of package managers as providers to work, one of which is Chocolatey.

## PSDeploy

PSDeploy is a quick and dirty module to simplify PowerShell based deployments.

```powershell
Deploy SingleChocolateyPackage {
    By Chocolatey {
        FromSource 'c:\ChocolateyPackages\examplepackage.0.1.1.nupkg'
        To "http://your-choco-repo.internal.com/"
        WithOptions @{
            ApiKey = 'yourAPIkey'
            Force = $true
        }
    }
}
```

[Read More...](http://psdeploy.readthedocs.io/en/latest/Example-Chocolatey-Deployment/)

## Puppet

Puppet has a [Supported module](https://forge.puppet.com/supported) for Chocolatey `puppetlabs/chocolatey`. Note that there is also a `chocolatey/chocolatey` module, the supported module is a drop in replacement for the `chocolatey/chocolatey` module - please use `puppetlabs/chocolatey` as it has full configuration of Chocolatey.

```puppet
include chocolatey

package { 'git':
  ensure   => latest,
  provider => 'chocolatey',
  source   => 'https://my.internal.repository/api/v2',
}
```

Puppet has some great documentation on getting started with Chocolatey. Be sure to check that out at [Using Windows modules](https://docs.puppet.com/pe/latest/windows_modules.html).

The Chocolatey team is most familiar with Puppet and has written some documentation for using Puppet with Chocolatey. Please see

* [Install with Puppet](https://chocolatey.org/install#install-with-puppet)
* [Chocolatey Licensed Editions Configuration/Setup with Puppet](xref:setup-licensed#set-up-licensed-edition-with-puppet)

> :memo: **NOTE** if anyone would be interested in providing documentation similar to the above for other frameworks, we'd accept it as Pull Requests at https://github.com/chocolatey/docs.

[Read More...](https://forge.puppet.com/puppetlabs/chocolatey)

## Saltstack

Salt has a Chocolatey module that manages both packages and the installation of Chocolatey itself.

```python
salt '*' chocolatey.bootstrap
salt '*' chocolatey.install git
```

[Read More...](https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.chocolatey.html)

## System Center Configuration Manager

Chocolatey integrates with SCCM by handling the software management, and pointing to [distribution points](https://docs.microsoft.com/en-us/mem/configmgr/core/servers/deploy/configure/install-and-configure-distribution-points) as the source for packages. This allows folks to get packages and larger binaries out to their network without constraints and still take advantage of Chocolatey's fantastic abilities!

To direct Chocolatey package installs, you can still write GPOs to ensure this.

## Microsoft Intune

Chocolatey's Intune Integration is only available to our Chocolatey for Business customers. It allows you to take any Chocolatey package and `choco convert` them into an intunewin app. It then allows you to then `choco push` your converted Chocolatey packages to your intune tenant for hosting and distribution.

To get started with the Chocolatey Intune Integration please reference our [setup and use documentation](https://docs.chocolatey.org/en-us/licensed-extension/intune/).
