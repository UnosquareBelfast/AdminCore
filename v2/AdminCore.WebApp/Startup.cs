// --------------------------------------------------------------------------------------------------------------------
// <copyright file="Startup.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The startup.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Text;
using AdminCore.Services.Configuration;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.AzureAD.UI;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;

namespace AdminCore.WebApi
{
  /// <summary>
  ///   The startup.
  /// </summary>
  public class Startup
  {
    /// <summary>
    ///   Initializes a new instance of the <see cref="Startup" /> class.
    /// </summary>
    /// <param name="configuration">
    ///   The configuration.
    /// </param>
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    /// <summary>
    ///   Gets the configuration.
    /// </summary>
    public IConfiguration Configuration { get; }

    /// <summary>
    ///   This method gets called by the runtime. Use this method to add services to the container.
    /// </summary>
    /// <param name="services">
    ///   The services.
    /// </param>
    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().AddJsonOptions(options =>
      {
        options.SerializerSettings.ReferenceLoopHandling =
          Newtonsoft.Json.ReferenceLoopHandling.Ignore;
      });
      services.AddCors();
    
      services.AddAuthentication(AzureADDefaults.AuthenticationScheme)
        .AddAzureAD(options => Configuration.Bind("AzureAd", options));

      services.Configure<OpenIdConnectOptions>(AzureADDefaults.OpenIdScheme, options =>
      {
        options.Authority = options.Authority + "/v2.0/";
        options.TokenValidationParameters.ValidateIssuer = false;
      });

      services.AddMvc(options =>
        {
          var policy = new AuthorizationPolicyBuilder()
            .RequireAuthenticatedUser()
            .Build();
          options.Filters.Add(new AuthorizeFilter(policy));
        })
        .SetCompatibilityVersion(CompatibilityVersion.Version_2_1);

      services.AddCors(
        options =>
        {
          options.AddPolicy(
            "CorsPolicy",
            builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader().AllowCredentials());
        });

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Info {Title = "AdminCore Documentation", Version = "v1"});
      });

      DependencyInjection.RegisterDependencyInjection(services);
    }

    /// <summary>
    ///   This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    /// </summary>
    /// <param name="app">
    ///   The app.
    /// </param>
    /// <param name="env">
    ///   The env.
    /// </param>
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
        app.UseDeveloperExceptionPage();
      else
      {
        app.UseHsts();
        app.UseAuthentication();
      }

      app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

      app.UseHttpsRedirection();

      app.UseSwagger();
      app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "AdminCore Documentation V1"); });

      app.UseMvc(routes =>
      {
        routes.MapRoute(
          name: "default",
          template: "{controller=SingleSignOn}/{action=AzureLogin}/{id?}");
      });
    }
  }
}