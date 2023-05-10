---
Order: 10
xref: ccm-api-examples
Title: Examples
Description: CCM API usage examples
---

## Creating An _All Computers_ Group and Deploy Application Upgrades

From a completely fresh CCM instance with at least one computer checking into Central Management, this process will:

- Create a new group containing all the computers currently registered to Central Management.
- Create a new Deployment Plan with a single step, which will upgrade all Chocolatey-managed applications to the latest available versions.
- Start the Deployment Plan.

The process involves a couple of intermediary steps as well, since we're using the raw REST API endpoints here (see below).
We're also assuming as part of this example that you've already [Authenticated to the CCM API](#authentication) and have a `$Session` variable created as in that example.

### 1. Get All CCM-Managed Computers

```powershell
$CcmServerHostname = 'chocoserver'
$params = @{
    Uri        = "https://$CCmServerHostname/api/services/app/Computers/GetAll"
    Method     = 'GET'
    WebSession = $Session
}
$ComputerList = Invoke-RestMethod @params
```

### 2. Create an _All Computers_ Group

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

### 3. Create a New Deployment Plan

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

### 4. Add a Deployment Step

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
        # Syntax for basic Deployment Steps is "<ChocoCommand>|<PackageName>"
        script                         = "upgrade|all"
    } | ConvertTo-Json
}
$null = Invoke-RestMethod @params
```

### 5. Move Deployment Plan to Ready & Start the Deployment Plan

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

## Create a Recurring Scheduled Task to run Recurring Deployment Plans

This example uses the concepts in the previous example and streamlines the process of creating a scheduled task on Windows to create a recurring Deployment Plan task.
In this example, we set the trigger to run daily, but you could configure it to run as needed for your use case.

```powershell
$recurringDeploymentScript = {
    # Fill in the CCM Server name as well as the Group ID that the Deployment Step will target
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

    # Create New Deployment Plan
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

    # Move Deployment Plan to Ready & Start the Deployment Plan
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
    Description = "Create and start a Chocolatey Central Management Deployment Plan which will trigger all computers in the group '$groupName' to update their Chocolatey-managed applications."
}

Register-ScheduledTask @taskParams
```

## Sync Central Management Groups With External Data Sources

It is possible to keep your Chocolatey Central Management group(s), and their memberships, up to date  with external data sources by leveraging the
Chocolatey Central Management API.

The following functions will help you to use an external datasource such as SCCM, Active Directory, or a file to manage your Chocolatey Central Management groups!

### Authentication

The first thing you'll need to do is authenticate to your Chocolatey Central Management instance with credentials that have appropriate permissions to manage group memberships. We'll use the following `Connect-CCMServer` function to provide that capability:

```powershell
function Connect-CCMServer {
    <#
        .SYNOPSIS
        This function accepts a `PSCredential` object via `-Credential` to store your credentials for Chocolatey Central Management. Additionally the `-CcmServerHostname` parameter accepts the DNS name you use to access Central Management's web interface. Use the `-UseSSL` switch parameter if you've configured your Central Management web interface to be accessed via an HTTPS connection (You really should!).

        .EXAMPLE

        Connect-CCMServer -Name centralmanagement.fabrikam.com -Credential (Get-Credential) -UseSSL
    #>
    [CmdletBinding()]
    Param(
        #The FQDN of your Chocolatey Central Management instance.
        [Parameter(Mandatory)]
        [String]
        $Name,

        #Credentials for connecting to your Chocolatey Central Management instance
        [Parameter(Mandatory)]
        [System.Management.Automation.PSCredential]
        $Credential,

        #Use if you connect to Chocolatey Central Management over HTTPS
        [Parameter()]
        [Switch]
        $UseSSL
    )

    process {
        $script:CcmHost = $Name
        $script:protocol = if($UseSSL) {
            'https'
        }
        else {
            'http'
        }

        $body = @{
            usernameOrEmailAddress = $Credential.UserName
            password               = $Credential.GetNetworkCredential().Password
        }
        $Result = Invoke-WebRequest -Uri "$($protocol)://$Name/Account/Login" -Method POST -ContentType 'application/x-www-form-urlencoded' -Body $body -SessionVariable Session -ErrorAction Stop
        $script:Session = $Session

        $script:CcmConnection = @{
            CcmHost = $Name
            Protocol = $protocol
            Session = $Session
        }

    }
}
```

This function accepts a `PSCredential` object via `-Credential` to store your credentials for Chocolatey Central Management. Additionally the `-CcmServerHostname` parameter accepts the DNS name you use to access Central Management's web interface. Use the `-UseSSL` switch parameter if you've configured your Central Management web interface to be accessed via an HTTPS connection (You _really_ should!).

#### Example

```powershell
Connect-CCMServer -CcmServerHostname centralmanagement.fabrikam.com -Credential (Get-Credential) -UseSSL
```

### Retrieving All Computers Currently In Chocolatey Central Management

In order to accurately manage group membership we will need to retrieve all of the machines that are currently enrolled in Chocolatey Central Management. The following function will accomplish this:

```powershell
function Get-AllComputers {
    <#
        .SYNOPSIS
        Returns all the information for computers currently reporting into Chocolatey Central Management

        .EXAMPLE
        Returns a condensed amount of information about each computer returned by the API

        Get-AllComputers

        .EXAMPLE
        Returns all information available about each computer returned by the API

        Get-AllComputers -Detailed
    #>
    [CmdletBinding()]
    Param(
        #Provide the full data returned via the API endpoint
        [Parameter()]
        [Switch]
        $Detailed
    )

    begin {
        if (-not $CcmConnection['Session']) { throw "Not connected to CCM instance. Run Connect-CCMServer first!" }
    }

    process {
        $params = @{
            Uri        = "$($CcmConnection['Protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Computers/GetAll"
            Method     = 'GET'
            WebSession = $CcmConnection['Session']
        }
        $ComputerList = Invoke-RestMethod @params

        if (-not $Detailed) {
            $computerList.Result | Foreach-Object {
                [pscustomobject]@{
                    Id = $_.id
                    ComputerGUID = $_.computerGuid
                    Name         = $_.name
                    FriendlyName = $_.friendlyname
                    DisplayName  = $_.displayName
                    IpAddress    = $_.ipAddress
                }
            }
        }
        else {
            return $ComputerList.result
        }
    }
}
```

This function works in conjunction with `Connect-CCMServer`. Failure to connect to your instance first will result in an error! This function includes a `-Detailed` switch parameter that can be used to include more detailed information about the machines reporting into your system should you want to leverage this function in other ways.

### Validating A Group

We don't want to unnecessarily duplicate groups inside of our Chocolatey Central Management instance. The following function sets up some guardrails:

```powershell
function Test-GroupExists {
    <#
        .SYNOPSIS
        Verifies the existance of group and returns true/false

        .EXAMPLE

        Test-GroupExists -Group EngineeringComputers
    #>
    [CmdletBinding()]
    Param(
        #The group to validate
        [Parameter(Mandatory)]
        [String]
        $Group
    )

    begin {
        if (-not $CcmConnection['Session']) { throw "Not connected to CCM instance. Run Connect-CCMServer first!" }
    }


    process {
        $params = @{
            Uri = "$($CcmConnection['protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Groups/GetAll"
            Method = 'GET'
            ContentType = 'application/json'
            WebSession = $CcmConnection['Session']
        }
        $result = Invoke-RestMethod @params

        $name = $result.result.name

        if ($Group -in $name) {
            return $true
        }
        else { return $false }

    }
}
```

This function queries your Chocolatey Central Management instance for the group provided via the mandatory `-Group` parameter and returns `$true` or `$false` based on the group's existence.

### Adding A Group

Once we have connected to our Chocolatey Central Management server, retrieved all our reporting computers, and validated our groups, we may need to actually _create_ the group we want. The following function does just that!

```powershell
function Add-CCMGroup {
    <#
        .SYNOPSIS
        Adds a new group to Chocolatey Central Management

        .EXAMPLE

        Add-CCMGroup -Group TestGroup

        .EXAMPLE

        Add-CCMGroup -Group EngineeringWorkstations -Description "Computers belonging to the Engineering department"
    #>
    [CmdletBinding()]
    Param(
        [Parameter(Mandatory)]
        [String]
        $Group,

        [Parameter()]
        [String]
        $Description
    )

    begin {
        if (-not $CcmConnection['Session']) { throw "Not connected to CCM instance. Run Connect-CCMServer first!" }
    }

    process {
        if (-not (Test-GroupExists -Group $Group)) {
            $Params = @{
                Uri         = "$($CcmConnection['protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Groups/CreateOrEdit"
                Method      = 'POST'
                WebSession  = $CcmConnection['Session']
                ContentType = 'application/json'
                Body        = @{
                    name        = $Group
                    description = $Description
                    groups      = @()
                    computers   = @()
                } | ConvertTo-Json
            }
            $null = Invoke-RestMethod @params

            $params = @{
                Uri        = "$($CcmConnection['protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Groups/GetAll"
                Method     = "GET"
                WebSession = $CcmConnection['Session']
            }

            [pscustomObject](Invoke-RestMethod @params | Select-Object -ExpandProperty result | Where-Object Name -EQ $Group | Select-Object Name, Id)
        }
        else {
            Write-Warning "Group already exists, skipping creation!"
        }
    }
}
```

This function accepts the mandatory `-Group` parameter for the group that we would like to create, and an optional `-Desciption` parameter if we would like to add a description to our newly created group.

### Managing Group Memberships

Phew, getting closer! We've now got our functions for:

- Connecting to Chocolatey Central Management
- Getting all of our reporting computers
- Verifying a group's existence
- Creating a new group

This function will actually manipulate the members of our group:

```powershell
function Add-CCMGroupMember {
    <#
        .SYNOPSIS

        Adds members to a Chocolatey Central Management group

        .EXAMPLE

        Add-CCMGroupMember -Group Engineering -Member $MemberList
    #>
    [CmdletBinding()]
    Param(
        #The Chocolatey Central Management group to add members
        [Parameter(Mandatory)]
        [String]
        $Group,

        #The members you wish to add to the group
        [Parameter(Mandatory)]
        [String[]]
        $Member
    )

    begin {
        if (-not $CcmConnection['Session']) { throw "Not connected to CCM instance. Run Connect-CCMServer first!" }
    }

    process {
        $CentralManagementComputers = Get-AllComputers

        #Get the ID of the group via CCM API
        $params = @{
            Uri        = "$($CcmConnection['protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Groups/GetAll"
            Method     = "GET"
            WebSession = $CcmConnection['Session']
        }

        $GroupData = Invoke-RestMethod @params |
        Select-Object -ExpandProperty result |
        Where-Object Name -EQ $Group | Select-Object Name, Id
        $Id = $GroupData.Id
        $ccmGroupName = $GroupData.Name

        #Build a collection for the computerID payload
        $collection = [System.Collections.Generic.List[psobject]]::new()

        #Loop CCM Computers, and build object for group payload into CCM API
        $Member| Foreach-Object {
            $name = $_
            if($_ -in $CentralManagementComputers.name){
                $c = [pscustomObject]@{
                    computerId = $CentralManagementComputers | Where-Object { $_.Name -eq $name}  | Select-Object -ExpandProperty Id
                }

                $collection.Add($c)
            } else {
                Write-Warning "Computer: $_ is NOT currently reporting into Chocolatey Central Management!!"
            }
        }

        #Modify group membership via CCM API
        $params = @{
            Uri         = "$($CcmConnection['protocol'])://$($CcmConnection['CcmHost'])/api/services/app/Groups/CreateOrEdit"
            Method      = "POST"
            WebSession  = $CcmConnection['Session']
            ContentType = 'application/json'
            Body        = @{
                id        = $Id
                name      = $ccmGroupName
                computers = $collection
            } | ConvertTo-Json
        }

        Write-Verbose $params.Body

        try {
            $null = Invoke-RestMethod @params -ErrorAction Stop
        }
        catch {
            Write-Error -ErrorRecord $_
        }
    }
}
```

This function takes a mandatory `-Group` parameter for the group you wish to manipulate as well as a mandatory `-Member` parameter which accepts an array of computer names.

### Putting It All Together

#### Example - SCCM Collections

This example reads data from SCCM and creates a Chocolatey Central Management group. It assumes you have copied the above functions into your PowerShell session so they are available.

```powershell
Connect-CCMServer -CcmServerHostname centralmanagment.fabrikam.com -Credential (Get-Credential) -UseSSL
$Group = 'Shop Floor Computers'
$Members = Get-CMCollection -Name $Group | Get-CMCollectionMember | select-Object -ExpandProperty Name
Add-CCMGroupMember -Group $Group -Member $Members
```

#### Example - Active Directory

This example gets the computers from an Active Directory OU and creates a Chocolatey Central Management group.

```powershell
Connect-CCMServer -CcmServerHostname centralmanagment.fabrikam.com -Credential (Get-Credential) -UseSSL
$Group = 'Shop Floor Computers'
$Members = Get-ADComputer -Searchbase "OU=Floor,OU=Manufacturing,OU=Tuscon,DC=fabrikam,DC=com" -Properties Name | Select-Object -Expand Name
Add-CCMGroupMember -Group $Group -Member $Members
```

#### Example - CSV File

This example reads data from a CSV file and creates a Chocolatey Central Management group.

```powershell
Connect-CCMServer -CcmServerHostname centralmanagment.fabrikam.com -Credential (Get-Credential) -UseSSL
$Group = 'Shop Floor Computers'
$Members = Import-Csv 'C:\temp\computerlist.csv' | Select-Object -Expand Name
Add-CCMGroupMember -Group $Group -Member $Members
```
