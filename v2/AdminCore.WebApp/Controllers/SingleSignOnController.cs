using AdminCore.Common;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Employee;
using AutoMapper;
using System;
using System.Security.Claims;
using AdminCore.WebApi.Exceptions;
using Microsoft.AspNetCore.Mvc;
namespace AdminCore.WebApi.Controllers
{
  public class SingleSignOnController : BaseController
  {
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEmployeeService _employeeService;

    public SingleSignOnController(IMapper mapper, IAuthenticatedUser authenticatedUser, IEmployeeService employeeService) : base(mapper)
    {
      _authenticatedUser = authenticatedUser;
      _employeeService = employeeService;
    }

    public IActionResult AzureLogin()
    {
      var loggedInUser = _authenticatedUser.RetrieveLoggedInUser();
      if (loggedInUser != null)
      {
        return Ok($"User {loggedInUser.Forename} {loggedInUser.Surname} has been successfully signed in.");
      }
      var userDetails = _authenticatedUser.GetLoggedInUserDetails();
      return RegisterNewUser(userDetails);
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
        Forename = userDetails["name"].Split(" ")[0],
        Surname = userDetails["name"].Split(" ")[1],
        CountryId = 1,
        EmployeeRoleId = 1,
        EmployeeStatusId = 1,
        StartDate = DateTime.Now,
        Password = ""
      };
    }
  }
}