package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.holidays.*;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.UpdateEventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/holidays")
public class HolidayController extends BaseController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findAll() {
        List<EventDTO> holidays = eventService.findByType(EventTypes.ANNUAL_LEAVE);
        return mapEventDtosToHolidays(holidays);
    }

    @GetMapping(value = "/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public HolidayViewModel findholidaybyid(@PathVariable("eventId") int eventId) {
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
    public ResponseEntity<List<String>> createHoliday(@RequestBody CreateEventViewModel createEventViewModel) {
        List<String> responses = createEventByType(createEventViewModel, EventTypes.ANNUAL_LEAVE);
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
        EventDTO event = modelMapper.map(approveHolidayViewModel, EventDTO.class);
        eventService.approveEvent(event.getEventId());
    }

    @PutMapping(value = "/cancelHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void cancelHoliday(@RequestBody CancelHolidayViewModel cancelHolidayViewModel) {
        EventDTO event = modelMapper.map(cancelHolidayViewModel, EventDTO.class);
        eventService.cancelEvent(event.getEventId());
    }

    @PutMapping(value = "/rejectHoliday", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<List<String>>  rejectHoliday(@RequestBody RejectHolidayViewModel rejectHolidayViewModel) {
        EventDTO event = modelMapper.map(rejectHolidayViewModel, EventDTO.class);
        List<String> responses = eventService.rejectEvent(event.getEventId(), event.getMessage());
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