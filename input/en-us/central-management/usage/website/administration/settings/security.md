---
Order: 30
xref: ccm-administration-settings-security
Title: Security
Description: Information about using up security settings within the Administration Settings screen
---

## Two Factor Login

> :choco-info: **NOTE**
>
> This feature is available in Chocolatey Central Management starting with version 0.10.0.

By default, Two Factor Login is disabled in Chocolatey Central Management.

If you want to change these settings, follow these steps:

1. Open the CCM Site in the browser.
1. Login with the `ccmadmin` user.
1. In the left hand menu click on `Administration` and then `Settings`.
1. Click on the `Security` tab
1. Either enable, or disable, the `Enable two factor user login` checkbox as required.

    ![Chocolatey Central Management Security Two Factor Login Settings](/assets/images/ccm/setup/security/ccm-security-2fa-settings.png)

1. If enabled, choose whether to `Enable email verification` and `Allow to remember browser. If you allow this, users can select to remember browser to skip second time two factor login for the same browser.`
1. Click the `Save All` button at the top right of the page to save your settings.

> :choco-info: **NOTE**
>
> If you disable the `Enable email verification` option, this is the same as disabling all two factor login. In future versions of Chocolatey Central Management, there will be additional methods of verification on top of only email, this is why there is a checkbox for it currently.

Once enabled, any user logging into the Chocolatey Central Management website will be presented with this screen, where they will have the allotted time to enter the security code which will have been sent to the email address associated with their account.

![Verify Security Code](/assets/images/ccm/setup/security/verify-security-code.png)

The `Remember this browser` checkbox is what can be enabled/disabled in step 6 above.  If the user chooses to enable this setting, a cookie will be created and stored in the browser, meaning that they will not be promoted for a two factor login security code on this browser again.