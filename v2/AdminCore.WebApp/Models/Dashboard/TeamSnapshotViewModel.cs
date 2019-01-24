using System.Collections.Generic;

namespace AdminCore.WebApi.Models.Dashboard
{
  public class TeamSnapshotViewModel
  {
    public int TeamId { get; set; }

    public string TeamName { get; set; }

    public ICollection<EmployeeSnapshotViewModel> Employees { get; set; }
  }
}