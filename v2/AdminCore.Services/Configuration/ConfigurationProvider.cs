using System;
using Admincore.Common.Interfaces;
using Admincore.Constants;

namespace AdminCore.Services.Configuration
{
  public class ConfigurationProvider : IConfiguration
  {
    public string RetrieveConnectionString()
    {
      return Environment.GetEnvironmentVariable(EnvironmentVariables.DbConnectionString) ??
             "User ID=user;Password=password;Server=localhost;Port=5432;Database=AdminCore;Integrated Security=true;Pooling=true;";
    }
  }
}
