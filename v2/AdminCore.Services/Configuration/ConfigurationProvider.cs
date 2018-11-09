// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ConfigurationProvider.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the ConfigurationProvider type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using AdminCore.Common.Interfaces;
using AdminCore.Constants;
using AdminCore.Constants.Enums;

namespace AdminCore.Services.Configuration
{
  /// <summary>
  ///   The configuration provider.
  /// </summary>
  public class ConfigurationProvider : IConfiguration
  {
    /// <summary>
    ///   The retrieve connection string.
    /// </summary>
    /// <returns>
    ///   The <see cref="string" />.
    /// </returns>
    public string RetrieveConnectionString()
    {
      return Environment.GetEnvironmentVariable(EnvironmentVariables.DbConnectionString) ??
             "User ID=user;Password=password;Server=localhost;Port=5432;Database=AdminCore;Integrated Security=true;Pooling=true;";
    }

    /// <summary>
    ///   Retrieves the migration to use.
    /// </summary>
    /// <returns>The migration type to use.</returns>
    public MigrationTypes RetrieveMigrationType()
    {
      var migrationType = Environment.GetEnvironmentVariable(EnvironmentVariables.DbMigrationType);

      if (Enum.TryParse(typeof(MigrationTypes), migrationType, out var migration)) return (MigrationTypes) migration;

      return MigrationTypes.Migrate;
    }
  }
}