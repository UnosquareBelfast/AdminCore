using System;

namespace AdminCore.WebApi.Models.Contract
{
  public class UpdateContractViewModel
  {
    public int ContractId { get; set; }

    public int TeamId { get; set; }

    public int EmployeeId { get; set; }

    public DateTime StartDate { get; set; }

    public DateTime EndDate { get; set; }
  }
}