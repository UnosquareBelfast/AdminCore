// --------------------------------------------------------------------------------------------------------------------
// <copyright file="EventController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the EventController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System.Collections.Generic;
using AdminCore.Common.Interfaces;
using AdminCore.WebApi.Models.Event;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class EventController : ControllerBase
  {
    private readonly IMapper _mapper;

    private readonly IEventService _EventService;

    public EventController(IEventService EventService, IMapper mapper)
    {
      _EventService = EventService;
      _mapper = mapper;
    }

    [HttpGet("/")]
    [AllowAnonymous]
    public List<EventViewModel> FindAllEvents()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{eventId}")]
    [AllowAnonymous]
    public EventViewModel FindEventByEventID(int EventID)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{findByEmployeeId/{employeeId}}")]
    [AllowAnonymous]
    public List<EventViewModel> FindEventByEmployeeID(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{findEventsByEmployeeId/{employeeId}}")]
    [AllowAnonymous]
    public List<List<EventViewModel>> FindEventsByEmployeeID(int EmployeeID)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost("/")]
    [AllowAnonymous]
    public void CreateEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/")]
    [AllowAnonymous]
    public void UpdateEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/{approveHoliday}")]
    [AllowAnonymous]
    public void ApproveEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/{cancelHoliday}")]
    [AllowAnonymous]
    public void CancelEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/{rejectHoliday}")]
    [AllowAnonymous]
    public void RejectEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByDateBetween/{rangeStart}/{rangeEnd}")]
    [AllowAnonymous]
    public List<EventViewModel> FindEventByDateBetween()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByHolidayStatus/{holidayStatusId}")]
    [AllowAnonymous]
    public List<EventViewModel> FindEventByStatus()
    {
      throw new System.NotImplementedException();
    }

    public List<EventViewModel> mapEventDtosToEvents()
    {
      throw new System.NotImplementedException();
    }

  }
}