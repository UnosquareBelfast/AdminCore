// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IEmployeeService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IUserService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common.Interfaces
{
  using Admincore.DTOs;
  using System;

  /// <summary>
  /// The HelloService interface.
  /// </summary>
  public interface IEmployeeService
  {
    /// <summary>
    /// The findEmployee by Email Address.
    /// </summary>
    /// <param name="email">
    ///   The email.
    /// </param>
    /// <returns>
    /// The <see cref="EmployeeDto"/>.
    /// </returns>
    Type findByEmail(string email);

    /// <summary>
    /// Create and register new employee.
    /// </summary>
    /// <param name="registerEmployeeDto">
    /// Registering the email.
    /// </param>
    /// <returns>
    /// The <see cref="EmployeeDto"/>.
    /// </returns>
    EmployeeDto createNewEmployee(EmployeeDto registerEmployeeDto);
  }
}