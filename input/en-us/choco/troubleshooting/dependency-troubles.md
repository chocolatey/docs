---
Order: 10
xref: choco-dependency-troubles
Title: Dependency Troubleshooting in Chocolatey CLI
Description: Troubleshooting steps for when you encounter issues related to dependencies.
---

## `choco upgrade all` Fails to Upgrade a Package, Which Cascades into Failing Many More Seemingly Unrelated Packages

Due to the way dependency resolution works, packages with certain dependency specifications can occasionally trigger undesirable behaviour when using `choco upgrade all` if the dependencies fail to install.
Typically this will be encountered with meta-packages, such as `obs-studio` which takes a dependency on `obs-studio.install`.
When running `choco upgrade all` it will attempt to upgrade every installed package. Any packages which fail to install may be retried as part of a later dependency chain.
For example, `obs-studio.install` may be upgraded, fail, and then later be tried again as part of the dependency chain for `obs-studio` itself.
As a result, Chocolatey CLI's packages may be in an inconsistent state.
This is typically characterised by a dependency resolution error message when performing package operations:

```cmd
Unable to resolve dependencies. 'obs-studio.install 29.0.2' is not compatible with 'obs-studio 29.1.1 constraint: obs-studio.install (>= 29.1.1)'.
```

Typically this is resolvable by directly upgrading the affected dependency.
This is normally resolved by upgrading the affected dependency.
In this example, you would run `choco upgrade obs-studio.install` to resolve the issue.

### Example

The following scenario illustrates what can happen during an `upgrade all` where a dependency fails to install.
In this example, `obs-studio` installs, but `obs-studio.install` fails.
Due to the dependency version range specified by `obs-studio`, the version of `obs-studio.install` that remains installed (due to the upgrade failure) does not satisfy the dependency requirement.

To resolve the issue, we run `choco upgrade obs-studio.install` to get the correct dependency version installed.
For packages that have a specific version dependency, add the `--version` option and specify the exact version to install.

![Partial output from choco upgrade all, showing that obs-studio.install is attempted and failed](/assets/images/chocolatey/dependency-resolution-failure-1.png)
![Continued output from choco upgrade all, showing that obs-studio metapackage is installed and subsequently re-attempts the upgrade to obs-studio.install which again fails, followed by a dependency resolution error in the next package and failing a seemingly unrelated package installation](/assets/images/chocolatey/dependency-resolution-failure-2.png)
