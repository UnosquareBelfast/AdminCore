// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeStatusViewModel.cs" company="AdminCore">
//   Unosquare
// </copyright>
// <summary>
//   Defines the EmployeeStatusViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models.Employee
{
  /// <summary>
  /// The employee status view model.
  /// </summary>
  public class EmployeeStatusViewModel
    {
      /// <summary>
      /// Gets or sets the employee status id.
      /// </summary>
      public int EmployeeStatusId { get; set; }

      /// <summary>
      /// Gets or sets the description.
      /// </summary>
      public string Description { get; set; }
    }
}
