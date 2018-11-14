using System;
using System.Diagnostics.CodeAnalysis;
using AdminCore.Common;
using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.Services.Configuration;

namespace AdminCore.DatabaseMigration
{
  public static class Program
  {
    [ExcludeFromCodeCoverage]
    public static void Main(string[] args)
    {
      DependencyInjection.RegisterDependencyInjection();

      var configuration = ServiceLocator.Instance.GetInstance<IEmployeeCredentials>();
      var migration = ServiceLocator.Instance.GetInstance<IDataMigration>();

      MigrateDatabase(configuration, migration);
    }

    public static void MigrateDatabase(IEmployeeCredentials configuration, IDataMigration dataMigration)
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