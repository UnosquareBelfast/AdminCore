using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IDashboardService
  {
    IList<EventDto> GetEmployeeDashboardEvents(int employeeId, DateTime date);

    IList<EventDto> GetEmployeeEvents(int employeeId, DateTime date);

    IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeSnapshotsByEmployeeId(int employeeId);

    IList<EventMessageDto> GetEventMessagesByEventId(int eventId);

    IDictionary<string, List<EmployeeSnapshotDto>> GetTeamEmployeeSnapshots();

    IList<EventDto> GetTeamEvents(int employeeId, DateTime date);
  }
}