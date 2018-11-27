using AdminCore.Common.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class DashboardController : ControllerBase
  {
    private readonly IDashboardService _dashboardService;
    private readonly IMapper _mapper;
    private readonly IEmployeeCredentials _employeeCredentials;

    public DashboardController(IDashboardService dashboardService, IEmployeeCredentials employeeCredentials, IMapper mapper)
    {
      _dashboardService = dashboardService;
      _mapper = mapper;
      _employeeCredentials = employeeCredentials;
    }

    [HttpGet("getDashboardSnapshot")]
    public IActionResult GetDashboardSnapshot()
    {
      return Ok();
    }

    [HttpGet("getEmployeeEvents/{date}")]
    public IActionResult GetEmployeeEvents(DateTime date)
    {
      return Ok();
    }

    [HttpGet("getEmployeeTeamSnapshot")]
    public IActionResult GetEmployeeTeamSnapshot()
    {
      return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetMessagesByEventId(int id)
    {
      return Ok();
    }

    [HttpGet("getTeamEvents/{date}")]
    public IActionResult GetTeamEvents(DateTime date)
    {
      return Ok();
    }
  }
}