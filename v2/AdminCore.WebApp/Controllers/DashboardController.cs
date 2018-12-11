using AdminCore.Common.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using AdminCore.WebApi.Models.Holiday;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class DashboardController : BaseController
  {
    private readonly IDashboardService _dashboardService;
    private readonly IAuthenticatedUser _authenticatedUser;

    public DashboardController(IDashboardService dashboardService, IAuthenticatedUser authenticatedUser, IMapper mapper) : base(mapper)
    {
      _dashboardService = dashboardService;
      _authenticatedUser = authenticatedUser;
    }

    [HttpGet("getDashboardSnapshot")]
    public IActionResult GetDashboardSnapshot()
    {
      return Ok();
    }

    [HttpGet("getEmployeeEvents/{date}")]
    public IActionResult GetEmployeeEvents(DateTime date)
    {
      var employeeEvents = _dashboardService.GetEmployeeEventsForMonth(_authenticatedUser.RetrieveUserId(), date);
      return Ok(Mapper.Map<IList<HolidayViewModel>>(employeeEvents));
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