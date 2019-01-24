using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using AdminCore.DTOs.EventMessage;
using System;
using System.Collections.Generic;

namespace AdminCore.Common.Interfaces
{
  public interface IDashboardService
  {
    IList<EventDto> GetEmployeeDashboardEvents(int employeeId, DateTime date);

    IList<EventDto> GetEmployeeEventsForMonth(int employeeId, DateTime date);

    IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeSnapshotsByEmployeeId(int employeeId);

    IDictionary<string, List<EmployeeSnapshotDto>> GetTeamSnapshotDashboardEvents();

    IList<EventMessageDto> GetEventMessagesByEventId(int eventId);

    IList<ClientSnapshotDto> GetTeamDashboardEvents(int employeeId, DateTime date);
  }
}