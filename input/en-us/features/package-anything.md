---
Order: 30
xref: package-anything
Title: Package anything
Description: With Chocolatey you can package up anything, whether it is installers, application, zip, scripts, etc
---

Chocolatey brings with it the concept of a Universal Packaging format for Windows. At the heart of this is [PowerShell](xref:packaging-for-the-masses), the automation language for Windows.

Since on a Windows machine you can pretty much do "anything" with PowerShell, you can pretty much do "anything" within a Chocolatey package. If you need to

- install an msi or an exe
- deploy a standalone binary
- unzip an archive file
- place some scripts into a particular folder

Then you can do all of these with Chocolatey. The benefit comes that you will then know exactly what version of these artifacts are deployed onto any machine, and as a result, you will know when some of these artifacts need to be updated. Gone are the days of guessing at what version of a binary is deployed onto any given machine.

When you couple this with the knowledge that a single Chocolatey package can take a dependency on another Chocolatey package, then you can quite quickly see how simple it can be to chain together a complex installation scenario. For example, lets imagine that you want to install the [vscode application](https://community.chocolatey.org/packages/vscode), but you also wanted to perform some custom configuration after the installation was performed. You could create a separate package called `vscode-config`, which takes a dependency on `vscode`, and in that package, you could perform all the necessary configuration that you wanted to achieve. Then, when you run:

```powershell
choco install vscode-config
```

Chocolatey will first ensure that all dependencies for this packages are met, and will install the vscode package. Once complete, the installation of the vscode-config package will happen, and your custom configuration will be applied. The beauty of this approach is separation of concerns that can be achieved. Here the installation of vscode is completed as a single unit of work, and then the custom configuration is applied afterwards.

On top of this, Chocolatey has the concept of [extension packages](xref:extensions), which means that you can encapsulate common operations into a single Chocolatey package, which can then be used as a dependency on any other package that needs that functionality. This makes it incredibly simple to consolidate re-usable scripts into an versioned package, that can be used across multiple computers, and packages. A prime example of this is the [chocolatey-core.extension](https://community.chocolatey.org/packages/chocolatey-core.extension) package which was created by the Chocolatey Community to provide additional functionality on top of the core functions of Chocolatey itself.