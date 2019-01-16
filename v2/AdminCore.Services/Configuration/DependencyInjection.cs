using AdminCore.Common;
using AdminCore.Common.DependencyInjection;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Database;
using AdminCore.DAL.Entity_Framework;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Diagnostics.CodeAnalysis;

namespace AdminCore.Services.Configuration
{
  [ExcludeFromCodeCoverage]
  public static class DependencyInjection
  {
    private static bool _registered;

    public static void RegisterDependencyInjection(IServiceCollection services = null)
    {
      if (!_registered)
      {
        if (services == null) services = new ServiceCollection();

        services.AddAutoMapper();
        services.AddDbContext<AdminCoreContext>();
        services.AddScoped<IDatabaseContext, EntityFrameworkContext>();
        services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
        services.AddTransient<IDataMigration, EvolveDataMigration>();
        services.AddTransient<IDateService, DateService>();
        services.AddSingleton<IConfiguration, ConfigurationProvider>();
        services.AddTransient<IEmployeeService, EmployeeService>();
        services.AddTransient<IClientService, ClientService>();
        services.AddTransient<ITeamService, TeamService>();
        services.AddTransient<IEventService, EventService>();
        services.AddTransient<IDashboardService, DashboardService>();
        services.AddTransient<IContractService, ContractService>();
        services.AddTransient<IEventMessageService, EventMessageService>();

        ServiceLocator.Instance = new DependencyInjectionContainer(services.BuildServiceProvider());

        _registered = true;
      }
    }
  }

  [ExcludeFromCodeCoverage]
  public class DependencyInjectionContainer : IContainer
  {
    private readonly IServiceProvider _container;

    internal DependencyInjectionContainer(IServiceProvider container)
    {
      _container = container;
    }

    public T GetInstance<T>()
      where T : class
    {
      return _container.GetService<T>();
    }
  }
}