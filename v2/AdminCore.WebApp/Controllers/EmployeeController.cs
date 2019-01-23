using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Employee;
using AdminCore.WebApi.Models.Employee;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class EmployeeController : BaseController
  {
    private readonly IEmployeeService _employeeService;
    private readonly EmployeeDto _signedInEmployee;

    public EmployeeController(IEmployeeService employeeService, IMapper mapper, IAuthenticatedUser authenticatedUser) : base(mapper)
    {
      _employeeService = employeeService;
      _signedInEmployee = authenticatedUser.RetrieveLoggedInUser();
    }

    [HttpGet]
    public IActionResult GetAllEmployees()
    {
      var employees = _employeeService.GetAll();
      if (employees.Any())
      {
        return Ok(Mapper.Map<List<EmployeeViewModel>>(employees));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, "No employees currently exist.");
    }

    [HttpPost]
    public IActionResult CreateEmployee(RegisterEmployeeViewModel viewModel)
    {
      var employeeDto = Mapper.Map<EmployeeDto>(viewModel);
      try
      {
        _employeeService.Save(employeeDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, employee was not created.");
      }

      return Ok($"Employee {viewModel.Forename} {viewModel.Surname} has successfully been created");
    }

    [HttpGet("{employeeId}")]
    public IActionResult GetEmployeeById(int employeeId)
    {
      var employee = _employeeService.Get(employeeId);
      if (employee != null)
      {
        return Ok(Mapper.Map<EmployeeViewModel>(employee));
      }

      return StatusCode((int)HttpStatusCode.InternalServerError, $"No employee found with an ID of { employeeId.ToString() }");
    }

    [HttpPut]
    public IActionResult UpdateEmployee(UpdateEmployeeViewModel viewModel)
    {
      var teamDto = Mapper.Map<EmployeeDto>(viewModel);
      try
      {
        _employeeService.Save(teamDto);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, employee was not updated.");
      }
      return Ok();
    }

    [HttpDelete("{employeeId}")]
    public IActionResult DeleteEmployee(int employeeId)
    {
      try
      {
        _employeeService.Delete(employeeId);
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong, employee was not deleted.");
      }
      return Ok($"Employee with Employee ID {employeeId} has been successfully deleted.");
    }

    [HttpGet("findByForenameAndSurname/{forename}/{surname}")]
    public IActionResult GetByForenameAndSurname(string forename, string surname)
    {
      var employees = _employeeService.GetByForenameAndSurname(forename, surname);
      if (employees.Any())
      {
        return Ok(Mapper.Map<IList<EmployeeViewModel>>(employees));
      }
      return StatusCode((int)HttpStatusCode.InternalServerError, $"No employee found with a forename of {forename} and a surname of {surname}");
    }

    [HttpGet("findByCountry/{countryId}")]
    public IActionResult GetByCountryId(int countryId)
    {
      var employees = _employeeService.GetByCountryId(countryId);
      if (employees.Any())
      {
        return Ok(Mapper.Map<IList<EmployeeViewModel>>(employees));
      }
      return StatusCode((int)HttpStatusCode.InternalServerError, $"No employee found with country ID {countryId}");
    }

    [HttpGet("getSignedInUser")]
    public IActionResult GetSignedInUser()
    {
      return Ok(Mapper.Map<EmployeeViewModel>(_signedInEmployee));
    }

  }
}