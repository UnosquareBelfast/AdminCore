using AdminCore.Constants.Enums;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> FindAnnualLeaveByEmployee(int employeeId);

    IList<EventDto> FindByDateBetween(DateTime rangeStart, DateTime rangeEnd, EventTypes eventType);

    IList<EventDto> FindByEmployee(int employeeId);

    EventDto FindByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate);

    EventDto FindById(int id);

    IList<EventDto> FindByStatusType(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> FindByType(EventTypes eventType);

    EmployeeDto FindEmployeeFromEmployeeId(int employeeId);

    IList<EventDto> FindWorkFromHomeByEmployee(int employeeId);
  }
}