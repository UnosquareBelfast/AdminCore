// --------------------------------------------------------------------------------------------------------------------
// <copyright file="HolidayController.cs" company="AdminCore">
//   AdminCore
// </copyright>
// <summary>
//   Defines the HolidayController type.
// </summary>
// --------------------------------------------------------------------------------------------------------------------

using AdminCore.Common.Interfaces;
using AdminCore.DTOs.Client;
using AdminCore.WebApi.Models.Client;
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
    private readonly IMapper _mapper;

    private readonly IHolidayService _holidayService;

    public HolidayController(IHolidayService holidayService, IMapper mapper)
    {
      _holidayService = holidayService;
      _mapper = mapper;
    }

    [HttpGet]
    [AllowAnonymous]
    public ActionResult GetAllHolidays()
    {
      var holidays = _holidayService.GetAll();
      if (holidays != null)
      {
        return Accepted(_mapper.Map<HolidayViewModel>(holidays));
      }

      return null;
    }

    [HttpPut]
    [AllowAnonymous]
    public void UpdateClient(HolidayViewModel model)
    {
      var holidayDTO = _mapper.Map<HolidayViewModel, HolidayDto>(model);

      _holidayService.UpdateClient(holidayDTO);
    }
  }
}
/*


@GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findAll()
{
  List<EventDTO> holidays = eventService.findByType(EventTypes.ANNUAL_LEAVE);
  return mapEventDtosToHolidays(holidays);
}

@GetMapping(value = "/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public HolidayViewModel findHolidayById(@PathVariable("eventId") int eventId) {
        EventDTO holiday = eventService.findById(eventId);
        return modelMapper.map(holiday, HolidayViewModel.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findHolidaysByEmployeeId(@PathVariable("employeeId") int employeeId) {
        List<EventDTO> holidays = eventService.findByEmployee(employeeId);
        return mapEventDtosToHolidays(holidays);
    }

    @GetMapping(value = "findEventsByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<List<HolidayViewModel>> findEventsByEmployeeId(@PathVariable("employeeId") int employeeId) {
        List<List<HolidayViewModel>> events = new ArrayList<>();
List<EventDTO> annualLeave = eventService.findALByEmployee(employeeId);
List<EventDTO> workFromHome = eventService.findWFHByEmployee(employeeId);
events.add(mapEventDtosToHolidays(annualLeave));
        events.add(mapEventDtosToHolidays(workFromHome));
        return events;
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<List<String>> createHoliday(@RequestBody CreateEventViewModel createEventViewModel)
{
  List<String> responses = createEventByType(createEventViewModel, EventTypes.ANNUAL_LEAVE);
  return ResponseEntity.ok(responses);
}

@PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody UpdateHolidayViewModel updateHolidayViewModel)
{
  UpdateEventDTO event = modelMapper.map(updateHolidayViewModel, UpdateEventDTO.class);
        eventService.updateEvent(event);
}

@PutMapping(value = "/approveHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void approveHoliday(@RequestBody ApproveHolidayViewModel approveHolidayViewModel)
{
  EventDTO event = modelMapper.map(approveHolidayViewModel, EventDTO.class);
        eventService.approveEvent(event.getEventId());
}

@PutMapping(value = "/cancelHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void cancelHoliday(@RequestBody CancelHolidayViewModel cancelHolidayViewModel)
{
  EventDTO event = modelMapper.map(cancelHolidayViewModel, EventDTO.class);
        eventService.cancelEvent(event.getEventId());
}

@PutMapping(value = "/rejectHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<String>> rejectHoliday(@RequestBody RejectHolidayViewModel rejectHolidayViewModel)
{
  List<String> responses = eventService.rejectEvent(
          rejectHolidayViewModel.getEventId(),
          rejectHolidayViewModel.getMessage(),
          employeeCredentialsViewModel.getUserId());
  return ResponseEntity.ok(responses);
}

@GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                                    @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapEventDtosToHolidays(eventService.findByDateBetween(rangeStart, rangeEnd, EventTypes.ANNUAL_LEAVE));
    }

    @GetMapping(value = "/findByHolidayStatus/{holidayStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findByHolidayStatus(@PathVariable("holidayStatusId") int holidayStatusId) {
        return mapEventDtosToHolidays(eventService.findByStatusAndType(EventStatuses.fromId(holidayStatusId), EventTypes.ANNUAL_LEAVE));
    }

    private List<HolidayViewModel> mapEventDtosToHolidays(List<EventDTO> events)
{
  return events.stream().map(event -> modelMapper.map(event, HolidayViewModel.class)).collect(Collectors.toList());
    }*/