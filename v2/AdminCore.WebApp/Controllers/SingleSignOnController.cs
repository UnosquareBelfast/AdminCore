using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Employee;
using AdminCore.WebApi.Util;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Mvc;
using IAuthenticationService = AdminCore.Common.Interfaces.IAuthenticationService;

namespace AdminCore.WebApi.Controllers
{
  public class SingleSignOnController : Controller
  {

    private readonly IAuthenticationService _authenticationService;

    private readonly IEmployeeService _employeeService;

    private readonly IMapper _mapper;

    public SingleSignOnController(IAuthenticationService authenticationService, IMapper mapper,
      IEmployeeService employeeService)
    {
      _authenticationService = authenticationService;
      _mapper = mapper;
      _employeeService = employeeService;
    }

    public IActionResult AzureLogin()
    {
      var userDetails = GetLoggedInUserDetails();
      var authenticationToken = _authenticationService.JwtSignIn(userDetails["preferred_username"]);
      return authenticationToken == null ? RegisterNewUser(userDetails) : Accepted(_mapper.Map<JwtAuthViewModel>(authenticationToken));
    }

    private UserDetailsHelper GetLoggedInUserDetails()
    {
      var identity = User.Identity as ClaimsIdentity;
      return new UserDetailsHelper(identity.Claims);
    }

    private IActionResult RegisterNewUser(UserDetailsHelper userDetails)
    {
      var register = BuildRegisterEmployeeViewModel(userDetails);
      var newUserEmail = _employeeService.Create(_mapper.Map<EmployeeDto>(register));
      var token = _authenticationService.JwtSignIn(newUserEmail);
      return Accepted(_mapper.Map<JwtAuthViewModel>(token));
    }

    private RegisterEmployeeViewModel BuildRegisterEmployeeViewModel(UserDetailsHelper userDetails)
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