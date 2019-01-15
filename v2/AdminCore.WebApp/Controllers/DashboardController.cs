using AdminCore.Common.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using AdminCore.WebApi.Models.Dashboard;
using AdminCore.WebApi.Models.Event;
using AdminCore.WebApi.Models.EventMessage;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class DashboardController : LoggedInUserController
  {
    private readonly IDashboardService _dashboardService;

    public DashboardController(IDashboardService dashboardService, IMapper mapper, IEmployeeService employeeService) : base(mapper, employeeService)
    {
      _dashboardService = dashboardService;
    }

    [HttpGet("getDashboardSnapshot")]
    public IActionResult GetDashboardSnapshot()
    {
      var dashboardSnapshot = _dashboardService.GetEmployeeDashboardEvents(RetrieveLoggedInUserId(), DateTime.Today);
      if (dashboardSnapshot.Any())
      {
        return Ok(Mapper.Map<IList<DashboardEventViewModel>>(dashboardSnapshot));
      }

      return NoContent();
    }

    [HttpGet("getEmployeeEvents/{date}")]
    public IActionResult GetEmployeeEvents(DateTime date)
    {
      var employeeEvents = _dashboardService.GetEmployeeEventsForMonth(RetrieveLoggedInUserId(), date);
      return Ok(Mapper.Map<IList<EventViewModel>>(employeeEvents));
    }

    [HttpGet("getEmployeeTeamSnapshot")]
    public IActionResult GetEmployeeTeamSnapshot()
    {
      var employeeTeamSnapshot = _dashboardService.GetTeamDashboardEvents(RetrieveLoggedInUserId(), DateTime.Today);
      if (employeeTeamSnapshot.Any())
      {
        return Ok(Mapper.Map<IList<DashboardEventViewModel>>(employeeTeamSnapshot));
      }

      return NoContent();
    }

    [HttpGet("{id}")]
    public IActionResult GetMessagesByEventId(int id)
    {
      var messages = _dashboardService.GetEventMessagesByEventId(id);
      if (messages.Any())
      {
        return Ok(Mapper.Map<IList<EventMessageViewModel>>(messages));
      }

      return NoContent();
    }

    [HttpGet("getTeamEvents/{date}")]
    public IActionResult GetTeamEvents(DateTime date)
    {
      var teamEvents = _dashboardService.GetTeamDashboardEvents(RetrieveLoggedInUserId(), date);
      if (teamEvents.Any())
      {
        return Ok(Mapper.Map<IList<EventViewModel>>(teamEvents));
      }
      return NoContent();
    }
  }
}