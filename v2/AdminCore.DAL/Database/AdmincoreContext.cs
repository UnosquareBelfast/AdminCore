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
    /// Gets or sets the patients.
    /// </summary>
    public DbSet<Employee> Employees { get; set; }

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
