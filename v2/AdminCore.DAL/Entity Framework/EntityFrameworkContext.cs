// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EntityFrameworkContext.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The entity framework context.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DAL.Entity_Framework
{
  using AdminCore.DAL.Database;
  using AdminCore.DAL.Models;

  using Microsoft.EntityFrameworkCore;

  /// <summary>
  /// The entity framework context.
  /// </summary>
  public class EntityFrameworkContext : IDatabaseContext
  {
    /// <summary>
    /// The _AdminCore context.
    /// </summary>
    private readonly AdminCoreContext adminCoreContext;

    /// <summary>
    /// The _ client repository.
    /// </summary>
    private IRepository<Client> _clientRepository;

    /// <summary>
    /// The _ contract repository.
    /// </summary>
    private IRepository<Contract> _contractRepository;

    /// <summary>
    /// The _ country repository.
    /// </summary>
    private IRepository<Country> _countryRepository;

    /// <summary>
    /// The _patient repository.
    /// </summary>
    private IRepository<Employee> _employeeRepository;

    /// <summary>
    /// The _ employee role repository.
    /// </summary>
    private IRepository<EmployeeRole> _employeeRoleRepository;

    /// <summary>
    /// The _ employee status repository.
    /// </summary>
    private IRepository<EmployeeStatus> _employeeStatusRepository;

    /// <summary>
    /// The _ event repository.
    /// </summary>
    private IRepository<Event> _eventRepository;

    /// <summary>
    /// The _event dates repository.
    /// </summary>
    private IRepository<EventDates> _eventDatesRepository;

    /// <summary>
    /// The _event message repository.
    /// </summary>
    private IRepository<EventMessage> _eventMessageRepository;

    /// <summary>
    /// The _event message type repository.
    /// </summary>
    private IRepository<EventMessageType> _eventMessageTypeRepository;

    /// <summary>
    /// The _ event status repository.
    /// </summary>
    private IRepository<EventStatus> _eventStatusRepository;

    /// <summary>
    /// The _ event type repository.
    /// </summary>
    private IRepository<EventType> _eventTypeRepository;

    /// <summary>
    /// The _ team repository.
    /// </summary>
    private IRepository<Team> _teamRepository;

    /// <summary>
    /// Initializes a new instance of the <see cref="EntityFrameworkContext"/> class.
    /// </summary>
    /// <param name="adminCoreContext">
    /// The AdminCore context.
    /// </param>
    public EntityFrameworkContext(AdminCoreContext adminCoreContext)
    {
      this.adminCoreContext = adminCoreContext;
    }

    /// <summary>
    /// The client repository.
    /// </summary>
    public IRepository<Client> ClientRepository =>
      _clientRepository ?? (_clientRepository = new EntityFrameworkRepository<Client>(this));

    /// <summary>
    /// The contract repository.
    /// </summary>
    public IRepository<Contract> ContractRepository =>
      _contractRepository ?? (_contractRepository = new EntityFrameworkRepository<Contract>(this));

    /// <summary>
    /// The country repository.
    /// </summary>
    public IRepository<Country> CountryRepository =>
      _countryRepository ?? (_countryRepository = new EntityFrameworkRepository<Country>(this));

    /// <summary>
    /// The patient repository.
    /// </summary>
    public IRepository<Employee> EmployeeRepository =>
      _employeeRepository ?? (_employeeRepository = new EntityFrameworkRepository<Employee>(this));

    /// <summary>
    /// The employee role repository.
    /// </summary>
    public IRepository<EmployeeRole> EmployeeRoleRepository => _employeeRoleRepository
                                                               ?? (_employeeRoleRepository =
                                                                     new EntityFrameworkRepository<EmployeeRole>(this));

    /// <summary>
    /// The employee status repository.
    /// </summary>
    public IRepository<EmployeeStatus> EmployeeStatusRepository =>
      _employeeStatusRepository ?? (_employeeStatusRepository = new EntityFrameworkRepository<EmployeeStatus>(this));

    /// <summary>
    /// The event repository.
    /// </summary>
    public IRepository<Event> EventRepository =>
      _eventRepository ?? (_eventRepository = new EntityFrameworkRepository<Event>(this));

    /// <summary>
    /// The event dates repository.
    /// </summary>
    public IRepository<EventDates> EventDatesRepository =>
      _eventDatesRepository ?? (_eventDatesRepository = new EntityFrameworkRepository<EventDates>(this));

    /// <summary>
    /// The event message repository.
    /// </summary>
    public IRepository<EventMessage> EventMessageRepository =>
      _eventMessageRepository ?? (_eventMessageRepository = new EntityFrameworkRepository<EventMessage>(this));

    /// <summary>
    /// The event message type repository.
    /// </summary>
    public IRepository<EventMessageType> EventMessageTypeRepository =>
      _eventMessageTypeRepository ?? (_eventMessageTypeRepository = new EntityFrameworkRepository<EventMessageType>(this));


    /// <summary>
    /// The event status repository.
    /// </summary>
    public IRepository<EventStatus> EventStatusRepository =>
      _eventStatusRepository ?? (_eventStatusRepository = new EntityFrameworkRepository<EventStatus>(this));

    /// <summary>
    /// The event type repository.
    /// </summary>
    public IRepository<EventType> EventTypeRepository =>
      _eventTypeRepository ?? (_eventTypeRepository = new EntityFrameworkRepository<EventType>(this));

    /// <summary>
    /// The team status repository.
    /// </summary>
    public IRepository<Team> TeamRepository =>
      _teamRepository ?? (_teamRepository = new EntityFrameworkRepository<Team>(this));

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