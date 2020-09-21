# Internet-Accessible QDE Setup

> :information_source: **Information**
>
> This document was written primarily for QDE v1.0.
>
> The information it contains may still be helpful for you in later versions for troubleshooting and/or planning.
> In more recent versions of QDE, all of this required setup can be handled by the setup scripts packaged with the image.
>
> See the following QDE v2.0+ documents for more information on how to handle this setup or certificate renewals in newer versions:
>
> * [[QDE Desktop Readme|QuickDeploymentDesktopReadme]]
> * [[QDE Firewall Changes|QuickDeploymentFirewallChanges]]
> * [[QDE SSL Setup|QuickDeploymentSslSetup]]

With an unprecedented amount of employees working from home, there is a much greater demand to serve their software lifecycle needs remotely. Thus, many organizations would like the option to make the Chocolatey Quick Deployment Environment (QDE) Internet-accessible. This document walks you through some options you will need to consider, if you choose this route.

<!-- TOC depthFrom:2 -->

- [Firewall Considerations](#firewall-considerations)
- [SSL Certificate Setup](#ssl-certificate-setup)
  - [SSL Certificate Scenarios](#ssl-certificate-scenarios)
  - [Scenario 1: Domain Server Certificates](#scenario-1-domain-server-certificates)
  - [Scenario 2: Purchased/Acquired Certificates from CA](#scenario-2-purchasedacquired-certificates-from-ca)
  - [Scenario 3: Self-Signed SSL Certificates](#scenario-3-self-signed-ssl-certificates)
- [Nexus Setup](#nexus-setup)
  - [Option 1: Scripted Nexus Configuration](#option-1-scripted-nexus-configuration)
  - [Option 2: Manual Configuration of Nexus](#option-2-manual-configuration-of-nexus)
- [CCM Setup](#ccm-setup)
- [Adjusting Scripts for Client Setup](#adjusting-scripts-for-client-setup)
- [Jenkins](#jenkins)

<!-- /TOC -->

> :closed_lock_with_key: **Warning**
>
> This document assumes you have an understanding of the underlying principles behind **SSL Certificates** and **Public Key Infrastructure**.
> Therefore, it does not exhaustively cover these topics, but rather presents steps and examples of what you will need to accomplish.
> You should be able to manage certificates in your organizational environment before proceeding any further.

## Firewall Considerations

When we talk about making QDE Internet-accessible, we are referring to exposing certain application ports on QDE via your VM/Organizational firewall:

* **Chocolatey Central Management Service (24020)**: This port is used for communication between Chocolatey Agent on your endpoint and the Chocolatey Central Management (CCM) server.
* **Sonatype Nexus repository (8443)**: This is the port on which endpoints will connect to your Nexus repository (over HTTPS), in order to download packages for install/upgrade.

There are, of course, additional applications and ports on the QDE server.
In general, it is not required or may not be advisable to have these accessible externally:

* Chocolatey Central Management Dashboard (**443**) (HTTPS)
* Jenkins (**8080**) (HTTP)

You can access these via a Remote Desktop session on the QDE server itself, or opening these ports up to your internal network.
Again, we **strongly** advise against opening these ports up to the public Internet for security reasons.

Further details on firewall changes can be found on the [[QDE Firewall Setup|QuickDeploymentFirewallChanges]] page.

## SSL Certificate Setup

If you are planning to expose QDE to the Internet, it is essential to **not** use the default self-signed certificates generated for you.
Rather, new ones should be generated.
Some additional common reasons for this change are:

* If you change the hostname of this server.
* If you add QDE to a domain.
* If you have purchased your own SSL/TLS certificates or need to renew your own certificates that are already installed.

Essentially, in any scenario where the **fully-qualified domain name (FQDN)** of the QDE server has been modified, you will need to ensure that the "Subject/Common Name" attribute on the SSL certificates matches this FQDN.
If you are making any of the above changes, please generate new SSL certificates **_after_** any changes to the FQDN have been completed.

The `New-SslCertificates.ps1` script in the "C:\choco-setup\files" folder on the QDE VM will:

* Generate new SSL certificates for your Nexus and CCM Service applications
* Move these certificates to the appropriate certificate stores
* Configure the Nexus and CCM services to use these certificates in communication with endpoints

> :exclamation: **Important**
>
> If you are running QDE v1.0, there is a good chance that the current version of the `New-SslCertificates.ps1` script in the "C:\choco-setup\files" folder on your QDE VM is out-of-date, as we have made numerous updates to it over the past few months.
> Please use the following command to update your version of this file (to be run in a PowerShell Administrator window):
>
> ```powershell
> Invoke-WebRequest -Uri 'https://ch0.co/newssl' -OutFile "$env:SystemDrive\choco-setup\files\New-SslCertificates.ps1"
> ```

This script can be utilized in multiple certificate scenarios outlined below. Any time this script is run, please be mindful of the warnings below.

> :warning: **Warning**
>
> * The `New-SslCertificates.ps1` script will appear to prompt for input, and also display some misleading output.
>   This is due to the nature of the Java tooling by which the script interacts with Nexus.
>   Please ignore any spurious prompts and output.
> * If you provide your own SSL certificate, your **private key** needs to be **exportable** so that the script can export that key into Nexus' Java keystore.
>   If the private key is not exportable, the script will fail to complete, and you will likely need to manually adjust the Nexus configuration to get it running again.
> * **Timezones** and time synchronization are critically important when generating SSL Certificates.
>   You'll want to ensure all hosts are utilizing the same NTP time source.
>   Otherwise, it's possible to generate an SSL Certificate that a client may see as not yet valid.

### SSL Certificate Scenarios

There are three possible approaches to acquiring SSL certificates for QDE:

* [Scenario 1: Domain Server Certificates](#scenario-1-domain-server-certificates): This would be the domain server SSL certificate, generated on domain join and trusted by all endpoints on your domain.
* [Scenario 2: Purchased/Acquired Certificates from CA](#scenario-2-purchasedacquired-certificates-from-ca): This would be an SSL certificate that you purchased or acquired from an external Certificate Authority (CA; e.g. LetsEncrypt).
* [Scenario 3: Self-Signed SSL Certificates](#scenario-3-self-signed-ssl-certificates): This would be a self-generated SSL certificate, similar to the one that comes with QDE (least-desirable).

Each approach is discussed individually in the sections below.

### Scenario 1: Domain Server Certificates

If you manage a Windows AD Domain, this is going to be the most common scenario.
The majority of customers will want to join the QDE server to their domain, and possibly even change the hostname to match their organizational naming conventions.
As this process will change your FQDN, this will need to be completed  **_ahead_** of any other changes.

> :warning: **Warning**
>
> We are assuming you are able to manage certificates in your Active Directory (AD) domain environment.
> You should have a server with the Active Directory Certificate Services (AD CS) role in place, that can issue and mange digital certificates.
> A detailed explanation of Certificate Authorities is beyond the scope of this document.

The following prerequisites are required to be in place for later steps to be successful:

1. Ensure that you join the QDE server to the domain **_first_**.
1. Ensure that the FQDN of the QDE server is resolvable to its IP across your domain.

Once you have your new valid and resolvable FQDN for QDE, you will now want to ensure the domain server certificate associated with that FQDN is utilized for the Nexus and CCM services on QDE.

1. Open the "Certificates - Local Computer" MMC snap-in by pressing the Windows key, and when the Start menu pops up, type certificates.
   You should now see an option under the "Settings" section that says "Manage computer certificates".
   Alternatively, open the Run dialog (Windows key + R), type `certlm.msc`, and click "OK".
1. Under the "Personal" store, you should see a server certificate matching the FQDN of your QDE server.
   Double-click on the certificate to open it, and under the details tab, copy out the `Thumbprint` value of the certificate.
   You will need this for later steps.
1. Now, you can run the `New-SslCertificates.ps1` script and pass the thumbprint you copied above using the `-Thumbprint` parameter.
   Please run the below command from a PowerShell Administrator window:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; . C:\choco-setup\files\New-SslCertificates.ps1 -Thumbprint '<YOUR_CERT_THUMBPRINT_HERE>'
    ```

1. **(Optional)** If some endpoints are not on the domain, or on a different domain, you will need to ensure that the Nexus and CCM certificates of QDE are copied to the `Local Computer\Trusted People\Certificates` store on those endpoints as well.
   If the endpoints connecting to Nexus and CCM are also on the same domain, this step may not be necessary as they will inherently trust the domain server certificate of the QDE server.

### Scenario 2: Purchased/Acquired Certificates from CA

Organizations can also opt to purchase or acquire a certificate from an external Certificate Authority (CA; e.g. [LetsEncrypt](https://github.com/win-acme/win-acme)).
As mentioned before, you will need to ensure that the "Subject/Common Name" attribute on the SSL certificates matches the FQDN you are using.
For example, if you purchase an SSL certificate for your server with the "Subject/Common Name" attribute `chocoserver.example.com`, you will of course need to ensure that you have a DNS record resolving `chocoserver.example.com` to the external IP of your QDE server.

The steps involved in this scenario are similar to the Domain certificates above, with some slight adjustments:

1. Ensure that a DNS record exists, resolving the desired "Subject/Common Name" attribute from your purchased/acquired SSL certificate to its external IP address.
1. Import your certificate into the `Local Computer\Personal\Certificates` and `Local Computer\Trusted People\Certificates` stores on the QDE server.
   Open the "Certificates - Local Computer" MMC snap-in by pressing the Windows key, and when the Start menu pops up, type certificates.
   You should now see an option under the "Settings" section that says "Manage computer certificates".
   Alternatively, open the Run dialog (Windows key + R) and type `certlm.msc` and click "OK".
   Double-check to ensure that the SSL certificate you have purchased is placed in the correct stores, otherwise this process will not succeed.
1. Under the "Personal" store, you should see a server certificate matching the FQDN of the certificate your QDE server.
   Double-click on the certificate to open it, and under the details tab, copy out the `Thumbprint` value of the certificate.
1. Run the `New-SslCertificates.ps1` script and pass the thumbprint you copied above using the `-Thumbprint` parameter.
   Please run the below command from a PowerShell Administrator window:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; . C:\choco-setup\files\New-SslCertificates.ps1 -Thumbprint '<YOUR_CERT_THUMBPRINT_HERE>'
    ```

1. **(Optional)** Assuming you've acquired your SSL certificate from an already-trusted Certificate Authority, your endpoints should trust this certificate natively.
   If you run into any issues with this, you may need to ensure that the QDE certificate is copied to the `Local Computer\Trusted People\Certificates` store on those endpoints as well.

### Scenario 3: Self-Signed SSL Certificates

If you are planning to use self-signed SSL certificates to secure your communication with Nexus and CCM on QDE, then you will be required to run the `New-SslCertificates.ps1` script using the command above _at least once_.
As you will be exposing these two services via the Internet, you must make sure your certificates are unique and not the default certificates provided by the QDE image.

1. Ensure you have a valid DNS record for the `CHOCOSERVER` hostname of the QDE VM, that resolves to the external IP of QDE.
   If not, create a host record for the hostname `CHOCOSERVER` in your Windows HOSTS file on your endpoints.
   This is located at: `“C:\Windows\System32\drivers\etc\hosts”`.
1. Run the `New-SslCertificates.ps1` script, from a PowerShell Administrator window:

    ```powershell
    Set-ExecutionPolicy Bypass -Scope Process -Force; . C:\choco-setup\files\New-SslCertificates.ps1
    ```

This scenario is the least desirable for an Internet-accessible setup, as you will likely have to perform steps manually on every endpoint.
It is also less secure, and thus **not recommended** for a server that is Internet-accessible.

> :unlock: **Security Note**
>
> As valid and widely-trusted SSL certificates are now available from CA's such as LetsEncrypt for free, there is no need to continue using self-signed certificates for Internet-accessible resources.
> For resources that are being utilized over the Internet, it's much safer to use a certificate that is signed by a trusted third party for SSL connections.

## Nexus Setup

The `New-SslCertificates.ps1` mentioned above will create a Java KeyStore (JKS) version of an SSL certificate, that can be used to secure communication between your endpoints and your Nexus repositories.
As mentioned in the section above, this certificate will need to be trusted by your endpoints.

Additionally, when logging in and resetting your administrative credential in the Nexus web UI, there is a checkbox to allow “Anonymous” access.
This is convenient for endpoints that will be accessing Nexus strictly from your internal network, but will need to be changed if you are planning to expose Nexus to your endpoints over the Internet.
You can follow two paths to accomplish this:

### Option 1: Scripted Nexus Configuration

> :memo: **Note**
>
> QDE v1 customers, please download the `Set-QDEnvironmentInternetSecurity.ps1` script and save it to the `C:\choco-setup\files\` directory on your QDE instance.
> You can accomplish this with the following script:
>
>    ```powershell
>    Invoke-WebRequest -Uri 'https://ch0.co/qdenetsec' -OutFile "$env:SystemDrive\choco-setup\files\Set-QDEnvironmentInternetSecurity.ps1"
>    ```

Now, you will use `Set-QDEnvironmentInternetSecurity.ps1` to update the scripts in your `choco-install` Nexus raw repository to reflect the additional security measures you've implemented above.
Remember, it is **required** to pass your FQDN for your QDE server with the `-FullyQualifiedDomainName` parameter.

> :warning: **Warning**
>
> This script will throw an error if you have logged into Nexus and changed your password from the default found in the README when you first got started with the appliance.
> If this is the case, add the `-NexusAdminPassword` parameter to the below command and supply the new password.

From an administrative PowerShell console, execute the following:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force ; . C:\choco-setup\files\Set-QDEnvironmentInternetSecurity.ps1 -FullyQualifiedDomainName '<YOUR_FQDN_HERE>' -PasswordLength 32 -SpecialCharCount 12
```

> :memo: **Note**
>
> 1. This script will emit random passwords for your nexus user, your client salt, and your service salt.
>    Make sure you save these passwords for use when setting up your clients later.
> 1. Now that you've added a credential to your Nexus repositories, access to the `ChocolateyInstall.ps1` and `ClientSetup.ps1` scripts in your `choco-install` raw repository will require this credential as well.

### Option 2: Manual Configuration of Nexus

1. Login to the Nexus Web UI and authenticate as your `admin` user. Select the gear icon at the top middle of the screen, to access the "Server administration and configuration" view.

    <details>
    <summary><strong>Show Animation</strong></summary>

    ![Nexus Server Admin](images/quickdeploy/QDE-nexus-web-1.gif)

    </details>

1. Under the `Security` sidebar menu, select `Roles`. Then click the `Create role` button, and choose `Nexus role` in the dropdown menu.

    <details>
    <summary><strong>Show Animation</strong></summary>

    ![Nexus Create Role](images/quickdeploy/QDE-nexus-web-2.gif)

    </details>

1. Set the `Role ID` and `Role name` values to something reflecting the purpose of the role; for example, `chocorole`.

    <details>
    <summary><strong>Show Animation</strong></summary>

    ![Nexus chocorole](images/quickdeploy/QDE-nexus-web-3.gif)

    </details>

1. Now you need to ensure that users of this Role can browse and read the relevant source feeds.
   Under the `Privileges` section, double-click the following options to add them to the `Given` section:
    * `nx-repository-view-nuget-*-browse`
    * `nx-repository-view-nuget-*-read`
    * `nx-repository-view-raw-*-browse`
    * `nx-repository-view-raw-*-browse`

    <details>
    <summary><strong>Show Animation</strong></summary>

    ![Nexus roles](images/quickdeploy/QDE-nexus-web-4.gif)

    </details>

1. Click the `Create role` button to create the role.

    <details>
    <summary><strong>Show Animation</strong></summary>

    ![Nexus Create Role button](images/quickdeploy/QDE-nexus-web-5.gif)

    </details>

1. We will now add a User to this Role. Under the `Security` sidebar menu, select `Users`, then click the `Create local user` button.
   Fill in the ID, First name, Last name, and Email fields as desired (e.g. `chocouser`).
   Create a secure Password for this user.
   Set the Status to `Active`.

   <details>
    <summary><strong>Show Animation</strong></summary>

   ![Nexus Create chocouser](images/quickdeploy/QDE-nexus-web-6.gif)
   </details>

1. In the Roles section, double-click the `chocorole` Role to to add it to the `Granted` section. Click the `Create local user` button to create your user.

    <details>
     <summary><strong>Show Animation</strong></summary>

    ![Nexus Assign chocorole](images/quickdeploy/QDE-nexus-web-7.gif)
    </details>

1. Under the `Security` sidebar menu, select `Anonymous Access`. Un-check the box next to the option `Allow anonymous users to access the server`, and click `Save`.

    <details>
     <summary><strong>Show Animation</strong></summary>

    ![Nexus Disable Anonymous Access](images/quickdeploy/QDE-nexus-web-8.gif)

    </details>

1. On your endpoints, you can now set up your internal source repository using this newly created `chocouser` credential.
   The below command is an example; please adjust according to your FQDN, repository name, and user credential created:

    ```powershell
    choco source add -n "'ChocolateyInternal'" -s "'https://chocoserver:8443/repository/ChocolateyInternal/'" --user='chocouser' --password='YOUR_PASSWORD' --allow-self-service
    ```

## CCM Setup

> :memo: **Note**
>
> If you ran option 1 above ([Scripted Nexus Configuration](#option-1-scripted-nexus-configuration)), you can skip this step, as the configuration has already been applied to the server.

QDE V1 does not currently include the most up-to-date version of the CCM packages (version 0.3.0, as of this writing).
If you have already purchased your Chocolatey for Business (C4B) licenses, you can upgrade by following the [[Central Management Upgrade|CentralManagementSetupUpgrade]] documentation.
If you are a trial user, please reach out to your Sales representative for the appropriate packages and procedure for upgrading CCM.

An additional mechanism of security that is highly recommended is the addition of salt additives to the encrypted communication between your endpoints and the CCM Service.
As we know, communication from the endpoints to CCM occurs over port 24020, and is secured by SSL certificates.
Adding a salt additive on both ends further hashes this encrypted data, and provides another layer of verification.
These salt additives should be at least 8 characters, and you will need to provide both additives on the CCM server and endpoint ends when setting up your communication.
These are both configuration items that can be set using the `choco config` command, as shown in the example here:

```powershell
choco config set centralManagementClientCommunicationSaltAdditivePassword 'YourSuperSecureSalt1'
choco config set centralManagementServerCommunicationSaltAdditivePassword 'YourSuperSecureSalt2'
```

Further details on configuring CCM, and all available settings, can be found in the [[Central Management Client Setup|CentralManagementSetupClient#config-settings]] documentation.

In the next section, you will need to incorporate both these salt additives into the script that helps you set up your endpoint clients.

## Adjusting Scripts for Client Setup

On-boarding endpoints into CCM will require the running of a `ClientSetup.ps1` script on those endpoints.

> :exclamation: **Important**
>
> If you are running QDE v1.0, there is a good chance that the current version of the `ClientSetup.ps1` script in the "C:\choco-setup\files" folder on your QDE VM is out-of-date, as we have made numerous updates to it over the past few months.
> Please use the following command to update your version of this file (to be run in a PowerShell Administrator window):
>
> ```powershell
> Invoke-WebRequest -Uri 'https://ch0.co/clientsetup' -OutFile "$env:SystemDrive\choco-setup\files\ClientSetup.ps1"
> ```
>
> This new ClientSetup.ps1 script will also need to be uploaded to your Nexus instance before attempting to install and configure Chocolatey on a client.

Please be sure to insert the following values before running the script below:

* `$RepositoryUrl`: This is the "ChocolateyInternal" Nexus repository URL on the QDE server, where the  Nexus repositories are.
  You **must** supply this parameter in QDE V1.
* `$Credential`: This is the `chocouser` credential used to connect to Nexus that we specified earlier in [Nexus Setup](#nexus-setup).
  You can generate this ahead of time via a command like `$Credential = Get-Credential`
* `$ClientSalt`: This is the client-side salt additive we discussed in the [CCM Setup](#ccm-setup) section above.
* `$ServerSalt`: This is the server-side salt additive we discussed in the [CCM Setup](#ccm-setup) section above.

Because this script is stored on your Nexus instance, and clients will need to authenticate to Nexus in order to download and execute the script,
the following code can be run using any tool which can run PowerShell, so long as it is run in an elevated context.

An example of running this script with the requisite parameters on an endpoint is as follows (to be run from a PowerShell Administrator window):

```powershell
# CHANGE THESE VALUES!
$clientCommunicationSalt = '2iLYko*f9y9kiv!Aw7kpZhBz7RnWQVHg' # example 32 character password. MUST BE UNIQUE
$serverCommunicationSalt = 'QQmgDxagB@nBR*.UyHx!-qrw4kWvwrT!' # example 32 character password. MUST BE UNIQUE
$fqdn = 'chocoserver' # If you have adjusted your FQDN, you HAVE to CHANGE this to reflect that
$password = 'x3mrj3NbGtkZBzJatLe9AcUtT8G_Y4Ra' # example 32 character password

# Touch NOTHING below this line
$user = 'chocouser'
$securePassword = $password | ConvertTo-SecureString -AsPlainText -Force
$repositoryUrl = "https://$($fqdn):8443/repository/ChocolateyInternal/"

$credential = [pscredential]::new($user, $securePassword)

$downloader = [System.Net.WebClient]::new()
$downloader.Credentials = $credential

$script =  $downloader.DownloadString("https://$fqdn:8443/repository/choco-install/ClientSetup.ps1")

$params = @{
    Credential      = $credential
    ClientSalt      = $clientCommunicationSalt
    ServerSalt      = $serverCommunicationSalt
    InternetEnabled = $true
    RepositoryUrl   = $repositoryUrl
}

& ([scriptblock]::Create($script)) @params
```

This script will accomplish the following:

1. Install Chocolatey from the installation script hosted in your internal raw Nexus repository
1. Add the `ChocolateyInternal` source, and enable it for self-service
1. Disable the default `Chocolatey` Community Repository on your endpoints
1. Install your Chocolatey license using the `chocolatey-license` package you created
1. Install the Chocolatey Licensed Extension (without context menus for Package Builder)
1. Install the `ChocolateyGUI` package on the endpoint, for self-service support
1. Install the `chocolatey-agent` package, which supports self-service and CCM communication
1. Enable and disable features related to configuring self-service access on the endpoint
1. Setup the communication channel between the endpoint and CCM, using the correct URL and salts
1. Opt the endpoint into CCM Deployments

## Jenkins

The Jenkins open source automation server application is installed on QDE, and available locally on the VM at port 8080 (<http://localhost:8080>).
As this is a local website, and accessible over HTTP, it is our recommendation to just utilize the tool locally on the VM itself, instead of making it accessible elsewhere.

If you **must** open up access to Jenkins internally, we advise you to review the following documentation in order to better secure that access:

* [Jenkins Security Recommendations](https://www.jenkins.io/doc/book/system-administration/security/)
* [Jenkins SSL Setup by Sam Gleske](http://sam.gleske.net/blog/engineering/2016/05/04/jenkins-with-ssl.html)

> :warning: **Warning**
>
> As Jenkins is more of a "set-and-forget" service, we strongly advise you **do not** open up access to the Jenkins web console, but rather just use the web console on the QDE VM itself as needed.
> If you must, we recommend you only access it over your internal network, or via a VPN.
