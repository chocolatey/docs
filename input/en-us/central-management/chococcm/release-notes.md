---
Order: 20
xref: chococcm-release-notes
Title: Release Notes
Description: Release Notes for ChocoCCM
---

# Chocolatey Release Notes - ChocoCCM

## Summary

This covers the release notes for the ChocoCCM PowerShell Module, which is available for installation from the [PowerShell Gallery](https://www.powershellgallery.com/packages/ChocoCCM). For more information, installation options, etc, please refer to [ChocoCCM](xref:chococcm).

> :memo: **NOTE**
>
> This PowerShell Module requires an installation of at least CCM v0.4.0 in order to be fully compatible.

## 0.2.0 (April 1, 2021)

### BUG FIXES

* Fix - Add-CCMGroup throws `HTTP 400` error
* Fix - Add-CCMGroupMember throws `HTTP 400` error
* Fix - Fetching Deployment by ID fails when Deployment is not in Draft or Ready state
* Fix - Get-CCMGroupMember has incorrect URL
* Fix - Export-CCMDeploymentReport is not exported by the module

## IMPROVEMENTS

* Added a new Remove-CCMGroup cmdlet to allow removal of a group
* Added a new Remove-CCMGroupMember cmdlet to allow removal a computer or group from a CCM group
* Added functionally to the Get-CCMDeploymentStep cmdlet to allow retrieval of deployment steps, results, and logs from a deployment step and its computers

## 0.1.1 (December 4, 2020)

### BUG FIXES

* Fix - New-CCMDeploymentStep Throws HTTP 400 Error
* Fix - Not all functions are returning all objects by default

## 0.1.0 (November 13, 2020)

Initial preview release

### FEATURES
* PowerShell functions are provided for interacting with the core entities within CCM via the Web API
  * Roles
  * Groups
  * Computers
  * Deployments
  * Outdated Software
  * Reports