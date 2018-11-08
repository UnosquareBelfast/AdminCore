using System;
using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DAL.Models;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;

namespace AdminCore.Services
{
  public class EventService : IEventService
  {
    public IList<EventDto> GetByType(EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public EventDto GetById(int id)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> GetByEmployee(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public EventDto GetByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> GetByDateBetween(DateTime rangeStart, DateTime rangeEnd, EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public EmployeeDto GetEmployeeFromEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> GetAnnualLeaveByEmployee(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> GetWorkFromHomeByEmployee(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapEventsToDto(List<Event> events)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapToEventMessage(String message, Event events, Employee employee, int eventMessageTypeId)
    {
      throw new System.NotImplementedException();
    }

    public void SaveEvents(List<EventDto> eventDtos)
    {
      throw new System.NotImplementedException();
    }

    public void UpdateEvents(UpdateEventDto updateEventDto)
    {
      throw new System.NotImplementedException();
    }

    public void ApproveEvent(int eventId)
    {
      throw new System.NotImplementedException();
    }

    public void CancelEvent(int eventId)
    {
      throw new System.NotImplementedException();
    }

    public void RejectEvent(int eventId, String message, int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public void Save(Event events)
    {
      throw new System.NotImplementedException();
    }

    public void SaveEventMessage(EventMessage eventMessage)
    {
      throw new System.NotImplementedException();
    }
  }
}