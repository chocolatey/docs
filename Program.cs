using System.Linq;
using System.Threading.Tasks;
using AngleSharp.Html.Dom;
using Docs.Shortcodes;
using Statiq.App;
using Statiq.Common;
using Statiq.Core;
using Statiq.Markdown;
using Statiq.Web;

namespace Docs
{
  public static class Program
  {
    public static async Task<int> Main(string[] args) =>
        await Bootstrapper.Factory
            .CreateWeb(args)
            .AddSetting(Keys.Host, "docs.chocolatey.org/")
            .AddSetting(Keys.LinksUseHttps, true)
            .AddSetting(Constants.EditLink, ConfigureEditLink())
            .AddSetting(WebKeys.GatherHeadingsLevel, 5)
            .ConfigureSite("chocolatey", "docs", "master")
            .ConfigureDeployment(deployBranch: "gh-pages")
            .ConfigureTemplates(templates => ((RenderMarkdown)templates[MediaTypes.Markdown].Module).UseExtension(new Markdig.Extensions.Emoji.EmojiExtension()))
            .AddShortcode("Children", typeof(ChildrenShortcode))
            .AddPipelines()
            .ModifyPipeline(
              nameof(Statiq.Web.Pipelines.Content),
              pipeline => pipeline.ProcessModules.Add(
                new ExecuteConfig(Config.FromDocument(async doc =>
                {
                  var headings = doc.GetDocumentList(Statiq.Html.HtmlKeys.Headings).ToList();
                  if (headings?.Count > 0)
                  {
                    for (int i = 0; i < headings.Count; i++)
                    {
                      IHtmlDocument htmlDocument = await Statiq.Html.HtmlHelper.ParseHtmlAsync(headings[i]);
                      headings[i] = await headings[i].CloneAsync(htmlDocument.Body.TextContent);
                    }
                    return doc.Clone(new MetadataItems
                      {
                        { Statiq.Html.HtmlKeys.Headings, headings }
                      });
                  }
                  return doc;
                }))))
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
