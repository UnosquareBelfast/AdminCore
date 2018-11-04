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
  using System.IdentityModel.Tokens.Jwt;
  using System.Linq;
  using System.Security.Claims;
  using System.Security.Cryptography;
  using System.Text;

  using Admincore.Common.Interfaces;
  using Admincore.DAL;
  using Admincore.DAL.Models;

  using AdminCore.DTOs;
  using AdminCore.DTOs.Employee;

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

    /// <summary>
    /// The does email already exist.
    /// </summary>
    /// <param name="email">
    /// The email.
    /// </param>
    /// <returns>
    /// The <see cref="bool"/>.
    /// </returns>
    public bool DoesEmailAlreadyExist(string email)
    {
      return _databaseContext.EmployeeRepository
        .Get(x => x.Email.Equals(email, StringComparison.InvariantCultureIgnoreCase)).Any();
    }

    /// <summary>
    /// The create new employee.
    /// </summary>
    /// <param name="newEmployeeDto">
    /// The new employee dto.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    public string CreateNewEmployee(EmployeeDto newEmployeeDto)
    {
      Employee employee = _mapper.Map<Employee>(newEmployeeDto);
      employee.Country = GetCountryById(newEmployeeDto.Country.CountryId);
      employee.EmployeeRole = GetEmployeeRole(newEmployeeDto.Role.EmployeeRoleId);
      employee.EmployeeStatus = GetEmployeeStatus(newEmployeeDto.Status.EmployeeStatusId);
      
      employee.Password = EncodePasswordToBase64(employee.Password);

      employee.TotalHolidays = CalculateTotalHolidaysFromStartDate(employee, 33);

      _databaseContext.EmployeeRepository.Insert(employee);
      _databaseContext.SaveChanges();

      return employee.Email;
    }

    /// <summary>
    /// The encode password to base 64.
    /// </summary>
    /// <param name="password">
    /// The password.
    /// </param>
    /// <returns>
    /// The <see cref="string"/>.
    /// </returns>
    public string EncodePasswordToBase64(string password)
    {
      byte[] bytes = Encoding.Unicode.GetBytes(password);
      byte[] inArray = HashAlgorithm.Create("SHA1")?.ComputeHash(bytes);
      return Convert.ToBase64String(inArray);
    }

    /// <summary>
    /// The get country by id.
    /// </summary>
    /// <param name="id">
    /// The id.
    /// </param>
    /// <returns>
    /// The <see cref="Country"/>.
    /// </returns>
    private Country GetCountryById(int id)
    {
      return _databaseContext.CountryRepository.GetById(id);
    }

    /// <summary>
    /// The get employee status.
    /// </summary>
    /// <param name="id">
    /// The id.
    /// </param>
    /// <returns>
    /// The <see cref="EmployeeStatus"/>.
    /// </returns>
    private EmployeeStatus GetEmployeeStatus(int id)
    {
      return _databaseContext.EmployeeStatusRepository.GetById(id);
    }

    /// <summary>
    /// The get employee role.
    /// </summary>
    /// <param name="id">
    /// The id.
    /// </param>
    /// <returns>
    /// The <see cref="EmployeeRole"/>.
    /// </returns>
    private EmployeeRole GetEmployeeRole(int id)
    {
      return _databaseContext.EmployeeRoleRepository.GetById(id);
    }

    /// <summary>
    /// The calculate total holidays from start date.
    /// </summary>
    /// <param name="employee">
    /// The employee.
    /// </param>
    /// <param name="maxHolidays">
    /// The max holidays.
    /// </param>
    /// <returns>
    /// The <see cref="short"/>.
    /// </returns>
    private short CalculateTotalHolidaysFromStartDate(Employee employee, int maxHolidays)
    {
      short totalHolidays;
      if (employee.StartDate.Year == DateTime.Now.Year)
      {
        totalHolidays = (short)((maxHolidays / 12) * (12 - employee.StartDate.Month));
      }
      else
      {
        totalHolidays = (short)maxHolidays;
      }
      return totalHolidays;
    }
  }
}