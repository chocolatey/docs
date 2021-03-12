using Statiq.Common;
using System.Collections.Generic;
using System.Linq;

namespace Docs
{
    public static class DocumentExtensions
    {
        public static string GetDescription(this IDocument document)
        {
            return document?.GetString(Constants.Description, string.Empty) ?? string.Empty;
        }

        public static bool IsVisible(this IDocument document)
        {
            if (document.GetContentStringAsync().GetAwaiter().GetResult().Contains("<title>Redirected</title>"))
            {
                return false;
            }

            return document.GetBool(Constants.ShowInSidebar, true);
        }

        public static bool ShowLink(this IDocument document)
        {
            return !document.GetBool(Constants.NoLink, false);
        }

        public static IEnumerable<IDocument> OnlyVisible(this IEnumerable<IDocument> source)
        {
            return source.Where(x => x.IsVisible());
        }

        public static IEnumerable<IDocument> OnlyRequirements(this IEnumerable<IDocument> source)
        {
            return source.Where(x => x.GetString("RuleType", string.Empty) == "Requirement");
        }

        public static IEnumerable<IDocument> OnlyGuidelines(this IEnumerable<IDocument> source)
        {
            return source.Where(x => x.GetString("RuleType", string.Empty) == "Guideline");
        }

        public static IEnumerable<IDocument> OnlySuggestions(this IEnumerable<IDocument> source)
        {
            return source.Where(x => x.GetString("RuleType", string.Empty) == "Suggestion");
        }

        public static IEnumerable<IDocument> OnlyNotes(this IEnumerable<IDocument> source)
        {
            return source.Where(x => x.GetString("RuleType", string.Empty) == "Note");
        }
    }
}