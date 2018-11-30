using AdminCore.Common.Interfaces;
using AdminCore.Common.Message;
using AdminCore.Common.Message.Elements;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.Services
{
  public class EventService : IEventService
  {
    private readonly IDatabaseContext _databaseContext;

    private readonly IMapper _mapper;

    public EventService(IDatabaseContext databaseContext, IMapper mapper)
    {
      _databaseContext = databaseContext;
      _mapper = mapper;
    }

    public ResponseMessage<IList<EventDto>> GetAnnualLeaveByEmployee(int employeeId)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var annualLeave = _databaseContext.EventRepository.Get(x =>
        x.EventType.EventTypeId == (int)EventTypes.AnnualLeave
        && x.Employee.EmployeeId == employeeId);
      if (!annualLeave.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(annualLeave);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      EventDateDto eventDateDto = new EventDateDto
      {
        StartDate = startDate,
        EndDate = endDate
      };

      var eventsBetweenDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= eventDateDto.StartDate
                                                                              && x.EndDate <= eventDateDto.EndDate
                                                                              && x.Event.EventTypeId ==
                                                                              (int)EventTypes.AnnualLeave);
      if (!eventsBetweenDates.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(eventsBetweenDates);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetEventsByEmployeeId(int employeeId)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.Employee.EmployeeId == employeeId);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate,
      DateTime endDate)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var eventDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                              && x.EndDate <= endDate
                                                                              && x.Event.EmployeeId == employeeId);

      if (eventDates.Any())
      {
        responseMessage.Payload = BuildEventDtosFromEventDates(eventDates);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    private IList<EventDto> BuildEventDtosFromEventDates(IList<EventDate> eventDates)
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
        eventDto.Add(GetEvent(eventDates.First().EventId).Payload);
      }
    }

    private int IfNewEventThenAddPreviousEventToList(EventDate eventDate, int lastEventId, IList<EventDto> eventDto)
    {
      if (eventDate.EventId != lastEventId)
      {
        eventDto.Add(GetEvent(lastEventId).Payload);
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

    public ResponseMessage<EventDto> GetEvent(int id)
    {
      ResponseMessage<EventDto> responseMessage = new ResponseMessage<EventDto>(null);
      var eventById = GetEventById(id);
      if (eventById != null)
      {
        responseMessage.Payload = _mapper.Map<EventDto>(eventById);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.EventStatus.EventStatusId == (int)eventStatus
                                                             && x.EventType.EventTypeId == (int)eventType);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<IList<EventDto>> GetByType(EventTypes eventType)
    {
      ResponseMessage<IList<EventDto>> responseMessage = new ResponseMessage<IList<EventDto>>(null);
      var events = _databaseContext.EventRepository.Get(x => x.EventType.EventTypeId == (int)eventType);
      if (!events.Any())
      {
        responseMessage.Payload = _mapper.Map<IList<EventDto>>(events);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
      }
      else
      {
        responseMessage.Status = MessageConstants.MsgStatusNoRecords;
      }
      return responseMessage;
    }

    public ResponseMessage<EventDto> CreateEvent(EventDto eventDto)
    {
      ICollection<EventDateDto> eventDates = new List<EventDateDto>();
      eventDates = SplitEventIfFallsOnAWeekend(eventDto, eventDto.EventDates.Last().EndDate, eventDates);
      eventDto.EventDates = eventDates;

      ResponseMessage<EventDto> responseMessage = new ResponseMessage<EventDto>(null);
      var existingEvent = GetEventById(eventDto.EventId);

      if (existingEvent == null)
      {
        responseMessage.Payload = eventDto;
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        Save(_mapper.Map<Event>(eventDto));
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ICollection<EventDateDto> SplitEventIfFallsOnAWeekend(EventDto eventDto, DateTime originalEndDate,
      ICollection<EventDateDto> eventDates)
    {
      DateTime startDate = eventDto.EventDates.First().StartDate;
      DateTime endDate = eventDto.EventDates.Last().EndDate;
      foreach (DateTime day in EachDay(startDate, endDate))
      {
        if (day.DayOfWeek == DayOfWeek.Saturday)
        {
          // Set end date
          eventDates.Add(SetEndDateForNewEvent(eventDto, eventDates, day));
          // Create new event
          EventDto nextEvent = MapEventDto(eventDto, originalEndDate, day, 2);
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

    public ResponseMessage<EmptyMessage> UpdateEvent(EventDto eventDto)
    {
      ResponseMessage<EmptyMessage> responseMessage = new ResponseMessage<EmptyMessage>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateEventToChangedEvent(eventDto, existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<EmptyMessage> ApproveEvent(EventDto eventDto)
    {
      ResponseMessage<EmptyMessage> responseMessage = new ResponseMessage<EmptyMessage>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateStatusToApproved(existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<EmptyMessage> CancelEvent(EventDto eventDto)
    {
      ResponseMessage<EmptyMessage> responseMessage = new ResponseMessage<EmptyMessage>(null);
      var existingEvent = GetEventById(eventDto.EventId);
      if (existingEvent != null)
      {
        UpdateStatusToCancelled(eventDto, existingEvent);
        responseMessage.Status = MessageConstants.MsgStatusSuccess;
        return responseMessage;
      }

      responseMessage.Status = MessageConstants.MsgStatusFailed;
      return responseMessage;
    }

    public ResponseMessage<List<string>> RejectEvent(int eventId, string message, int employeeId)
    {
      ResponseMessage<List<string>> responseMessage = new ResponseMessage<List<string>>(null);
      List<string> responses = new List<string>();
      var existingEvent = GetEventById(eventId);
      if (existingEvent != null)
      {
        Event eventToReject = existingEvent;
        eventToReject.EventStatus.EventStatusId = (int)EventStatuses.Rejected;
        Employee employee = GetEmployeeFromEmployeeId(employeeId);
        if (employee != null)
        {
          _mapper.Map(eventId, existingEvent);
          Save(eventToReject);
          responses.Add("Successfully rejected event " + eventId + " for employee: " + employeeId);
          responseMessage.Status = MessageConstants.MsgStatusSuccess;
          responseMessage.Payload = responses;
          return responseMessage;
        }
        responses.Add("No Employee found with an ID of: " + employeeId);
      }
      else
      {
        responses.Add("No Event found with an ID of: " + eventId);
      }

      responseMessage.Payload = responses;
      return responseMessage;
    }

    private Event GetEventById(int id)
    {
      return _databaseContext.EventRepository.GetSingle(x => x.EventId == id);
    }

    private void Save(Event eventToSave)
    {
      if (eventToSave.EventId == 0)
      {
        eventToSave.DateCreated = DateTime.Now;
        _databaseContext.EventRepository.Insert(eventToSave);
      }

      eventToSave.LastModified = DateTime.Now;
      _databaseContext.SaveChanges();
    }

    private Employee GetEmployeeFromEmployeeId(int employeeId)
    {
      var employee = _databaseContext.EmployeeRepository.GetSingle(x => x.EmployeeId == employeeId);

      return employee;
    }

    private void UpdateEventToChangedEvent(EventDto eventDto, Event existingEvent)
    {
      Event eventToUpdate = _mapper.Map(eventDto, existingEvent);

      Save(eventToUpdate);
    }

    private void UpdateStatusToApproved(Event existingEvent)
    {
      Event eventToApprove = existingEvent;
      eventToApprove.EventStatus.EventStatusId = (int)EventStatuses.Approved;
      Save(eventToApprove);
    }

    private void UpdateStatusToCancelled(EventDto eventDto, Event existingEvent)
    {
      Event eventToCancel = existingEvent;
      eventToCancel.EventStatus.EventStatusId = (int)EventStatuses.Cancelled;
      _mapper.Map(eventDto, existingEvent);

      Save(eventToCancel);
    }
  }
}