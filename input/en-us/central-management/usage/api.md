---
Order: 60
xref: ccm-api
Title: API
Description: Information on using the CCM API
RedirectFrom: docs/central-management-api
---

## Description

As of CCM v0.4.0, the API for Chocolatey Central Management is exposed via Swagger.
The API documentation and examples can be reached from your CCM dashboard by selecting the :gear: **API** option on the left sidebar.
The information contained there is referenced here, but you can additionally try out the various API endpoints directly from the Swagger API page for your own CCM environment.

## ChocoCCM

The [ChocoCCM](xref:chococcm) PowerShell module is available from the PowerShell Gallery for use with CCM v0.4.0 and later.
This module contains PowerShell commands designed for interfacing with the CCM API directly.

See the [ChocoCCM Function Reference](xref:chococcm-functions) page for a full list of commands and their associated documentation.

## Authentication

Before being able to utilise the CCM API, you will need to create an authenticated session.
This can be done by targeting the `/Account/Login` endpoint and submitting the username and password.
You will need to use the authenticated session variable for any API calls.

```powershell
# Replace 'chocoserver' with the hostname of your CCM server in your environment
$CcmServerHostname = 'chocoserver'
$Credential = Get-Credential
$body = @{
    usernameOrEmailAddress = $Credential.UserName
    password = $Credential.GetNetworkCredential().Password
}
$Result = Invoke-WebRequest -Uri "https://$CcmServerHostname/Account/Login" -Method POST -ContentType 'application/x-www-form-urlencoded' -Body $body -SessionVariable Session -ErrorAction Stop
```

While authenticated, you can target API endpoints like this:

```powershell
# The $Session variable name must match the string given to -SessionVariable when authenticating.
Invoke-WebRequest -Uri "https://$CcmServerHostname/$endpointUrl" -Method $Method -Body $Parameters -Session $Session
```

## Endpoints

Below is a list of the API endpoints available for CCM as of v0.4.0.
For more detailed information on the API endpoints and their parameters for your version of CCM, select the :gear: **API** option from the sidebar on the Central Management dashboard, or navigate to `https://CCM_SERVER_HOSTNAME/swagger/`.

### AuditLog

| Method | EndpointUrl                             |
| :----: | :-------------------------------------- |
|  GET   | /api/services/app/AuditLog/GetAuditLogs |

### ComputerGroup

| Method | EndpointUrl                                        |
| :----: | :------------------------------------------------- |
|  GET   | /api/services/app/ComputerGroup/GetAllByComputerId |
|  GET   | /api/services/app/ComputerGroup/GetAllByGroupId    |
|  POST  | /api/services/app/ComputerGroup/CreateOrEdit       |
| DELETE | /api/services/app/ComputerGroup/Delete             |

### Computers

| Method | EndpointUrl                                                  |
| :----: | :----------------------------------------------------------- |
|  GET   | /api/services/app/Computers/GetComputerCount                 |
|  GET   | /api/services/app/Computers/GetAllPaged                      |
|  GET   | /api/services/app/Computers/GetAll                           |
|  GET   | /api/services/app/Computers/GetComputerForView               |
|  GET   | /api/services/app/Computers/GetComputerForEditByComputerGuid |
|  GET   | /api/services/app/Computers/GetComputerForEdit               |
| DELETE | /api/services/app/Computers/Delete                           |

### ComputerSoftware

Methods for querying or managing mappings between Computer objects and Software entries

| Method | EndpointUrl                                                |
| :----: | :--------------------------------------------------------- |
|  GET   | /api/services/app/ComputerSoftware/GetAllByComputerId      |
|  GET   | /api/services/app/ComputerSoftware/GetAllPagedByComputerId |
|  GET   | /api/services/app/ComputerSoftware/GetAllBySoftwareId      |
|  GET   | /api/services/app/ComputerSoftware/GetAllPagedBySoftwareId |

### DeploymentPlans

| Method | EndpointUrl                                                                  |
| :----: | :--------------------------------------------------------------------------- |
|  GET   | /api/services/app/DeploymentPlans/GetAllPaged                                |
|  GET   | /api/services/app/DeploymentPlans/GetAll                                     |
|  GET   | /api/services/app/DeploymentPlans/GetDeploymentPlanForView                   |
|  GET   | /api/services/app/DeploymentPlans/GetAllScheduledDeploymentPlansReadyToStart |
|  GET   | /api/services/app/DeploymentPlans/GetDeploymentPlanForEdit                   |
|  POST  | /api/services/app/DeploymentPlans/CreateOrEdit                               |
| DELETE | /api/services/app/DeploymentPlans/Delete                                     |
|  POST  | /api/services/app/DeploymentPlans/Archive                                    |
|  POST  | /api/services/app/DeploymentPlans/Start                                      |
|  POST  | /api/services/app/DeploymentPlans/Cancel                                     |
|  POST  | /api/services/app/DeploymentPlans/MoveToReady                                |

### DeploymentStepComputers

| Method | EndpointUrl                                                                           |
| :----: | :------------------------------------------------------------------------------------ |
|  GET   | /api/services/app/DeploymentStepComputers/GetAllPagedByDeploymentStepId               |
|  GET   | /api/services/app/DeploymentStepComputers/GetAllByDeploymentStepId                    |
|  GET   | /api/services/app/DeploymentStepComputers/GetDeploymentStepComputerForView            |
|  GET   | /api/services/app/DeploymentStepComputers/GetDeploymentStepComputerForEdit            |
|  GET   | /api/services/app/DeploymentStepComputers/GetReadyDeploymentStepComputerByMachineGuid |
|  GET   | /api/services/app/DeploymentStepComputers/GetUnreachableDeploymentStepComputers       |
|  GET   | /api/services/app/DeploymentStepComputers/GetStaleActiveDeploymentStepComputers       |
|  POST  | /api/services/app/DeploymentStepComputers/CreateOrEdit                                |
| DELETE | /api/services/app/DeploymentStepComputers/Delete                                      |
|  GET   | /api/services/app/DeploymentStepComputers/GetDeploymentStepDetailsToZip               |

### DeploymentStepGroups

| Method | EndpointUrl                                                          |
| :----: | :------------------------------------------------------------------- |
|  GET   | /api/services/app/DeploymentStepGroups/GetDeploymentStepGroupForView |
|  GET   | /api/services/app/DeploymentStepGroups/GetDeploymentStepGroupForEdit |
|  POST  | /api/services/app/DeploymentStepGroups/CreateOrEdit                  |
| DELETE | /api/services/app/DeploymentStepGroups/Delete                        |

### DeploymentSteps

| Method | EndpointUrl                                                     |
| :----: | :-------------------------------------------------------------- |
|  GET   | /api/services/app/DeploymentSteps/GetAllPagedByDeploymentPlanId |
|  GET   | /api/services/app/DeploymentSteps/GetAllByDeploymentPlanId      |
|  GET   | /api/services/app/DeploymentSteps/GetDeploymentStepForView      |
|  GET   | /api/services/app/DeploymentSteps/GetDeploymentStepForEdit      |
|  POST  | /api/services/app/DeploymentSteps/CreateOrEdit                  |
|  POST  | /api/services/app/DeploymentSteps/CreateOrEditPrivileged        |
| DELETE | /api/services/app/DeploymentSteps/Delete                        |
| DELETE | /api/services/app/DeploymentSteps/DeletePrivileged              |

### Groups

| Method | EndpointUrl                              |
| :----: | :--------------------------------------- |
|  GET   | /api/services/app/Groups/GetAllPaged     |
|  GET   | /api/services/app/Groups/GetAll          |
|  GET   | /api/services/app/Groups/GetGroupForEdit |
|  POST  | /api/services/app/Groups/CreateOrEdit    |
| DELETE | /api/services/app/Groups/Delete          |

### OutdatedReports

| Method | EndpointUrl                                        |
| :----: | :------------------------------------------------- |
|  GET   | /api/services/app/OutdatedReports/GetAllPaged      |
|  GET   | /api/services/app/OutdatedReports/GetAll           |
|  GET   | /api/services/app/OutdatedReports/GetAllByReportId |
|  POST  | /api/services/app/OutdatedReports/Create           |
| DELETE | /api/services/app/OutdatedReports/Delete           |

### Permission

| Method | EndpointUrl                                    |
| :----: | :--------------------------------------------- |
|  GET   | /api/services/app/Permission/GetAllPermissions |

### Role

| Method | EndpointUrl                               |
| :----: | :---------------------------------------- |
|  GET   | /api/services/app/Role/GetRoles           |
|  GET   | /api/services/app/Role/GetRoleForEdit     |
|  POST  | /api/services/app/Role/CreateOrUpdateRole |
| DELETE | /api/services/app/Role/DeleteRole         |

### Software

| Method | EndpointUrl                                                        |
| :----: | :----------------------------------------------------------------- |
|  GET   | /api/services/app/Software/GetAll                                  |
|  GET   | /api/services/app/Software/GetAllCurrentlyInstalled                |
|  GET   | /api/services/app/Software/GetAllWithoutFilter                     |
|  GET   | /api/services/app/Software/GetSoftwareByPackageId                  |
|  GET   | /api/services/app/Software/GetSoftwareByPackageIdAndVersion        |
|  GET   | /api/services/app/Software/GetSoftwareForView                      |
|  GET   | /api/services/app/Software/GetSoftwareForEdit                      |
|  GET   | /api/services/app/Software/GetSoftwareForEditByPackageIdAndVersion |

### TokenAuth

| Method | EndpointUrl                                       |
| :----: | :------------------------------------------------ |
|  POST  | /api/TokenAuth/Authenticate                       |
|  POST  | /api/TokenAuth/RefreshToken                       |
|  GET   | /api/TokenAuth/LogOut                             |
|  POST  | /api/TokenAuth/SendTwoFactorAuthCode              |
|  POST  | /api/TokenAuth/ImpersonatedAuthenticate           |
|  POST  | /api/TokenAuth/LinkedAccountAuthenticate          |
|  GET   | /api/TokenAuth/GetExternalAuthenticationProviders |
|  POST  | /api/TokenAuth/ExternalAuthenticate               |
|  GET   | /api/TokenAuth/TestNotification                   |

### WebLog

| Method | EndpointUrl                               |
| :----: | :---------------------------------------- |
|  GET   | /api/services/app/WebLog/GetLatestWebLogs |
|  POST  | /api/services/app/WebLog/DownloadWebLogs  |

## Examples

### Creating An _All Computers_ Group and Deploy Application Upgrades

From a completely fresh CCM instance with at least one computer checking into Central Management, this process will:

- Create a new group containing all the computers currently registered to Central Management.
- Create a new deployment with a single step, which will upgrade all Chocolatey-managed applications to the latest available versions.
- Start the deployment.

The process involves a couple of intermediary steps as well, since we're using the raw REST API endpoints here (see below).
We're also assuming as part of this example that you've already [Authenticated to the CCM API](#authentication) and have a `$Session` variable created as in that example.

#### 1. Get All CCM-Managed Computers

```powershell
$CcmServerHostname = 'chocoserver'
$params = @{
    Uri        = "https://$CCmServerHostname/api/services/app/Computers/GetAll"
    Method     = 'GET'
    WebSession = $Session
}
$ComputerList = Invoke-RestMethod @params
```

#### 2. Create an _All Computers_ Group

```powershell
# Create group in CCM
$GroupName = 'All Clients'
$Params = @{
    Uri         = "https://$CcmServerHostname/api/services/app/Groups/CreateOrEdit"
    Method      = 'POST'
    WebSession  = $Session
    ContentType = 'application/json'
    Body        = @{
        name        = $GroupName
        description = 'All CCM client machines'
        groups      = @()
        computers   = @(
            $ComputerList.result | Select-Object -Property @{ Name = 'computerId'; Expression = { "$($_.id)" } }
        )
    } | ConvertTo-Json
}
$null = Invoke-RestMethod @params

# Retrieve created group information
$params = @{
    Uri        = "https://$CcmServerHostname/api/services/app/Groups/GetAll"
    Method     = "GET"
    WebSession = $Session
}
$Group = Invoke-RestMethod @params |
    Select-Object -ExpandProperty result |
    Where-Object Name -EQ $GroupName
```

#### 3. Create a New Deployment

```powershell
$params = @{
    Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/CreateOrEdit"
    Method      = "POST"
    WebSession  = $Session
    ContentType = 'application/json'
    Body        = @{ name = "Upgrade Chocolatey-Managed Applications [$(Get-Date)]" } | ConvertTo-Json
}
$deployment = (Invoke-RestMethod @params).result
```

#### 4. Add a Deployment Step

```powershell
$params = @{
    Uri         = "https://$CcmServerHostname/api/services/app/DeploymentSteps/CreateOrEdit"
    Method      = "POST"
    WebSession  = $Session
    ContentType = 'application/json'
    Body        = @{
        deploymentPlanId               = $deployment.Id
        name                           = "Choco Upgrade All"
        validExitCodes                 = "0, 1605, 1614, 1641, 3010"
        executionTimeoutInSeconds      = 14400
        machineContactTimeoutInMinutes = "0"
        failOnError                    = $true
        requireSuccessOnAllComputers   = $false
        deploymentStepGroups           = @(
            @{ groupId = $Group.Id; groupName = $Group.Name }
        )
        # Syntax for basic deployment steps is "<ChocoCommand>|<PackageName>"
        script                         = "upgrade|all"
    } | ConvertTo-Json
}
$null = Invoke-RestMethod @params
```

#### 5. Move Deployment to Ready & Start the Deployment

```powershell
$params = @{
    Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/MoveToReady"
    Method      = "POST"
    WebSession  = $Session
    ContentType = 'application/json'
    Body        = @{ id = $deployment.Id } | ConvertTo-Json
}
$null = Invoke-RestMethod @params

$params = @{
    Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/Start"
    Method      = "POST"
    WebSession  = $Session
    ContentType = 'application/json'
    Body        = @{ id = $deployment.Id } | ConvertTo-Json
}
$null = Invoke-RestMethod @params
```

### Create a Recurring Scheduled Task to run Recurring Deployments

This example uses the concepts in the previous example and streamlines the process of creating a scheduled task on Windows to create a recurring deployment task.
In this example, we set the trigger to run daily, but you could configure it to run as needed for your use case.

```powershell
$recurringDeploymentScript = {
    # Fill in the CCM Server name as well as the Group ID that the deployment will target
    $CcmServerHostname = 'chocoserver'
    $GroupId = 1

    # Authenticate to API
    # NOTE: This is an example only; it's never a great idea to store your credentials in a script or scheduled task.
    # Instead, store the credentials securely and retrieve them during the scheduled task script.
    $body = @{
        usernameOrEmailAddress = 'ccmadmin'
        password               = 'ch0c0R0cks'
    }

    $null = Invoke-WebRequest -Uri "https://$CcmServerHostname/Account/Login" -Method POST -ContentType 'application/x-www-form-urlencoded' -Body $body -SessionVariable Session -ErrorAction Stop

    # Create New Deployment
    $params = @{
        Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/CreateOrEdit"
        Method      = "POST"
        WebSession  = $Session
        ContentType = 'application/json'
        Body        = @{ name = "Upgrade Chocolatey-Managed Applications [$(Get-Date)]" } | ConvertTo-Json
    }
    $deployment = (Invoke-RestMethod @params).result

    # Add Deployment Step
    $params = @{
        Uri         = "https://$CcmServerHostname/api/services/app/DeploymentSteps/CreateOrEdit"
        Method      = "POST"
        WebSession  = $Session
        ContentType = 'application/json'
        Body        = @{
            deploymentPlanId               = $deployment.Id
            name                           = "Choco Upgrade All"
            validExitCodes                 = "0, 1605, 1614, 1641, 3010"
            executionTimeoutInSeconds      = 14400
            machineContactTimeoutInMinutes = "0"
            failOnError                    = $true
            requireSuccessOnAllComputers   = $false
            deploymentStepGroups           = @(
                @{ groupId = $GroupId }
            )
            script                         = "upgrade|all"
        } | ConvertTo-Json
    }
    $null = Invoke-RestMethod @params

    # Move Deployment to Ready & Start the Deployment
    $params = @{
        Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/MoveToReady"
        Method      = "POST"
        WebSession  = $Session
        ContentType = 'application/json'
        Body        = @{ id = $deployment.Id } | ConvertTo-Json
    }
    $null = Invoke-RestMethod @params

    $params = @{
        Uri         = "https://$CcmServerHostname/api/services/app/DeploymentPlans/Start"
        Method      = "POST"
        WebSession  = $Session
        ContentType = 'application/json'
        Body        = @{ id = $deployment.Id } | ConvertTo-Json
    }
    $null = Invoke-RestMethod @params
}

$argumentString = '-NoProfile -WindowStyle Hidden -Command "& {{ {0} }}"' -f $recurringDeploymentScript

$taskParams = @{
    Action      = New-ScheduledTaskAction -Execute 'powershell.exe' -Argument $argumentString
    # Fill in the requirements for the repeating scheduled task; here, it will trigger once a day @ 6 PM
    Trigger     = New-ScheduledTaskTrigger -Daily -At 6pm
    TaskName    = 'Repeat - Choco Update Deployment'
    Description = "Create and start a CCM deployment which will trigger all computers in the group '$groupName' to update their Chocolatey-managed applications."
}

Register-ScheduledTask @taskParams
```
