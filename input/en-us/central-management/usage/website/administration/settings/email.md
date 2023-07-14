---
Order: 40
xref: ccm-administration-settings-email
Title: Email (SMTP)
Description: Information about using up email settings within the Administration Settings screen
---

The CCM Site needs to be able to send email for certain actions.  For example, when a new user is registering with the system, or when sending out forgotten password emails.  Valid SMTP Configuration has to be provided in order for these emails to be sent out.  Follow these steps to configure SMTP for CCM.

1. Open the CCM Site in the browser
1. Login with the `ccmadmin` user
1. In the left hand menu click on `Administration` and then `Settings`
1. Click on the `Email (SMTP)` tab in the `Settings` screen

    ![Chocolatey Central Management Email Settings](/assets/images/ccm/setup/email/ccm-email-settings.png)

1. Add the SMTP settings for your environment.  If you uncheck the `Use default credentials` checkbox, you will need to provide the `Domain name`, `User name` and `SMTP Password` for a user that is permitted to send email via the system that is being used.
1. Click the `Save All` button to save changes
1. Change the email address to go to your email address
1. Click the `Send Test Email` button and ensure that an email is received correctly

You should received a notification similar to this:

![Test email sent successfully](/assets/images/features/ccm/test_email_sent_correctly.png)

> :choco-warning: **WARNING**
>
> If you leave either the `Default from (sender) email address` or `Default from (sender) display name` with their default values, you will see an error when an email is attempted to be sent via the system.