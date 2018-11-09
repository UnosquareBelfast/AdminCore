using System;
using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.WorkingFromHome;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers.WorkingFromHome
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class WorkingFromHomeController : ControllerBase
  {
    private readonly IEventService _eventService;
    private readonly IMapper _mapper;

    public WorkingFromHomeController(IEventService eventService, IMapper mapper)
    {
      _eventService = eventService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllWorkingFromHomeEvents()
    {
      throw new NotImplementedException();
    }

    [HttpGet("/{workingFromHomeId}")]
    public IActionResult GetWorkingFromHomeById(int workingFromHomeId)
    {
      throw new NotImplementedException();
    }

    [HttpGet("/getByEmployeeId/{employeeId}")]
    public IActionResult GetWorkingFromHomeByEmployeeId(int employeeId)
    {
      throw new NotImplementedException();
    }

    [HttpPost]
    public void CreateWorkingFromHome(CreateWorkingFromHomeViewModel createWorkingFromHomeViewModel)
    {
      throw new NotImplementedException();
    }
  }
}