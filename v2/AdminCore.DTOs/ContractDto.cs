using AdminCore.DTOs.Team;
using System;

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