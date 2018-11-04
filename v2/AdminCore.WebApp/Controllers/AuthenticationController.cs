// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace AdminCore.WebApi.Controllers
{
  using AdminCore.Common.Interfaces;
  using Admincore.WebApi.Models;
  using AdminCore.DTOs.Employee;
  using AdminCore.WebApi.Models;
  using AutoMapper;
  using Microsoft.AspNetCore.Authorization;
  using Microsoft.AspNetCore.Mvc;

  /// <summary>
  /// The values controller.
  /// </summary>
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class AuthenticationController : ControllerBase
  {
    /// <summary>
    /// The _mapper.
    /// </summary>
    private readonly IMapper _mapper;

    /// <summary>
    /// The _hello service.
    /// </summary>
    private readonly IAuthenticationService _authenticationService;

    /// <summary>
    /// The _employee service.
    /// </summary>
    private readonly IEmployeeService _employeeService;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthenticationController"/> class.
    /// </summary>
    /// <param name="authenticationService">
    /// The authentication service.
    /// </param>
    /// <param name="mapper">
    /// The mapper.
    /// </param>
    /// <param name="employeeService">
    /// The employee service.
    /// </param>
    public AuthenticationController(IAuthenticationService authenticationService, IMapper mapper, IEmployeeService employeeService)
    {
      _authenticationService = authenticationService;
      _mapper = mapper;
      _employeeService = employeeService;
    }

    /// <summary>
    /// The create patient.
    /// </summary>
    /// <param name="model">
    /// The model.
    /// </param>
    /// <returns>
    /// The <see cref="ActionResult"/>.
    /// </returns>
    [HttpPost]
    [AllowAnonymous]
    [Route("login")]
    public ActionResult Login([FromBody] LoginRequestModel model)
    {
      var response = _authenticationService.JwtSignIn(model.Email, model.Password);
      if (response != null)
      {
        return Accepted(_mapper.Map<JwtAuthViewModel>(response));
      }

      return NotFound("Sorry incorrect username or password");
    }

    /// <summary>
    /// The create patient.
    /// </summary>
    /// <param name="registerEmployee">
    /// The model.
    /// </param>
    /// <returns>
    /// The <see cref="ActionResult"/>.
    /// </returns>
    [HttpPost]
    [AllowAnonymous]
    [Route("register")]
    public ActionResult Register([FromBody] RegisterEmployeeViewModel registerEmployee)
    {
      if (_employeeService.DoesEmailAlreadyExist(registerEmployee.Email))
      {
        return BadRequest("Email already exists.");
      }

      string email = _employeeService.CreateNewEmployee(_mapper.Map<EmployeeDto>(registerEmployee));

      return Ok(string.Format("Employee registered:{0}", email));
    }
  }
}