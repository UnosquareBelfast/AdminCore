// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using AdminCore.Common;
using AdminCore.Common.Interfaces;
using AdminCore.Constants;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Exceptions;
using AdminCore.WebApi.Models.Employee;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class AuthenticationController : BaseController
  {
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEmployeeService _employeeService;

    public AuthenticationController(IAuthenticatedUser authenticatedUser, IEmployeeService employeeService, IMapper mapper) : base(mapper)
    {
      _authenticatedUser = authenticatedUser;
      _employeeService = employeeService;
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterEmployeeViewModel newEmployee)
    {
      try
      {
        var loggedInUser = _authenticatedUser.RetrieveLoggedInUser();
        return Ok($"User with email {loggedInUser.Email} already exists. If you need to change details, use update.");
      }
      catch (UserNotRegisteredException)
      {
        var userDetails = _authenticatedUser.GetLoggedInUserDetails();
        return RegisterNewUser(userDetails, newEmployee);
      }

    }

    private IActionResult RegisterNewUser(UserDetailsHelper userDetails, RegisterEmployeeViewModel newEmployee)
    {
      var newEmployeeDto = Mapper.Map<EmployeeDto>(newEmployee);
      AddAzureDetailsToEmployeeDto(newEmployeeDto, userDetails);
      try
      {
        var newUserEmail = _employeeService.Create(newEmployeeDto);
        return Ok($"User with email address {newUserEmail} successfully registered.");
      }
      catch (Exception exception)
      {
        return StatusCode(500, $"An error has occurred while registering new employee {newEmployeeDto.Email}: {exception.Message}");
      }
    }

    private static void AddAzureDetailsToEmployeeDto(EmployeeDto newEmployeeDto, UserDetailsHelper userDetails)
    {
      newEmployeeDto.Email = userDetails[UserDetailsConstants.UserEmail];
      newEmployeeDto.Forename = GetWordFromString(userDetails[UserDetailsConstants.Name], 0);
      newEmployeeDto.Surname = GetWordFromString(userDetails[UserDetailsConstants.Name], 1);
      newEmployeeDto.Password = "";
    }

    private static string GetWordFromString(string fullString, int wordIndex)
    {
      var words = fullString.Split(" ");
      return words.Length-1 >= wordIndex ? words[wordIndex] : "";
    }
  }
}