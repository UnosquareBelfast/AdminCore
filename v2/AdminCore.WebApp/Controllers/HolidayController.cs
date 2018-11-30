// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HolidayController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the HolidayController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.Common.Message;
using AdminCore.Constants.Enums;
using AdminCore.DTOs.Event;
using AdminCore.WebApi.Models;
using AdminCore.WebApi.Models.Holiday;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;

namespace AdminCore.WebApi.Controllers
{
  [Authorize]
  [Route("[controller]")]
  [ApiController]
  public class HolidayController : ControllerBase
  {
    private readonly IAuthenticatedUser _authenticatedUser;
    private readonly IEventService _holidayEventService;
    private readonly IEmployeeService _employeeService;
    private readonly IMapper _mapper;

    public HolidayController(IAuthenticatedUser authenticatedUser, IEventService holidayEventService,
      IEmployeeService employeeService, IMapper mapper)
    {
      _authenticatedUser = authenticatedUser;
      _holidayEventService = holidayEventService;
      _employeeService = employeeService;
      _mapper = mapper;
    }

    [HttpGet]
    public IActionResult GetAllHolidays()
    {
      var holidaysDtos = _holidayEventService.GetByType(EventTypes.AnnualLeave);
      var holidays = _mapper.Map<ResponseMessage<IList<EventDto>>, List<HolidayViewModel>>(holidaysDtos);
      return Ok(holidays);
    }

    [HttpGet("{holidayId}")]
    public IActionResult GetHolidayByHolidayId(int holidayId)
    {
      var holiday = _holidayEventService.GetEvent(holidayId);
      if (holiday.Status == MessageConstants.MsgStatusSuccess)
      {
        return Ok(_mapper.Map<HolidayViewModel>(holiday.Payload));
      }

      return Ok(holiday.Payload);
    }

    [HttpGet("findByEmployeeId/{employeeId}")]
    public IActionResult GetHolidayByEmployeeId(int employeeId)
    {
      ResponseMessage<IList<EventDto>> holidaysDtos = _holidayEventService.GetEventsByEmployeeId(employeeId);
      var holidays = _mapper.Map<ResponseMessage<IList<EventDto>>, List<HolidayViewModel>>(holidaysDtos);
      return Ok(holidays);
    }

    [HttpPost]
    public IActionResult CreateHoliday(CreateHolidayViewModel viewModel)
    {
      IList<string> errors = ValidateCreateHolidayViewModel(viewModel);
      return CreateResponseBasedOnErrors(errors, viewModel);
    }

    [HttpPut]
    public IActionResult UpdateHoliday(UpdateHolidayViewModel updateHoliday)
    {
      var eventDto = _mapper.Map<UpdateHolidayViewModel, EventDto>(updateHoliday);
      return Ok(_holidayEventService.UpdateEvent(eventDto));
    }

    [HttpPut("approveHoliday")]
    public IActionResult ApproveHoliday(ApproveHolidayViewModel approveHoliday)
    {
      var eventDto = _mapper.Map<ApproveHolidayViewModel, EventDto>(approveHoliday);
      return Ok(_holidayEventService.ApproveEvent(eventDto));
    }

    [HttpPut("cancelHoliday")]
    public IActionResult CancelHoliday(CancelHolidayViewModel cancelHoliday)
    {
      var eventDto = _mapper.Map<CancelHolidayViewModel, EventDto>(cancelHoliday);
      return Ok(_holidayEventService.CancelEvent(eventDto));
    }

    [HttpPut("rejectHoliday")]
    public IActionResult RejectHoliday(RejectHolidayViewModel rejectHoliday)
    {
      var responses = _holidayEventService.RejectEvent(
        rejectHoliday.EventId,
        rejectHoliday.Message,
        int.Parse(_authenticatedUser.RetrieveUserId()));
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

    [HttpGet("findByHolidayStatus/{holidayStatusId}")]
    public IActionResult GetHolidayByStatusType(int holidayStatusId)
    {
      var holidaysDtos = _holidayEventService.GetByStatusType((EventStatuses)holidayStatusId, EventTypes.AnnualLeave);
      var holidays = _mapper.Map<ResponseMessage<IList<EventDto>>, List<HolidayViewModel>>(holidaysDtos);

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

    private IActionResult CreateResponseBasedOnErrors(IList<string> errors, CreateHolidayViewModel createHolidayViewModel)
    {
      return errors.Any() ? CreateBadRequestResponseWithListOfErrors(errors) : CreateOkResponseWithNewEvent(createHolidayViewModel);
    }

    private IActionResult CreateOkResponseWithNewEvent(CreateHolidayViewModel createHolidayViewModel)
    {
      var eventDto = _mapper.Map<EventDto>(createHolidayViewModel);
      var eventDateDto = _mapper.Map<EventDateDto>(createHolidayViewModel.DateRange);
      eventDto.EventDates = new List<EventDateDto>
      {
        eventDateDto
      };
      return Ok(_holidayEventService.CreateEvent(eventDto));
    }

    private IList<string> ValidateCreateHolidayViewModel(CreateHolidayViewModel createHolidayViewModel)
    {
      IList<string> errorResponses = new List<string>();
      CheckIfHolidayHasAlreadyBeenBooked(createHolidayViewModel, createHolidayViewModel.DateRange, errorResponses);
      CheckDateRangeStartDateIsBeforeEndDate(createHolidayViewModel.DateRange, errorResponses);
      return errorResponses;
    }

    private void CheckIfHolidayHasAlreadyBeenBooked(CreateHolidayViewModel createHolidayViewModel, DateViewModel dateRange, IList<string> errorResponses)
    {
      var holidaysAlreadyBooked = _holidayEventService.GetEventsByEmployeeIdAndStartAndEndDates(createHolidayViewModel.EmployeeId,
        dateRange.StartDate, dateRange.EndDate).Payload;

      if (holidaysAlreadyBooked != null)
      {
        errorResponses.Add($"Holidays have already been booked for Employee ID {createHolidayViewModel.EmployeeId} between the dates {dateRange.StartDate} and {dateRange.EndDate}");
      }
    }

    private void CheckDateRangeStartDateIsBeforeEndDate(DateViewModel dateRange, IList<string> errorResponses)
    {
      if (dateRange.StartDate.CompareTo(dateRange.EndDate) > 0)
      {
        errorResponses.Add($"Start date {dateRange.StartDate.Date} is after End Date {dateRange.EndDate.Date}");
      }
    }

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
      var holidaysDtos = _holidayEventService.GetByDateBetween(Convert.ToDateTime(startDate),
        Convert.ToDateTime(endDate), EventTypes.AnnualLeave);
      var holidays = _mapper.Map<ResponseMessage<IList<EventDto>>, List<HolidayViewModel>>(holidaysDtos);
      return holidays;
    }
  }
}