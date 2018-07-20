package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.CreateHolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.CreateEventViewModel;
import com.unosquare.admin_core.back_end.ViewModels.DateViewModel;
import com.unosquare.admin_core.back_end.dto.EventDTO;
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
    public List<EventDTO> findAll() {
        return mapEventsToDtos(eventService.findByType(EventTypes.ANNUAL_LEAVE));
    }

    @GetMapping(value = "/{eventId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EventDTO findholidayById(@PathVariable("eventId") int eventId) {
        return modelMapper.map(eventService.findById(eventId), EventDTO.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDTO> findEventByEmployeeId(@PathVariable("employeeId") int employeeId) {

     //   return mapEventsToDtos(eventService.findByEmployee(employeeId));
        return mapDtosToEvents(eventService.findByEmployee(employeeId));
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createHoliday(@RequestBody CreateHolidayViewModel createHolidayViewModel) {

        List<String> responses = new ArrayList<>();

        for (DateViewModel date : createHolidayViewModel.getDates()) {
            EventDTO existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    createHolidayViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate());

            if (existentEvent != null) {
                responses.add("Holiday already exists");
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
                continue;
            }
        }

        if (responses.isEmpty()) {

            EventDTO event = modelMapper.map(createHolidayViewModel, EventDTO.class);

            Event newEvent = modelMapper.map(event, Event.class);
            eventService.save(createHolidayViewModel.getEmployeeId(),newEvent);

        }

        return ResponseEntity.ok(responses);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody CreateEventViewModel createEventViewModel) {

        EventDTO event = modelMapper.map(createEventViewModel, EventDTO.class);

        eventService.save(event.getEmployeeId(), modelMapper.map(event, Event.class));
    }

    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDTO> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                            @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapEventsToDtos(eventService.findByDateBetween(rangeStart, rangeEnd));
    }

    @GetMapping(value = "/findByHolidayStatus/{holidayStatusId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventDTO> findByHolidayStatus(@PathVariable("holidayStatusId") int holidayStatusId) {
        return mapEventsToDtos(eventService.findByStatusAndType(EventStatuses.fromId(holidayStatusId), EventTypes.ANNUAL_LEAVE));
    }

    private List<EventDTO> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    private List<EventDTO> mapDtosToEvents(List<EventDTO> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }


}
