
package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.service.EventService;
import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.workfromhome.ViewWorkingFromHomeViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/workingFromHome")
public class WorkingFromHomeController extends BaseController {

    @Autowired
    EventService eventService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<ViewWorkingFromHomeViewModel> findAll() {
        List<EventDTO> workingFromHome = eventService.findByType(EventTypes.WORKING_FROM_HOME);
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
    public List<ViewWorkingFromHomeViewModel> findWorkingFromHomeByEmployeeId(@PathVariable("employeeId") int employeeId) {
        List<EventDTO> workingFromHome = eventService.findByEmployee(employeeId);
        return mapEventDtosToWorkingFromHome(workingFromHome);
    }

    @PostMapping(value = "/", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<List<String>> createWorkingFromHome(@RequestBody CreateEventViewModel createEventViewModel) {
        List<String> responses = createEventByType(createEventViewModel, EventTypes.WORKING_FROM_HOME);
        return ResponseEntity.ok(responses);
    }

    private List<ViewWorkingFromHomeViewModel> mapEventDtosToWorkingFromHome(List<EventDTO> events) {
        return events.stream().map(event -> modelMapper.map(event, ViewWorkingFromHomeViewModel.class)).collect(Collectors.toList());
    }
}