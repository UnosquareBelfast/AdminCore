// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IDatabaseContext.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the IDatabaseContext type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DAL.Models;

namespace AdminCore.DAL
{
  /// <summary>
  ///   The DatabaseContext interface.
  /// </summary>
  public interface IDatabaseContext
  {
    /// <summary>
    ///   Gets the client repository.
    /// </summary>
    IRepository<Client> ClientRepository { get; }

    /// <summary>
    ///   Gets the contract repository.
    /// </summary>
    IRepository<Contract> ContractRepository { get; }

    /// <summary>
    ///   Gets the country repository.
    /// </summary>
    IRepository<Country> CountryRepository { get; }

    /// <summary>
    ///   Gets the patient repository.
    /// </summary>
    IRepository<Employee> EmployeeRepository { get; }

    /// <summary>
    ///   Gets the employee role repository.
    /// </summary>
    IRepository<EmployeeRole> EmployeeRoleRepository { get; }

    /// <summary>
    ///   Gets the employee status repository.
    /// </summary>
    IRepository<EmployeeStatus> EmployeeStatusRepository { get; }

    /// <summary>
    ///   Gets the event repository.
    /// </summary>
    IRepository<Event> EventRepository { get; }

    /// <summary>
    ///   Gets the event dates repository.
    /// </summary>
    IRepository<EventDate> EventDatesRepository { get; }

    /// <summary>
    ///   Gets the event message repository.
    /// </summary>
    IRepository<EventMessage> EventMessageRepository { get; }

    /// <summary>
    ///   Gets the event message type repository.
    /// </summary>
    IRepository<EventMessageType> EventMessageTypeRepository { get; }

    /// <summary>
    ///   Gets the event status repository.
    /// </summary>
    IRepository<EventStatus> EventStatusRepository { get; }

    /// <summary>
    ///   Gets the event type repository.
    /// </summary>
    IRepository<EventType> EventTypeRepository { get; }

    /// <summary>
    ///   Gets the team repository.
    /// </summary>
    IRepository<Team> TeamRepository { get; }

    /// <summary>
    ///   The save changes.
    /// </summary>
    void SaveChanges();
  }
}