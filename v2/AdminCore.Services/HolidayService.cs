using System;
using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventDates;

namespace AdminCore.Services
{
  public class HolidayService : IEventService
  {
    public IList<EventDto> GetAnnualLeaveByEmployee(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IList<EventDto> GetByDateBetween(EventDateDto eventDateDto, EventTypes eventType)
    {
      throw new NotImplementedException();
    }

    public IList<EventDto> GetByEmployeeId(int employeeId)
    {
      throw new NotImplementedException();
    }

    public EventDto GetByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate)
    {
      throw new NotImplementedException();
    }

    public EventDto Get(int id)
    {
      throw new NotImplementedException();
    }

    public IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType)
    {
      throw new NotImplementedException();
    }

    public IList<EventDto> GetByType(EventTypes eventType)
    {
      throw new NotImplementedException();
    }

    public EventDto SaveEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public EventDto UpdateEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public EventDto ApproveEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public EventDto CancelEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }

    public EventDto RejectEvent(EventDto eventDto)
    {
      throw new NotImplementedException();
    }
  }
}