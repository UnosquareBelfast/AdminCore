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

  /// <summary>
  /// The DatabaseContext interface.
  /// </summary>
  public interface IDatabaseContext
  {
    /// <summary>
    /// Gets the country repository.
    /// </summary>
    IRepository<Country> CountryRepository { get; }

    /// <summary>
    /// Gets the patient repository.
    /// </summary>
    IRepository<Employee> EmployeeRepository { get; }

    /// <summary>
    /// Gets the employee role repository.
    /// </summary>
    IRepository<EmployeeRole> EmployeeRoleRepository { get; }

    /// <summary>
    /// Gets the employee status repository.
    /// </summary>
    IRepository<EmployeeStatus> EmployeeStatusRepository { get; }

    /// <summary>
    /// The save changes.
    /// </summary>
    void SaveChanges();
  }
}