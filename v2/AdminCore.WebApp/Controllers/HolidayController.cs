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
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Net;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class HolidayController : BaseController
  {
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEventService _eventService;
    private readonly IEmployeeService _employeeService;
    private readonly IMapper _mapper;

    public HolidayController(IAuthenticatedUser authenticatedUser, IEventService eventService,
      IEmployeeService employeeService, IMapper mapper) : base(mapper)
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

      return StatusCode((int)HttpStatusCode.NoContent, "No Holiday exist");
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByEventId(int holidayId)
    {
      var holiday = _eventService.GetEvent(holidayId);
      if (holiday != null)
      {
        return Ok(_mapper.Map<HolidayViewModel>(holiday));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No holiday found for event ID: { holidayId.ToString() }");
    }

    [HttpGet("findByEmployeeId")]
    public IActionResult GetHolidayByEmployeeId()
    {
      var holiday = _eventService.GetEventsByEmployeeId(_authenticatedUser.RetrieveUserId(), EventTypes.AnnualLeave);
      if (holiday != null)
      {
        return Ok(_mapper.Map<IList<HolidayViewModel>>(holiday));
      }

      return StatusCode((int)HttpStatusCode.NoContent, $"No holiday found for employee ID: { _authenticatedUser.RetrieveUserId().ToString() }");
    }

    [HttpGet("findEmployeeHolidayStats")]
    public IActionResult GetEmployeeHolidayStats()
    {
      var holidayStats = _eventService.GetHolidayStatsForUser(_authenticatedUser.RetrieveUserId());
      if (holidayStats != null)
      {
        return Ok(_mapper.Map<HolidayStatsViewModel>(holidayStats));
      }

      return StatusCode((int)HttpStatusCode.NoContent, "No Holiday exists");
    }

    [HttpPost]
    public IActionResult CreateHoliday(CreateHolidayViewModel model)
    {
      var employeeId = _authenticatedUser.RetrieveUserId();
      var eventDates = _mapper.Map<EventDateDto>(model);

      try
      {
        _eventService.IsHolidayValid(employeeId, eventDates, model.IsHalfDay);
        _eventService.CreateEvent(employeeId, eventDates, EventTypes.AnnualLeave);
        return Ok($"Holiday has been created successfully");
      }
      catch (Exception ex)
      {
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong creating holiday");
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
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong approving holiday");
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
        Logger.LogError(ex.Message);
        return StatusCode((int)HttpStatusCode.InternalServerError, "Something went wrong approving holiday");
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
      return StatusCode((int)HttpStatusCode.NoContent, "No Holiday exists");
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
      var holidays = _eventService.GetByDateBetween(Convert.ToDateTime(startDate), Convert.ToDateTime(endDate), EventTypes.AnnualLeave);
      return _mapper.Map<IList<HolidayViewModel>>(holidays);
    }
  }
}