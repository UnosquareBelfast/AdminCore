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

    public DashboardController(IDashboardService dashboardService, IMapper mapper)
    {
      _dashboardService = dashboardService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetDashboardEventsByEmployeeId(DateTime date)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetDashboardSnapshot()
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeTeamsSnapshot()
    {
      return Ok();
    }

    [HttpGet("/{eventId}")]
    public IActionResult GetMessagesByEventId(int eventId)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetTeamEventsByEmployeeId(DateTime date)
    {
      return Ok();
    }
  }
}