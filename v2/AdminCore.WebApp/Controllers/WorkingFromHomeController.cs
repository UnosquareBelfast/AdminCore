using AdminCore.WebApi.Models.WorkingFromHome;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class WorkingFromHomeController : ControllerBase
  {
    private IMapper _mapper;
    private IEventService _eventService;

    public WorkingFromHomeController(IEventService eventService, IMapper mapper)
    {
      _eventService = eventService;
      _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
    public IList<WorkingFromHomeViewModel> findAll()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{workingFromHomeId}")]
    [AllowAnonymous]
    public WorkingFromHomeViewModel findWorkingFromHomeByID(int eventId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByEmployeeId/{employeeId}")]
    [AllowAnonymous]
    public IList<WorkingFromHomeViewModel> findWorkingFromHomeByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost("/")]
    [AllowAnonymous]
    public void createWorkingFromHome([FromBody] CreateEventViewModel createEventViewModel)
    {
      throw new System.NotImplementedException();
    }
  }
}