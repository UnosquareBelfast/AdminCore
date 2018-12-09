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
        _eventService.CreateEvent(employeeId, eventDates);
        return Ok($"Holiday has been created successfully");
      }
      catch (Exception e)
      {
        //Log Exception
      }

      return Ok("Something has gone wrong - holiday creation failed");
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateEventViewModel updateHoliday)
    {
      var eventDatesToUpdate = _mapper.Map<EventDateDto>(updateHoliday);
      try
      {
        _eventService.UpdateEvent(eventDatesToUpdate);
        return Ok();
      }
      catch (Exception ex)
      {
        //Log Exception
      }

      return Ok("Holiday failed to update");
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      var eventDto = _mapper.Map<EventDto>(approveHoliday);
      try
      {
        //_eventService.ApproveEvent(eventDto);
        return Ok();
      }
      catch (Exception ex)
      {
        // Log exception
      }

      return Ok("Holiday failed to get approved");
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel cancelHoliday)
    {
      _eventService.UpdateEventStatus(cancelHoliday.EventId, EventStatuses.Cancelled);
      return Ok();
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel rejectHoliday)
    {
      //_eventService.RejectEvent(rejectHoliday.EventId,rejectHoliday.Message, int.Parse(_authenticatedUser.RetrieveUserId()));
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

    //    private IList<string> ValidateCreateHolidayViewModel(CreateHolidayViewModel createHolidayViewModel)
    //    {
    //      IList<string> errorResponses = new List<string>();
    //      CheckIfHolidayHasAlreadyBeenBooked(createHolidayViewModel, createHolidayViewModel.DateRange, errorResponses);
    //      CheckDateRangeStartDateIsBeforeEndDate(createHolidayViewModel.DateRange, errorResponses);
    //      return errorResponses;
    //    }
    //
    //    private void CheckIfHolidayHasAlreadyBeenBooked(CreateHolidayViewModel createHolidayViewModel, DateViewModel dateRange, IList<string> errorResponses)
    //    {
    //      var holidaysAlreadyBooked = _eventService.GetEventsByEmployeeIdAndStartAndEndDates(createHolidayViewModel.EmployeeId,
    //        dateRange.StartDate, dateRange.EndDate);
    //
    //      if (holidaysAlreadyBooked != null)
    //      {
    //        errorResponses.Add($"Holidays have already been booked for Employee ID {createHolidayViewModel.EmployeeId} between the dates {dateRange.StartDate} and {dateRange.EndDate}");
    //      }
    //    }
    //
    //    private void CheckDateRangeStartDateIsBeforeEndDate(DateViewModel dateRange, IList<string> errorResponses)
    //    {
    //      if (dateRange.StartDate.CompareTo(dateRange.EndDate) > 0)
    //      {
    //        errorResponses.Add($"Start date {dateRange.StartDate.Date} is after End Date {dateRange.EndDate.Date}");
    //      }
    //    }

    private IActionResult CreateBadRequestResponseWithListOfErrors(IList<string> errors)
    {
      var errorString = "";
      var count = 1;
      foreach (var error in errors)
      {
        errorString += $"Error #{count++}: {error}\n";
      }

      return BadRequest(errorString);
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