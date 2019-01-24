using Microsoft.CodeAnalysis;

namespace AdminCore.WebApi.Models.Dashboard
{
  public class EmployeeSnapshotViewModel
  {
    public int EmployeeId { get; set; }

    public string Forename { get; set; }

    public string Surname { get; set; }

    public string Email { get; set; }

    public string Location { get; set; }
  }
}