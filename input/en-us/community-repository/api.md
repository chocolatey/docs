---
Order: 20
xref: ccr-api
Title: API Querying
Description: Information about querying the Chocolatey Community Repository API.
---

The Chocolatey Community Repository provides an API to allow package queries to be made, and results to be provided.
We hope to be able to answer your questions on what is supported and what is not supported, and on the acceptable ways that you can query the repository.

## API Protocol

> :choco-info: **NOTE**
>
> Chocolatey CLI and `chocolatey.lib` versions 1.x and earlier, used NuGet v2 OData Core libraries.

The Chocolatey Community Repository uses the v2 OData protocol for queries, utilizing the NuGet v2 OData specification, where it is defined. Unfortunately, NuGet v2 OData specification is only loosely defined so one OData endpoint _may_ respond with different results to another, if it responds at all.

Chocolatey CLI and `chocolatey.lib` use the NuGet v2 OData Client libraries to query, and process requests from, the Chocolatey Community Repository.

## Supported API Query Tools

We only support the following tools to query the Chocolatey Community Repository API:

* [Chocolatey CLI](xref:choco)
* [`chocolatey.lib`](https://www.nuget.org/packages/chocolatey.lib)

While you may create your own queries, and get results, this is not supported and may break in the future. Your own queries working today, are not guaranteed to work in the future. To guard against this happening, only use the supported methods above, to query the Chocolatey Community Repository.

### Chocolatey CLI Machine Readable Output

To get machine-readable output when querying the Chocolatey Community Repository using Chocolatey CLI, use the `--limit-output` command line option. See our documentation for more information on [scripting and best practices](xref:choco-commands#scripting-integration-best-practices-style-guide).

For example, to search for all packages containing the word `kitty`:

```powershell
PS> choco search kitty
Chocolatey v2.2.2
kitty 0.76.1.13 [Approved]
kitty.portable 0.67.0 [Approved]
superputty 1.5.0 [Approved]
superputty.install 1.5.0 [Approved]
superputty.portable 1.5.0 [Approved]
5 packages found.
```

For the same query, but with machine-readable output:

```powershell
PS> choco search kitty --limit-output
kitty|0.76.1.13
kitty.portable|0.67.0
superputty|1.5.0
superputty.install|1.5.0
superputty.portable|1.5.0
```

You can easily parse the output to get a PowerShell object:

```powershell
PS> choco search kitty --limit-output | ConvertFrom-CSV -Delimiter '|' -Header 'Name','Version'

Name                Version
----                -------
kitty               0.76.1.13
kitty.portable      0.67.0
superputty          1.5.0
superputty.install  1.5.0
superputty.portable 1.5.0
```

## Querying

While we only support querying the Chocolatey Community Repository with [these tools](#supported-api-query-tools), there will be people who create their own queries.
We don't recommend this, but want to ensure if you are doing it, you do it safely.

### Item Limit

The total number of items returned from any query is limited to 10,000. This also affects paging. Attempting to retrieve item 10,001 will return an error of HTTP Status Code `406 - Not Acceptable`.

Note that this affects both manual queries and queries made through Chocolatey CLI, Chocolatey GUI, and `chocolatey.lib`.

This will be unlikely to affect the vast majority of users and will be limited to customers or community members who are retrieving a list of all packages, or paging through all packages, rather than searching for specific ones. If you have a legitimate need to regularly retrieve a full list of packages, please reach out to us on [Community Chat](https://ch0.co/community).

### Using the `orderby` Parameter

The following `orderby` parameters can be used to sort the results before they are returned:

* `DownloadCount`
* `Published`
* `Id`
* `Title`
* `Version`

If an unsupported `orderby` parameter is used, an HTTP Status Code `406 - Not Acceptable` response will be returned.

An optional direction, `asc` for ascending, or `desc` for descending can be used with `orderby` parameters, for example `orderby=Version desc`.

### Filtering

Filtering should only be done using a [supported tool](#supported-api-query-tools) as there are too many filters and options to list here.

And herein lies the problem.

Because there are so many filters and options, an attempt is made to parse them and return results.
However, because of the complex nature of the queries, it may return an empty result, nothing or an HTTP Status Code `406 - Not Acceptable`. 

Any filter that is used more than once in the query, will return an HTTP Status Code `406 - Not Acceptable`.

### `GetUpdates` Endpoint

The `GetUpdates` endpoint is not supported and any call to it will return an HTTP Status code of `410 - Gone`.

## Questions?

If you are using a [supported tool](#supported-api-query-tools) and have questions about queries, please reach out to us on [Community Chat](https://ch0.co/community).
