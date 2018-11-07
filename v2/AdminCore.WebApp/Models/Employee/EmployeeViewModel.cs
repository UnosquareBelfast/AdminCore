// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeViewModel.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the RegisterEmployeeViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models
{
  using System;

  /// <summary>
  /// The patient model.
  /// </summary>
  public class EmployeeViewModel
  {
    public string Email { get; set; }

    public int EmployeeId { get; set; }

    public String Forename { get; set; }

    public String Surname { get; set; }

    public int TotalHolidays { get; set; }

    public DateTime StartDate { get; set; }

    public int CountryId { get; set; }

    public String CountryDescription { get; set; }

    public int EmployeeRoleId { get; set; }

    public String EmployeeRoleDescription { get; set; }

    public int EmployeeStatusId { get; set; }

    public String StatusDescription { get; set; }
  }
}