---
xref: intune-configuration
Title: Intune Configuration
Description: Intune specific configuration available for available commands
---

## Summary

This document contains information about the configuration values available through the use of
`choco config` and similar commands that are a part of the new Intune functionality.

## Configuration Values

Several new configuration values can be set/updated for the new Intune functionality.
These configuration values are for pushing packages to your Intune tenant, and most do not need to be changed.

- `intuneTenantGUID` - The tenant to use by default when no `--source` argument is used on the `push` command.
  The GUID is available on the Azure AD Application page. (_An FQDN can be used instead of a GUID; however, we recommend using the GUID_).
- `intuneAuthenticationUrl` - The URL used when authenticating to the Microsoft Intune API.
- `intuneApiUrl` - The URL used when handling requests to the Intune API, for instance, when checking for available packages on Intune.
- `intuneRetryIntervalInSeconds` - The amount of time, in seconds, that Chocolatey should wait before retrying any calls to the Intune API (_Defaults to 5 seconds_).
- `intuneUploadTimeoutInSeconds` - The amount of time, in seconds, that Chocolatey should wait for completion while uploading files to Intune (_Defaults to 600 seconds_).
- `intuneUploadChunkSizeInMegabytes` - The size of the file, in Megabytes, below which Chocolatey will split the upload into multiple chunks. Above this size, Chocolatey will make a best effort to break the upload into logical chunk sizes (_Defaults to 10 Megabytes_).

## API Keys

When pushing packages to an Intune tenant, a combination of a client id and client secret is needed.
These can be set similarly as regular pushes of Chocolatey packages, where the source argument is the GUID or FQDN of the tenant,
and the source argument is in the format of `<CLIENT ID>:<CLIENT SECRET>`, which is separated by a colon.
