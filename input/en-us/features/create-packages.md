---
Order: 40
xref: create-your-own-packages
Title: Create your own packages
Description: Information on how to create your own Chocolatey package
---

Out of the box, Chocolatey comes with the ability for you to create your own Chocolatey packages.  At the heart of any Chocolatey package is [PowerShell](xref:packaging-for-the-masses) (the automation language for Windows), so anything that you can imagine can go into a Chocolatey Package.  This means that you can create a package for:

- Installers
- Binaries
- Zips
- Scripts
- Anything

We have [comprehensive documentation](xref:package-creation) on how to get started creating your first package, but if you want to jump straight in, after [installing Chocolatey](xref:setup-choco), run the following command:

```powershell
choco new mypackage
```

And Chocolatey will create a package, using its built in [templating system](xref:create-custom-package-templates), that also walks you through the process for finalizing your package.