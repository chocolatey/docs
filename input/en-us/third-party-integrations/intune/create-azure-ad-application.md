---
Order: 10
xref: create-azure-ad-application
Title: Create an Azure AD Application
Description: Information about creating an application in Azure AD for Chocolatey to access the Intune APIs
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

To allow Chocolatey to access the Intune tenant and work with packages, a user with the Global Administrator or Privileged Role Administrator permissions must create an Azure AD Application in your Azure tenant. See the [Microsoft Graph API documentation](https://docs.microsoft.com/en-us/graph/auth-v2-service) for further information.

_The steps and screenshots below are current as of July 2021._

## Create Azure AD Application

1. Log into [AzureAD Portal](https://aad.portal.azure.com/).
1. Navigate to **App registrations** in Azure Active Directory.
![AzureAD Application Registration position](/assets/images/intune/app-registration.png)
1. Click **New Registration**.
![New Registration](/assets/images/intune/new-registration.png)
1. Provide a name for your application and leave the rest of the fields blank/default.
1. Click **Register**.
1. Select **API permissions** from the menu on the left.
![API Permissions](/assets/images/intune/api-permissions.png)
1. Click the three dots for the menu on **User.Read**, choose **Remove Permissions**, and confirm you want to remove the permissions.
![Remove Existing Permissions](/assets/images/intune/remove-existing-permissions.png)
1. Click **Add a permission**.
1. Select **Microsoft Graph**.
![Select Microsoft Graph](/assets/images/intune/select-graph.png)
1. Select **Application permissions**.
![Select Application Permissions](/assets/images/intune/select-application-permissions.png)
1. Search for device and expand **DeviceManagementApps** and check off **DeviceManagementApps.ReadWrite.All**.

![Select DeviceManagementApps.ReadWrite.All](/assets/images/intune/select-device-apps-read-write.png)
1. Click **Add permissions**.
1. Click **Grant admin consent for &lt;tenant&gt;** followed by **Yes** when prompted.
![Grant Admin Consent for your domain](/assets/images/intune/grant-admin-consent.png)

## Create a secret for your Azure AD Application

> :choco-warning: **WARNING**
>
> It's important to note down the secret generated below as you cannot retrieve it again. If you forget the secret you will need to generate another one.

Once you’ve created your AzureAD Application, you need to generate a secret for it. The secret is what Chocolatey will use to authenticate with the Microsoft Graph API and should be protected like any other password.

1. In the Application overview for your Application, select **Certificates & secrets**.
![Certificates & Secrets](/assets/images/intune/certificates-and-secrets.png)
1. Under **Client secrets** select **New client secret**.
![New client secret](/assets/images/intune/new-client-secret.png)
1. (Optional) Provide a description and expiry date for the client secret.
![Add a client secret](/assets/images/intune/add-client-secret.png)
1. Click **Add**.
1. Note the **Value** down (_it will not be shown again, so be sure to save it or you will need to generate another secret_).

## Obtaining and using your AzureAD Application information with Chocolatey

Once you’ve created both the AzureAD Application and the secret, you will want to obtain the registration information to use it with Chocolatey. Complete the folllowing steps to do so:


1. Log into the **AzureAD Portal** and navigate to the **App registration** page for your application.
1. Here you will find your **Application (client) ID**, and your **Directory (tenant) ID**.
![Finding Application and Directory IDs](/assets/images/intune/get-app-information.png)
1. The **Application ID** is the value used when we talk about **TENANT CLIENT ID**.
1. The **Directory ID** is the GUID value used when we talk about **INTUNE TENANT GUID**.
1. The **Secret** is the value used when we talk about **TENANT CLIENT SECRET**.
