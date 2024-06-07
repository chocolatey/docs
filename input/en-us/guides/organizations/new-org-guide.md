## Overview

<?! Include "../../../shared/organizational-deployment/nexus-overview.txt" /?>

### Pre-Requisites

### Install Sonatype Nexus

### Configuring Sonatype Nexus

#### Removing Default Repositories

#### Configure Hosted Repositories

#### Configure Raw (Generic) Repositories

#### Authentication Considerations

Authenticating to a repository hosted in Sonatype Nexus via the Chocolatey client should follow the security requirements of your organization. For some organizations, the clients communicate on internal networks, and have no egress so having anonymous authentication to the repository is deemed acceptable.

Sonatype Nexus supports local user authentication and LDAP autentication in the Open Source version, and supports User Token based authentication in their paid Nexus Repository Pro offering. Chocolatey CLI Supports all of these scenarios.

#### Package Cleanup Policies

Cleanup Policies are used in Sonatype Nexus to keep the number of stored components in your repositories at a level that helps maintain
the stability of your server. When left unchecked repositories become unperformant when a large number of components are stored inside the repository. This impacts things such as search and disk space.

We recommend you keep _at least_ N+2 versions of packages in your repository, as Chocolatey has a very easy to use downgrade procedure should the latest version of a package cause inconsistent behavior anywhere in your organization. To configure a Cleanup Policy, consult the [documentation](httpsa://ch0.co/nexus-cleanup-policy) on Sonatype's website.

>
> :warning: Be sure to follow the documentation to configure the [Compact Blob Store](https://ch0.co/nexus-tasks) task, as Cleanup Policies
>by default perform a soft delete, keeping any data on disk until the `Compact Blob Store` task is executed.
>

#### Package Storage Requirements (Blob Stores)

Sonatype Nexus stores packages in what it calls a Blob Store. When you upload a package to the repository, Nexus indexes this file into the blob store as a binary representation of the file. For a standard Chocolatey installation we recommend you start with 500GB of disk space for your Blob store. To configure the blob store for your organization, consult the [documentation](https://ch0.co/nexus-blobs) on Sonatype's website. For information on setting up the authentication your organization requires see the [documentation](https://ch0.co/nexus-authentication) for information and instructions.