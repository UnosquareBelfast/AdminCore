package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.HolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.SaveHolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.DateViewModel;
import com.unosquare.admin_core.back_end.dto.EventDTO;
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
    public List<HolidayViewModel> findAll() {
        List holidays = eventService.findByType(EventTypes.ANNUAL_LEAVE);
        return mapEventDtosToHolidays(holidays);
    }

    @GetMapping(value = "/{holidayId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public HolidayViewModel findholidayById(@PathVariable("holidayId") int eventId) {
        EventDTO holiday = eventService.findById(eventId);
        return modelMapper.map(holiday, HolidayViewModel.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findHolidaysByEmployeeId(@PathVariable("employeeId") int employeeId) {
        List holidays = eventService.findByEmployee(employeeId);
        return mapEventDtosToHolidays(holidays);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createHoliday(@RequestBody SaveHolidayViewModel saveHolidayViewModel) {

        List<String> responses = new ArrayList<>();

        for (DateViewModel date : saveHolidayViewModel.getDates()) {
            EventDTO existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    saveHolidayViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate());

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

            ArrayList<EventDTO> newHolidays = new ArrayList<>();

            for (DateViewModel date : saveHolidayViewModel.getDates()) {

                EventDTO newHoliday = modelMapper.map(date , EventDTO.class);
                modelMapper.map(saveHolidayViewModel, newHoliday);
                newHolidays.add(newHoliday);
            }

            eventService.saveEvents(newHolidays.stream().toArray(EventDTO[]::new));
        }

        return ResponseEntity.ok(responses);
    }

    @PutMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.OK)
    public void updateHoliday(@RequestBody SaveHolidayViewModel saveHolidayViewModel) {

        EventDTO event = modelMapper.map(saveHolidayViewModel, EventDTO.class);
        eventService.saveEvents(event);
    }

    @GetMapping(value = "/findByDateBetween/{rangeStart}/{rangeEnd}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<HolidayViewModel> findByDateBetween(@PathVariable("rangeStart") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeStart,
                                            @PathVariable("rangeEnd") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate rangeEnd) {
        return mapEventDtosToHolidays(eventService.findByDateBetween(rangeStart, rangeEnd,EventTypes.ANNUAL_LEAVE));
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
