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
using AdminCore.DAL.Models;
using AdminCore.WebApi.Models.Holiday;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class HolidayController : ControllerBase
  {
    private readonly IEventService _holidayEventService;

    private readonly IMapper _mapper;

    public HolidayController(IEventService holidayEventService, IMapper mapper)
    {
      _holidayEventService = holidayEventService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllHolidays()
    {
      return Ok();
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByHolidayId(int holidayId)
    {
      return Ok();
    }

    [HttpGet("findByEmployeeId/{employeeId}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      return Ok();
    }

    [HttpPost]
    public IActionResult CreateHoliday(CreateHolidayViewModel viewModel)
    {
      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateHolidayViewModel viewModel)
    {
      return Ok();
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      return Ok();
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel cancelHoliday)
    {
      return Ok();
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel rejectHoliday)
    {
      return Ok();
    }

    [HttpGet("findByDateBetween/{eventDate}")]
    public IActionResult GetHolidayByDateBetween(EventDate eventDate)
    {
      return Ok();
    }

    [HttpGet("findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatus(int holidayStatusId)
    {
      return Ok();
    }
  }
}