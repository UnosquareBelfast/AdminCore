// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationService.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DAL.Models;
using AdminCore.DTOs;
using Microsoft.IdentityModel.Tokens;

namespace AdminCore.Services
{
  /// <summary>
  ///   The hello service.
  /// </summary>
  public class AuthenticationService : IAuthenticationService
  {
    /// <summary>
    ///   The _database context.
    /// </summary>
    private readonly IDatabaseContext _databaseContext;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AuthenticationService" /> class.
    /// </summary>
    /// <param name="databaseContext">
    ///   The database context.
    /// </param>
    public AuthenticationService(IDatabaseContext databaseContext)
    {
      _databaseContext = databaseContext;
    }

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
    ///   The <see cref="string" />.
    /// </returns>
    /// <exception cref="NotImplementedException">
    /// </exception>
    public JwtAuthDto JwtSignIn(string email, string password)
    {
      var employee = _databaseContext.EmployeeRepository.GetSingle(x => x.Email.Equals(email, StringComparison.CurrentCultureIgnoreCase));

      if (employee == null) return null;
      //TODO Decrypt and check password!
      /*     var decodedPassword = DecodePassword(password);
      if (!decodedPassword.Equals(password))
      {
        return null;
      }*/

      return GenerateJwtToken(employee);
    }

    public JwtAuthDto JwtSignIn(string email)
    {
      var employee = _databaseContext.EmployeeRepository.GetSingle(x => x.Email.Equals(email, StringComparison.CurrentCultureIgnoreCase));
      return employee == null ? null : GenerateJwtToken(employee);
    }

    private static JwtAuthDto GenerateJwtToken(Employee employee)
    {
      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("veryVerySecretKey");

      var tokenDescriptor = new SecurityTokenDescriptor
      {
        Subject = new ClaimsIdentity
        (
          new[]
          {
            new Claim(
              ClaimTypes.Name,
              employee.EmployeeId.ToString())
          }
        ),
        Expires = DateTime.UtcNow.AddDays(1),
        SigningCredentials = new SigningCredentials
        (
          new SymmetricSecurityKey(key),
          SecurityAlgorithms.HmacSha256Signature
        )
      };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var jwtResponseDto = new JwtAuthDto
      {
        AccessToken = tokenHandler.WriteToken(token),
        TokenType = "Bearer"
      };
      return jwtResponseDto;
    }
  }
}