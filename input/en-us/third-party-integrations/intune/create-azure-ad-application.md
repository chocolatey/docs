---
Order: 10
xref: create-azure-ad-application
Title: Create an Azure AD Application
Description: Information about creating an application in Azure AD for Chocolatey to access the Intune APIs.
---

<?! Include "../../../shared/intune-note.txt" /?>

## Summary

In order to use Chocolatey with Intune integration, you must first create an Azure AD Application that will be used to authenticate with Microsoft Graph API.

The below instructions are based upon Microsoft's information [here](https://docs.microsoft.com/en-us/graph/auth-v2-service).
The instructions and all screenshots are current as of July 2021.

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
1. Search for device expand **DeviceManagementApps** and check off **DeviceManagementApps.ReadWrite.All**.
![Select DeviceManagementApps.ReadWrite.All](/assets/images/intune/select-device-apps-read-write.png)
1. Click Add permissions.
1. Click **Grant admin consent for &lt;tenant&gt;** followed by **Yes** when prompted.
![Grant Admin Consent for your domain](/assets/images/intune/grant-admin-consent.png)

## Create a secret for your Azure AD Application

Once you’ve created your AzureAD Application, you need to generate a secret for it.
The secret is what Chocolatey will use to authenticate with Microsoft Graph and should be protected like any other password.

1. In the Application overview for your Application, select **Certificates & secrets**.
![Certificates & Secrets](/assets/images/intune/certificates-and-secrets.png)
1. Under Client secrets select **New client secret**.
![New client secret](/assets/images/intune/new-client-secret.png)
1. (Optional) Provide a description for this client secret and provide an expiry for the secret.
![Add a client secret](/assets/images/intune/add-client-secret.png)
1. Click Add.
1. Note the Value (it will not be shown again, so be sure to save it or you will need to generate another secret).

## Obtaining and using your AzureAD Application information with Chocolatey

Once you’ve created the AzureAD Application and generated a secret for it, you will want to obtain it and use it with Chocolatey.

1. Log into the **AzureAD Portal** and navigate to the **App registration** page for your application.
1. Here you will find your **Application (client) ID**, and your **Directory (tenant) ID**.
![Finding Application and Directory IDs](/assets/images/intune/get-app-information.png)
1. The **Application ID** is the value used when we talk about **client id**.
1. The **Directory ID** is the value used when we talk about **tenant id**. The Directory ID can be used as (note we recommend using the GUID for simplicity):
  * A GUID, shown on this page, or 
  * Your Microsoft Azure tenant (e.g. mytesttenant.onmicrosoft.com), or 
  * Your FQDN if it’s configured in Azure (e.g. mytesttenant.com). 
1. The **Secret** is the value used when we talk about **client secret**.
