// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EvolveDataMigration.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the EvolveDataMigration type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------


namespace AdminCore.Services.Configuration
{
  using System;
  using System.Collections.Generic;
  using System.Data;
  using System.Diagnostics.CodeAnalysis;
  using Admincore.Common.Interfaces;
  using Microsoft.Extensions.Configuration;
  using Npgsql;
  using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

  /// <summary>
  /// The evolve data migration.
  /// </summary>
  public class EvolveDataMigration : IDataMigration
  {
    private readonly IConfiguration _configuration;

    public EvolveDataMigration(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    [ExcludeFromCodeCoverage]
    public virtual void ExecuteMigration(Evolve.Evolve evolve)
    {
      evolve.Migrate();
    }

    public void Migrate()
    {
      try
      {
        using (var dbConnectionString = RetrieveDatabaseConnection())
        {
          var evolve = RetrieveEvolve(dbConnectionString, Console.Write);
          ExecuteMigration(evolve);
        }
      }
      catch (Exception ex)
      {
        //TODO Add Logger
        throw;
      }
    }

    /// <summary>
    /// The retrieve database connection.
    /// </summary>
    /// <returns>
    /// The <see cref="IDbConnection"/>.
    /// </returns>
    public virtual IDbConnection RetrieveDatabaseConnection()
    {
      return new NpgsqlConnection(_configuration.GetConnectionString("AdmincoreDatabase"));
    }

    /// <summary>
    /// The retrieve evolve.
    /// </summary>
    /// <param name="connection">
    /// The connection.
    /// </param>
    /// <param name="logger">
    /// The logger.
    /// </param>
    /// <returns>
    /// The <see cref="Evolve"/>.
    /// </returns>
    public virtual Evolve.Evolve RetrieveEvolve(IDbConnection connection, Action<string> logger)
    {
      return new Evolve.Evolve(connection, logger)
      {
        Locations = new List<string> { "db/migrations" },
        IsEraseDisabled = true
      };
    }
  }
}