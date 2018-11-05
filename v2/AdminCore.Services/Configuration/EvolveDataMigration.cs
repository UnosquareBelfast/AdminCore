// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EvolveDataMigration.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the EvolveDataMigration type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.Services.Configuration
{
  using Common.Interfaces;
  using Npgsql;
  using System;
  using System.Collections.Generic;
  using System.Data;
  using System.Diagnostics.CodeAnalysis;

  /// <summary>
  /// The evolve data migration.
  /// </summary>
  public class EvolveDataMigration : IDataMigration
  {
    /// <summary>
    /// The _configuration.
    /// </summary>
    private readonly IConfiguration _configuration;

    /// <summary>
    /// Initializes a new instance of the <see cref="EvolveDataMigration"/> class.
    /// </summary>
    /// <param name="configuration">
    /// The configuration.
    /// </param>
    public EvolveDataMigration(IConfiguration configuration)
    {
      _configuration = configuration;
    }
    
    public void ClearDown()
    {
      ExecuteWithEvolve(ExecuteClearDown);
    }
    
    /// <summary>
    /// The execute clear down.
    /// </summary>
    /// <param name="evolve">
    /// The evolve.
    /// </param>
    [ExcludeFromCodeCoverage]
    public virtual void ExecuteClearDown(Evolve.Evolve evolve)
    {
      evolve.Erase();
    }

    /// <summary>
    /// The execute migration.
    /// </summary>
    /// <param name="evolve">
    /// The evolve.
    /// </param>
    [ExcludeFromCodeCoverage]
    public virtual void ExecuteMigration(Evolve.Evolve evolve)
    {
      evolve.Migrate();
    }

    /// <summary>
    /// The migrate.
    /// </summary>
    public void Migrate()
    {
      ExecuteWithEvolve(ExecuteMigration);
    }
    
    private void ExecuteWithEvolve(Action<Evolve.Evolve> action)
    {
      try
      {
        using (var dbConnectionString = RetrieveDatabaseConnection())
        {
          var evolve = RetrieveEvolve(dbConnectionString, Console.Write);
          action(evolve);
        }
      }
      catch (Exception ex)
      {
        // TODO Add Logger
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
      return new NpgsqlConnection(_configuration.RetrieveConnectionString());
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
        Locations = new List<string> {"db/migrations"},
        IsEraseDisabled = false
      };
    }
  }
}