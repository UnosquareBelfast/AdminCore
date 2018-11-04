// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AdminCoreContext.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the AdminCoreContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DAL.Database
{
  using System.Diagnostics.CodeAnalysis;

  using Admincore.DAL.Models;

  using AdminCore.DAL.Models;

  using Microsoft.EntityFrameworkCore;
  using Microsoft.Extensions.Configuration;

  /// <summary>
  /// The Admincore context.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public class AdminCoreContext : DbContext
  {
    /// <summary>
    /// The _configuration.
    /// </summary>
    private readonly IConfiguration _configuration;

    /// <summary>
    /// Initializes a new instance of the <see cref="AdminCoreContext"/> class.
    /// </summary>
    /// <param name="configuration">
    /// The configuration.
    /// </param>
    public AdminCoreContext(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    /// <summary>
    /// Gets or sets the contract.
    /// </summary>
    public DbSet<Contract> Contracts { get; set; }

    /// <summary>
    /// Gets or sets the clients.
    /// </summary>
    public DbSet<Client> Clients { get; set; }

    /// <summary>
    /// Gets or sets the countries.
    /// </summary>
    public DbSet<Country> Countries { get; set; }

    /// <summary>
    /// Gets or sets the employee roles.
    /// </summary>
    public DbSet<EmployeeRole> EmployeeRoles { get; set; }

    /// <summary>
    /// Gets or sets the patients.
    /// </summary>
    public DbSet<Employee> Employees { get; set; }

    /// <summary>
    /// Gets or sets the employee statuses.
    /// </summary>
    public DbSet<EmployeeStatus> EmployeeStatuses { get; set; }

    /// <summary>
    /// Gets or sets the event.
    /// </summary>
    public DbSet<Event> Events { get; set; }

    /// <summary>
    /// Gets or sets the event type.
    /// </summary>
    public DbSet<EventType> EventTypes { get; set; }

    /// <summary>
    /// Gets or sets the event statuses.
    /// </summary>
    public DbSet<EventStatus> EventStatuses { get; set; }

    /// <summary>
    /// Gets or sets the teams.
    /// </summary>
    public DbSet<Team> Teams { get; set; }


    /// <summary>
    /// The on configuring.
    /// </summary>
    /// <param name="optionsBuilder">
    /// The options builder.
    /// </param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql(_configuration.GetConnectionString("AdmincoreDatabase"));
    }
  }
}