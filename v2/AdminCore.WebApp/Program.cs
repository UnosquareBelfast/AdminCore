using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace AdminCore.WebApi
{
  public static class Program
  {
    public static void Main(string[] args)
    {
      CreateWebHostBuilder(args).Build().Run();
    }

    public static IWebHostBuilder CreateWebHostBuilder(string[] args)
    {
      return WebHost.CreateDefaultBuilder(args)
        .UseUrls("http://*:8081")
        .UseKestrel()
        .UseStartup<Startup>();
    }
  }
}