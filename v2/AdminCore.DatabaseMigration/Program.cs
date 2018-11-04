using System;
using System.Diagnostics.CodeAnalysis;
using Admincore.Services.Configuration;
using AdminCore.Common;
using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;

namespace AdminCore.DatabaseMigration
{
  public static class Program
  {
    [ExcludeFromCodeCoverage]
    public static void Main(string[] args)
    {
      DependencyInjection.RegisterDependencyInjection();

      var configuration = ServiceLocator.Instance.GetInstance<IConfiguration>();
      var migration = ServiceLocator.Instance.GetInstance<IDataMigration>();

      MigrateDatabase(configuration, migration);
    }

    public static void MigrateDatabase(IConfiguration configuration, IDataMigration dataMigration)
    {
      switch (configuration.RetrieveMigrationType())
      {
        case MigrationTypes.Migrate:
          dataMigration.Migrate();
          break;
        case MigrationTypes.ClearDown:
          dataMigration.ClearDown();
          break;
        default:
          throw new ArgumentOutOfRangeException();
      }
    }
  }
}