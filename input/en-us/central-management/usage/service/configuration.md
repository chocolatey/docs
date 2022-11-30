---
Order: 10
xref: ccm-usage-service-configuration
Title: Configuration
Description: Information about the configuration options available for the CCM Service
---

## Chocolatey Central Management Service Configuration File

> :choco-warning: **WARNING**
>
> Any changes to the `chocolatey-central-management.exe.config` file will require that the Chocolatey Central Management Service be restarted.

There are a number of configuration options within the `chocolatey-central-management.exe.config` to control how the Chocolatey Central Management Service operates.

### StaleActiveTimeoutBufferInSeconds

The amount of time, in seconds, to add as a buffer when checking for stale active computers in Chocolatey Central Management.

Default Value: `600`

### UpdateKpisTimerIntervalInSeconds

The amount of time, in seconds, of the interval between each execution of updating the Chocolatey Central Management KPIs (Key Performance Indicators).

Default Value: `180`

### CheckForComputerInformationMessagesToProcessTimerIntervalInSeconds

The amount of time, in seconds, of the interval between checking for computer information messages to process in Chocolatey Central Management.

Default Value: `30`

### CheckForDeploymentStepResultMessagesToProcessTimerIntervalInSeconds

The amount of time, in seconds, of the interval between checking for deployment step result messages to process in Chocolatey Central Management.

Default Value: `30`

### CheckForUnreachableComputersTimerIntervalInSeconds

The amount of time, in seconds, of the interval between checking for unreachable computers in Chocolatey Central Management.

Default Value: `180`

### CheckForStaleActiveDeploymentComputersTimerIntervalInSeconds

The amount of time, in seconds, of the interval between checking for stale active computers in Chocolatey Central Management.

Default Value: `240`

### CheckForScheduledDeploymentPlansTimerIntervalInSeconds

The amount of time, in seconds, of the interval between checking for scheduled deployments in Chocolatey Central Management.

Default Value: `60`

### ComputerInformationMessagesFolderPath

The path to the folder where incoming computer information messages will be stored.

Default Value: `C:\ProgramData\chocolatey\services\computer_information_messages`

### ComputerInformationMessagesProcessingFolderPath

The path to the folder where computer information messages will be processed.

Default Value: `C:\ProgramData\chocolatey\services\computer_information_messages_processing`

### DeploymentStepResultMessagesFolderPath

The path to the folder where incoming deployment step result messages will be stored.

Default Value: `C:\ProgramData\chocolatey\services\deployment_step_result_messages`

### DeploymentStepResultMessagesProcessingFolderPath

The path to the folder where deployment step result messages will be processed.

Default Value: `C:\ProgramData\chocolatey\services\deployment_step_result_messages_processing`

### DeploymentStepResultMessagesFailedFolderPath

The path to the folder where deployment step result messages that failed to process will be stored. _(Available since v0.8.0)_

Default Value: `C:\ProgramData\chocolatey\services\deployment_step_result_messages_failed`

## Chocolatey Configuration File

> :choco-info: **NOTE**
>
> When changes are made to these settings via the `choco config` command, there is no requirement to restart the CCM Service. These changes will be automatically picked up, and the necessary components within the CCM Service updated to use the changed values.

### centralManagementServiceUrl

The is the URL that is used by the Chocolatey Central Management Service to listen for incoming requests from the Chocolatey Agents installed on client machines.  This configuration setting is used by both the Chocolatey Central Management Service, as well as Chocolatey Agent.

Default Value: `https://<Fully-Qualified-Domain-Name-Of-Host-Computer>:24020/ChocolateyManagementService`

### centralManagementReceiveTimeoutInSeconds

The amount of time, in seconds, that the Chocolatey Central Management Service connection can remain inactive, during which no application messages are received, before it is dropped.

Default Value: `30`

### centralManagementSendTimeoutInSeconds

The amount of time, in seconds, that the Chocolatey Central Management Service will wait before raising an exception when attempting to perform a write operation.

Default Value: `30`

### centralManagementMaxReceiveMessageSizeInBytes

The maximum size, in bytes, for a message that can be processed by the Chocolatey Central Management Service.

Default Value: `2147483647`