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

    public IList<EventDto> FindByEmployee(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    public EventDto FindByEmployeeIDStartDateAndEndDate(int employeeID, DateTime startDate, DateTime endDate)
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

    public EmployeeDto FindEmployeeFromEmployeeID(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindAnnualLeaveByEmployee(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindWorkFromHomeByEmployee(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapEventsToDto(List<Event> events)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapToEventMessage(String message, Event events, Employee employee, int eventMessageTypeID)
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

    public void ApproveEvent(int eventID)
    {
      throw new System.NotImplementedException();
    }

    public void CancelEvent(int eventID)
    {
      throw new System.NotImplementedException();
    }

    public void RejectEvent(int eventID, String message, int employeeID)
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