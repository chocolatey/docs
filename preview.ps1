try {
    Push-Location $PSScriptRoot
    dotnet tool restore
    dotnet cake
} finally {
    Pop-Location
}