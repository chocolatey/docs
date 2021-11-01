ARG VARIANT="3.1-focal"
FROM mcr.microsoft.com/vscode/devcontainers/dotnet:0-${VARIANT}

ARG NODE_VERSION="14"
RUN if [ "${NODE_VERSION}" != "none" ]; then su vscode -c "umask 0002 && . /usr/local/share/nvm/nvm.sh && nvm install ${NODE_VERSION} 2>&1"; fi