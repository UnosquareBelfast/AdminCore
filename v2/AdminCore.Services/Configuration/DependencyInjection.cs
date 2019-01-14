// --------------------------------------------------------------------------------------------------------------------
// <copyright file="DependencyInjection.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the DependencyInjection type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.Diagnostics.CodeAnalysis;
using AdminCore.Common;
using AdminCore.Common.DependencyInjection;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Database;
using AdminCore.DAL.Entity_Framework;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

namespace AdminCore.Services.Configuration
{
  /// <summary>
  ///   The dependency injection.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    /// <summary>
    ///   The _registered.
    /// </summary>
    private static bool _registered;

    /// <summary>
    ///   The register dependency injection.
    /// </summary>
    /// <param name="services">
    ///   The services.
    /// </param>
    public static void RegisterDependencyInjection(IServiceCollection services = null)
    {
      if (!_registered)
      {
        if (services == null) services = new ServiceCollection();

        services.AddAutoMapper();
        services.AddDbContext<AdminCoreContext>();
        services.AddScoped<IDatabaseContext, EntityFrameworkContext>();
        services.AddTransient<IAuthenticatedUser, AuthenticatedUser>();
        services.AddTransient<IAuthenticationService, AuthenticationService>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddTransient<IDataMigration, EvolveDataMigration>();
        services.AddTransient<IDateService, DateService>();
        services.AddSingleton<IConfiguration, ConfigurationProvider>();
        services.AddTransient<IEmployeeService, EmployeeService>();
        services.AddTransient<IClientService, ClientService>();
        services.AddTransient<ITeamService, TeamService>();
        services.AddTransient<IEventService, EventService>();
        services.AddTransient<IEmployeeCredentials, EmployeeCredentials>();
        services.AddTransient<IContractService, ContractService>();
        services.AddTransient<IEventMessageService, EventMessageService>();

        ServiceLocator.Instance = new DependencyInjectionContainer(services.BuildServiceProvider());

        _registered = true;
      }
    }
  }

  /// <summary>
  ///   The dependency injection container.
  /// </summary>
  [ExcludeFromCodeCoverage]
  public class DependencyInjectionContainer : IContainer
  {
    /// <summary>
    ///   The _container.
    /// </summary>
    private readonly IServiceProvider _container;

    /// <summary>
    ///   Initializes a new instance of the <see cref="DependencyInjectionContainer" /> class.
    /// </summary>
    /// <param name="container">
    ///   The container.
    /// </param>
    internal DependencyInjectionContainer(IServiceProvider container)
    {
      _container = container;
    }

    /// <summary>
    ///   The get instance.
    /// </summary>
    /// <typeparam name="T">
    /// </typeparam>
    /// <returns>
    ///   The <see cref="T" />.
    /// </returns>
    public T GetInstance<T>()
      where T : class
    {
      return _container.GetService<T>();
    }
  }
}