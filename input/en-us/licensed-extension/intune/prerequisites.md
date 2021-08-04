---
Order: 161
xref: intune-prerequisites
Title: Prerequisites for Intune functionality
---

<?! Include "../../../shared/intune-note.txt" /?>

### Chocolatey Configuration

> :memo: **NOTE**
>
> As the Intune commands are in preview, ensure you enable the `allowPreviewFeatures` feature by using the command:
>
> ~~~sh
> choco enable --name=allowPreviewFeatures
> ~~~

The Intune commands need to know what your Intune tenant is, and here are two options:

1. Specify the tenant each time you push a package using the `--source` switch;
2. Store the tenant information in the Chocolatey configuration using the command `choco config --name=intuneDefaultTenant --value=<INTUNE TENANT GUID OR FQDN>`.

### Chocolatey Packages

To push packages for the first time, you will need `chocolatey` and `chocolatey.extension` to be in the same directory as the file you want to push. If you don't already have `chocolatey` downloaded, you can download it to the current directory with the command:

~~~sh
choco download chocolatey --internalize
~~~

Additionally, it is recommended to have already installed the packages `intunewinapputil` and `azcopy10` before converting or pushing packages.
If these do not exist, Chocolatey will try to install them from available sources.
