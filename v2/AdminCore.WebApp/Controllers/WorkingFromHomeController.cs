using System;
using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.WorkingFromHome;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class WorkingFromHomeController : ControllerBase
  {
    private readonly IEventService _wfhEventService;
    private readonly IMapper _mapper;

    public WorkingFromHomeController(IEventService wfhEventService, IMapper mapper)
    {
      _wfhEventService = wfhEventService;
      _mapper = mapper;
    }

    [HttpPost]
    public IActionResult CreateWorkingFromHome(CreateWorkingFromHomeViewModel createWorkingFromHomeViewModel)
    {
      return Ok();
    }

    [HttpGet]
    public IActionResult GetAllWorkingFromHomeEvents()
    {
      return Ok();
    }

    [HttpGet("{workingFromHomeId}")]
    public IActionResult GetWorkingFromHomeById(int workingFromHomeId)
    {
      return Ok();
    }

    [HttpGet("getByEmployeeId/{employeeId}")]
    public IActionResult GetWorkingFromHomeByEmployeeId(int employeeId)
    {
      return Ok();
    }
  }
}