using AdminCore.Common.Interfaces;
using AdminCore.DAL;
using AdminCore.DTOs;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AdminCore.Services
{
  public class AuthenticationService : IAuthenticationService
  {
    private readonly IDatabaseContext _databaseContext;

    public AuthenticationService(IDatabaseContext databaseContext)
    {
      _databaseContext = databaseContext;
    }

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