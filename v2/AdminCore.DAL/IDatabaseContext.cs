// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IDatabaseContext.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IDatabaseContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL
{
  using Admincore.DAL.Models;
  using System.Data;

  /// <summary>
  /// The DatabaseContext interface.
  /// </summary>
  public interface IDatabaseContext
  {
    /// <summary>
    /// Gets the patient repository.
    /// </summary>
    IRepository<Employee> EmployeeRepository { get; }

    /// <summary>
    /// The save changes.
    /// </summary>
    void SaveChanges();

    IDbConnection RetrieveConnection();
  }
}