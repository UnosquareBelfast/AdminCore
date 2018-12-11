using System;
using System.Collections.Generic;
using System.Text;

namespace AdminCore.DTOs
{
  public class ContractDto
  {
    public int ContractId { get; set; }

    public int TeamId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}
