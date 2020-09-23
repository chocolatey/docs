using System.Threading.Tasks;
using Docs.Shortcodes;
using Statiq.App;
using Statiq.Common;
using Statiq.Web;

namespace Docs
{
  public static class Program
  {
    public static async Task<int> Main(string[] args) =>
        await Bootstrapper.Factory
            .CreateWeb(args)
            .AddSetting(Keys.Host, "chocolatey.github.io/")
            .AddSetting(Keys.LinkRoot, "/docs")
            .AddSetting(Keys.LinksUseHttps, true)
            .AddSetting(Constants.EditLink, ConfigureEditLink())
            .AddSetting(WebKeys.GatherHeadingsLevel, 3)
            .ConfigureSite("chocolatey", "docs", "master")
            .ConfigureDeployment(deployBranch: "gh-pages")
            .AddShortcode("Children", typeof(ChildrenShortcode))
            .AddShortcode("ColorTable", typeof(ColorTableShortcode))
            .AddShortcode("EmojiTable", typeof(EmojiTableShortcode))
            .AddPipelines()
            .RunAsync();

    private static Config<string> ConfigureEditLink()
    {
      return Config.FromDocument((doc, ctx) =>
      {
        return string.Format("https://github.com/{0}/{1}/edit/{2}/input/{3}",
                  ctx.GetString(Constants.Site.Owner),
                  ctx.GetString(Constants.Site.Repository),
                  ctx.GetString(Constants.Site.Branch),
                  doc.Source.GetRelativeInputPath());
      });
    }
  }
}
