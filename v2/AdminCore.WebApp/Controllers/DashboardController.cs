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
    public IActionResult GetDashboardSnapshot()
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeEvents(DateTime date)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetEmployeeTeamSnapshot()
    {
      return Ok();
    }

    [HttpGet("{id}")]
    public IActionResult GetMessagesByEventId(int id)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetTeamEvents(DateTime date)
    {
      return Ok();
    }
  }
}