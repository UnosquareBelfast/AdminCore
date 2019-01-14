using AdminCore.Constants.Enums;

namespace AdminCore.Common.Interfaces
{
  public interface IConfiguration
  {
    string RetrieveConnectionString();

    MigrationTypes RetrieveMigrationType();
  }
}