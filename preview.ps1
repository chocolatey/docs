param(
    [Parameter(Position = 0)]
    [int]
    $Port = 5080
)

try {
    Push-Location $PSScriptRoot
    dotnet tool restore
    dotnet cake --port $Port
} finally {
    Pop-Location
}
