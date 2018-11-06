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
    public IList<EventDto> FindByType(EventTypes EventType)
    {
      throw new System.NotImplementedException();
    }

    public EventDto FindById(int ID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByEmployee(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    public EventDto FindByEmployeeIDStartDateAndEndDate(int EmployeeID, DateTime StartDate, DateTime EndDate)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByDateBetween(DateTime RangeStart, DateTime RangeEnd, EventTypes EventType)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindByStatusType(EventStatuses EventStatus, EventTypes EventType)
    {
      throw new System.NotImplementedException();
    }

    public EmployeeDto FindEmployeeFromEmployeeID(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindAnnualLeaveByEmployee(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> FindWorkFromHomeByEmployee(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapEventsToDto(List<Event> Events)
    {
      throw new System.NotImplementedException();
    }

    public IList<EventDto> MapToEventMessage(String Message, Event Event, Employee Employee, int EventMessageTypeID)
    {
      throw new System.NotImplementedException();
    }

    public void SaveEvents(List<EventDto> EventDtos)
    {
      throw new System.NotImplementedException();
    }

    public void UpdateEvents(UpdateEventDto UpdateEventDto)
    {
      throw new System.NotImplementedException();
    }

    public void ApproveEvent(int EventID)
    {
      throw new System.NotImplementedException();
    }

    public void CancelEvent(int EventID)
    {
      throw new System.NotImplementedException();
    }

    public void RejectEvent(int EventID, String Message, int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    public void Save(Event Event)
    {
      throw new System.NotImplementedException();
    }

    public void SaveEventMessage(EventMessage EventMessage)
    {
      throw new System.NotImplementedException();
    }
  }
}