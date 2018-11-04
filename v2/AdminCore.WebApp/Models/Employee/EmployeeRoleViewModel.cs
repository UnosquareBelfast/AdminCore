// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeRoleViewModel.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EmployeeRoleViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models.Employee
{
  /// <summary>
  /// The employee role view model.
  /// </summary>
  public class EmployeeRoleViewModel
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
