using System.Collections.Generic;
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
    private readonly IMapper _mapper;
    
    private readonly IEventService _eventService;

    public WorkingFromHomeController(IEventService eventService, IMapper mapper)
    {
      _eventService = eventService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllWorkingFromHomeEvents()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{workingFromHomeId}")]
    public IActionResult GetWorkingFromHomeById(int workingFromHomeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/getByEmployeeId/{employeeId}")]
    public IActionResult GetWorkingFromHomeByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost]
    public void CreateWorkingFromHome(CreateWorkingFromHomeViewModel createWorkingFromHomeViewModel)
    {
      throw new System.NotImplementedException();
    }
  }
}