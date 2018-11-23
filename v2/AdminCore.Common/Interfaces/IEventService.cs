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

    IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType);

    IList<EventDto> GetByEmployeeId(int employeeId);

    EventDto GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate);

    EventDto Get(int id);

    IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> GetByType(EventTypes eventType);

    void SaveEvent(EventDto eventDto);

    void UpdateEvent(EventDto eventDto);

    void ApproveEvent(EventDto eventDto);

    void CancelEvent(EventDto eventDto);

    List<string> RejectEvent(EventDto eventDto, String message, int employeeId);
  }
}