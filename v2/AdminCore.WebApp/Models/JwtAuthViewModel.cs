// --------------------------------------------------------------------------------------------------------------------
// <copyright file="JwtAuthViewModel.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the JwtAuthViewModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models
{
  /// <summary>
  ///   The jwt authentication response view model.
  /// </summary>
  public class JwtAuthViewModel
  {
    /// <summary>
    ///   Gets or sets the access token.
    /// </summary>
    public string AccessToken { get; set; }

    /// <summary>
    ///   Gets or sets the token type.
    /// </summary>
    public string TokenType { get; set; }
  }
}