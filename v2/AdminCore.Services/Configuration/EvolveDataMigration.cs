// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EvolveDataMigration.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the EvolveDataMigration type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using Admincore.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics.CodeAnalysis;

namespace MessageSubscription.Services.Configuration
{
  using AdminCore.Common.Interfaces;

  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;

  using Npgsql;

  using IConfiguration = Microsoft.Extensions.Configuration.IConfiguration;

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
        throw;
      }
    }

    public virtual IDbConnection RetrieveDatabaseConnection()
    {
      return new NpgsqlConnection(this._configuration.GetConnectionString("AdmincoreDatabase"));
    }

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