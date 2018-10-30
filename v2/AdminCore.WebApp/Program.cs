// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Program.cs" company="Medtel">
//   Medtel
// </copyright>
// <summary>
//   Defines the Program type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.WebApi
{
  using Microsoft.AspNetCore;
  using Microsoft.AspNetCore.Hosting;

  /// <summary>
  /// The program.
  /// </summary>
  public class Program
    {
      /// <summary>
      /// The main.
      /// </summary>
      /// <param name="args">
      /// The args.
      /// </param>
      public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

      /// <summary>
      /// The create web host builder.
      /// </summary>
      /// <param name="args">
      /// The args.
      /// </param>
      /// <returns>
      /// The <see cref="IWebHostBuilder"/>.
      /// </returns>
      public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                .UseUrls("http://localhost:8081")
                .UseStartup<Startup>();
    }
}
