using System;

namespace AdminCore.WebApi.Models.Employee
{
  public class RegisterEmployeeViewModel
  {
    public string Email { get; set; }

    public string Password { get; set; }

    public string Forename { get; set; }

    public string Surname { get; set; }

    public int CountryId { get; set; }

    public int EmployeeRoleId { get; set; }

    public int EmployeeStatusId { get; set; }

    public DateTime StartDate { get; set; }
  }
}