// --------------------------------------------------------------------------------------------------------------------
// <copyright file="JwtAuthDto.cs" company="AdminCore">
//   Admin Core
// </copyright>
// <summary>
//   Defines the JwtAuthDto type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.DTOs
{
  /// <summary>
  /// The jwt authentication response dto.
  /// </summary>
  public class JwtAuthDto
  {
    /// <summary>
    /// Gets or sets the token.
    /// </summary>
    public string AccessToken { get; set; }

    /// <summary>
    /// Gets or sets the token type.
    /// </summary>
    public string TokenType { get; set; }
  }
}