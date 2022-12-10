try {
    Push-Location $PSScriptRoot
    dotnet tool restore
    dotnet cake recipe.cake
} finally {
    Pop-Location
}