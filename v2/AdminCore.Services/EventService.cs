﻿using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
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

    public IList<EventDto> GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate,
      DateTime endDate)
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
    
    public void CreateEvent(EventDto newEvent)
    {
      var eventDates = new List<EventDateDto>();
      var newEventDates = SplitEventIfFallsOnAWeekend(newEvent, newEvent.EventDates.Last().EndDate, eventDates);
      //eventDto.EventDates = eventDates;
    }
    
    private IList<EventDateDto> SplitEventIfFallsOnAWeekend(EventDto eventDto, DateTime originalEndDate, IList<EventDateDto> eventDates)
    {
      var startDate = eventDto.EventDates.First().StartDate;
      var endDate = eventDto.EventDates.Last().EndDate;
      foreach (var day in EachDay(startDate, endDate))
      {
        if (day.DayOfWeek == DayOfWeek.Saturday)
        {
          // Set end date
          eventDates.Add(SetEndDateForNewEvent(eventDto, eventDates, day));
          // Create new event
          var nextEvent = MapEventDto(eventDto, originalEndDate, day, 2);
          // Check again
          SplitEventIfFallsOnAWeekend(nextEvent, nextEvent.EventDates.Last().EndDate, eventDates);
          break;
        }
      }

      if (eventDto.EventDates.Last().EndDate == originalEndDate)
      {
        EventDateDto eventDateDto = new EventDateDto
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

    private IList<EventDto> BuildEventDtoFromEventDates(IList<EventDate> eventDates)
    {
      IList<EventDto> eventDto = new List<EventDto>();
      int lastEventId = 0;
      foreach (var eventDate in eventDates)
      {
        lastEventId = IfIsTheFirstElementSetTheEventId(lastEventId, eventDate);
        lastEventId = IfNewEventThenAddPreviousEventToList(eventDate, lastEventId, eventDto);
      }

      IfOnlyOneEventAddToList(eventDates, eventDto);

      return eventDto;
    }

    private void IfOnlyOneEventAddToList(IList<EventDate> eventDates, IList<EventDto> eventDto)
    {
      if (!eventDto.Any())
      {
        eventDto.Add(GetEvent(eventDates.First().EventId));
      }
    }

    private int IfNewEventThenAddPreviousEventToList(EventDate eventDate, int lastEventId, IList<EventDto> eventDto)
    {
      if (eventDate.EventId != lastEventId)
      {
        eventDto.Add(GetEvent(lastEventId));
        lastEventId = eventDate.EventId;
      }

      return lastEventId;
    }

    private static int IfIsTheFirstElementSetTheEventId(int lastEventId, EventDate eventDate)
    {
      if (lastEventId == 0)
      {
        lastEventId = eventDate.EventId;
      }

      return lastEventId;
    }
    
    private EventDateDto SetEndDateForNewEvent(EventDto eventDto, ICollection<EventDateDto> eventDates, DateTime day)
    {
      eventDto.EventDates.Last().EndDate = day.AddDays(-1);
      EventDateDto eventDateDto = new EventDateDto
      {
        StartDate = eventDto.EventDates.First().StartDate,
        EndDate = eventDto.EventDates.Last().EndDate
      };
      return eventDateDto;
    }

    public IEnumerable<DateTime> EachDay(DateTime from, DateTime thru)
    {
      for (var day = from.Date; day.Date <= thru.Date; day = day.AddDays(1))
        yield return day;
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