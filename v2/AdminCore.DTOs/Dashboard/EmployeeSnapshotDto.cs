using System;
using System.Collections.Generic;
using System.Text;

namespace AdminCore.DTOs.Dashboard
{
    public class EmployeeSnapshotDto
    {
      public int TeamId { get; set; }

      public string Name { get; set; }

      public string Description { get; set; }

      public string TeamName { get; set; }

      public int EmployeeId { get; set; }

      public string Email { get; set; }

      public string ClientName { get; set; }
  }
}
