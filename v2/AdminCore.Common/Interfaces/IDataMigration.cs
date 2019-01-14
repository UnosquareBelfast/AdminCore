namespace AdminCore.Common.Interfaces
{
  public interface IDataMigration
  {
    void Migrate();

    void ClearDown();
  }
}