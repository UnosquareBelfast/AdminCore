using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Models.Event;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;
using AdminCore.DTOs.Employee;

namespace AdminCore.WebApi.Controllers
{
  [ApiController]
  [Authorize]
  [Route("[controller]")]
  public class WorkingFromHomeController : BaseController
  {
    private readonly IEventService _eventService;
    private readonly IMapper _mapper;
    private readonly EmployeeDto _employee;

    public WorkingFromHomeController(IEventService wfhEventService, IMapper mapper, IAuthenticatedUser authenticatedUser)
      : base(mapper)
    {
      _eventService = wfhEventService;
      _mapper = mapper;
      _employee = authenticatedUser.RetrieveLoggedInUser();
    }

    [HttpPost]
    public IActionResult CreateWorkingFromHome(CreateEventViewModel createWorkingFromHomeViewModel)
    {
      var employeeId = _employee.EmployeeId;
      var eventDates = _mapper.Map<EventDateDto>(createWorkingFromHomeViewModel);

      try
      {
        _eventService.CreateEvent(eventDates, EventTypes.WorkingFromHome, _employee.EmployeeId);
        return Ok($"Work From Home has been created successfully");
      }
      catch (Exception e)
      {
        Logger.LogError(e.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Error creating event: " + e.Message);
      }
    }

    [HttpGet]
    public IActionResult GetAllWorkingFromHomeEvents()
    {
      {
        var wfhEvents = _eventService.GetEventByType(EventTypes.WorkingFromHome);
        if (wfhEvents != null)
        {
          return Ok(_mapper.Map<IList<EventViewModel>>(wfhEvents));
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
        return Ok(_mapper.Map<EventViewModel>(wfhEvent));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No Work From Home Event found for event ID: { workingFromHomeId.ToString() }");
    }

    [HttpGet("getByEmployeeId/{employeeId}")]
    public IActionResult GetWorkingFromHomeByEmployeeId(int employeeId)
    {
      var wfhEvents = _eventService.GetEventsByEmployeeId(employeeId, EventTypes.WorkingFromHome);
      if (wfhEvents != null)
      {
        return Ok(_mapper.Map<IList<EventViewModel>>(wfhEvents));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No Work From Home found for employee ID: { employeeId.ToString() }");
    }
  }
}