// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EntityFrameworkContext.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The entity framework context.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL.Entity_Framework
{
  using Admincore.DAL.Database;
  using Admincore.DAL.Models;
  using Microsoft.EntityFrameworkCore;
  using System.Data;

  /// <summary>
  /// The entity framework context.
  /// </summary>
  public class EntityFrameworkContext : IDatabaseContext
  {
    /// <summary>
    /// The _Admincore context.
    /// </summary>
    private readonly AdminCoreContext adminCoreContext;

    /// <summary>
    /// The _patient repository.
    /// </summary>
    private IRepository<Employee> _EmployeeRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="EntityFrameworkContext"/> class.
    /// </summary>
    /// <param name="adminCoreContext">
    /// The Admincore context.
    /// </param>
    public EntityFrameworkContext(AdminCoreContext adminCoreContext)
    {
      this.adminCoreContext = adminCoreContext;
    }

    /// <summary>
    /// The patient repository.
    /// </summary>
    public IRepository<Employee> EmployeeRepository => _EmployeeRepository ?? (_EmployeeRepository = new EntityFrameworkRepository<Employee>(this));

    /// <summary>
    /// The save changes.
    /// </summary>
    public void SaveChanges()
    {
      adminCoreContext.SaveChanges();
    }

    /// <summary>
    /// The set.
    /// </summary>
    /// <typeparam name="T">
    /// </typeparam>
    /// <returns>
    /// The <see cref="DbSet"/>.
    /// </returns>
    public virtual DbSet<T> Set<T>() where T : class
    {
      return adminCoreContext.Set<T>();
    }
  }
}