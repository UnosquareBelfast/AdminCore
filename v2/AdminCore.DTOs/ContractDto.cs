using System;
using System.Collections.Generic;
using System.Text;
using AdminCore.DTOs.Team;

namespace AdminCore.DTOs
{
  public class ContractDto
  {
    public int ContractId { get; set; }

    public TeamDto Team { get; set; }

    public int EmployeeId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}
