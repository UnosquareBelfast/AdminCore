// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HolidayController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the HolidayController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Models.Holiday;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;

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
      IList<EventDto> holidaysDtos = _holidayEventService.GetByType(EventTypes.AnnualLeave);
      var holidays = _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(holidaysDtos);
      return Ok(holidays);
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByHolidayId(int holidayId)
    {
      EventDto holiday = _holidayEventService.Get(holidayId);
      return Ok(_mapper.Map<EventDto, HolidayViewModel>(holiday));
    }

    [HttpGet("findByEmployeeId/{employeeId}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      IList<EventDto> holidaysDtos = _holidayEventService.GetByEmployeeId(employeeId);
      var holidays = _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(holidaysDtos);
      return Ok(holidays);
    }

    [HttpPost]
    public IActionResult CreateHoliday(CreateHolidayViewModel viewModel)
    {
      return Ok();
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateHolidayViewModel viewModel)
    {
      //_mapper.Map(viewModel, EventDto);
      return Ok();
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      EventDto eventDto = _mapper.Map(approveHoliday, new EventDto());
      _holidayEventService.ApproveEvent(eventDto);
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

    [HttpGet("findByDateBetween/{startDate}/{endDate}")]
    public IActionResult GetHolidayByDateBetween(string startDate, string endDate)
    {
      if (IsDatesValid(startDate, endDate))
      {
        return Ok(GetEventsBetweenDates(startDate, endDate));
      }
      return BadRequest("Please use a valid date format for start and/or end dates");
    }

    private IList<HolidayViewModel> GetEventsBetweenDates(string startDate, string endDate)
    {
      IList<EventDto> holidaysDtos = _holidayEventService.GetByDateBetween(Convert.ToDateTime(startDate),
        Convert.ToDateTime(endDate), EventTypes.AnnualLeave);
      var holidays = _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(holidaysDtos);
      return holidays;
    }

    private bool IsDatesValid(string startDate, string endDate)
    {
      return ValidateDate(startDate) && ValidateDate(endDate);
    }

    [HttpGet("findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatus(int holidayStatusId)
    {
      var holidaysDtos = _holidayEventService.GetByStatusType((EventStatuses)holidayStatusId, EventTypes.AnnualLeave);
      var holidays = _mapper.Map<IList<EventDto>, List<HolidayViewModel>>(holidaysDtos);

      return Ok(holidays);
    }

    protected bool ValidateDate(string date)
    {
      try
      {
        DateTime dt = DateTime.Parse(date);
        return true;
      }
      catch
      {
        return false;
      }
    }
  }
}