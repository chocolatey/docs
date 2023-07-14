---
Order: 35
xref: sensitive-inputs
Title: Sensitive Inputs
Description: Information on inputs that are hidden from the Chocolatey logs if detected
---

By default Chocolatey will omit logging commands or parameters that could potentially contain sensitive information.

## Commands hidden from logs

* `apikey`
* `config`
* `push`

## Parameters hidden from logs

* `--install-arguments-sensitive`
* `--package-parameters-sensitive`
* `-p`
* `--password`
* `-cp`
* `--certpassword`
* `-k`
* `--key`
* `--apikey`
* `--api-key`
