using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Octokit;
using Statiq.Common;

namespace Statiq.Web.GitHub
{
  internal static class GitHubClientExtensions
  {
    public static async Task<TResult> CallAsync<TResult>(this IGitHubClient client, IExecutionContext context, Func<IGitHubClient, Task<TResult>> func)
    {
      if (client is null)
      {
        throw new ArgumentNullException(nameof(client));
      }

      if (context is null)
      {
        throw new ArgumentNullException(nameof(context));
      }

      if (func is null)
      {
        throw new ArgumentNullException(nameof(func));
      }

      int tries = 3;
      while (true)
      {
        if (tries == 0)
        {
          throw new InvalidOperationException("Exceeded maximum retries. Sorry :(");
        }

        try
        {
          return await func(client);
        }
        catch (RateLimitExceededException ex)
        {
          TimeSpan diff = ex.Reset - DateTimeOffset.Now;
          if (diff.TotalSeconds > 10)
          {
            string message = $"Rate limit was exceeded, and we can't wait {diff.TotalSeconds} seconds";
            throw new InvalidOperationException(message, ex);
          }

          // Wait a little while
          double waitTime = diff.TotalSeconds + 2;
          context?.LogInformation("Waiting {0} seconds due to rate limiting...", waitTime);
          await Task.Delay(TimeSpan.FromSeconds(waitTime));
        }
        catch (AbuseException ex)
        {
          if (ex.RetryAfterSeconds != null)
          {
            // Wait a little while
            int waitTime = ex.RetryAfterSeconds.Value + 2;
            context?.LogInformation("Waiting {0} seconds due to abuse detection...", waitTime);
            await Task.Delay(TimeSpan.FromSeconds(waitTime));
          }
          else
          {
            throw new InvalidOperationException("Abuse detected, but no retry time was specified.", ex);
          }
        }
        finally
        {
          tries = tries - 1;
        }
      }
    }
  }
}
