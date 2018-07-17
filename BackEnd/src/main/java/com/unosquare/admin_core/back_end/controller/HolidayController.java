package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.CreateHolidayDto;
import com.unosquare.admin_core.back_end.dto.DateDTO;
import com.unosquare.admin_core.back_end.dto.EventDto;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.EventType;
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
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/holidays")
public class HolidayController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDto> findAll() {
        return mapEventsToDtos(eventService.findByType(EventTypes.ANNUAL_LEAVE));
    }

    @GetMapping(value = "/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EventDto findEventById(@PathVariable("eventId") int eventId) {
        return modelMapper.map(eventService.findById(eventId), EventDto.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDto> findEventByEmployeeId(@PathVariable("employeeId") int employeeId) {
        return mapEventsToDtos(eventService.findByEmployee(employeeId));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createEvent(@RequestBody CreateHolidayDto createEventDto) {

        List<String> responses = new ArrayList<>();

        for (DateDTO date : createEventDto.getDates()) {
            Event existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    createEventDto.getEmployeeId(), date.getStartDate(), date.getEndDate());

            if (existentEvent != null) {
                responses.add("Event already exists");
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
                continue;
            }
        }

        if (responses.isEmpty()) {

            Event newEvent = modelMapper.map(createEventDto, Event.class);
            newEvent.setEventType(new EventType(EventTypes.ANNUAL_LEAVE.getEventTypeId()));

            eventService.save(createEventDto.getEmployeeId(), newEvent);
            responses.add("Created");
        }

        return ResponseEntity.ok(responses);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateEvent(@RequestBody EventDto event) {
        eventService.save(event.getEmployeeId(), modelMapper.map(event, Event.class));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDto> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                              @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapEventsToDtos(eventService.findByDateBetween(rangeStart, rangeEnd));
    }

    @CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
    @GetMapping(value = "/findByHolidayStatus/{holidayStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDto> findByHolidayStatus(@PathVariable("holidayStatusId") int holidayStatusId) {
        return mapEventsToDtos(eventService.findByStatusAndType(EventStatuses.fromId(holidayStatusId), EventTypes.ANNUAL_LEAVE));
    }

    private List<EventDto> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDto.class)).collect(Collectors.toList());
    }

    private List<Event> mapDtosToEvents(List<EventDto> events) {
        return events.stream().map(event -> modelMapper.map(event, Event.class)).collect(Collectors.toList());
    }
}
