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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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

      var key = Encoding.ASCII.GetBytes("veryVerySecretKey");

      services.AddAuthentication(options =>
        {
          options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
          options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        })
        .AddJwtBearer(options =>
        {
          options.SaveToken = true;
          options.RequireHttpsMetadata = true;
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(key)
          };
        });
      
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
        app.UseHsts();

      app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials());

      app.UseAuthentication();

      app.UseSwagger();
      app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "AdminCore Documentation V1"); });

      app.UseMvc();
    }
  }
}