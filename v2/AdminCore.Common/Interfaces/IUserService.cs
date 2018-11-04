// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IUserService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IUserService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common.Interfaces
{
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;

  /// <summary>
  /// The HelloService interface.
  /// </summary>
  public interface IUserService
  {
    /// <summary>
    /// The jwt sign in.
    /// </summary>
    /// <param name="email">
    /// The email.
    /// </param>
    /// <param name="password">
    /// The password.
    /// </param>
    /// <returns>
    /// The <see cref="JwtAuthDto"/>.
    /// </returns>
    JwtAuthDto JwtSignIn(string email, string password);

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
  }
}
