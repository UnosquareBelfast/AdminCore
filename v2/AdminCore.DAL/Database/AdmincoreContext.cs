using AdminCore.Common.Interfaces;
using AdminCore.DAL.Models;
using AdminCore.DAL.Models.Base;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Diagnostics.CodeAnalysis;
using System.Linq.Expressions;
using System.Threading;
using System.Threading.Tasks;
using DbContext = Microsoft.EntityFrameworkCore.DbContext;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace AdminCore.DAL.Database
{
  [ExcludeFromCodeCoverage]
  public class AdminCoreContext : DbContext
  {
    protected internal const string DeletedProperty = "deleted";

    private readonly IConfiguration _configuration;

    public AdminCoreContext(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public DbSet<Contract> Contracts { get; set; }

    public DbSet<Client> Clients { get; set; }

    public DbSet<Country> Countries { get; set; }

    public DbSet<EmployeeRole> EmployeeRoles { get; set; }

    public DbSet<Employee> Employees { get; set; }

    public DbSet<EmployeeStatus> EmployeeStatuses { get; set; }

    public DbSet<Event> Events { get; set; }

    public DbSet<EventDate> EventsDates { get; set; }

    public DbSet<EventMessage> EventMessages { get; set; }

    public DbSet<EventMessageType> EventMessageTypes { get; set; }

    public DbSet<EventStatus> EventStatuses { get; set; }

    public DbSet<EventType> EventTypes { get; set; }

    public DbSet<Team> Teams { get; set; }

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