namespace Docs.Utilities
{
    public static class VersionUtilities
    {
        public static string GetSha()
        {
            return ThisAssembly.Git.Sha;
        }

        public static string GetCommit()
        {
            return ThisAssembly.Git.Commit;
        }
    }
}