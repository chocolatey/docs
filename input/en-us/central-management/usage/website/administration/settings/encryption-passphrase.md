---
Order: 70
xref: ccm-encryption-passphrase
Title: Encryption Passphrase
Description: Information on the Encryption Passphrase within Chocolatey Central Management
RedirectFrom: en-us/central-management/usage/website/encryption-passphrase
---

Starting in Chocolatey Central Management 0.7.0 we are providing the ability to control the passphrase that is used when encrypting both secret values and certain requests that happen between the website and the service.

The encryption passphrase can be changed in Chocolatey Central Management by accessing the `Administrator -> Settings` section and selecting the `Security` tab. The settings for the encryption passphrase will only be visible to users who are a member of the CCM Administrator role.

> :choco-danger: **IMPORTANT**
>
> We recommend this passphrase is set as soon as possible. However, a user who is a member of the CCM Administrator role will be able to defer this for 4 logins. On the 5th login they will be restricted to only being able to set the passphrase.

> :choco-warning: **WARNING**
>
> Changing the encryption passphrase will invalidate the links in Email Activation and Password Resets emails sent out prior to the change. The user clicking on the invalid link will be notified of this, and will be requested to enter their information again to have a new email sent.

## Set the encryption passphrase for the first time { #set-the-encryption-passphrase-for-the-first-time }

> :choco-warning: **WARNING**
>
> Once the passphrase has been changed and saved, there will be a short delay while both the website and the API are updated. During that time they will be unavailable for any other use and browsing the website or calling the API may result in a `500 - Internal Server Error` response.

1. Navigate to the `Administrator -> Settings` section of Central Management, and click on the `Security` tab to show the location that a new passphrase can be set (_New `CCM Admin` Logins will be redirected to this location_).

   ![Chocolatey Central Management Settings, encryption passphrase location](/assets/images/ccm/encryption-passphrase/ccm-admin-encryption-location.png)

2. Enter the passphrase to use in the box labeled `New Passphrase`.

   > :choco-info: **NOTE**
   >
   > The new passphrase must meet the following requirements:
   >
   > 1. A length equal to, or higher than, 5 characters.
   > 2. At least 1 lowercase character (`a-z`).
   > 3. At least 1 uppercase character (`A-Z`).
   > 4. At least 1 digit (`0-9`).
   > 5. At least 1 alpha numeric character.
3. Enter the same passphrase in the box labeled `Confirm New Passphrase`.

   > :choco-warning: **WARNING**
   >
   > Make sure to save the passphrase in a secure location as it will be needed if there is a need to change it again in the future.
   > Chocolatey Software, Inc. will not be responsible for any misplaced passphrases or restoring the database if the passphrase has been forgotten or lost.
4. Save the changes using the `Save all` button located at the top of the page.

   > :choco-warning: **WARNING**
   >
   > This will take between 5 and 10 seconds but could take more depending on performance.
   > During this time it is not recommended to navigate to any other pages or make any API calls as they may result in an error.
   > A dialog to refresh the page will be displayed once the changes have completed.
5. Users following links for email activation or password resets will need to re-enter their information to have a new email sent.

   ![Chocolatey Central Management, invalid Forgot Password link ](/assets/images/ccm/encryption-passphrase/ccm-reset-password-link-invalid.png)
   ![Chocolatey Central Management, invalid Email Activation link](/assets/images/ccm/encryption-passphrase/ccm-email-activation-link-invalid.png)

## Update the encryption passphrase

The same procedure can be followed as was detailed in the [`Set the encryption passphrase for the first time`](#set-the-encryption-passphrase-for-the-first-time) section above.
The only difference is that the current passphrase, as well as the new passphrase, will have to be entered.

## Additional warnings that may be seen

We have added a number of warnings to help highlight that changes need to be made, where and by whom. Please see these screenshots below.

- Before a user is logged in, they will see a warning on the login screen confirming that additional changes need to be made by a user who is a member of the CCM Administrator role.

  ![Chocolatey Central Management Login warning, pointing out changes are needed](/assets/images/ccm/encryption-passphrase/ccm-login-warning.png)
- If a user is logged in, but is not in the CCM Administrator role, the same warning is displayed to the user.

  ![Chocolatey Central Management Dashboard warning for normal users](/assets/images/ccm/encryption-passphrase/ccm-normal-user-warning.png)
- A user that is a member of the CCM Administrator role, will be redirected to set the encryption passphrase, when they log in.

  ![Chocolatey Central Management Settings, encryption passphrase location](/assets/images/ccm/encryption-passphrase/ccm-admin-encryption-location.png)

- A user that is a member of the CCM Administrator role, will be able to navigate to other sections of Chocolatey Central Management when they have not set the encryption passphrase and have logged in less than 5 times.

  ![Chocolatey Central Management Dashboard warning on Administrators](/assets/images/ccm/encryption-passphrase/ccm-admin-user-warning.png)

- On the 5th and subsequent logins, a user who is a member of the CCM Administrator role will be redirected to set the encryption passphrase and will not be able to navigate to other sections of Chocolatey Central Management until the passphrase has been set.
  > :choco-info: **NOTE**
  >
  > A user who is not a member of the CCM Administrators role will still be available to use Chocolatey Central Management website and API, as normal .

  ![Chocolatey Central Management Settings, encryption passphrase required](/assets/images/ccm/encryption-passphrase/ccm-admin-encryption-required.png)

## FAQ

### What is the encryption passphrase?

The encryption passphrase is the password (along with a salt value) that will be used to encrypt sensitive settings in the database, as well as links in Password Reset and Email Activation emails.

### What items are encrypted using the passphrase?

The following items are encrypted using the passphrase:

- [`Sensitive Variables`](xref:ccm-administration-sensitive-variables).
- SMTP and LDAP passwords.
- Links used in Email Activation and Password Reset emails.
There are also some of the requests used when browsing the web site, and making API requests that also encrypt/decrypt values using the same passphrase.

### Why do I need to set a passphrase?

We have enhanced the security of fields stored in the database to use encryption that requires a unique passphrase that you control and can change if/when needed. This allows you to ensure the encryption passphrase is always secure, regularly updated and meets the standards of your organization.
