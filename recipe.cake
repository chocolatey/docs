#load nuget:https://pkgs.dev.azure.com/cake-contrib/Home/_packaging/addins/nuget/v3/index.json?package=Cake.Wyam.Recipe&prerelease

if(BuildSystem.IsLocalBuild)
{
    Environment.SetVariableNames(
        githubUserNameVariable: "CHOCOLATEYDOCS_GITHUB_USERNAME",
        githubPasswordVariable: "CHOCOLATEYDOCS_GITHUB_USERNAME",
        wyamAccessTokenVariable: "CHOCOLATEYDOCS_WYAM_ACCESS_TOKEN",
        wyamDeployRemoteVariable: "CHOCOLATEYDOCS_WYAM_DEPLOY_REMOTE",
        wyamDeployBranchVariable: "CHOCOLATEYDOCS_WYAM_DEPLOY_BRANCH"
    );
}
else
{
    Environment.SetVariableNames();
}

BuildParameters.SetParameters(context: Context,
                            buildSystem: BuildSystem,
                            title: "docs",
                            repositoryOwner: "chocolatey",
                            repositoryName: "docs",
                            appVeyorAccountName: "chocolatey",
                            webHost: "chocolatey.github.io/docs/",
                            shouldPurgeCloudflareCache: false,
                            wyamRecipe: "Docs",
                            wyamTheme: "Samson",
                            webLinkRoot: "docs");

BuildParameters.PrintParameters(Context);

Build.Run();