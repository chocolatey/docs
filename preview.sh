# Default port
DEFAULT_PORT=5080

# Check if the first argument is present
if [ $# -ge 1 ]; then
    # Use the first argument as the port
    PORT="$1"
else
    # Use the default port if no argument is provided
    PORT="$DEFAULT_PORT"
fi

dotnet tool restore
dotnet cake --port="$PORT"
