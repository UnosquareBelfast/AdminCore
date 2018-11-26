using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> GetAnnualLeaveByEmployee(int employeeId);

    IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType);

    IList<EventDto> GetByEmployeeId(int employeeId);

    EventDto GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate);

    EventDto Get(int id);

    IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> GetByType(EventTypes eventType);

    DatabaseStatus SaveEvent(EventDto eventDto);

    DatabaseStatus UpdateEvent(EventDto eventDto);

    DatabaseStatus ApproveEvent(EventDto eventDto);

    DatabaseStatus CancelEvent(EventDto eventDto);

    List<string> RejectEvent(EventDto eventDto, string message, int employeeId);
  }
}