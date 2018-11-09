// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Employee;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class EmployeeController : ControllerBase
  {
    private readonly IEmployeeService _employeeService;
    
    private readonly IMapper _mapper;

    public EmployeeController(IEmployeeService employeeService, IMapper mapper)
    {
      _employeeService = employeeService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllEmployees()
    {
      return Ok();
    }

    [HttpGet("{employeeId}")]
    public IActionResult GetEmployeeById(int employeeId)
    {
      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateEmployee(UpdateEmployeeViewModel viewModel)
    {
      return Ok();
    }


    [HttpGet("findByForenameAndSurname/{forename}/{surname}")]
    public IActionResult GetByForenameAndSurname(string forename, string surname)
    {
      return Ok();
    }

    [HttpGet("findByCountry/{countryId}")]
    public IActionResult GetByCountryId(int countryId)
    {
      return Ok();
    }
  }
}