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

    [HttpGet("/")]
    public List<EventViewModel> GetAllHolidays()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/{holidayId}")]
    public EventViewModel GetHolidayByHolidayId(int holidayId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByEmployeeId/{employeeId}}")]
    public List<EventViewModel> GetHolidayByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findHolidaysByEmployeeId/{employeeId}}")]
    public List<EventViewModel> GetHolidaysByEmployeeId(int employeeId)
    {
      throw new System.NotImplementedException();
    }

    [HttpPost]
    public void CreateHoliday([FromBody] EventViewModel holidayViewModel)
    {
      throw new System.NotImplementedException();
    }

    [HttpPut]
    public void UpdateHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/approveHoliday")]
    public void ApproveHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/cancelHoliday")]
    public void CancelHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpPut("/rejectHoliday")]
    public void RejectHoliday()
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByDateBetween/{rangeStart}/{rangeEnd}")]
    public List<EventViewModel> GetHolidayByDateBetween(DateTime rangeStart, DateTime rangeEnd)
    {
      throw new System.NotImplementedException();
    }

    [HttpGet("/findByHolidayStatus/{holidayStatusId}")]
    public List<EventViewModel> GetHolidayByStatus(int holidayStatusId)
    {
      throw new System.NotImplementedException();
    }
  }
}