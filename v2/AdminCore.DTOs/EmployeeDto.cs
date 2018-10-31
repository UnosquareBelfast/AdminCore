// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeDto.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the PatientDTO type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.DTOs
{
  /// <summary>
  /// The patient dto.
  /// </summary>
  public class EmployeeDto
  {
    /// <summary>
    /// Gets or sets the employee id.
    /// </summary>
    public int EmployeeId { get; set; }

    /// <summary>
    /// Gets or sets the name.
    /// </summary>
    public string Forename { get; set; }

    /// <summary>
    /// Gets or sets the surname.
    /// </summary>
    public string Surname { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    public string Password { get; set; }
  }
}
