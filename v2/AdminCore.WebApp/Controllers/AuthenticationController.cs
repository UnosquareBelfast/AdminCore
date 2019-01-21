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

    [HttpPost("login")]
    public IActionResult AzureLogin()
    {
      try
      {
        var loggedInUser = _authenticatedUser.RetrieveLoggedInUser();
        return Ok($"User {loggedInUser.Forename} {loggedInUser.Surname} has been successfully signed in.");
      }
      catch (UserNotRegisteredException)
      {
        var userDetails = _authenticatedUser.GetLoggedInUserDetails();
        return RegisterNewUser(userDetails);
      }

    }

    private IActionResult RegisterNewUser(UserDetailsHelper userDetails)
    {
      var registerEmployeeViewModel = BuildRegisterEmployeeViewModel(userDetails);
      try
      {
        var newUserEmail = _employeeService.Create(Mapper.Map<EmployeeDto>(registerEmployeeViewModel));
        return Ok($"User with email address {newUserEmail} successfully registered.");
      }
      catch (Exception exception)
      {
        return StatusCode(500, $"An error has occurred while registering new employee {registerEmployeeViewModel.Email}: {exception.Message}");
      }
    }

    private static RegisterEmployeeViewModel BuildRegisterEmployeeViewModel(UserDetailsHelper userDetails)
    {
      return new RegisterEmployeeViewModel()
      {
        Email = userDetails["preferred_username"],
        Forename = GetWordFromString(userDetails["name"], 0),
        Surname = GetWordFromString(userDetails["name"], 1),
        CountryId = 1,
        EmployeeRoleId = 1,
        EmployeeStatusId = 1,
        StartDate = DateTime.Now,
        Password = ""
      };
    }

    private static string GetWordFromString(string fullString, int wordIndex)
    {
      var words = fullString.Split(" ");
      return words.Length-1 >= wordIndex ? words[wordIndex] : "";
    }
  }
}