using System;

namespace AdminCore.DTOs.Employee
{
  public class EmployeeDto
  {
    public int CountryId { get; set; }

    public string Email { get; set; }

    public int EmployeeId { get; set; }

    public string Forename { get; set; }

    public string Password { get; set; }

    public int EmployeeRoleId { get; set; }

    public DateTime StartDate { get; set; }

    public int EmployeeStatusId { get; set; }

    public string Surname { get; set; }

    public int TotalHolidays { get; set; }
  }
}