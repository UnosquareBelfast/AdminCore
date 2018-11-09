// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HolidayController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the HolidayController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using System;
using AdminCore.Common.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AdminCore.WebApi.Models.Event;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class HolidayController : ControllerBase
  {
    private readonly IMapper _mapper;

    private readonly IEventService _eventService;

    public HolidayController(IEventService holidayService, IMapper mapper)
    {
      _eventService = holidayService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllHolidays()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{holidayId}")]
    public IActionResult GetHolidayByHolidayId(int holidayId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByEmployeeId/{employeeId}}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findHolidaysByEmployeeId/{employeeId}}")]
    public IActionResult GetHolidaysByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost]
    public IActionResult CreateHoliday([FromBody] EventViewModel holidayViewModel)
    {
      throw new System.NotImplementedException();
    }

    [HttpPut]
    public IActionResult UpdateHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/approveHoliday")]
    public IActionResult ApproveHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/cancelHoliday")]
    public IActionResult CancelHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/rejectHoliday")]
    public IActionResult RejectHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByDateBetween/{rangeStart}/{rangeEnd}")]
    public IActionResult GetHolidayByDateBetween(DateTime rangeStart, DateTime rangeEnd)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatus(int holidayStatusId)
    {
      throw new System.NotImplementedException();
    }
  }
}