// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeRoleDto.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EmployeeRoleDto type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DTOs.Employee
{
  /// <summary>
  /// The employee role dto.
  /// </summary>
  public class EmployeeRoleDto
    {
      /// <summary>
      /// Gets or sets the employee role id.
      /// </summary>
    public int EmployeeRoleId { get; set; }

      /// <summary>
      /// Gets or sets the description.
      /// </summary>
      public string Description { get; set; }
  }
}
