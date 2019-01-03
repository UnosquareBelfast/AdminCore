using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Linq.Expressions;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.Services.Base;
using AutoMapper;
using Microsoft.EntityFrameworkCore.Internal;

namespace AdminCore.Services
{
  public class DashboardService : BaseService, IDashboardService
  {
    private readonly IMapper _mapper;
    private readonly IEventService _eventService;

    public DashboardService(IDatabaseContext databaseContext, IEventService eventService, IMapper mapper) : base(databaseContext)
    {
      _mapper = mapper;
      _eventService = eventService;
    }

    public IList<EventDto> GetEmployeeDashboardEvents(int employeeId, DateTime date)
    {
      var eventList = DatabaseContext.EventRepository.Get
      (
        evnt => EmployeeDashboardEventsQuery(employeeId, date, evnt),
        null,
        evnt => evnt.EventDates,
        evnt => evnt.Employee,
        evnt => evnt.EventType,
        evnt => evnt.EventStatus
      );
      return _mapper.Map<IList<EventDto>>(eventList);
    }

    public IList<EventDto> GetEmployeeEventsForMonth(int employeeId, DateTime date)
    {
      var events = DatabaseContext.EventRepository.Get(evnt => evnt.EmployeeId == employeeId && DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, date),
        null,
        x => x.EventDates,
        x => x.Employee,
        x => x.EventType,
        x => x.EventStatus);
      return _mapper.Map<IList<EventDto>>(events);
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeSnapshotsByEmployeeId(int employeeId)
    {
      var contractList = DatabaseContext.ContractRepository.Get
      (
        contract => GetEmployeeSnapshotByEmployeeIdQuery(employeeId, contract, DateTime.Today),
        null,
        contract => contract.Team
      );
      return ConvertContractListToEmployeeSnapshotDtoMap(contractList);
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetTeamSnapshotDashboardEvents()
    {
      var contractList = DatabaseContext.ContractRepository.Get
      (
        contract => GetTeamSnapshotDashboardEventsQuery(contract, DateTime.Today),
        null,
        contract => contract.Team
      );
      return ConvertContractListToEmployeeSnapshotDtoMap(contractList);
    }

    public IList<EventMessageDto> GetEventMessagesByEventId(int eventId)
    {
      var eventMessages = DatabaseContext.EventMessageRepository.Get(eventMessage => eventMessage.Event.EventId == eventId);
      return _mapper.Map<IList<EventMessageDto>>(eventMessages);
    }

    public IList<EventDto> GetTeamDashboardEvents(int employeeId, DateTime date)
    {
      var eventList = DatabaseContext.EventRepository.Get
      (
        evnt => (evnt.EmployeeId == employeeId || evnt.Employee.Contracts.Any(contract => contract.EmployeeId == employeeId && DateService.ContractIsActiveDuringDate(contract, date))) &&
                DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, date),
        null,
        evnt => evnt.EventStatus,
        evnt => evnt.EventType,
        evnt => evnt.EventMessages
      );
      return _mapper.Map<IList<EventDto>>(eventList);
    }
    
    public static bool EmployeeDashboardEventsQuery(int employeeId, DateTime date, Event evnt)
    {
      const int cancelled = (int) EventStatuses.Cancelled;
      var startOfMonth = DateService.GetMonthStartDate(date);
      var endOfMonth = DateService.GetMonthEndDate(date);

      return EmployeeDashboardEvents(evnt, employeeId, cancelled, startOfMonth, endOfMonth);
    }

    private static bool EmployeeDashboardEvents(Event evnt, int employeeId, int cancelled, DateTime startOfMonth, DateTime endOfMonth)
    {
      return (evnt.EmployeeId == employeeId) &&
             (evnt.EventStatus.EventStatusId != cancelled) &&
             DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, startOfMonth) &&
             EmployeeHasActiveContractsDuringMonth(evnt.Employee.Contracts, startOfMonth, endOfMonth);
    }

    public static bool GetEmployeeSnapshotByEmployeeIdQuery(int employeeId, Contract contract, DateTime date)
    {
      return contract.EmployeeId == employeeId &&
             DateService.ContractIsActiveDuringDate(contract, date) &&
             contract.Employee.Events.Any(evnt => DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, date));
    }
    
    private static bool GetTeamSnapshotDashboardEventsQuery(Contract contract, DateTime date)
    {
      return DateService.ContractIsActiveDuringDate(contract, date) &&
             contract.Employee.Events.Any(evnt => DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, date));
    }

    private static bool EmployeeHasActiveContractsDuringMonth(IEnumerable<Contract> employeeContracts, DateTime startOfMonth, DateTime endOfMonth)
    {
      return employeeContracts.Any(contract => DateService.ContractIsActiveDuringRangeOfDates(contract, startOfMonth, endOfMonth));
    }

    private IEnumerable<Event> GetEventsForListOfEmployeesInMonth(IEnumerable<Employee> employeeList, DateTime date)
    {
      return DatabaseContext.EventRepository.Get(evnt => employeeList.Contains(evnt.Employee) && DateService.EventContainsEventDatesThatHappenDuringMonth(evnt.EventDates, date),
        null,
        evnt => evnt.EventDates,
        evnt => evnt.Employee,
        evnt => evnt.EventType,
        evnt => evnt.EventStatus);
    }

    private static IDictionary<string, List<EmployeeSnapshotDto>> ConvertContractListToEmployeeSnapshotDtoMap(IList<Contract> contractList)
    {
      IDictionary<string, List<EmployeeSnapshotDto>> snapshotMap = new Dictionary<string, List<EmployeeSnapshotDto>>();
      foreach (var contract in contractList)
      {
        var employeeSnapshotDto = CreateEmployeeSnapshotFromContract(contract);
        AddEmployeeSnapshotToSnapshotMap(snapshotMap, contract.Team.TeamName, employeeSnapshotDto);
      }
      return snapshotMap;
    }

    private static void AddEmployeeSnapshotToSnapshotMap(IDictionary<string, List<EmployeeSnapshotDto>> snapshotMap, string teamName, EmployeeSnapshotDto employeeSnapshotDto)
    {
      if (snapshotMap.ContainsKey(teamName))
      {
        snapshotMap[teamName].Add(employeeSnapshotDto);
      }
      else
      {
        snapshotMap.Add(teamName, new List<EmployeeSnapshotDto>() { employeeSnapshotDto });
      }
    }

    private static EmployeeSnapshotDto CreateEmployeeSnapshotFromContract(Contract contract)
    {
      return new EmployeeSnapshotDto()
      {
        ClientName = contract.Team.Client.ClientName,
        Description = contract.Employee.Events.First().EventType.Description,
        TeamName = contract.Team.TeamName,
        TeamId = contract.TeamId,
        Email = contract.Employee.Email,
        EmployeeId = contract.EmployeeId,
        Name = $"{contract.Employee.Forename} {contract.Employee.Surname}"
      };
    }
  }
}