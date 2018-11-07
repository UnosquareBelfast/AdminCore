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
    public IList<EventDto> FindByType(EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public EventDto FindById(int id)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByEmployee(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public EventDto FindByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByDateBetween(DateTime rangeStart, DateTime rangeEnd, EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      throw new System.NotImplementedException();
    }

    public EmployeeDto FindEmployeeFromEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindAnnualLeaveByEmployee(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindWorkFromHomeByEmployee(int employeeId)
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