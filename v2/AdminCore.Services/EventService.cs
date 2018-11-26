using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventDates;
using AutoMapper;
using System;
using System.Collections.Generic;

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

    public IList<EventDto> GetAnnualLeaveByEmployee(int employeeId)
    {
      var annualLeave = _databaseContext.EventRepository.Get(x =>
        x.EventType.EventTypeId == (int)EventTypes.AnnualLeave
        && x.Employee.EmployeeId == employeeId);
      return _mapper.Map<List<EventDto>>(annualLeave);
    }

    public IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType)
    {
      EventDateDto eventDateDto = new EventDateDto
      {
        StartDate = startDate,
        EndDate = endDate
      };

      var eventsBetweenDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= eventDateDto.StartDate
                                                                              && x.EndDate <= eventDateDto.EndDate
                                                                              && x.Event.EventTypeId ==
                                                                              (int)EventTypes.AnnualLeave);
      return _mapper.Map<List<EventDto>>(eventsBetweenDates);
    }

    public IList<EventDto> GetByEmployeeId(int employeeId)
    {
      var events = _databaseContext.EventRepository.Get(x => x.Employee.EmployeeId == employeeId);
      return _mapper.Map<List<EventDto>>(events);
    }

    public EventDto GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate)
    {
      var eventsBetweenDates = _databaseContext.EventDatesRepository.Get(x => x.StartDate >= startDate
                                                                              && x.EndDate <= endDate
                                                                              && x.Event.EmployeeId == employeeId);
      return _mapper.Map<EventDto>(eventsBetweenDates);
    }

    public EventDto Get(int id)
    {
      var eventById = _databaseContext.EventRepository.Get(x => x.EventId == id);
      return _mapper.Map<EventDto>(eventById);
    }

    public IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      var events = _databaseContext.EventRepository.Get(x => x.EventStatus.EventStatusId == (int)eventStatus
                                                             && x.EventType.EventTypeId == (int)eventType);
      return _mapper.Map<List<EventDto>>(events);
    }

    public IList<EventDto> GetByType(EventTypes eventType)
    {
      var events = _databaseContext.EventRepository.Get(x => x.EventType.EventTypeId == (int)eventType);
      return _mapper.Map<List<EventDto>>(events);
    }

    public DatabaseStatus SaveEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public DatabaseStatus UpdateEvent(EventDto eventDto)
    {
      var existingEvent = _databaseContext.EventRepository.GetById(eventDto);
      if (existingEvent != null)
      {
        UpdateEventToChangedEvent(eventDto, existingEvent);
        return DatabaseStatus.Success;
      }

      return DatabaseStatus.Failure;
    }

    public DatabaseStatus ApproveEvent(EventDto eventDto)
    {
      var existingEvent = _databaseContext.EventRepository.GetById(eventDto);
      if (existingEvent != null)
      {
        UpdateStatusToApproved(existingEvent);
        return DatabaseStatus.Success;
      }

      return DatabaseStatus.Failure;
    }

    public DatabaseStatus CancelEvent(EventDto eventDto)
    {
      var existingEvent = _databaseContext.EventRepository.GetById(eventDto);
      if (existingEvent != null)
      {
        UpdateStatusToCancelled(eventDto, existingEvent);
        return DatabaseStatus.Success;
      }

      return DatabaseStatus.Failure;
    }

    public List<string> RejectEvent(int eventId, string message, int employeeId)
    {
      List<string> responses = new List<string>();
      var existingEvent = _databaseContext.EventRepository.GetById(eventId);
      if (existingEvent != null)
      {
        UpdateStatusToRejected(eventId, employeeId, existingEvent, responses);
      }
      else
      {
        responses.Add("No Event found with an ID of: " + eventId);
      }

      return responses;
    }

    private void Save(Event eventToSave)
    {
      if (eventToSave.EventId == 0)
      {
        eventToSave.DateCreated = DateTime.Now;
      }

      eventToSave.LastModified = DateTime.Now;
      _databaseContext.SaveChanges();
    }

    private Employee GetEmployeeFromEmployeeId(int employeeId)
    {
      var employee = _databaseContext.EmployeeRepository.GetById(employeeId);

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

    private void UpdateStatusToRejected(int eventId, int employeeId, Event existingEvent, List<string> responses)
    {
      var eventToReject = SetEventStatusToRejected(employeeId, existingEvent, out var employee);
      if (employee != null)
      {
        _mapper.Map(eventId, existingEvent);
        Save(eventToReject);
      }
      else
      {
        responses.Add("No Employee found with an ID of: " + employeeId);
      }
    }

    private Event SetEventStatusToRejected(int employeeId, Event existingEvent, out Employee employee)
    {
      Event eventToReject = existingEvent;
      eventToReject.EventStatus.EventStatusId = (int)EventStatuses.Rejected;
      employee = GetEmployeeFromEmployeeId(employeeId);
      return eventToReject;
    }
  }
}