using System;
using System.Collections.Generic;
using AdminCore.DTOs.Event;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Employee;


namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
   List<EventDto> FindByType(EventTypes EventType);
   EventDto FindById(int ID);
   List<EventDto> FindByEmployee(int EmployeeID);
   EventDto FindByEmployeeIDStartDateAndEndDate(int EmployeeID, DateTime StartDate, DateTime EndDate);
   List<EventDto> FindByDateBetween(DateTime RangeStart, DateTime RangeEnd, EventTypes EventType);
   List<EventDto> FindByStatusType(EventStatuses EventStatus, EventTypes EventType);
   EmployeeDto FindEmployeeFromEmployeeID(int EmployeeID);
   List<EventDto> FindAnnualLeaveByEmployee(int EmployeeID);
   List<EventDto> FindWorkFromHomeByEmployee(int EmployeeID);
  }
}
