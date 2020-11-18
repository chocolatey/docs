#module nuget:?package=Cake.DotNetTool.Module&version=0.4.0
#tool dotnet:https://www.myget.org/F/cake-contrib/api/v3/index.json?package=KuduSync.Tool&version=1.5.4-g3916ad7218
#addin nuget:?package=Cake.Git&version=0.22.0
#addin nuget:?package=Cake.Kudu&version=0.11.0
#addin nuget:?package=Cake.Npm&version=0.17.0
#addin nuget:?package=Cake.Gulp&version=0.12.0

var target = Argument("target", "Default");
var deployRemote = "https://github.com/chocolatey/docs";
var publishDirectory = MakeAbsolute(Directory("publish"));
var outputDirectory = MakeAbsolute(Directory("output"));
var deployBranch = "gh-pages";
var accessToken = EnvironmentVariable("STATIQ_GITHUB_ACCESS_TOKEN");
var projectPath = "./Docs.csproj";

Task("Clean")
    .Does(() =>
{
    var directoriesToClean = new []{
        publishDirectory,
        outputDirectory,
        "./bin",
        "./obj",
        "./temp",
        "./wwwroot"
    };

    CleanDirectories(directoriesToClean);
});

Task("Npm-Install")
    .WithCriteria(() => FileExists("./package.json"), "package.json file not found in repository")
    .IsDependentOn("Clean")
    .Does(() =>
{
    var settings = new NpmInstallSettings();
    settings.LogLevel = NpmLogLevel.Silent;
    NpmInstall();
});

Task("Run-Gulp")
    .WithCriteria(() => FileExists("./gulpfile.js"), "gulpfile.js file not found in repository")
    .IsDependentOn("Npm-Install")
    .Does(() =>
{
    Gulp.Local.Execute();
});


Task("Statiq-Preview")
    .IsDependentOn("Run-Gulp")
    .Does(() =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = "Release"
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("preview --output {0}", outputDirectory)), settings);
});

Task("Statiq-Build")
    .IsDependentOn("Run-Gulp")
    .Does(() =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = "Release"
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("--output {0}", outputDirectory)), settings);
});

Task("Statiq-LinkValidation")
    .IsDependentOn("Run-Gulp")
   .Does(() =>
{
    var settings = new DotNetCoreRunSettings {
      Configuration = "Release",
      ArgumentCustomization = args => args.Append("-a ValidateRelativeLinks=Error -a ValidateAbsoluteLinks=Error")
    };

    DotNetCoreRun(projectPath, new ProcessArgumentBuilder().Append(string.Format("--output {0}", outputDirectory)), settings);
});

Task("Publish-Documentation")
    .IsDependentOn("Statiq-Build")
    .Does(() =>
{
    var sourceCommit = GitLogTip("./");

    CleanDirectory(publishDirectory);
    var publishFolder = publishDirectory.Combine(DateTime.Now.ToString("yyyyMMdd_HHmmss"));

    Information("Publishing Folder: {0}", publishFolder);
    Information("Getting publish branch...");
    GitClone(deployRemote, publishFolder, new GitCloneSettings{ BranchName = deployBranch });

    Information("Sync output files...");

    Kudu.Sync(outputDirectory, publishFolder, new KuduSyncSettings {
        ArgumentCustomization = args=>args.Append("--ignore").AppendQuoted(".git;CNAME")
    });

    if (GitHasUncommitedChanges(publishFolder))
    {
        Information("Stage all changes...");
        GitAddAll(publishFolder);

        if (GitHasStagedChanges(publishFolder))
        {
            Information("Commit all changes...");
            GitCommit(
                publishFolder,
                sourceCommit.Committer.Name,
                sourceCommit.Committer.Email,
                string.Format("Continuous Integration Publish: {0}\r\n{1}", sourceCommit.Sha, sourceCommit.Message)
            );

            Information("Pushing all changes...");
            GitPush(publishFolder, accessToken, "x-oauth-basic", deployBranch);
        }
    }
});

Task("Default")
    .IsDependentOn("Statiq-Preview");

RunTarget(target);