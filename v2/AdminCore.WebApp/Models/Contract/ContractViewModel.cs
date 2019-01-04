using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AdminCore.WebApi.Models.Team;

namespace AdminCore.WebApi.Models.Contract
{
  public class ContractViewModel
  {
    public int ContractId { get; set; }

    public TeamViewModel Team { get; set; }

    public int EmployeeId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}
