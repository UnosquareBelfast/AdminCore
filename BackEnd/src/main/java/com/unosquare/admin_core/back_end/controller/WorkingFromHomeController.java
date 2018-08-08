
package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.*;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/workingFromHome")
public class WorkingFromHomeController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ViewWorkingFromHomeViewModel> findAll() {
        List workingFromHome = eventService.findByType(EventTypes.WORKING_FROM_HOME);
        return mapEventDtosToWorkingFromHome(workingFromHome);
    }

    @GetMapping(value = "/{workingFromHomeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public ViewWorkingFromHomeViewModel findWorkingFromHomeById(@PathVariable("workingFromHomeId") int eventId) {
        EventDTO workingFromHome = eventService.findById(eventId);
        return modelMapper.map(workingFromHome, ViewWorkingFromHomeViewModel.class);
    }

    @GetMapping(value = "findByEmployeeId/{employeeId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<SaveWorkingFromHomeViewModel> findWorkingFromHomeByEmployeeId(@PathVariable("employeeId") int employeeId) {
        List workingFromHome = eventService.findByEmployee(employeeId);
        return mapEventDtosToWorkingFromHome(workingFromHome);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity createWorkingFromHome(@RequestBody CreateWorkingFromHomeViewModel createWorkingFromHomeViewModel) {

        List<String> responses = new ArrayList<>();


        for (DateViewModel date : createWorkingFromHomeViewModel.getDates()) {
            EventDTO existentEvent = eventService.findByEmployeeIdStartDataEndDate(
                    createWorkingFromHomeViewModel.getEmployeeId(), date.getStartDate(), date.getEndDate(), EventTypes.WORKING_FROM_HOME);

            if (existentEvent != null) {
                responses.add("Working from home already exists");
                continue;
            }

            if (date.getStartDate().isAfter(date.getEndDate())) {
                responses.add("Starting date cannot be after end date");
                continue;
            }
        }

        if (responses.isEmpty()) {

            ArrayList<EventDTO> newWorkingFromHomeDays = new ArrayList<>();

            for (DateViewModel date : createWorkingFromHomeViewModel.getDates()) {

                EventDTO newWorkingFromHomeDay = modelMapper.map(date , EventDTO.class);
                modelMapper.map(createWorkingFromHomeViewModel, newWorkingFromHomeDay);
                newWorkingFromHomeDays.add(newWorkingFromHomeDay);
            }
            eventService.saveEvents(newWorkingFromHomeDays.stream().toArray(EventDTO[]::new));
        }

        return ResponseEntity.ok(responses);
    }

    private List<ViewWorkingFromHomeViewModel> mapEventDtosToWorkingFromHome(List<EventDTO> events) {
        return events.stream().map(event -> modelMapper.map(event, ViewWorkingFromHomeViewModel.class)).collect(Collectors.toList());
    }
}