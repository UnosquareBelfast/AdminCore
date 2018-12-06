using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.Extensions;
using AdminCore.Services.Base;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.Services
{
  public class EventService : BaseService, IEventService
  {
    private readonly IMapper _mapper;

    public EventService(IDatabaseContext databaseContext, IMapper mapper)
      : base(databaseContext)
    {
      _mapper = mapper;
    }

    public IList<EventDto> GetAnnualLeaveByEmployee(int employeeId)
    {
      var annualLeave = DatabaseContext.EventRepository.Get(x =>
        x.EventType.EventTypeId == (int)EventTypes.AnnualLeave
        && x.Employee.EmployeeId == employeeId);
      return _mapper.Map<IList<EventDto>>(annualLeave);
    }

    public IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate)
    {
      var eventsBetweenDates = DatabaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                             && x.EndDate <= endDate
                                                                             && x.Event.EventTypeId ==
                                                                             (int)EventTypes.AnnualLeave);
      return _mapper.Map<IList<EventDto>>(eventsBetweenDates);
    }

    public IList<EventDto> GetEventsByEmployeeId(int employeeId)
    {
      var events = DatabaseContext.EventRepository.Get(x => x.Employee.EmployeeId == employeeId);
      return _mapper.Map<IList<EventDto>>(events);
    }

    public IList<EventDto> GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate)
    {
      var eventDates = DatabaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                     && x.EndDate <= endDate
                                                                     && x.Event.EmployeeId == employeeId);
      return null;
    }

    public EventDto GetEvent(int id)
    {
      var eventById = GetEventById(id);
      return _mapper.Map<EventDto>(eventById);
    }

    public IList<EventDto> GetEventByStatus(EventStatuses eventStatus, EventTypes eventType)
    {
      var events = DatabaseContext.EventRepository.Get(x => x.EventStatus.EventStatusId == (int)eventStatus
                                                            && x.EventType.EventTypeId == (int)eventType);

      return _mapper.Map<IList<EventDto>>(events);
    }

    public IList<EventDto> GetEventByType(EventTypes eventType)
    {
      var events = DatabaseContext.EventRepository.Get(x => x.EventType.EventTypeId == (int)eventType);
      return _mapper.Map<IList<EventDto>>(events);
    }

    public void RejectEvent(int eventId, string message, int employeeId)
    {
      var eventToReject = GetEventById(eventId);
      if (eventToReject != null)
      {
        eventToReject.EventStatusId = (int)EventStatuses.Rejected;
        var employee = GetEmployeeFromEmployeeId(employeeId);
        if (employee != null)
        {
          var eventMessage = new EventMessage()
          {
            EmployeeId = employeeId,
            EventMessageTypeId = (int)MessageType.Rejected,
            Message = message,
            LastModified = DateTime.Now
          };
          eventToReject.EventMessages.Add(eventMessage);
          DatabaseContext.SaveChanges();
        }
      }
    }

    public void UpdateEventStatus(int eventId, EventStatuses status)
    {
      var eventToUpdate = GetEventById(eventId);
      if (eventToUpdate != null)
      {
        eventToUpdate.EventStatusId = (int)status;
      }
    }

    public void CreateEvent(int employeeId, EventDateDto dates)
    {
      var newEvent = new Event()
      {
        DateCreated = DateTime.Now,
        EmployeeId = employeeId,
        EventStatusId = (int)EventStatuses.AwaitingApproval,
        EventTypeId = (int)EventTypes.AnnualLeave,
        EventDates = new List<EventDate>()
      };

      SplitEventIfFallsOnAWeekend(newEvent, dates.EndDate, dates.StartDate);
      DatabaseContext.EventRepository.Insert(newEvent);
      DatabaseContext.SaveChanges();
    }

    public void UpdateEvent(EventDateDto eventDateDto)
    {
      var eventToUpdate = GetEventById(eventDateDto.EventId);

      if (eventToUpdate != null)
      {
        eventToUpdate.EventDates.Clear();
        SplitEventIfFallsOnAWeekend(eventToUpdate, eventDateDto.EndDate, eventDateDto.StartDate);
        DatabaseContext.SaveChanges();
      }
    }

    private void SplitEventIfFallsOnAWeekend(Event newEvent, DateTime originalEndDate, DateTime startDate)
    {
      var dates = startDate.Range(originalEndDate).ToList();
      foreach (var day in dates)
      {
        if (day.DayOfWeek == DayOfWeek.Saturday)
        {
          newEvent.EventDates.Add(new EventDate()
          {
            StartDate = startDate,
            EndDate = day.AddDays(-1),
            IsHalfDay = false
          });

          var nextStartDate = day.AddDays(2);
          SplitEventIfFallsOnAWeekend(newEvent, originalEndDate, nextStartDate);
          break;
        }
      }

      if (dates.Last().Date.Day != originalEndDate.Day || dates.Count > 5 ||
          dates.First().Date.DayOfWeek == DayOfWeek.Friday) return;
      var lastDate = new EventDate()
      {
        StartDate = startDate,
        EndDate = originalEndDate
      };
      newEvent.EventDates.Add(lastDate);
    }

    private Event GetEventById(int id)
    {
      return DatabaseContext.EventRepository.GetSingle(x => x.EventId == id,
        x => x.EventDates);
    }

    private Employee GetEmployeeFromEmployeeId(int employeeId)
    {
      var employee = DatabaseContext.EmployeeRepository.GetSingle(x => x.EmployeeId == employeeId);
      return employee;
    }
  }
}