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
    [AllowAnonymous]
    public ActionResult GetAllEmployees()
    {
      var employee = _employeeService.GetAll();
      if (employee != null)
      {
        return Accepted(_mapper.Map<EmployeeViewModel>(employee));
      }

      return null;
    }

    [HttpPut]
    [AllowAnonymous]
    public void UpdateEmployee(EmployeeViewModel employeeViewModel)
    {
      var employeeDto = _mapper.Map<EmployeeViewModel, EmployeeDto>(employeeViewModel);

      _employeeService.UpdateEmployee(employeeDto);
    }

    [HttpDelete]
    [AllowAnonymous]
    public ActionResult DeleteEmployee([FromBody] EmployeeViewModel employeeViewModel)
    {
      _employeeService.DeleteEmployee(employeeViewModel.EmployeeId);

      return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetEmployeeById(int employeeId)
    {
      _employeeService.GetEmployeeById(employeeId);
      return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetEmployeeByCountry(int employeeCountryId)
    {
      _employeeService.GetEmployeeByCountry(employeeCountryId);
      return Ok();
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetEmployeeByForenameAndSurname(string employeeForename, string employeeSurname)
    {
      _employeeService.GetEmployeeByForenameAndSurname(employeeForename, employeeSurname);
      return Ok();
    }
  }
}