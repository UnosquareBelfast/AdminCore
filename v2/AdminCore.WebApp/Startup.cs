using AdminCore.Services.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;

namespace AdminCore.WebApi
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {
      services.AddMvc().AddJsonOptions(options =>
      {
        options.SerializerSettings.ReferenceLoopHandling =
          Newtonsoft.Json.ReferenceLoopHandling.Ignore;
      });

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

      services.AddSwaggerGen(c =>
      {
        c.SwaggerDoc("v1", new Info { Title = "AdminCore Documentation", Version = "v1" });
      });

      DependencyInjection.RegisterDependencyInjection(services);
    }

    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
        app.UseCors(x => x
          .AllowAnyOrigin()
          .AllowAnyMethod()
          .AllowAnyHeader()
          .AllowCredentials());
      }
      else
        app.UseHsts();

      app.UseAuthentication();

      app.UseSwagger();
      app.UseSwaggerUI(c => { c.SwaggerEndpoint("/swagger/v1/swagger.json", "AdminCore Documentation V1"); });

      app.UseMvc();
    }
  }
}