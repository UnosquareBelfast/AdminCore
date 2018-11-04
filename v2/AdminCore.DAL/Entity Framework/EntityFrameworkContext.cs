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

  using AdminCore.DAL.Models;

  using Microsoft.EntityFrameworkCore;

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
    /// The _ client repository.
    /// </summary>
    private IRepository<Client> _ClientRepository;

    /// <summary>
    /// The _ country repository.
    /// </summary>
    private IRepository<Country> _CountryRepository;

    /// <summary>
    /// The _patient repository.
    /// </summary>
    private IRepository<Employee> _EmployeeRepository;

    /// <summary>
    /// The _ employee role repository.
    /// </summary>
    private IRepository<EmployeeRole> _EmployeeRoleRepository;

    /// <summary>
    /// The _ employee status repository.
    /// </summary>
    private IRepository<EmployeeStatus> _EmployeeStatusRepository;

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

    public IRepository<Client> ClientRepository =>
      _ClientRepository ?? (_ClientRepository = new EntityFrameworkRepository<Client>(this));

    /// <summary>
    /// The country repository.
    /// </summary>
    public IRepository<Country> CountryRepository =>
      _CountryRepository ?? (_CountryRepository = new EntityFrameworkRepository<Country>(this));

    /// <summary>
    /// The patient repository.
    /// </summary>
    public IRepository<Employee> EmployeeRepository =>
      _EmployeeRepository ?? (_EmployeeRepository = new EntityFrameworkRepository<Employee>(this));

    /// <summary>
    /// The employee role repository.
    /// </summary>
    public IRepository<EmployeeRole> EmployeeRoleRepository => _EmployeeRoleRepository
                                                               ?? (_EmployeeRoleRepository =
                                                                     new EntityFrameworkRepository<EmployeeRole>(this));

    /// <summary>
    /// The employee status repository.
    /// </summary>
    public IRepository<EmployeeStatus> EmployeeStatusRepository =>
      _EmployeeStatusRepository ?? (_EmployeeStatusRepository = new EntityFrameworkRepository<EmployeeStatus>(this));

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
    public virtual DbSet<T> Set<T>()
      where T : class
    {
      return adminCoreContext.Set<T>();
    }
  }
}