﻿// --------------------------------------------------------------------------------------------------------------------
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
  }
}