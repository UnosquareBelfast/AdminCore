// --------------------------------------------------------------------------------------------------------------------
// <copyright file="ConfigurationProvider.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the ConfigurationProvider type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.Services.Configuration
{
  using System;

  using Admincore.Common.Interfaces;
  using Admincore.Constants;

  /// <summary>
  /// The configuration provider.
  /// </summary>
  public class ConfigurationProvider : IConfiguration
  {


    /// <summary>
    /// The retrieve connection string.
    /// </summary>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    public string RetrieveConnectionString()
    {
      return Environment.GetEnvironmentVariable(EnvironmentVariables.DbConnectionString) ??
             "User ID=user;Password=password;Server=localhost;Port=5432;Database=HrManager;Integrated Security=true;Pooling=true;";
    }
  }
}
