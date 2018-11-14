// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AdminCoreContext.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AdminCoreContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Diagnostics.CodeAnalysis;
using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace AdminCore.DAL.Database
{
  /// <summary>
  ///   The AdminCore context.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public class AdminCoreContext : DbContext
  {
    /// <summary>
    ///   The _configuration.
    /// </summary>
    private readonly IEmployeeCredentials _configuration;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AdminCoreContext" /> class.
    /// </summary>
    /// <param name="configuration">
    ///   The configuration.
    /// </param>
    public AdminCoreContext(IEmployeeCredentials configuration)
    {
      _configuration = configuration;
    }

    /// <summary>
    ///   Gets or sets the contract.
    /// </summary>
    public DbSet<Contract> Contracts { get; set; }

    /// <summary>
    ///   Gets or sets the clients.
    /// </summary>
    public DbSet<Client> Clients { get; set; }

    /// <summary>
    ///   Gets or sets the countries.
    /// </summary>
    public DbSet<Country> Countries { get; set; }

    /// <summary>
    ///   Gets or sets the employee roles.
    /// </summary>
    public DbSet<EmployeeRole> EmployeeRoles { get; set; }

    /// <summary>
    ///   Gets or sets the patients.
    /// </summary>
    public DbSet<Employee> Employees { get; set; }

    /// <summary>
    ///   Gets or sets the employee statuses.
    /// </summary>
    public DbSet<EmployeeStatus> EmployeeStatuses { get; set; }

    /// <summary>
    ///   Gets or sets the event.
    /// </summary>
    public DbSet<Event> Events { get; set; }

    /// <summary>
    ///   Gets or sets the events dates.
    /// </summary>
    public DbSet<EventDate> EventsDates { get; set; }

    /// <summary>
    ///   Gets or sets the event message.
    /// </summary>
    public DbSet<EventMessage> EventMessages { get; set; }

    /// <summary>
    ///   Gets or sets the event message type.
    /// </summary>
    public DbSet<EventMessageType> EventMessageTypes { get; set; }

    /// <summary>
    ///   Gets or sets the event statuses.
    /// </summary>
    public DbSet<EventStatus> EventStatuses { get; set; }

    /// <summary>
    ///   Gets or sets the event type.
    /// </summary>
    public DbSet<EventType> EventTypes { get; set; }

    /// <summary>
    ///   Gets or sets the teams.
    /// </summary>
    public DbSet<Team> Teams { get; set; }

    /// <summary>
    ///   The on configuring.
    /// </summary>
    /// <param name="optionsBuilder">
    ///   The options builder.
    /// </param>
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
      optionsBuilder.UseNpgsql(_configuration.RetrieveConnectionString());
    }
  }
}