using System;
using System.Collections.Generic;
using System.Net;
using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Models.Holiday;
using AdminCore.WebApi.Models.WorkingFromHome;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class WorkingFromHomeController : BaseController
  {
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEventService _eventService;
    private readonly IMapper _mapper;

    public WorkingFromHomeController(IAuthenticatedUser authenticatedUser, IEventService wfhEventService, IMapper mapper)
      : base(mapper)
    {
      _authenticatedUser = authenticatedUser;
      _eventService = wfhEventService;
      _mapper = mapper;
    }

    [HttpPost]
    public IActionResult CreateWorkingFromHome(CreateWorkingFromHomeViewModel createWorkingFromHomeViewModel)
    {
      var employeeId = _authenticatedUser.RetrieveUserId();
      var eventDates = _mapper.Map<EventDateDto>(createWorkingFromHomeViewModel);

      try
      {
        _eventService.CreateEvent(employeeId, eventDates, EventTypes.WorkingFromHome);
        return Ok($"Work From Home has been created successfully");
      }
      catch (Exception e)
      {
        Logger.LogError(e.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Could not create event");
      }
    }

    [HttpGet]
    public IActionResult GetAllWorkingFromHomeEvents()
    {
      {
        var wfhEvents = _eventService.GetEventByType(EventTypes.WorkingFromHome);
        if (wfhEvents != null)
        {
          return Ok(_mapper.Map<IList<WorkingFromHomeViewModel>>(wfhEvents));
        }

        return StatusCode((int)HttpStatusCode.NoContent, "No work from home event exists");
      }
    }

    [HttpGet("{workingFromHomeId}")]
    public IActionResult GetWorkingFromHomeById(int workingFromHomeId)
    {
      var wfhEvent = _eventService.GetEvent(workingFromHomeId);
      if (wfhEvent != null)
      {
        return Ok(_mapper.Map<WorkingFromHomeViewModel>(wfhEvent));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No Work From Home Event found for event ID: { workingFromHomeId.ToString() }");
    }

    [HttpGet("getByEmployeeId/{employeeId}")]
    public IActionResult GetWorkingFromHomeByEmployeeId(int employeeId)
    {
      var wfhEvents = _eventService.GetEventsByEmployeeId(employeeId, EventTypes.WorkingFromHome);
      if (wfhEvents != null)
      {
        return Ok(_mapper.Map<IList<WorkingFromHomeViewModel>>(wfhEvents));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No Work From Home found for employee ID: { employeeId.ToString() }");
    }
  }
}