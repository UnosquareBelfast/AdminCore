// --------------------------------------------------------------------------------------------------------------------
// <copyright file="UserService.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   The hello service.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.Services
{
  using System;
  using System.Collections.Generic;
  using System.IdentityModel.Tokens.Jwt;
  using System.Linq;
  using System.Security.Claims;
  using System.Text;

  using Admincore.Common.Interfaces;
  using Admincore.DAL;
  using Admincore.DAL.Models;
  using Admincore.DTOs;

  using AdminCore.DTOs;

  using AutoMapper;

  using Microsoft.IdentityModel.Tokens;

  /// <summary>
  /// The hello service.
  /// </summary>
  public class UserService : IUserService
  {
    /// <summary>
    /// The _database context.
    /// </summary>
    private readonly IDatabaseContext _databaseContext;

    /// <summary>
    /// The _mapper.
    /// </summary>
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="UserService"/> class.
    /// </summary>
    /// <param name="databaseContext">
    /// The database context.
    /// </param>
    /// <param name="mapper">
    /// The mapper.
    /// </param>
    public UserService(IDatabaseContext databaseContext, IMapper mapper)
    {
      _databaseContext = databaseContext;
      _mapper = mapper;
    }

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
    /// The <see cref="string"/>.
    /// </returns>
    /// <exception cref="NotImplementedException">
    /// </exception>
    public JwtAuthDto JwtSignIn(string email, string password)
    {
      var employee = _databaseContext.EmployeeRepository.Get(x => x.Email.Equals(email)).FirstOrDefault();

      if (employee == null)
      {
        return null;
      }

      var tokenHandler = new JwtSecurityTokenHandler();
      var key = Encoding.ASCII.GetBytes("veryVerySecretKey");

      var tokenDescriptor = new SecurityTokenDescriptor
                              {
                                Subject = new ClaimsIdentity(new[]
                                                               {
                                                                 new Claim(ClaimTypes.Name, employee.EmployeeId.ToString())
                                                               }),
                                Expires = DateTime.UtcNow.AddDays(1),
                                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                              };
      var token = tokenHandler.CreateToken(tokenDescriptor);
      var jwtResponseDto = new JwtAuthDto { AccessToken = tokenHandler.WriteToken(token), TokenType = "Bearer" };
      return jwtResponseDto;
    }
  }
}