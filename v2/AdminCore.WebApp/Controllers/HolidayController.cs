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

    private IEmployeeCredentials _employeeCredentials;

    public HolidayController(IEventService holidayEventService, IMapper mapper, IEmployeeCredentials employeeCredentials)
    {
      _holidayEventService = holidayEventService;
      _mapper = mapper;
      _employeeCredentials = employeeCredentials;
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
      //TODO BaseContoller Create By Type
      return Ok("Okay");
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateHolidayViewModel updateHoliday)
    {
      EventDto eventDto = _mapper.Map<UpdateHolidayViewModel, EventDto>(updateHoliday);
      return Ok(_holidayEventService.UpdateEvent(eventDto));
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      EventDto eventDto = _mapper.Map<ApproveHolidayViewModel, EventDto>(approveHoliday);
      return Ok(_holidayEventService.ApproveEvent(eventDto));
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel cancelHoliday)
    {
      EventDto eventDto = _mapper.Map<CancelHolidayViewModel, EventDto>(cancelHoliday);
      return Ok(_holidayEventService.CancelEvent(eventDto));
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel rejectHoliday)
    {
      List<string> responses = _holidayEventService.RejectEvent(
        _holidayEventService.Get(rejectHoliday.EventId),
        rejectHoliday.Message,
        _employeeCredentials.GetUserId());
      return Ok(responses);
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