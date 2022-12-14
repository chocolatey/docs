public class BuildData
{
    public string DeployRemote { get; set; }
    public string DeployBranch { get; set; }
    public DirectoryPath PublishDirectory { get; set; }
    public DirectoryPath OutputDirectory { get; set; }
    public string GitHubToken { get; set; }
    public string GitHubUserName { get; set; }
    public string GitHubPassword { get; set; }
    public string ProjectPath { get; set; }

    public BuildData(ICakeContext context)
    {
        if (context == null)
        {
            throw new ArgumentNullException(nameof(context));
        }

        DeployRemote = context.EnvironmentVariable("STATIQ_DEPLOY_REMOTE");
        DeployBranch = context.EnvironmentVariable("STATIQ_DEPLOY_BRANCH");
        PublishDirectory = context.MakeAbsolute(context.Directory("publish"));
        OutputDirectory = context.MakeAbsolute(context.Directory("output"));
        GitHubToken = context.EnvironmentVariable("STATIQ_GITHUB_TOKEN");
        GitHubUserName = context.EnvironmentVariable("STATIQ_GITHUB_USER_NAME");
        GitHubPassword = context.EnvironmentVariable("STATIQ_GITHUB_PASSWORD");
        ProjectPath = context.EnvironmentVariable("STATIQ_PROJECT_PATH");
    }
}