using AdminCore.DAL.Database;
using AdminCore.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace AdminCore.DAL.Entity_Framework
{
  public class EntityFrameworkContext : IDatabaseContext
  {
    private readonly AdminCoreContext _adminCoreContext;

    private IRepository<Client> _clientRepository;

    private IRepository<Contract> _contractRepository;

    private IRepository<Country> _countryRepository;

    private IRepository<Employee> _employeeRepository;

    private IRepository<EmployeeRole> _employeeRoleRepository;

    private IRepository<EmployeeStatus> _employeeStatusRepository;

    private IRepository<EventDate> _eventDatesRepository;

    private IRepository<EventMessage> _eventMessageRepository;

    private IRepository<EventMessageType> _eventMessageTypeRepository;

    private IRepository<Event> _eventRepository;

    private IRepository<EventStatus> _eventStatusRepository;

    private IRepository<EventType> _eventTypeRepository;

    private IRepository<Team> _teamRepository;

    public EntityFrameworkContext(AdminCoreContext adminCoreContext)
    {
      _adminCoreContext = adminCoreContext;
    }

    public IRepository<EventDate> EventDatesRepository =>
      _eventDatesRepository ?? (_eventDatesRepository = new EntityFrameworkRepository<EventDate>(this));

    public IRepository<Client> ClientRepository =>
      _clientRepository ?? (_clientRepository = new EntityFrameworkRepository<Client>(this));

    public IRepository<Contract> ContractRepository =>
      _contractRepository ?? (_contractRepository = new EntityFrameworkRepository<Contract>(this));

    public IRepository<Country> CountryRepository =>
      _countryRepository ?? (_countryRepository = new EntityFrameworkRepository<Country>(this));

    public IRepository<Employee> EmployeeRepository =>
      _employeeRepository ?? (_employeeRepository = new EntityFrameworkRepository<Employee>(this));

    public IRepository<EmployeeRole> EmployeeRoleRepository =>
      _employeeRoleRepository ?? (_employeeRoleRepository = new EntityFrameworkRepository<EmployeeRole>(this));

    public IRepository<EmployeeStatus> EmployeeStatusRepository =>
      _employeeStatusRepository ?? (_employeeStatusRepository = new EntityFrameworkRepository<EmployeeStatus>(this));

    public IRepository<Event> EventRepository =>
      _eventRepository ?? (_eventRepository = new EntityFrameworkRepository<Event>(this));

    public IRepository<EventMessage> EventMessageRepository =>
      _eventMessageRepository ?? (_eventMessageRepository = new EntityFrameworkRepository<EventMessage>(this));

    public IRepository<EventMessageType> EventMessageTypeRepository =>
      _eventMessageTypeRepository ??
      (_eventMessageTypeRepository = new EntityFrameworkRepository<EventMessageType>(this));

    public IRepository<EventStatus> EventStatusRepository =>
      _eventStatusRepository ?? (_eventStatusRepository = new EntityFrameworkRepository<EventStatus>(this));

    public IRepository<EventType> EventTypeRepository =>
      _eventTypeRepository ?? (_eventTypeRepository = new EntityFrameworkRepository<EventType>(this));

    public IRepository<Team> TeamRepository =>
      _teamRepository ?? (_teamRepository = new EntityFrameworkRepository<Team>(this));

    public void SaveChanges()
    {
      _adminCoreContext.SaveChanges();
    }

    public EntityEntry Entry<T>(T entity) where T : class
    {
      return _adminCoreContext.Entry(entity);
    }

    public DbSet<T> Set<T>() where T : class
    {
      return _adminCoreContext.Set<T>();
    }
  }
}