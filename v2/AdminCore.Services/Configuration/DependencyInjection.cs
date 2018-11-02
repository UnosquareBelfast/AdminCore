// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DependencyInjection.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the DependencyInjection type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Services.Configuration
{
  using System;
  using System.Diagnostics.CodeAnalysis;
  using AdminCore.Services.Configuration;
  using AutoMapper;
  using Common;
  using Common.Interfaces;
  using DAL;
  using DAL.Database;
  using DAL.Entity_Framework;
  using Microsoft.Extensions.DependencyInjection;
  using IContainer = Common.DependencyInjection.IContainer;

  /// <summary>
  /// The dependency injection.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    /// <summary>
    /// The _registered.
    /// </summary>
    private static bool _registered;

    /// <summary>
    /// The register dependency injection.
    /// </summary>
    /// <param name="services">
    /// The services.
    /// </param>
    public static void RegisterDependencyInjection(IServiceCollection services)
    {
      if (!_registered)
      {
        services.AddAutoMapper();
        services.AddDbContext<AdminCoreContext>();
        services.AddScoped<IDatabaseContext, EntityFrameworkContext>();
        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IDataMigration, EvolveDataMigration>();
        services.AddSingleton<IConfiguration, ConfigurationProvider>();

        ServiceLocator.Instance = new DependencyInjectionContainer(services.BuildServiceProvider());

        _registered = true;
      }
    }
  }

  /// <summary>
  /// The dependency injection container.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public class DependencyInjectionContainer : IContainer
  {
    /// <summary>
    /// The _container.
    /// </summary>
    private readonly IServiceProvider _container;

    /// <summary>
    /// Initializes a new instance of the <see cref="DependencyInjectionContainer"/> class.
    /// </summary>
    /// <param name="container">
    /// The container.
    /// </param>
    internal DependencyInjectionContainer(IServiceProvider container)
    {
      _container = container;
    }

    /// <summary>
    /// The get instance.
    /// </summary>
    /// <typeparam name="T">
    /// </typeparam>
    /// <returns>
    /// The <see cref="T"/>.
    /// </returns>
    public T GetInstance<T>()
      where T : class
    {
      return _container.GetService<T>();
    }
  }
}

