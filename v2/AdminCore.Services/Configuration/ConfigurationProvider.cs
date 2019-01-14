using AdminCore.Common.Interfaces;
using AdminCore.Constants;
using AdminCore.Constants.Enums;
using System;

namespace AdminCore.Services.Configuration
{
  public class ConfigurationProvider : IConfiguration
  {
    public string RetrieveConnectionString()
    {
      return Environment.GetEnvironmentVariable(EnvironmentVariables.DbConnectionString) ??
             "User ID=user;Password=password;Server=localhost;Port=5432;Database=AdminCore;Integrated Security=true;Pooling=true;";
    }

    public MigrationTypes RetrieveMigrationType()
    {
      var migrationType = Environment.GetEnvironmentVariable(EnvironmentVariables.DbMigrationType);

      if (Enum.TryParse(typeof(MigrationTypes), migrationType, out var migration)) return (MigrationTypes)migration;

      return MigrationTypes.Migrate;
    }
  }
}