﻿// --------------------------------------------------------------------------------------------------------------------
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

    private readonly IEventService _eventService;

    public EventController(IEventService eventService, IMapper mapper)
    {
      _eventService = eventService;
      _mapper = mapper;
    }

    [HttpGet("/")]
    public List<EventViewModel> FindAllEvents()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{eventID}")]
    public EventViewModel FindEventByEventID(int eventID)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{findByEmployeeId/{employeeID}}")]
    public List<EventViewModel> FindEventByEmployeeID(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{findEventsByEmployeeId/{employeeID}}")]
    public List<List<EventViewModel>> FindEventsByEmployeeID(int employeeID)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost("/")]
    public void CreateEvent([FromBody] EventViewModel eventViewModel)
    {
      throw new System.NotImplementedException();
    }

    [HttpPut]
    public void UpdateEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/approveHoliday")]
    public void ApproveEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/cancelHoliday")]
    public void CancelEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/rejectHoliday")]
    public void RejectEvent()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByDateBetween/{rangeStart}/{rangeEnd}")]
    public List<EventViewModel> FindEventByDateBetween()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByHolidayStatus/{holidayStatusId}")]
    public List<EventViewModel> FindEventByStatus()
    {
      throw new System.NotImplementedException();
    }
  }
}