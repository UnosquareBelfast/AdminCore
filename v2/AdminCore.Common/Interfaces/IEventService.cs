using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> GetAnnualLeaveByEmployee(int employeeId);

    IList<EventDto> GetByDateBetween(DateTime startDate, DateTime endDate);

    IList<EventDto> GetEventsByEmployeeId(int employeeId);

    IList<EventDateDto> GetEventDatesByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate);

    EventDto GetEvent(int id);

    IList<EventDto> GetEventByStatus(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> GetEventByType(EventTypes eventType);

    HolidayStatsDto GetHolidayStatsForUser(int employeeId);

    EventDto CreateEvent(int employeeId, EventDateDto dates);

    void UpdateEvent(EventDateDto eventDateDto);

    void UpdateEventStatus(int eventId, EventStatuses status);

    void RejectEvent(int eventId, string message, int employeeId);

    void IsHolidayValid(int employeeId, EventDateDto eventDates, bool modelIsHalfDay);
  }
}