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
    private readonly IEventService _eventService;
    
    private readonly IMapper _mapper;

    public HolidayController(IEventService holidayService, IMapper mapper)
    {
      _eventService = holidayService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllHolidays()
    {
      throw new NotImplementedException();
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByHolidayId(int holidayId)
    {
      throw new NotImplementedException();
    }

    [HttpGet("findByEmployeeId/{employeeId}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      throw new NotImplementedException();
    }


    [HttpPut]
    public IActionResult CreateHoliday(CreateHolidayViewModel viewModel)
    {
      throw new NotImplementedException();
    }
    
    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel viewModel)
    {
      throw new NotImplementedException();
    }

    [HttpGet("findByDateBetween/{startDate}/{endDate}")]
    public IActionResult GetHolidayByDateBetween(DateTime startDate, DateTime endDate)
    {
      throw new NotImplementedException();
    }

    [HttpGet("findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatus(int holidayStatusId)
    {
      throw new NotImplementedException();
    }
  }
}