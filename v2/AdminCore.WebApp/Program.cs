// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Program.cs" company="Medtel">
//   Medtel
// </copyright>
// <summary>
//   Defines the Program type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace AdminCore.WebApi
{
  /// <summary>
  ///   The program.
  /// </summary>
  public static class Program
  {
    /// <summary>
    ///   The main.
    /// </summary>
    /// <param name="args">
    ///   The args.
    /// </param>
    public static void Main(string[] args)
    {
      CreateWebHostBuilder(args).Build().Run();
    }

    /// <summary>
    ///   The create web host builder.
    /// </summary>
    /// <param name="args">
    ///   The args.
    /// </param>
    /// <returns>
    ///   The <see cref="IWebHostBuilder" />.
    /// </returns>
    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      return WebHost.CreateDefaultBuilder(args)
        .UseUrls("http://*:8081")
        .UseStartup<Startup>();
    }
  }
}