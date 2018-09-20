package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.UpdateEventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import com.unosquare.admin_core.back_end.service.EventService;
import com.unosquare.admin_core.back_end.service.TeamService;
import com.unosquare.admin_core.back_end.viewModels.DateViewModel;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeCredentialsViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.holidays.*;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/holidays")
public class HolidayController extends BaseController {

    @Autowired
    EventService eventService;

    @Autowired
    TeamService teamService;

    @Autowired
    EmployeeService employeeService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    public EmployeeCredentialsViewModel employeeCredentialsViewModel;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findAll() {
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

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createHoliday(@RequestBody CreateEventViewModel createHolidayViewModel) {

        List<String> responses = new ArrayList<>();

        for (DateViewModel date : createHolidayViewModel.getDates()) {
            EventDTO existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    createHolidayViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate(), EventTypes.ANNUAL_LEAVE);

            if (existentEvent != null) {
                responses.add("Holiday already exists");
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
                continue;
            }

            Integer teamId = teamService.findTeamIdByEmployeeId(createHolidayViewModel.getEmployeeId());

            Integer eventsForTeam = teamService.getAllEventsForTeamBySelectedDatesSubmittedByEmployee(teamId,
                    date.getStartDate(), date.getEndDate());

            if (eventsForTeam != 0) {
                responses.add("Error in requested holiday. Check with team");
                continue;
            }

//            Finding employee Id and using this in order to validate total Holidays does not fall below 0
//            EmployeeDTO employee = employeeService.findById(
//                    createHolidayViewModel.getEmployeeId());
//
//            Long numberOfEventsBookedInYear = eventService.getTotalNumberOfEventDaysRequestedInYearByEmployee(
//                    createHolidayViewModel.getEmployeeId());
//
//            if (employee.getTotalHolidays() - numberOfEventsBookedInYear < 0) {
//                responses.add("Error in requested holiday");
//                continue;
//            }

            Integer createdEvent = eventService.numberOfEventsCreatedOnDateForEmployee(
                    createHolidayViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate());

            if (createdEvent != 0) {
                responses.add("Event exists for requested dates. Please review");
                continue;
            }
        }

        if (responses.isEmpty()) {

            ArrayList<EventDTO> newHolidays = new ArrayList<>();

            for (DateViewModel date : createHolidayViewModel.getDates()) {

                EventDTO newHoliday = modelMapper.map(date, EventDTO.class);
                modelMapper.map(createHolidayViewModel, newHoliday);
                newHolidays.add(newHoliday);
            }

            eventService.saveEvents(newHolidays.stream().toArray(EventDTO[]::new));
        }

        return ResponseEntity.ok(responses);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody UpdateHolidayViewModel updateHolidayViewModel) {
        UpdateEventDTO event = modelMapper.map(updateHolidayViewModel, UpdateEventDTO.class);
        eventService.updateEvent(event);
    }

    @PutMapping(value = "/approveHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void approveHoliday(@RequestBody ApproveHolidayViewModel approveHolidayViewModel) {

        List<String> responses = new ArrayList<>();

        EventDTO event = modelMapper.map(approveHolidayViewModel, EventDTO.class);

        Integer employeeIdByEventId = eventService.getEmployeeIdByEventId(approveHolidayViewModel.getEventId());

        if (employeeIdByEventId == employeeCredentialsViewModel.getUserId()) {
            responses.add("Employee cannot approve event that contains their ID");
        }

        if (responses.isEmpty()) {
            eventService.approveEvent(event.getEventId());
        }
    }

    @PutMapping(value = "/cancelHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void cancelHoliday(@RequestBody CancelHolidayViewModel cancelHolidayViewModel) {
        EventDTO event = modelMapper.map(cancelHolidayViewModel, EventDTO.class);
        eventService.cancelEvent(event.getEventId());
    }

    @PutMapping(value = "/rejectHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<String>> rejectHoliday(@RequestBody RejectHolidayViewModel rejectHolidayViewModel) {
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

    private List<HolidayViewModel> mapEventDtosToHolidays(List<EventDTO> events) {
        return events.stream().map(event -> modelMapper.map(event, HolidayViewModel.class)).collect(Collectors.toList());
    }
}