using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IDashboardService
  {
    IList<EventDto> GetEmployeeDashboardEvents(int employeeId, DateTime date);

    IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeTeamSnapshot(int employeeId);

    IList<EventMessageDto> GetEventMessagesByEventId(int eventid);

    IList<EventDto> GetTeamDashboardEvents(int employeeId, DateTime date);

    IDictionary<string, List<EmployeeSnapshotDto>> GetTeamSnapshotDashboardEvents();
  }
}