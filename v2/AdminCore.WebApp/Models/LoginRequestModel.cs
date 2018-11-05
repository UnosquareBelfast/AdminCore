// --------------------------------------------------------------------------------------------------------------------
// <copyright file="LoginRequestModel.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the LoginRequestModel type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Models
{
  /// <summary>
  /// The patient model.
  /// </summary>
  public class LoginRequestModel
  {
    /// <summary>
    /// Gets or sets the email.
    /// </summary>
    public string Email { get; set; }

    /// <summary>
    /// Gets or sets the password.
    /// </summary>
    public string Password { get; set; }
  }
}
