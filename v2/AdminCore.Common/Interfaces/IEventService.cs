using AdminCore.Constants.Enums;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> FindAnnualLeaveByEmployee(int EmployeeID);

    IList<EventDto> FindByDateBetween(DateTime RangeStart, DateTime RangeEnd, EventTypes EventType);

    IList<EventDto> FindByEmployee(int EmployeeID);

    EventDto FindByEmployeeIDStartDateAndEndDate(int EmployeeID, DateTime StartDate, DateTime EndDate);

    EventDto FindById(int ID);

    IList<EventDto> FindByStatusType(EventStatuses EventStatus, EventTypes EventType);

    IList<EventDto> FindByType(EventTypes EventType);

    EmployeeDto FindEmployeeFromEmployeeID(int EmployeeID);

    IList<EventDto> FindWorkFromHomeByEmployee(int EmployeeID);
  }
}