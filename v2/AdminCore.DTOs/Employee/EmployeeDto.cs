// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeDto.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the PatientDTO type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DTOs.Employee
{
  using System;

  /// <summary>
  /// The patient dto.
  /// </summary>
  public class EmployeeDto
  {
    /// <summary>
    /// Gets or sets the country.
    /// </summary>
    public int CountryId { get; set; }

    /// <summary>
    /// Gets or sets the Email.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the employee id.
    /// </summary>
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    public string Forename { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Gets or sets the role.
    /// </summary>
    public int EmployeeRoleId { get; set; }

    /// <summary>
    /// Gets or sets the StartDate.
    /// </summary>
    public DateTime StartDate { get; set; }

    /// <summary>
    /// Gets or sets the status.
    /// </summary>
    public int EmployeeStatusId { get; set; }

    /// <summary>
    /// Gets or sets the surname.
    /// </summary>
    public string Surname { get; set; }

    /// <summary>
    /// Gets or sets the TotalHolidays.
    /// </summary>
    public int TotalHolidays { get; set; }
  }
}