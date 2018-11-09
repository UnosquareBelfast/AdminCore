﻿using AdminCore.Constants.Enums;
using AdminCore.DTOs.Employee;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IEventService
  {
    IList<EventDto> GetAnnualLeaveByEmployee(int employeeId);

    IList<EventDto> GetByDateBetween(DateTime rangeStart, DateTime rangeEnd, EventTypes eventType);

    IList<EventDto> GetByEmployee(int employeeId);

    EventDto GetByEmployeeIdStartDateAndEndDate(int employeeId, DateTime startDate, DateTime endDate);

    EventDto GetById(int id);

    IList<EventDto> GetByStatusType(EventStatuses eventStatus, EventTypes eventType);

    IList<EventDto> GetByType(EventTypes eventType);

    EmployeeDto GetEmployeeFromEmployeeId(int employeeId);

    IList<EventDto> GetWorkFromHomeByEmployee(int employeeId);
  }
}