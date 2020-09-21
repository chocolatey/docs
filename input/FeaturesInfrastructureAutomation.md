# Configuration Management Integration  (Free / Open Source)

Chocolatey integrates with several infrastructure automation tools!

With most of these tools, the interface you would interact with Chocolatey would be through the tool or through the interfaces of the tool, like in scripts.

<!--remove <div id="RightNav"> remove-->
<!-- TOC depthTo:2 -->

- [Summary](#summary)
- [Ansible](#ansible)
- [Boxstarter](#boxstarter)
- [Chef](#chef)
- [Octopus Deploy](#octopus-deploy)
- [Otter](#otter)
- [PowerShell DSC](#powershell-dsc)
- [PowerShell PackageManagement](#powershell-packagemanagement)
- [PSDeploy](#psdeploy)
- [Puppet](#puppet)
- [Saltstack](#saltstack)
- [System Center Configuration Manager](#system-center-configuration-manager)

<!-- /TOC -->
<!--remove </div> remove-->

## Summary

### Chocolatey Integration Implementation with Common Configuration Managers
For common integrations, it's handy to refer to the table below to know what configuration manager to choose. Most of the implementations below are written and managed by the companies behind the product. These implementations are typically open source and each part could be added by community contributions for those familiar with the code implementations. If you are unable to provide code implementations for adding necessary functionality to the integrations, we find it best if you create issues/tickets with those organizations if you are a customer as you will have more leverage into getting them implemented. **NOTE**: If you are a configuration manager company identified in the table and you have implemented anything in the below or you find our information is incorrect, please let us know so we can get it fixed.

| Configuration Managers                   | [Ansible][ansible_main] | [Chef][chef_main]  | [PowerShell DSC][dsc_main] | [Puppet][pp_main] | [Salt][salt_main] | [Otter][otter_main] |
|------------------------------------------|-------------------------|--------------------|----------------------------|-------------------|-------------------|---------------------|
| Manage Packages                          | [x][ansible_main]       | [x][chef_main]     | [x][dsc_pkgs]              | [x][pp_pkgs]      | [x][salt_pkgs]    | [x][otter_pkgs]     |
| [Install Chocolatey](Installation)       | [x][ansible_main]       | [x][chef_cookbook] | [x][dsc_install]           | [x][pp_install]   | [x][salt_install] | [x][otter_install]  |
| Install Chocolatey from internal source  | [x][ansible_main]       | [x][chef_cookbook] | [x][dsc_install]           | [x][pp_install]   |                   | [x][otter_install]  |
| [Manage Sources](CommandsSource)         | [x][ansible_source]     | [x][chef_source]   | [x][dsc_source]            | [x][pp_source]    | [x][salt_source]  | [x][otter_source]   |
| Manage Source Type (Admin/Self-Service)  | [x][ansible_source]     |                    |                            | [x][pp_source]    |                   |                     |
| [Manage Features](CommandsFeature)       | [x][ansible_feature]    |                    | [x][dsc_feature]           | [x][pp_feature]   |                   | [x][otter_feature]  |
| [Manage Config Settings](CommandsConfig) | [x][ansible_config]     | [x][chef_config]   |                            | [x][pp_config]    |                   |                     |

**NOTE: Each *x* is linked to the specific feature documentation.**

For most of these, those configuration managers have some sort of exec you could use to manage those additional aspects, but it would be best if they supported all aspects of configuration of Chocolatey as part of the provider implementations.

[ansible_main]:https://docs.ansible.com/ansible/latest/modules/win_chocolatey_module.html
[ansible_source]: https://docs.ansible.com/ansible/latest/modules/win_chocolatey_source_module.html
[ansible_feature]:https://docs.ansible.com/ansible/latest/modules/win_chocolatey_feature_module.html
[ansible_config]:https://docs.ansible.com/ansible/latest/modules/win_chocolatey_config_module.html

[chef_main]:https://docs.chef.io/resource_chocolatey_package.html
[chef_cookbook]:https://supermarket.chef.io/cookbooks/chocolatey/
[chef_source]:https://docs.chef.io/resource_chocolatey_source.html
[chef_config]:https://docs.chef.io/resource_chocolatey_config.html

[dsc_main]:https://www.powershellgallery.com/packages/cChoco
[dsc_pkgs]:https://github.com/chocolatey/cChoco/blob/development/DSCResources/cChocoPackageInstall/cChocoPackageInstall.schema.mof
[dsc_install]:https://github.com/chocolatey/cChoco/blob/development/DSCResources/cChocoInstaller/cChocoInstaller.schema.mof
[dsc_source]:https://github.com/chocolatey/cChoco/blob/development/DSCResources/cChocoSource/cChocoSource.schema.mof
[dsc_feature]:https://github.com/chocolatey/cChoco/blob/master/DSCResources/cChocoFeature/cChocoFeature.schema.mof

[pp_main]:https://forge.puppet.com/puppetlabs/chocolatey
[pp_pkgs]:https://forge.puppet.com/puppetlabs/chocolatey#package-provider-chocolatey
[pp_install]:https://forge.puppet.com/puppetlabs/chocolatey#class-chocolatey
[pp_source]:https://forge.puppet.com/puppetlabs/chocolatey#chocolateysource
[pp_feature]:https://forge.puppet.com/puppetlabs/chocolatey#chocolateyfeature
[pp_config]:https://forge.puppet.com/puppetlabs/chocolatey#chocolateyconfig

[salt_main]:https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.chocolatey.html
[salt_pkgs]:https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.chocolatey.html#salt.modules.chocolatey.install
[salt_install]:https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.chocolatey.html#salt.modules.chocolatey.bootstrap
[salt_source]:https://docs.saltstack.com/en/latest/ref/modules/all/salt.modules.chocolatey.html#salt.modules.chocolatey.add_source

[otter_main]:https://inedo.com/den/inedox/chocolatey
[otter_pkgs]:https://github.com/Inedo/inedox-chocolatey/blob/master/Chocolatey/InedoExtension/Configurations/ChocolateyPackageConfiguration.cs
[otter_install]:https://github.com/Inedo/inedox-chocolatey/blob/master/Chocolatey/InedoExtension/Configurations/ChocolateyInstalledConfiguration.cs
[otter_source]:https://github.com/Inedo/inedox-chocolatey/blob/master/Chocolatey/InedoExtension/Configurations/ChocolateySourceConfiguration.cs
[otter_feature]:https://github.com/Inedo/inedox-chocolatey/blob/master/Chocolatey/InedoExtension/Configurations/ChocolateyFeatureConfiguration.cs

## Ansible

Ansible has the `win_chocolatey` module that manages both packages and the installation of Chocolatey itself.

~~~yaml
win_chocolatey:
  name: git
  source: https://my.internal.repository/api/v2/
~~~

[Read More...](https://bit.ly/choco_ansible)

## Boxstarter

Boxstarter is a lightweight configuration management utility.

> Repeatable, **reboot resilient** Windows environment installations made easy using Chocolatey packages. When its time to repave either **bare metal or virtualized instances**, locally or on a **remote machine**, Boxstarter can automate both trivial and highly complex installations. Compatible with all Windows versions from **Windows 7/2008 R2 forward**.

[Read more...](http://boxstarter.org/)

## Chef

Chef 12.7+ has a [built-in](https://www.chef.io/blog/2016/02/12/chef-client-12-7-released/) `chocolatey_package` resource to use with Chocolatey.

~~~ruby
chocolatey_package 'git' do
  action :install
  source 'https://my.internal.repository/api/v2'
end
~~~

[Resource - Read More...](https://docs.chef.io/resource_chocolatey_package.html)

When you need to also install Chocolatey, you would use the community cookbook to do so. The cookbook is maintained by the Chocolatey team. It has a package resource that can be used with older Chef versions.

~~~ruby
include_recipe 'chocolatey'
~~~

[Cookbook - Read More...](https://bit.ly/choco_chef)

### Example

Here's a more in depth example from [Nordstrom](https://github.com/Nordstrom/chefdk_bootstrap/blob/master/recipes/windows.rb):

~~~ruby
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
~~~

Another example from [Facebook](https://github.com/facebook/IT-CPE/tree/master/chef/cookbooks/cpe_choco):

~~~ruby
node.default['cpe_choco']['sources']['bacon'] =
  'source' => 'http://bacon.es.yummy',
}
~~~

## Octopus Deploy

Octopus is a friendly deployment automation tool for .NET developers. It integrates with lots of utilities, and they have a template for installing Chocolatey packages: https://library.octopusdeploy.com/step-template/actiontemplate-chocolatey-install-package

[Read more...](https://octopus.com/)

## Otter

Otter has an [open source Chocolatey extension](https://github.com/Inedo/inedox-chocolatey) that allows installing and uninstalling packages, specifying package versions, chocolatey sources, chocolatey features, and installing chocolatey istelf.

Otter also keeps an inventory of Chocolatey packages installed on any or all servers.

~~~otter
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
~~~

[Read More...](https://inedo.com/den/otter/chocolatey)

## PowerShell DSC

PowerShell DSC (Desired State Configuration) has a cChoco module that can manage both packages and the installation of Chocolatey itself.

~~~powershell
  cChocoInstaller installChoco
  {
    InstallDir = "c:\ProgramData\chocolatey"
  }

  cChocoPackageInstaller installGit
  {
     Name = "git"
     DependsOn = "[cChocoInstaller]installChoco"
  }
~~~

[Read More...](https://bit.ly/choco_dsc)

## PowerShell PackageManagement
**NOTE:** Chocolatey has a prototype provider for the built-in package manager on Windows 10/Windows Server 2016 that was created by Microsoft awhile back. It is not fully functional and it may have security issues. If you want to use Chocolatey with PackageManagement, we recommend using ChocolateyGet, which is a nice bridge until an official one is implemented. No ETA has been defined.

[PowerShell PackageManagement (aka OneGet)](https://github.com/OneGet/oneget) is a package manager ***aggregator*** that depends on the existence of package managers as providers to work, one of which is Chocolatey. For a pretty comprehensive post about what PackageManagement is and what it is not, see the PackageManagement Blog post on [10 things about OneGet that are completely different than you think](https://blogs.technet.microsoft.com/packagemanagement/2015/05/05/10-things-about-oneget-that-are-completely-different-than-you-think/).

## PSDeploy
PSDeploy is a quick and dirty module to simplify PowerShell based deployments.

~~~powershell
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
~~~

[Read More...](http://psdeploy.readthedocs.io/en/latest/Example-Chocolatey-Deployment/)

## Puppet
Puppet has a [Supported module](https://forge.puppet.com/supported) for Chocolatey `puppetlabs/chocolatey`. Note that there is also a `chocolatey/chocolatey` module, the supported module is a drop in replacement for the `chocolatey/chocolatey` module - please use `puppetlabs/chocolatey` as it has full configuration of Chocolatey.

~~~puppet
include chocolatey

package { 'git':
  ensure   => latest,
  provider => 'chocolatey',
  source   => 'https://my.internal.repository/api/v2',
}
~~~~

Puppet has some great documentation on getting started with Chocolatey. Be sure to check that out at [Using Windows modules](https://docs.puppet.com/pe/latest/windows_modules.html).

The Chocolatey team is most familiar with Puppet and has written some documentation for using Puppet with Chocolatey. Please see

* [Install with Puppet](https://chocolatey.org/install#install-with-puppet)
* [Chocolatey Licensed Editions Configuration/Setup with Puppet](Installation-Licensed#set-up-licensed-edition-with-puppet)

**Note:** if anyone would be interested in providing documentation similar to the above for other frameworks, we'd accept it as Pull Requests at https://github.com/chocolatey/choco-wiki.

[Read More...](https://forge.puppet.com/puppetlabs/chocolatey)

## Saltstack

Salt has a Chocolatey module that manages both packages and the installation of Chocolatey itself.

~~~python
salt '*' chocolatey.bootstrap
salt '*' chocolatey.install git
~~~

[Read More...](https://bit.ly/choco_salt)

## System Center Configuration Manager
Chocolatey integrates with SCCM by handling the software management, and pointing to [distribution points](https://technet.microsoft.com/en-us/library/bb680614.aspx) as the source for packages. This allows folks to get packages and larger binaries out to their network without constraints and still take advantage of Chocolatey's fantastic abilities!

To direct Chocolatey package installs, you can still write GPOs to ensure this.

