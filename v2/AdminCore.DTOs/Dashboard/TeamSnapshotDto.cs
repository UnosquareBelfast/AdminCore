using System.Collections.Generic;

namespace AdminCore.DTOs.Dashboard
{
  public class TeamSnapshotDto
  {
    public int TeamId { get; set; }

    public string TeamName { get; set; }

    public ICollection<EmployeeSnapshotDto> Employees { get; set; }
  }
}