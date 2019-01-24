using AdminCore.WebApi.Models.Team;
using System;

namespace AdminCore.WebApi.Models.Contract
{
  public class ContractViewModel
  {
    public int ContractId { get; set; }

    public TeamViewModel Team { get; set; }

    public string ClientName { get; set; }

    public int EmployeeId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}