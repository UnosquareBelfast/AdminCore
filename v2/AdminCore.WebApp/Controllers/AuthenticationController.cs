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
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  /// <summary>
  ///   The values controller.
  /// </summary>
  [Route("[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    /// <summary>
    ///   The _hello service.
    /// </summary>
    private readonly IAuthenticationService _authenticationService;

    /// <summary>
    ///   The _employee service.
    /// </summary>
    private readonly IEmployeeService _employeeService;

    /// <summary>
    ///   The _mapper.
    /// </summary>
    private readonly IMapper _mapper;

    /// <summary>
    ///   Initializes a new instance of the <see cref="AuthenticationController" /> class.
    /// </summary>
    /// <param name="authenticationService">
    ///   The authentication service.
    /// </param>
    /// <param name="mapper">
    ///   The mapper.
    /// </param>
    /// <param name="employeeService">
    ///   The employee service.
    /// </param>
    public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper,
      IEmployeeService employeeService)
    {
      _authenticationService = authenticationService;
      _mapper = mapper;
      _employeeService = employeeService;
    }

    /// <summary>
    ///   The create patient.
    /// </summary>
    /// <param name="model">
    ///   The model.
    /// </param>
    /// <returns>
    ///   The <see cref="ActionResult" />.
    /// </returns>
    [HttpPost]
    [Route("login")]
    public ActionResult Login([FromBody] LoginRequestModel model)
    {
      var response = _authenticationService.JwtSignIn(model.Email, model.Password);
      if (response != null) return Accepted(_mapper.Map<JwtAuthViewModel>(response));

      return NotFound("Sorry incorrect username or password");
    }

    [HttpPost]
    [Route("register")]
    public ActionResult Register([FromBody] RegisterEmployeeViewModel registerEmployeeViewModel)
    {
      if (_employeeService.VerifyEmailExists(registerEmployeeViewModel.Email))
        return BadRequest("Email already exists.");

      var email = _employeeService.Create(_mapper.Map<EmployeeDto>(registerEmployeeViewModel));

      return Ok(string.Format("Employee registered:{0}", email));
    }
  }
}