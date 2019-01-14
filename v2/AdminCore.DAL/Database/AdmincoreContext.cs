// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AdminCoreContext.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AdminCoreContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using AdminCore.DAL.Models.Base;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace AdminCore.DAL.Database
{
  /// <summary>
  ///   The AdminCore context.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public class AdminCoreContext : DbContext
  {
    protected internal const string DeletedProperty = "deleted";

    /// <summary>
    ///   The _configuration.
    /// </summary>
    private readonly IConfiguration _configuration;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AdminCoreContext" /> class.
    /// </summary>
    /// <param name="configuration">
    ///   The configuration.
    /// </param>
    public AdminCoreContext(IConfiguration configuration)
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

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      foreach (var entityType in modelBuilder.Model.GetEntityTypes())
      {
        if (EntityIsSoftDeletable(entityType.ClrType))
        {
          AddDeletedPropertyToEntity(entityType);
          OmitEntityFromQueriesIfSoftDeleted(modelBuilder, entityType);
        }
      }
    }

    private static void OmitEntityFromQueriesIfSoftDeleted(ModelBuilder modelBuilder, IMutableEntityType entityType)
    {
      var parameter = Expression.Parameter(entityType.ClrType);
      var propertyMethodInfo = typeof(EF).GetMethod("Property").MakeGenericMethod(typeof(bool));
      var isDeletedProperty = Expression.Call(propertyMethodInfo, parameter, Expression.Constant(DeletedProperty));
      var compareExpression =
        Expression.MakeBinary(ExpressionType.Equal, isDeletedProperty, Expression.Constant(false));
      var lambda = Expression.Lambda(compareExpression, parameter);
      modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
    }

    private static void AddDeletedPropertyToEntity(IMutableEntityType entityType)
    {
      entityType.GetOrAddProperty(DeletedProperty, typeof(bool));
    }

    private static bool EntityIsSoftDeletable(Type entityType)
    {
      return typeof(ISoftDeletable).IsAssignableFrom(entityType);
    }

    public override int SaveChanges()
    {
      OnBeforeSaving();
      return base.SaveChanges();
    }

    public override int SaveChanges(bool acceptAllChangesOnSuccess)
    {
      OnBeforeSaving();
      return base.SaveChanges(acceptAllChangesOnSuccess);
    }

    public override Task<int> SaveChangesAsync(bool acceptAllChangesOnSuccess, CancellationToken cancellationToken = new CancellationToken())
    {
      OnBeforeSaving();
      return base.SaveChangesAsync(acceptAllChangesOnSuccess, cancellationToken);
    }

    private void OnBeforeSaving()
    {
      var changedDatabaseRecords = ChangeTracker.Entries();
      foreach (var entry in changedDatabaseRecords)
      {
        var entityType = entry.Entity.GetType();
        if (EntityIsSoftDeletable(entityType))
        {
          SetDeletedPropertyBasedOnState(entry);
        }
      }
    }

    private static void SetDeletedPropertyBasedOnState(EntityEntry entry)
    {
      switch (entry.State)
      {
        case EntityState.Added:
          entry.CurrentValues[DeletedProperty] = false;
          break;

        case EntityState.Deleted:
          entry.State = EntityState.Modified;
          entry.CurrentValues[DeletedProperty] = true;
          break;
      }
    }
  }
}