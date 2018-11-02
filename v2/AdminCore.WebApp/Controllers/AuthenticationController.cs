// --------------------------------------------------------------------------------------------------------------------
// <copyright file="AuthenticationController.cs" company="Admincore">
//   Admincore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

namespace Admincore.WebApi.Controllers
{
  using Admincore.Common.Interfaces;
  using Admincore.DTOs;
  using Admincore.WebApi.Models;

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
    /// The _hello service.
    /// </summary>
    private readonly IUserService _userService;

    /// <summary>
    /// The _hello service.
    /// </summary>
    private readonly IEmployeeService _employeeService;

    /// <summary>
    /// The _mapper.
    /// </summary>
    private readonly IMapper _mapper;

    /// <summary>
    /// Initializes a new instance of the <see cref="AuthenticationController"/> class.
    /// </summary>
    /// <param name="userService">
    /// The patient service.
    /// </param>
    /// <param name="mapper">
    /// The mapper.
    /// </param>
    public AuthenticationController(IUserService userService, IEmployeeService employeeService, IMapper mapper)
    {
      _userService = userService;
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
      var response = _userService.JwtSignIn(model.Email, model.Password);
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
      //if (_employeeService.findByEmail(registerEmployee.Email) != null)
      //{
      //  return this.BadRequest("Email already exists.");
      //}

      EmployeeDto registerEmployeeDto = _mapper.Map<EmployeeDto>(registerEmployee);
      EmployeeDto newEmployee = _employeeService.createNewEmployee(registerEmployeeDto);

      return Accepted(string.Format("Employee registered:{0}", newEmployee.Email));
    }
  }
}