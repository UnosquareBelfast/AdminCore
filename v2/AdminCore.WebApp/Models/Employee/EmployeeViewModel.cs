using System;

namespace AdminCore.WebApi.Models.Employee
{
  public class EmployeeViewModel
  {
    public string CountryDescription { get; set; }

    public int CountryId { get; set; }

    public string Email { get; set; }

    public int EmployeeId { get; set; }

    public string EmployeeRoleDescription { get; set; }

    public int EmployeeRoleId { get; set; }

    public int EmployeeStatusId { get; set; }

    public string Forename { get; set; }

    public DateTime StartDate { get; set; }

    public string StatusDescription { get; set; }

    public string Surname { get; set; }

    public int TotalHolidays { get; set; }
  }
}