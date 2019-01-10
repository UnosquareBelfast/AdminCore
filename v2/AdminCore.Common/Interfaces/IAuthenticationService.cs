﻿// --------------------------------------------------------------------------------------------------------------------
// <copyright file="IAuthenticationService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the IAuthenticationService type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.DTOs;

namespace AdminCore.Common.Interfaces
{
  /// <summary>
  ///   The Authentication Service.
  /// </summary>
  public interface IAuthenticationService
  {
    /// <summary>
    ///   The jwt sign in.
    /// </summary>
    /// <param name="email">
    ///   The email.
    /// </param>
    /// <param name="password">
    ///   The password.
    /// </param>
    /// <returns>
    ///   The <see cref="JwtAuthDto" />.
    /// </returns>
    JwtAuthDto JwtSignIn(string email, string password);

    JwtAuthDto JwtSignIn(string email);
  }
}