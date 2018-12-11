using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.Services.Base;
using AutoMapper;

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
      throw new NotImplementedException();
    }

    public IList<EventDto> GetEmployeeEventsForMonth(int employeeId, DateTime date)
    {
      var events = DatabaseContext.EventRepository.Get(EventContainsEventDatesThatHappenDuringMonth(date),
        null,
        x => x.EventDates,
        x => x.Employee,
        x => x.EventType,
        x => x.EventStatus);
      return _mapper.Map<IList<EventDto>>(events);
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeSnapshotsByEmployeeId(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetTeamSnapshotDashboardEvents()
    {
      throw new NotImplementedException();
    }

    public IList<EventMessageDto> GetEventMessagesByEventId(int eventId)
    {
      throw new NotImplementedException();
    }
    public IList<EventDto> GetTeamDashboardEvents(int employeeId, DateTime date)
    {
      throw new NotImplementedException();
    }

    private static Expression<Func<Event, bool>> EventContainsEventDatesThatHappenDuringMonth(DateTime date)
    {
      return x => x.EventDates.Any(eventDate => EventDateFallsWithinMonth(date, eventDate));
    }

    private static bool EventDateFallsWithinMonth(DateTime date, EventDate eventDate)
    {
      return EventDateHappensDuringMonth(date, eventDate) && EventDateIsInTheSameYear(date, eventDate);
    }

    private static bool EventDateIsInTheSameYear(DateTime date, EventDate eventDate)
    {
      return (eventDate.StartDate.Year == date.Year || eventDate.EndDate.Year == date.Year);
    }

    private static bool EventDateHappensDuringMonth(DateTime date, EventDate eventDate)
    {
      return (eventDate.StartDate.Month < date.Month && eventDate.EndDate.Month > date.Month) || (eventDate.StartDate.Month == date.Month) || (eventDate.EndDate.Month == date.Month);
    }
  }
}