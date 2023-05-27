---
Order: 10
xref: intune-prerequisites
Title: Prerequisites for Intune functionality
---

<?! Include "../../../shared/intune-note.txt" /?>

### Chocolatey Configuration

> :choco-info: **NOTE**
>
> As the Intune commands are in preview, ensure you enable the `allowPreviewFeatures` feature by using the command:
>
> ~~~sh
> choco feature enable --name=allowPreviewFeatures
> ~~~

The Intune commands need to know what your Intune tenant is, and there are two options:

1. Specify the tenant each time you push a package using the `--source` switch;
2. Store the tenant information in the Chocolatey configuration using the command `choco config set --name=intuneTenantGUID --value=<INTUNE TENANT GUID>`. The GUID is available on the [Azure AD Application page](https://aad.portal.azure.com/).

### Chocolatey Packages

To push packages for the first time, you will need all of the Chocolatey products to be in the same directory as the Chocolatey package you want to push. If you don't already have these downloaded, you can download it to the current directory with the command:

<?! Include "../../../shared/intune-download-architect.txt" /?>
<?! Include "../../../shared/intune-download-business.txt" /?>

Additionally, it is recommended to have already installed the Chocolatey packages `intunewinapputil` and `azcopy10` before converting or pushing other Chocolatey packages. If these do not exist, Chocolatey will try to install them from available sources.
