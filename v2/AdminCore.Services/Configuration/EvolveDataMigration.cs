using AdminCore.Common.Interfaces;
using Npgsql;
using System;
using System.Collections.Generic;
using System.Data;
using System.Diagnostics.CodeAnalysis;

namespace AdminCore.Services.Configuration
{
  public class EvolveDataMigration : IDataMigration
  {
    private readonly IConfiguration _configuration;

    public EvolveDataMigration(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public void ClearDown()
    {
      ExecuteWithEvolve(ExecuteClearDown);
    }

    public void Migrate()
    {
      ExecuteWithEvolve(ExecuteMigration);
    }

    [ExcludeFromCodeCoverage]
    public virtual void ExecuteClearDown(Evolve.Evolve evolve)
    {
      evolve.Erase();
    }

    [ExcludeFromCodeCoverage]
    public virtual void ExecuteMigration(Evolve.Evolve evolve)
    {
      evolve.Migrate();
    }

    private void ExecuteWithEvolve(Action<Evolve.Evolve> action)
    {
      using (var dbConnectionString = RetrieveDatabaseConnection())
      {
        var evolve = RetrieveEvolve(dbConnectionString, Console.Write);
        action(evolve);
      }
    }

    public virtual IDbConnection RetrieveDatabaseConnection()
    {
      return new NpgsqlConnection(_configuration.RetrieveConnectionString());
    }

    public virtual Evolve.Evolve RetrieveEvolve(IDbConnection connection, Action<string> logger)
    {
      return new Evolve.Evolve(connection, logger)
      {
        Locations = new List<string> { "db/migrations" },
        IsEraseDisabled = false
      };
    }
  }
}