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
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEventService _eventService;
    private readonly IEmployeeService _employeeService;
    private readonly IMapper _mapper;

    public HolidayController(IAuthenticatedUser authenticatedUser, IEventService eventService,
      IEmployeeService employeeService, IMapper mapper)
    {
      _authenticatedUser = authenticatedUser;
      _eventService = eventService;
      _employeeService = employeeService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllHolidays()
    {
      var holidays = _eventService.GetEventByType(EventTypes.AnnualLeave);
      if (holidays != null)
      {
        return Ok(_mapper.Map<IList<HolidayViewModel>>(holidays));
      }

      return Ok("No holidays found");
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByEventId(int holidayId)
    {
      var holiday = _eventService.GetEvent(holidayId);
      if (holiday != null)
      {
        return Ok(_mapper.Map<HolidayViewModel>(holiday));
      }

      return Ok($"No holiday found for event ID: { holidayId.ToString() }");
    }

    [HttpGet("findByEmployeeId/{employeeId}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      var holiday = _eventService.GetEventsByEmployeeId(employeeId);
      if (holiday != null)
      {
        return Ok(_mapper.Map<IList<HolidayViewModel>>(holiday));
      }

      return Ok($"No holiday found for employee ID: { employeeId.ToString() }");
    }

    [HttpGet("findEmployeeHolidayStats/{employeeId}")]
    public IActionResult GetEmployeeHolidayStats(int employeeId)
    {
      var holidayStats = _eventService.GetHolidayStatsForUser(employeeId);
      if (holidayStats != null)
      {
        return Ok(_mapper.Map<HolidayStatsViewModel>(holidayStats));
      }

      return Ok("No Holiday information available");
    }

    [HttpPost]
    public IActionResult CreateHoliday(CreateHolidayViewModel model)
    {
      var employeeId = _authenticatedUser.RetrieveUserId();
      var eventDates = _mapper.Map<EventDateDto>(model);

      try
      {
        _eventService.IsHolidayValid(employeeId, eventDates, model.IsHalfDay);
        _eventService.CreateEvent(employeeId, eventDates);
        return Ok($"Holiday has been created successfully");
      }
      catch (Exception ex)
      {
        return Ok(ex.Message);
      }
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateEventViewModel updateHoliday)
    {
      var eventDatesToUpdate = _mapper.Map<EventDateDto>(updateHoliday);
      try
      {
        _eventService.UpdateEvent(eventDatesToUpdate);
        return Ok("Holiday has been successfully updated");
      }
      catch (Exception ex)
      {
        return Ok("Holiday failed to update: " + ex.Message);
      }
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      try
      {
        _eventService.UpdateEventStatus(approveHoliday.EventId, EventStatuses.Approved);
        return Ok("Successfully Approved");
      }
      catch (Exception ex)
      {
        return Ok("Holiday failed to get approved: " + ex.Message);
      }
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel cancelHoliday)
    {
      _eventService.UpdateEventStatus(cancelHoliday.EventId, EventStatuses.Cancelled);
      return Ok("Successfully Cancelled");
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel rejectHoliday)
    {
      _eventService.RejectEvent(rejectHoliday.EventId, rejectHoliday.Message, _authenticatedUser.RetrieveUserId());
      return Ok("Successfully Rejected");
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

    [HttpGet("findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatusType(int holidayStatusId)
    {
      var holidays = _eventService.GetEventByStatus((EventStatuses)holidayStatusId, EventTypes.AnnualLeave);
      if (holidays != null)
      {
        return Ok(_mapper.Map<IList<HolidayViewModel>>(holidays));
      }
      return Ok("No holidays found");
    }

    private bool ValidateDate(string date)
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

    private bool IsDatesValid(string startDate, string endDate)
    {
      return ValidateDate(startDate) && ValidateDate(endDate);
    }

    private IList<HolidayViewModel> GetEventsBetweenDates(string startDate, string endDate)
    {
      var holidays = _eventService.GetByDateBetween(Convert.ToDateTime(startDate), Convert.ToDateTime(endDate));
      return _mapper.Map<IList<HolidayViewModel>>(holidays);
    }
  }
}