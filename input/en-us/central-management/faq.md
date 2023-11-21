---
Order: 50
xref: ccm-faq
Title: Chocolatey Central Management Frequently Asked Questions
---

## Timezone FAQs

### Why Doesn't Chocolatey Central Management Have My Timezone?

Chocolatey Central Management uses the Windows install of its host to determine if a timezone is valid. If Windows does not know of a timezone, then it will not be made available.

Some examples of timezones that may not appear:

* `Qyzylorda Standard Time` does not appear in Windows Server 2016 until you install Windows Update 5012170 or later.
* `Yukon Standard Time`does not appear in Windows Server 2016 until you install 5031462 or later.
* `South Sudan Standard Time` does not appear in Windows Server 2016 until you install 5031462 or later.

### Why Did I Get a Notification That My Chosen Timezone is Invalid?

Starting in Chocolatey Central Management version 0.12.0, if the chosen timezone is detected to be invalid, we will set it back to the default timezone and alert you through a notification.

![Example notification for a user configured timezone being invalid](/assets/images/ccm/administration/settings/user-timezone-invalid-notification.png)

If you received this notification, then it means that the timezone used for your user account was invalid, and has been set back to the default used by Chocolatey Central Management.

![Example notification for a Chocolatey Central Management configured timezone being invalid](/assets/images/ccm/administration/settings/ccm-timezone-invalid-notification.png)
