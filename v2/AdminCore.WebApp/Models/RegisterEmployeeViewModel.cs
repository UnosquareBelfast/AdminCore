// --------------------------------------------------------------------------------------------------------------------
// <copyright file="RegisterEmployeeViewModel.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the RegisterEmployeeViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.WebApi.Models
{
  using System;

  /// <summary>
  /// The patient model.
  /// </summary>
  public class RegisterEmployeeViewModel
  {
    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Gets or sets the forename.
    /// </summary>
    public string Forename { get; set; }

    /// <summary>
    /// Gets or sets the surname.
    /// </summary>
    public string Surname { get; set; }

    /// <summary>
    /// Gets or sets the countryId.
    /// </summary>
    public int CountryId { get; set; }

    /// <summary>
    /// Gets or sets the employeeRoleId.
    /// </summary>
    public int EmployeeRoleId { get; set; }

    /// <summary>
    /// Gets or sets the statusId.
    /// </summary>
    public int StatusId { get; set; }

    /// <summary>
    /// Gets or sets the startDate.
    /// </summary>
    public DateTime StartDate { get; set; }
  }
}