// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EmployeeController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the AuthenticationController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models;
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
    private readonly IMapper _mapper;

    private readonly IEmployeeService _employeeService;

    public EmployeeController(IEmployeeService employeeService, IMapper mapper)
    {
      _employeeService = employeeService;
      _mapper = mapper;
    }

    [HttpGet]
    public ActionResult GetAllEmployees()
    {
      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateEmployee(EmployeeViewModel employeeViewModel)
    {
      return Ok();
    }

    [HttpDelete]
    public IActionResult DeleteEmployee(EmployeeViewModel employeeViewModel)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeById(int employeeId)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeByCountry(int employeeCountryId)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeByForenameAndSurname(string employeeForename, string employeeSurname)
    {
      return Ok();
    }
  }
}