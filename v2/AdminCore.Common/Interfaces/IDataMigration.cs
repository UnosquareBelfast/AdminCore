// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IDataMigration.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the IDataMigration type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.Common.Interfaces
{
  public interface IDataMigration
  {
    void Migrate();

    void ClearDown();
  }
}