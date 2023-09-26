---
Order: 60
xref: upgrade-jenkins
Title: Upgrading Jenkins
Description: How to upgrade jenkins
---

## Upgrade Jenkins in Quick Start Environment

This document outlines the process for upgrading Jenkins running inside our Quick Start Environment.
The script provided assumes your server has access to the internet to download the Jenkins package from the community repository.
If your server is restricted then internalize the package to your internal repository and update the source in the script appropriately.

> :choco-warning: **WARNING**
>
> The current Jenkins package requires a Java 18 or 11 which hasn't been added as a dependency (due to the numerous flavours of Java out there). As part of the Quick Start Guide setup we install the temurin11jre package. However any Java version 11 or 18 package will work.

## Instructions

1. Internalize the nexus-repository package and push to your internal repo
2. Internalize a java package compatible with Jenkins and push to your internal repo. We recommend the [temurin11jre package](https://community.chocolatey.org/packages/Temurin11jre) used during setup in the Quick Start Guide.
3. choco upgrade the temurin11jre and nexus-repository packages (Example command provided below)

> :choco-info: **Internalizing Note**
>
> You can add the temurin11jre and jenkins packages to your jenkins pipelines, setup by the Quick Start Guide, to help keep new versions of these packages in your internal repo.

### Example Upgrade Command:

```powershell
choco upgrade temruin11jre jenkins -y --source="'Your Internal Repo'"
```
