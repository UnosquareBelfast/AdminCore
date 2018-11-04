// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IAuthenticationService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.Common.Interfaces
{
  using AdminCore.DTOs.Employee;

  /// <summary>
  /// The HelloService interface.
  /// </summary>
  public interface IEmployeeService
  {
    /// <summary>
    /// The create new employee.
    /// </summary>
    /// <param name="registerEmployeeDto">
    /// The register employee dto.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    string CreateNewEmployee(EmployeeDto registerEmployeeDto);

    /// <summary>
    /// The does email already exist.
    /// </summary>
    /// <param name="email">
    /// The email.
    /// </param>
    /// <returns>
    /// The <see cref="bool"/>.
    /// </returns>
    bool DoesEmailAlreadyExist(string email);
  }
}