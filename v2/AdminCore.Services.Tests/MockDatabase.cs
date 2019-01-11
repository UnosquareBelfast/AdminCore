using System;
using System.Collections.Generic;
using AdminCore.DAL.Models;

namespace AdminCore.Services.Tests
{
  public class MockDatabase
  {
    public List<Contract> ContractRepository;
    public List<Country> CountryRepository;
    public List<Client> ClientRepository;
    public List<Employee> EmployeeRepository;
    public List<EmployeeRole> EmployeeRoleRepository;
    public List<EmployeeStatus> EmployeeStatusRepository;
    public List<EventDate> EventDateRepository;
    public List<Event> EventRepository;
    public List<EventStatus> EventStatusRepository;
    public List<EventType> EventTypeRepository;
    public List<Team> TeamRepository;

    public MockDatabase()
    {
      PopulateRepositories();
    }

    private void PopulateRepositories()
    {
      #region Hardcoded Database Values
      // Countries
      var northernIreland = BuildCountry(1, "Northern Ireland");
      var mexico = BuildCountry(2, "Mexico");

      CountryRepository = new List<Country>()
      {
        northernIreland,
        mexico
      };

      // Event Statuses
      var awaitingApproval = BuildEventStatus(1, "Awaiting approval");
      var approved = BuildEventStatus(2, "Approved");
      var rejected = BuildEventStatus(3, "Rejected");
      var cancelled = BuildEventStatus(4, "Cancelled");

      EventStatusRepository = new List<EventStatus>()
      {
        awaitingApproval,
        approved,
        rejected,
        cancelled
      };

      // Event Types
      var annualLeave = BuildEventType(1, "Annual Leave");
      var workingFromHome = BuildEventType(2, "Working From Home");
      var sickLeave = BuildEventType(3, "Sick Leave");
      var workTravel = BuildEventType(4, "Work Related Travel");

      EventTypeRepository = new List<EventType>()
      {
        annualLeave,
        workingFromHome,
        sickLeave,
        workTravel
      };

      // Employee Roles
      var teamLeader = BuildEmployeeRole(1, "Team Leader");
      var sysAdmin = BuildEmployeeRole(2, "System Administrator");
      var user = BuildEmployeeRole(3, "User");

      EmployeeRoleRepository = new List<EmployeeRole>()
      {
        teamLeader,
        sysAdmin,
        user
      };

      // Employee statuses
      var active = BuildEmployeeStatus(1, "Active");
      var inactive = BuildEmployeeStatus(2, "Inactive");

      EmployeeStatusRepository = new List<EmployeeStatus>()
      {
        active,
        inactive
      };

      // Clients
      var internalClient = BuildClient(1, "Internal Client");
      var fmiClient = BuildClient(2, "FMI");
      var harvardClient = BuildClient(3, "Harvard");

      ClientRepository = new List<Client>()
      {
        internalClient,
        fmiClient,
        harvardClient
      };

      // Employees
      var employeeNiall = BuildEmployee(1, "Niall", "McMahon", "niall@test.com", northernIreland, user, active);
      var employeeJamie = BuildEmployee(2, "Jamie", "Higgins", "jamie@test.com", northernIreland, user, active);
      var employeeEoin = BuildEmployee(3, "Eoin", "McAfee", "eoin@test.com", northernIreland, user, active);
      var employeeKurtis = BuildEmployee(4, "Kurtis", "Moore", "kurtis@test.com", northernIreland, user, active);
      var employeeLee = BuildEmployee(4, "Lee", "McKay", "lee@test.com", northernIreland, user, active);


      EmployeeRepository = new List<Employee>()
      {
        employeeNiall,
        employeeJamie,
        employeeEoin
      };

      // Teams
      var teamInternal = BuildTeam(1, internalClient, "Internal Team");
      var teamFmi = BuildTeam(2, fmiClient, "FMI Team");
      var teamHarvard = BuildTeam(3, harvardClient, "Harvard Team");

      TeamRepository = new List<Team>()
      {
        teamInternal,
        teamFmi,
        teamHarvard
      };

      // Contracts
      var niallInternalContract = BuildContract(1, teamInternal, employeeNiall, new DateTime(2018, 12, 17), new DateTime(2019, 02, 17));
      var jamieInternalContract = BuildContract(2, teamInternal, employeeJamie, new DateTime(2018, 12, 17), new DateTime(2019, 02, 17));
      var eoinInternalContract = BuildContract(3, teamInternal, employeeEoin, new DateTime(2018, 12, 17), new DateTime(2019, 02, 17));
      var kurtisFmiContract = BuildContract(4, teamFmi, employeeKurtis, new DateTime(2018, 12, 17), null);
      var leeHarvardContract = BuildContract(5, teamHarvard, employeeLee, new DateTime(2018, 12, 17), new DateTime(2019, 02, 17));
      var eoinExternalContract = BuildContract(6, teamHarvard, employeeEoin, new DateTime(2018, 12, 03), null);


      ContractRepository = new List<Contract>()
      {
        niallInternalContract,
        jamieInternalContract,
        eoinInternalContract,
        kurtisFmiContract,
        leeHarvardContract,
        eoinExternalContract
      };

      employeeNiall.Contracts = new List<Contract>()
      {
        niallInternalContract
      };

      employeeJamie.Contracts = new List<Contract>()
      {
        jamieInternalContract
      };

      employeeEoin.Contracts = new List<Contract>()
      {
        eoinInternalContract,
        eoinExternalContract
      };

      employeeKurtis.Contracts = new List<Contract>()
      {
        kurtisFmiContract
      };

      employeeLee.Contracts = new List<Contract>()
      {
        leeHarvardContract
      };

      // Events
      var event1 = BuildEvent(1, employeeNiall, approved, annualLeave);
      var event2 = BuildEvent(2, employeeNiall, cancelled, annualLeave);
      var event3 = BuildEvent(3, employeeNiall, approved, annualLeave);
      var event4 = BuildEvent(4, employeeJamie, approved, annualLeave);
      var event5 = BuildEvent(5, employeeJamie, approved, annualLeave);
      var event6 = BuildEvent(6, employeeJamie, approved, annualLeave);
      var event7 = BuildEvent(7, employeeEoin, approved, annualLeave);
      var event8 = BuildEvent(8, employeeEoin, approved, annualLeave);
      var event9 = BuildEvent(9, employeeEoin, approved, annualLeave);
      var event10 = BuildEvent(10, employeeKurtis, approved, annualLeave);
      var event11 = BuildEvent(11, employeeKurtis, approved, annualLeave);
      var event12 = BuildEvent(12, employeeKurtis, approved, annualLeave);
      var event13 = BuildEvent(13, employeeLee, approved, annualLeave);
      var event14 = BuildEvent(14, employeeLee, approved, annualLeave);
      var event15 = BuildEvent(15, employeeNiall, approved, annualLeave);
      var event16 = BuildEvent(16, employeeJamie, approved, annualLeave);

      EventRepository = new List<Event>()
      {
        event1,
        event2,
        event3,
        event4,
        event5,
        event6,
        event7,
        event8,
        event9,
        event10,
        event11,
        event12,
        event13,
        event14,
        event15,
        event16
      };

      employeeNiall.Events = new List<Event>()
      {
        event1,
        event2,
        event3,
        event15
      };
      
      employeeJamie.Events = new List<Event>()
      {
        event4,
        event5,
        event6,
        event16
      };
      
      employeeEoin.Events = new List<Event>()
      {
        event7,
        event8,
        event9      
      };
      
      employeeKurtis.Events = new List<Event>()
      {
        event10,
        event11,
        event12      
      };
      
      employeeLee.Events = new List<Event>()
      {
        event13,
        event14     
      };

      // Event Dates
      var eventDate1 = BuildEventDate(1, event1, new DateTime(2018, 12, 18), new DateTime(2018, 12, 21));
      var eventDate2 = BuildEventDate(2, event1, new DateTime(2018, 12, 24), new DateTime(2018, 12, 25));
      var eventDate3 = BuildEventDate(3, event2, new DateTime(2018, 12, 03), new DateTime(2018, 12, 07));
      var eventDate4 = BuildEventDate(4, event2, new DateTime(2018, 12, 10), new DateTime(2018, 12, 14));
      var eventDate5 = BuildEventDate(5, event2, new DateTime(2018, 12, 17), new DateTime(2018, 12, 21));
      var eventDate6 = BuildEventDate(6, event3, new DateTime(2019, 02, 01), new DateTime(2019, 02, 01));
      var eventDate7 = BuildEventDate(7, event3, new DateTime(2019, 02, 04), new DateTime(2019, 02, 08));
      var eventDate8 = BuildEventDate(8, event3, new DateTime(2019, 02, 11), new DateTime(2019, 02, 14));
      var eventDate9 = BuildEventDate(9, event4, new DateTime(2018, 12, 18), new DateTime(2018, 12, 21));
      var eventDate10 = BuildEventDate(10, event4, new DateTime(2018, 12, 24), new DateTime(2018, 12, 25));
      var eventDate11 = BuildEventDate(11, event5, new DateTime(2019, 01, 01), new DateTime(2019, 01, 04));
      var eventDate12 = BuildEventDate(12, event5, new DateTime(2019, 01, 07), new DateTime(2019, 01, 11));
      var eventDate13 = BuildEventDate(13, event5, new DateTime(2019, 01, 14), new DateTime(2019, 01, 14));
      var eventDate14 = BuildEventDate(14, event6, new DateTime(2019, 02, 01), new DateTime(2019, 02, 01));
      var eventDate15 = BuildEventDate(15, event6, new DateTime(2019, 02, 04), new DateTime(2019, 02, 08));
      var eventDate16 = BuildEventDate(16, event6, new DateTime(2019, 02, 11), new DateTime(2019, 02, 14));
      var eventDate17 = BuildEventDate(17, event7, new DateTime(2018, 12, 18), new DateTime(2018, 12, 21));
      var eventDate18 = BuildEventDate(18, event7, new DateTime(2018, 12, 24), new DateTime(2018, 12, 25));
      var eventDate19 = BuildEventDate(19, event8, new DateTime(2019, 01, 01), new DateTime(2019, 01, 04));
      var eventDate20 = BuildEventDate(20, event8, new DateTime(2019, 01, 07), new DateTime(2019, 01, 11));
      var eventDate21 = BuildEventDate(21, event8, new DateTime(2019, 01, 14), new DateTime(2019, 01, 14));
      var eventDate22 = BuildEventDate(22, event9, new DateTime(2019, 02, 01), new DateTime(2019, 02, 01));
      var eventDate23 = BuildEventDate(23, event9, new DateTime(2019, 02, 04), new DateTime(2019, 02, 08));
      var eventDate24 = BuildEventDate(24, event9, new DateTime(2019, 02, 11), new DateTime(2019, 02, 14));
      var eventDate25 = BuildEventDate(25, event10, new DateTime(2019, 04, 08), new DateTime(2019, 04, 12));
      var eventDate26 = BuildEventDate(26, event10, new DateTime(2019, 04, 15), new DateTime(2018, 04, 15));
      var eventDate27 = BuildEventDate(27, event11, new DateTime(2019, 01, 01), new DateTime(2019, 01, 04));
      var eventDate28 = BuildEventDate(28, event11, new DateTime(2019, 01, 07), new DateTime(2019, 01, 11));
      var eventDate29 = BuildEventDate(29, event11, new DateTime(2019, 01, 14), new DateTime(2019, 01, 14));
      var eventDate30 = BuildEventDate(30, event12, new DateTime(2019, 02, 01), new DateTime(2019, 02, 01));
      var eventDate31 = BuildEventDate(31, event12, new DateTime(2019, 02, 04), new DateTime(2019, 02, 08));
      var eventDate32 = BuildEventDate(32, event12, new DateTime(2019, 02, 11), new DateTime(2019, 02, 14));
      var eventDate33 = BuildEventDate(33, event13, new DateTime(2018, 12, 25), new DateTime(2018, 12, 28));
      var eventDate34 = BuildEventDate(34, event13, new DateTime(2018, 12, 31), new DateTime(2018, 12, 31));
      var eventDate35 = BuildEventDate(35, event14, new DateTime(2019, 03, 01), new DateTime(2019, 03, 01));
      var eventDate36 = BuildEventDate(36, event14, new DateTime(2019, 03, 04), new DateTime(2019, 03, 08));
      var eventDate37 = BuildEventDate(37, event14, new DateTime(2019, 03, 11), new DateTime(2019, 03, 14));
      var eventDate38 = BuildEventDate(38, event15, new DateTime(2019, 02, 18), new DateTime(2019, 02, 22));
      var eventDate39 = BuildEventDate(39, event16, new DateTime(2019, 03, 04), new DateTime(2019, 03, 07));


      EventDateRepository = new List<EventDate>()
      {
        eventDate1,
        eventDate2,
        eventDate3,
        eventDate4,
        eventDate5,
        eventDate6,
        eventDate7,
        eventDate8,
        eventDate9,
        eventDate10,
        eventDate11,
        eventDate12,
        eventDate13,
        eventDate14,
        eventDate15,
        eventDate16,
        eventDate17,
        eventDate18,
        eventDate19,
        eventDate20,
        eventDate21,
        eventDate22,
        eventDate23,
        eventDate24,
        eventDate25,
        eventDate26,
        eventDate27,
        eventDate28,
        eventDate29,
        eventDate30,
        eventDate31,
        eventDate32,
        eventDate33,
        eventDate34,
        eventDate35,
        eventDate36,
        eventDate37,
        eventDate38,
        eventDate39
      };

      event1.EventDates = new List<EventDate>()
      {
        eventDate1,
        eventDate2
      };

      event2.EventDates = new List<EventDate>()
      {
        eventDate3,
        eventDate4,
        eventDate5
      };

      event3.EventDates = new List<EventDate>()
      {
        eventDate6,
        eventDate7,
        eventDate8
      };

      event4.EventDates = new List<EventDate>()
      {
        eventDate9,
        eventDate10
      };

      event5.EventDates = new List<EventDate>()
      {
        eventDate11,
        eventDate12,
        eventDate13
      };

      event6.EventDates = new List<EventDate>()
      {
        eventDate14,
        eventDate15,
        eventDate16
      };

      event7.EventDates = new List<EventDate>()
      {
        eventDate17,
        eventDate18
      };

      event8.EventDates = new List<EventDate>()
      {
        eventDate19,
        eventDate20,
        eventDate21
      };

      event9.EventDates = new List<EventDate>()
      {
        eventDate22,
        eventDate23,
        eventDate24
      };

      event10.EventDates = new List<EventDate>()
      {
        eventDate25,
        eventDate26
      };

      event11.EventDates = new List<EventDate>()
      {
        eventDate27,
        eventDate28,
        eventDate29
      };

      event12.EventDates = new List<EventDate>()
      {
        eventDate30,
        eventDate31,
        eventDate32
      };

      event13.EventDates = new List<EventDate>()
      {
        eventDate33,
        eventDate34
      };

      event14.EventDates = new List<EventDate>()
      {
        eventDate35,
        eventDate36,
        eventDate37
      };

      event15.EventDates = new List<EventDate>()
      {
        eventDate38
      };

      event16.EventDates = new List<EventDate>()
      {
        eventDate39
      };

      #endregion
    }

    #region Builders
    private static EventDate BuildEventDate(int id, Event evnt, DateTime startDate, DateTime endDate)
    {
      return new EventDate()
      {
        EventDatesId = id,
        Event = evnt,
        EventId = evnt.EventId,
        StartDate = startDate,
        EndDate = endDate,
        IsHalfDay = false
      };
    }

    private static EmployeeRole BuildEmployeeRole(int employeeRoleId, string description)
    {
      return new EmployeeRole()
      {
        EmployeeRoleId = employeeRoleId,
        Description = description
      };
    }

    private static Client BuildClient(int clientId, string clientName)
    {
      return new Client()
      {
        ClientId = clientId,
        ClientName = clientName
      };
    }

    private static Team BuildTeam(int teamId, Client client, string teamName)
    {
      return new Team()
      {
        TeamId = teamId,
        ClientId = client.ClientId,
        Client = client,
        TeamName = teamName
      };
    }

    private static EventStatus BuildEventStatus(int eventStatusId, string eventStatusDescription)
    {
      return new EventStatus()
      {
        EventStatusId = eventStatusId,
        Description = eventStatusDescription
      };
    }

    private static EventType BuildEventType(int eventTypeId, string eventTypeDescription)
    {
      return new EventType()
      {
        EventTypeId = eventTypeId,
        Description = eventTypeDescription
      };
    }

    private static Country BuildCountry(int countryId, string countryDescription)
    {
      return new Country()
      {
        CountryId = countryId,
        Description = countryDescription
      };
    }

    private static EmployeeStatus BuildEmployeeStatus(int id, string description)
    {
      return new EmployeeStatus()
      {
        EmployeeRoleId = id,
        Description = description
      };
    }

    private static EventMessageType BuildEventMessageType(int id, string description)
    {
      return new EventMessageType()
      {
        EventMessageId = id,
        Description = description
      };
    }

    private static Contract BuildContract(int contractId, Team team, Employee employee, DateTime startDate, DateTime? endDate)
    {
      return new Contract()
      {
        ContractId = contractId,
        Employee = employee,
        Team = team,
        TeamId = team.TeamId,
        EmployeeId = employee.EmployeeId,
        StartDate = startDate,
        EndDate = endDate
      };
    }

    private static Event BuildEvent(int eventId, Employee employee, EventStatus eventStatus, EventType eventType)
    {
      return new Event()
      {
        EventId = eventId,
        DateCreated = DateTime.Now,
        Employee = employee,
        EmployeeId = employee.EmployeeId,
        EventStatus = eventStatus,
        EventStatusId = eventStatus.EventStatusId,
        EventType = eventType,
        EventTypeId = eventType.EventTypeId,
      };
    }
    private static Employee BuildEmployee(int employeeId, string forename, string surname, string email, Country country, EmployeeRole role, EmployeeStatus status)
    {
      return new Employee()
      {
        EmployeeId = employeeId,
        Forename = forename,
        Surname = surname,
        Country = country,
        CountryId = country.CountryId,
        Email = email,
        EmployeeRoleId = role.EmployeeRoleId,
        EmployeeRole = role,
        EmployeeStatus = status,
        EmployeeStatusId = status.EmployeeRoleId
      };
    }

    #endregion
  }
}
