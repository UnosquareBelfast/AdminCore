// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeStatusDto.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EmployeeStatusDto type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DTOs.Employee
{
  /// <summary>
  ///   The employee status dto.
  /// </summary>
  public class EmployeeStatusDto
  {
    /// <summary>
    ///   Gets or sets the description.
    /// </summary>
    public string Description { get; set; }

    /// <summary>
    ///   Gets or sets the employee status id.
    /// </summary>
    public int EmployeeStatusId { get; set; }
  }
}