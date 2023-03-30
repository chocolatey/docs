---
Order: 40
xref: quick-start-guide-cert-renewal
Title: Certificate Renewal
Description: Certificate renewal docs for Nexus and Chocolatey Central Management
RedirectFrom: en-us/guides/organizations/quick-start-guide/certificate-renewal
---

This document is meant to serve as a guide for where to look when needing to renew your SSL certificate(s) for the Nexus and Chocolatey Central Management components of the quick start environment.

## Set-NexusCert.ps1

This script should be saved on your repository server at `C:\choco-setup\scripts\Set-NexusCert.ps1`.

You can [download the Set-NexusCert.ps1 file directly](https://github.com/chocolatey/choco-quickstart-scripts/blob/main/scripts/Set-NexusCert.ps1), or copy the below code and save it manually.

```powershell
<#
.SYNOPSIS
Certificate renewal script for Nexus.

.DESCRIPTION
Helps edit the java keystore file for Nexus when doing a certificate renewal.

.PARAMETER Thumbprint
Thumbprint value of certificate you want to run Nexus on. Make sure certificate is located at Cert:\LocalMachine\TrustedPeople\

.PARAMETER NexusPort
Port you have Nexus configured to run on.

.EXAMPLE
PS> .\Set-NexusCert.ps1 -Thumbprint 'Your_Certificate_Thumbprint_Value' -NexusPort 'Port_Number'
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [string]
    $Thumbprint,

    [Parameter()]
    [string]
    $NexusPort = '8443'
)

begin {
    if($host.name -ne 'ConsoleHost') {
        Write-Warning "This script cannot be ran from within PowerShell ISE"
        Write-Warning "Please launch powershell.exe as an administrator, and run this script again"
        break
    }
}

process {

$ErrorActionPreference = 'Stop'

if ((Test-Path C:\ProgramData\nexus\etc\ssl\keystore.jks)) {
    Remove-Item C:\ProgramData\nexus\etc\ssl\keystore.jks -Force
}

$KeyTool = "C:\ProgramData\nexus\jre\bin\keytool.exe"
$password = "chocolatey" | ConvertTo-SecureString -AsPlainText -Force
$certificate = Get-ChildItem  Cert:\LocalMachine\TrustedPeople\ | Where-Object { $_.Thumbprint -eq $Thumbprint } | Sort-Object | Select-Object -First 1

Write-Host "Exporting .pfx file to C:\, will remove when finished" -ForegroundColor Green
$certificate | Export-PfxCertificate -FilePath C:\cert.pfx -Password $password
Get-ChildItem -Path c:\cert.pfx | Import-PfxCertificate -CertStoreLocation Cert:\LocalMachine\My -Exportable -Password $password
Write-Warning -Message "You'll now see prompts and other outputs, things are working as expected, don't do anything"
$string = ("chocolatey" | & $KeyTool -list -v -keystore C:\cert.pfx) -match '^Alias.*'
$currentAlias = ($string -split ':')[1].Trim()

$passkey = '9hPRGDmfYE3bGyBZCer6AUsh4RTZXbkw'
& $KeyTool -importkeystore -srckeystore C:\cert.pfx -srcstoretype PKCS12 -srcstorepass chocolatey -destkeystore C:\ProgramData\nexus\etc\ssl\keystore.jks -deststoretype JKS -alias $currentAlias -destalias jetty -deststorepass $passkey
& $KeyTool -keypasswd -keystore C:\ProgramData\nexus\etc\ssl\keystore.jks -alias jetty -storepass $passkey -keypass chocolatey -new $passkey

$xmlPath = 'C:\ProgramData\nexus\etc\jetty\jetty-https.xml'
[xml]$xml = Get-Content -Path 'C:\ProgramData\nexus\etc\jetty\jetty-https.xml'
foreach ($entry in $xml.Configure.New.Where{ $_.id -match 'ssl' }.Set.Where{ $_.name -match 'password' }) {
    $entry.InnerText = $passkey
}

$xml.OuterXml | Set-Content -Path $xmlPath

Remove-Item C:\cert.pfx

$nexusPath = 'C:\ProgramData\sonatype-work\nexus3'
$configPath = "$nexusPath\etc\nexus.properties"

(Get-Content $configPath) | Where-Object {$_ -notmatch "application-port-ssl="} | Set-Content $configPath

$configStrings = @('jetty.https.stsMaxAge=-1', "application-port-ssl=$NexusPort", 'nexus-args=${jetty.etc}/jetty.xml,${jetty.etc}/jetty-https.xml,${jetty.etc}/jetty-requestlog.xml')
$configStrings | ForEach-Object {
    if ((Get-Content -Raw $configPath) -notmatch [regex]::Escape($_)) {
        $_ | Add-Content -Path $configPath
    }
}

Restart-Service nexus

Write-Host -BackgroundColor Black -ForegroundColor DarkGreen "The script has successfully run and the Nexus service is now rebooting for the changes to take effect."
}
```

### What does this script do?

- Prompts for Thumbprint value. This is the certificate thumbprint value you wish to associate to your Nexus instance.
- Optionally you can specify `-Port` with the port number you want Nexus to run over.
- The script will remove your previous keystore.jks file
- Create a new keystore.jks file based on your certificate
- Re-write the nexus.properties file to use the correct port, by default will use port 8443 unless specified in command.
- Restart the Nexus service for changes to take effect and re-load web UI.

### Script Examples

```powershell
.\Set-NexusCert.ps1 -Thumbprint 'Your_Certificate_Thumbprint_Value' -NexusPort 'Port_Number'
```

```powershell
.\Set-NexusCert.ps1 -Thumbprint 'Your_Certificate_Thumbprint_Value'
```

## Set-CCMCert.ps1

This script should be saved on your repository server at `C:\choco-setup\scripts\Set-CCMCert.ps1`.

You can [download the Set-CCMCert.ps1 file directly](https://github.com/chocolatey/choco-quickstart-scripts/blob/main/scripts/Set-CCMCert.ps1), or copy the below code and manually save it.

```powershell
<#
.SYNOPSIS
Certificate renewal script for Chocolatey Central Management(CCM)

.DESCRIPTION
This script will go through and renew the certificate association with both the Chocolatey Central Management Service and IIS Web hosted dashboard.

.PARAMETER CertificateThumbprint
Thumbprint value of the certificate you would like the Chocolatey Central Management Service and Web to run on.
Please make sure the certificate is located in both the Cert:\LocalMachine\TrustedPeople\ and Cert:\LocalMachine\My certificate stores.

.EXAMPLE
PS> .\Set-CCMCert.ps1 -CertificateThumbprint 'Your_Certificate_Thumbprint_Value'
#>

[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [String]
    $CertificateThumbprint
)

begin {
    if($host.name -ne 'ConsoleHost') {
        Write-Warning "This script cannot be ran from within PowerShell ISE"
        Write-Warning "Please launch powershell.exe as an administrator, and run this script again"
        break
    }
}

process {

    #Stop Central Management components
    Stop-Service chocolatey-central-management
    Get-Process chocolateysoftware.chocolateymanagement.web* | Stop-Process -ErrorAction SilentlyContinue -Force

    #Remove existing bindings
    Write-Verbose "Removing existing bindings"
    netsh http delete sslcert ipport=0.0.0.0:443

    #Add new CCM Web IIS Binding
    Write-Verbose "Adding new IIS binding to Chocolatey Central Management"
    $guid = [Guid]::NewGuid().ToString("B")
    netsh http add sslcert ipport=0.0.0.0:443 certhash=$CertificateThumbprint certstorename=MY appid="$guid"
    Get-WebBinding -Name ChocolateyCentralManagement | Remove-WebBinding
    New-WebBinding -Name ChocolateyCentralManagement -Protocol https -Port 443 -SslFlags 0 -IpAddress '*'        

    #Write Thumbprint to CCM Service appsettings.json
    $appSettingsJson = 'C:\ProgramData\chocolatey\lib\chocolatey-management-service\tools\service\appsettings.json'
    $json = Get-Content $appSettingsJson | ConvertFrom-Json
    $json.CertificateThumbprint = $CertificateThumbprint
    $json | ConvertTo-Json | Set-Content $appSettingsJson -Force

    #Try Restarting CCM Service
    try {
        Start-Service chocolatey-central-management -ErrorAction Stop
    }
    catch {
        #Try again...
        Start-Service chocolatey-central-management -ErrorAction SilentlyContinue
    }
    finally {
        if ((Get-Service chocolatey-central-management).Status -ne 'Running') {
            Write-Warning "Unable to start Chocolatey Central Management service, please start manually in Services.msc"
        }
    }
}
```

### What does this script do?

- The script will prompt for certificate thumbprint value. Please enter the thumbprint value of the certificate you wish to have the IIS endpoint of Chocolatey Central Management run over.
- Stops the chocolatey-central-management windows service
- Removes any existing binding for the site running over port 443.
- Adds a new IIS binding with the new certificate info.
- Writes the thumbprint value given to the appsettings.json file of the Chocolatey Central Management service to run over.
- Brings up the Chocolatey Central Management service and web components once configured.

### Script Example

```powershell
.\Set-CCMCert.ps1 -CertificateThumbprint 'Your_Certificate_Thumbprint_Value'
```
