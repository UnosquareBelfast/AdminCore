// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IAuthenticationService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the IAuthenticationService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Common.Interfaces
{
  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;

  /// <summary>
  /// The HelloService interface.
  /// </summary>
  public interface IAuthenticationService
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
  }
}