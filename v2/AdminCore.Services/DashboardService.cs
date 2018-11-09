using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Dashboard;
using AdminCore.DTOs.Event;
using System;
using System.Collections.Generic;

namespace AdminCore.Services
{
  public class DashboardService : IDashboardService
  {
    public IList<EventDto> GetEmployeeEvents(int employeeId, DateTime date)
    {
      throw new NotImplementedException();
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetEmployeeTeamSnapshot(int employeeId)
    {
      throw new NotImplementedException();
    }

    public IList<EventMessageDto> GetEventMessagesByEventId(int eventId)
    {
      throw new NotImplementedException();
    }

    public IList<EventDto> GetTeamEvents(int employeeId, DateTime date)
    {
      throw new NotImplementedException();
    }

    public IDictionary<string, List<EmployeeSnapshotDto>> GetTeamSnapshotDashboardEvents()
    {
      throw new NotImplementedException();
    }
  }
}