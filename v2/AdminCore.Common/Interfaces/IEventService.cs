using System;
using System.Collections.Generic;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventDates;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> GetAnnualLeaveByEmployee(int employeeId);

    IList<EventDto> GetByDateBetween(EventDateDto eventDateDto, EventTypes eventType);

    IList<EventDto> GetByEmployeeId(int employeeId);

    EventDto GetByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate);

    EventDto Get(int id);

    IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> GetByType(EventTypes eventType);

    EventDto SaveEvent(EventDto eventDto);

    EventDto UpdateEvent(EventDto eventDto);

    EventDto ApproveEvent(EventDto eventDto);

    EventDto CancelEvent(EventDto eventDto);

    EventDto RejectEvent(EventDto eventDto);
  }
}