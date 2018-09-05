package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto;
import com.unosquare.admin_core.back_end.service.DashboardService;
import com.unosquare.admin_core.back_end.viewModels.dashboard.*;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeCredentialsViewModel;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
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

    private static final String IN_OFFICE = "In Office";

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


    @GetMapping(value = "/getDashboardSnapshot", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TeamSnapshotViewModel> getDashboardSnapshot(){
        Map<String, List<EmployeeSnapshotDto>> teamSummary = dashboardService.getTeamSnapshotDashboardEvents();
        return mapTeamSummaryDtoToTeamSummaryViewModel(teamSummary);
    }

    private  List<TeamSnapshotViewModel> mapTeamSummaryDtoToTeamSummaryViewModel(Map<String, List<EmployeeSnapshotDto>> teams) {
        List<TeamSnapshotViewModel> model = new ArrayList<>();
        for (Map.Entry<String, List<EmployeeSnapshotDto>> team : teams.entrySet()) {
            TeamSnapshotViewModel membersModel = new TeamSnapshotViewModel();
            membersModel.setTeam(team.getKey());
            List<EmployeeSnapshotDto> members = team.getValue();
            List<EmployeeSnapshotViewModel> employeeList = new ArrayList<>();
            for (EmployeeSnapshotDto m : members){
                EmployeeSnapshotViewModel employee = new EmployeeSnapshotViewModel();
                employee.setName(m.getName());
                if (m.getDescription() == null) {
                    employee.setState(IN_OFFICE);
                } else {
                    employee.setState(m.getDescription());
                }
                employeeList.add(employee);
            }
            membersModel.setMembers(employeeList);
            model.add(membersModel);
        }
        return model;
    }
}
