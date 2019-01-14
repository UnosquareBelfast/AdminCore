// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Authentication;
using AdminCore.WebApi.Models.Employee;
using AutoMapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Route("[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    private readonly IAuthenticationService _authenticationService;

    private readonly IEmployeeService _employeeService;

    private readonly IMapper _mapper;

    public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper,
      IEmployeeService employeeService)
    {
      _authenticationService = authenticationService;
      _mapper = mapper;
      _employeeService = employeeService;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginRequestModel model)
    {
      var response = _authenticationService.JwtSignIn(model.Email, model.Password);
      if (response != null)
      {
        var authViewModel = _mapper.Map<JwtAuthViewModel>(response);

        return Accepted(authViewModel);
      }

      return NotFound("Sorry incorrect username or password");
    }

    [HttpPost("register")]
    public IActionResult Register(RegisterEmployeeViewModel registerEmployeeViewModel)
    {
      if (_employeeService.VerifyEmailExists(registerEmployeeViewModel.Email))
      {
        return BadRequest("Email already exists.");
      }

      var email = _employeeService.Create(_mapper.Map<EmployeeDto>(registerEmployeeViewModel));

      return Ok($"Employee registered:{email}");
    }
  }
}