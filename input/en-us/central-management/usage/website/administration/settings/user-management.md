---
Order: 20
xref: ccm-administration-settings-user-management
Title: User Management
Description: Information about using up user management settings within the Administration Settings screen
---

## LDAP Configuration

> :choco-info: **NOTE**
>
> The Central Management Server must be joined to the Active Directory Domain.

1. Open the CCM Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left hand menu click on `Administration` and then `Settings`.
1. Click on the `User management` tab in the `Settings` screen.
1. Under LDAP Setting click the `Enable LDAP Authentication` button.
1. Fill in your FQDN for the `Domain name` field and the `User name` field with an active directory account that has access to query user accounts within your active directory environment.

    ![CCM LDAP Setup](/assets/images/features/ccm/ccm_ldap_setup.png)

1. Click the `Update LDAP Password` button to open a modal window to allow you to enter/confirm the password that is to be used.

    ![Update LDAP Password](/assets/images/features/ccm/update_ldap_password.png)

1. Click the `Save` button
1. Click the `Save All` button at the top right of the page to save your settings.

> :choco-info: **NOTE**
>
> In order for LDAP authentication to succeed in versions of Central Management 0.3.1 and lower
> an Email Address, Surname, and GivenName must be configured on the properties of the Active Directory user you are
> attempting to use for login. If any of these fields are empty, errors will be encountered when attempting to login
> to the Central Management application.