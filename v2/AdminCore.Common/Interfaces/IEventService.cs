using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;
using AdminCore.Common.Message;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    ResponseMessage<IList<EventDto>> GetAnnualLeaveByEmployee(int employeeId);

    ResponseMessage<IList<EventDto>> GetByDateBetween(DateTime startDate, DateTime endDate, EventTypes eventType);

    ResponseMessage<IList<EventDto>> GetEventsByEmployeeId(int employeeId);

    ResponseMessage<IList<EventDto>> GetEventsByEmployeeIdAndStartAndEndDates(int employeeId, DateTime startDate, DateTime endDate);

    ResponseMessage<EventDto> GetEvent(int id);

    ResponseMessage<IList<EventDto>> GetByStatusType(EventStatuses eventStatus, EventTypes eventType);

    ResponseMessage<IList<EventDto>> GetByType(EventTypes eventType);

    ResponseMessage<string> SaveEvent(EventDto eventDto);

    ResponseMessage<string> UpdateEvent(EventDto eventDto);

    ResponseMessage<string> ApproveEvent(EventDto eventDto);

    ResponseMessage<string> CancelEvent(EventDto eventDto);

    ResponseMessage<List<string>> RejectEvent(int eventId, string message, int employeeId);
  }
}