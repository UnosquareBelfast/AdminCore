using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using AdminCore.Extensions;
using AdminCore.Services.Base;

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
        x.EventType.EventTypeId == (int) EventTypes.AnnualLeave
        && x.Employee.EmployeeId == employeeId);
      return _mapper.Map<IList<EventDto>>(annualLeave);
    }

    public IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate)
    {
      var eventsBetweenDates = DatabaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                             && x.EndDate <= endDate
                                                                             && x.Event.EventTypeId ==
                                                                             (int) EventTypes.AnnualLeave);
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
      return BuildEventDtoFromEventDates(eventDates);
    }
    
    public EventDto GetEvent(int id)
    {
      var eventById = GetEventById(id);
      return _mapper.Map<EventDto>(eventById);
    }

    public IList<EventDto> GetEventByStatus(EventStatuses eventStatus, EventTypes eventType)
    {
      var events = DatabaseContext.EventRepository.Get(x => x.EventStatus.EventStatusId == (int) eventStatus
                                                            && x.EventType.EventTypeId == (int) eventType);

      return _mapper.Map<IList<EventDto>>(events);
    }
    
    public IList<EventDto> GetEventByType(EventTypes eventType)
    {
      var events = DatabaseContext.EventRepository.Get(x => x.EventType.EventTypeId == (int) eventType);
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
        EventStatusId = (int) EventStatuses.AwaitingApproval,
        EventTypeId = (int) EventTypes.AnnualLeave
      };
      
      SplitEventIfFallsOnAWeekend(newEvent, dates.EndDate, dates);
    }

    private void SplitEventIfFallsOnAWeekend(Event newEvent, DateTime originalEndDate, EventDateDto dates)
    {
      var startDate = dates.StartDate;
      var endDate = dates.EndDate;
      var dateRanges = startDate.Range(endDate);
      foreach (var day in dateRanges)
      {
        if (day.DayOfWeek == DayOfWeek.Saturday)
        {
          // Set end date
          // Create new event
          var nextEvent = MapEventDto(eventDto, originalEndDate, day, 2);
          // Check again
          SplitEventIfFallsOnAWeekend(nextEvent, nextEvent.EventDates.Last().EndDate, eventDates);
          break;
        }
      }

      if (eventDto.EventDates.Last().EndDate == originalEndDate)
      {
        var eventDateDto = new EventDateDto
        {
          StartDate = eventDto.EventDates.First().StartDate,
          EndDate = eventDto.EventDates.Last().EndDate
        };
        if (eventDates.Last().StartDate != eventDateDto.StartDate && eventDates.Last().EndDate != eventDateDto.EndDate)
        {
          eventDates.Add(eventDateDto);
        }
      }

      return eventDates;
    }

    private EventDto MapEventDto(EventDto priorEvent, DateTime originalEndDate, DateTime eventDate, int plusDays)
    {
      EventDto nextEvent = _mapper.Map<EventDto>(priorEvent);
      nextEvent.DateCreated = DateTime.Now;
      nextEvent.EventDates.First().StartDate = eventDate.AddDays(plusDays);
      nextEvent.EventDates.Last().EndDate = originalEndDate;
      nextEvent.LastModified = DateTime.Now;
      return nextEvent;
    }

    public void UpdateEvent(EventDto eventDto)
    {
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        //UpdateEventToChangedEvent(eventDto, existingEvent);
      }
    }

    public void ApproveEvent(EventDto eventDto)
    {
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        //UpdateStatusToApproved(existingEvent);
      }
    }

    private Event GetEventById(int id)
    {
      return DatabaseContext.EventRepository.GetSingle(x => x.EventId == id);
    }

    private void Save(Event eventToSave)
    {
      if (eventToSave.EventId == 0)
      {
        eventToSave.DateCreated = DateTime.Now;
        DatabaseContext.EventRepository.Insert(eventToSave);
      }

      eventToSave.LastModified = DateTime.Now;
      DatabaseContext.SaveChanges();
    }

    private Employee GetEmployeeFromEmployeeId(int employeeId)
    {
      var employee = DatabaseContext.EmployeeRepository.GetSingle(x => x.EmployeeId == employeeId);
      return employee;
    }
  }
}