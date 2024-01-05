---
Order: 60
xref: upgrade-jenkins
Title: Upgrading Jenkins
Description: How to upgrade jenkins
---

## Upgrade Jenkins in Quick Start Environment

This document outlines the process for upgrading Jenkins, and it's Java dependency running on your Quick Start Environment.
This guide assumes your server has access to the internet to internalize the needed packages from the Chocolatey community repository.
If your server is internet restricted, please internalize the needed packages on a machine that does have internet access, then push these packages to your internal repository.

> :choco-warning: **WARNING**
>
> The current Jenkins package requires Java version 17 or 21 which hasn't been added as a package dependency to jenkins (due to the numerous flavours of Java out there). As part of the Quick Start Guide setup we install the temurin21jre package. However any Java version 17 or 21 package will work.
>
> More information is available in the [Java support policy documentation](https://www.jenkins.io/doc/book/platform-information/support-policy-java/).

## Instructions

1. Internalize the Jenkins package and push it to your internal repo.
2. Internalize a java package compatible with Jenkins and push it to your internal repo. We recommend the [temurin21jre package](https://community.chocolatey.org/packages/Temurin21jre).
3. Upgrade the temurin21jre and Jenkins packages (Example commands provided below).

> :choco-info: **Internalizing Note**
>
> You can add the temurin21jre and Jenkins packages to your Jenkins pipelines, setup by the Quick Start Guide, to help keep new versions of these packages in your internal repo.

### Example Upgrade Commands:

```powershell
choco upgrade temurin21jre --package-parameters="/ADDLOCAL=FeatureJavaHome" -y --source="'Your Internal Repo'"
```

```powershell
choco upgrade jenkins -y --source="'Your Internal Repo'"
```
