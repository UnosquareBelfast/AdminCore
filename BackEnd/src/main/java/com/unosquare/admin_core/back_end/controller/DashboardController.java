package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.service.DashboardService;
import com.unosquare.admin_core.back_end.viewModels.dashboard.MobileDashboardEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.MobileEmployeeEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeCredentialsViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.DashboardEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.EmployeeEventViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    public EmployeeCredentialsViewModel employeeCredentialsViewModel;

    @Autowired
    public DashboardService dashboardService;

    @Autowired
    ModelMapper modelMapper;

    @GetMapping(value = "/getEmployeeEvents", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeEventViewModel getDashboardEventsByEmployeeId(@RequestParam(value = "date")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
            List<EventDTO> events = dashboardService.getEmployeeDashboardEvents(employeeCredentialsViewModel.getUserId(), date);
            List<DashboardEventViewModel> results = events.stream().map(event -> modelMapper.map(event, DashboardEventViewModel.class)).collect(Collectors.toList());
            EmployeeEventViewModel model = new EmployeeEventViewModel();
            model.setEvents(results);
            return model;
    }

    @GetMapping(value = "/getTeamEvents", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public EmployeeEventViewModel getTeamEventsByEmployeeId(@RequestParam(value = "date")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        List<EventDTO> events = dashboardService.getTeamDashboardEvents(employeeCredentialsViewModel.getUserId(), date);
        List<DashboardEventViewModel> results = events.stream().map(event -> modelMapper.map(event, DashboardEventViewModel.class)).collect(Collectors.toList());
        EmployeeEventViewModel model = new EmployeeEventViewModel();
        model.setEvents(results);
        return model;
    }


    @GetMapping(value = "/getMobileSnapshot", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public MobileEmployeeEventViewModel getDashboardSnapshotForMobile(@RequestParam(value = "date") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date){
        List<EventDTO> events = dashboardService.getTeamDashboardEvents(employeeCredentialsViewModel.getUserId(), date);
        List<MobileDashboardEventViewModel> results = events.stream().map(event -> modelMapper.map(event, MobileDashboardEventViewModel.class)).collect(Collectors.toList());
        MobileEmployeeEventViewModel model = new MobileEmployeeEventViewModel();
        model.setEvents(results);
        return model;
    }
}
