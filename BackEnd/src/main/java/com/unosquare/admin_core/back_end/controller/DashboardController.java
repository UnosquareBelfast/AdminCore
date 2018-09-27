package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.dto.DashboardEventDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeSnapshotDto;
import com.unosquare.admin_core.back_end.dto.EventMessageDTO;
import com.unosquare.admin_core.back_end.service.DashboardService;
import com.unosquare.admin_core.back_end.viewModels.dashboard.EmployeeEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.EmployeeSnapshotViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.EventMessageViewModel;
import com.unosquare.admin_core.back_end.viewModels.dashboard.TeamSnapshotViewModel;
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
import java.util.UUID;
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
    public List<EmployeeEventViewModel> getDashboardEventsByEmployeeId(@RequestParam(value = "date")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        List<DashboardEventDTO> events = dashboardService.getEmployeeDashboardEvents(employeeCredentialsViewModel.getUserId(), date);
        return events.stream().map(event -> modelMapper.map(event, EmployeeEventViewModel.class)).collect(Collectors.toList());
    }

    @GetMapping(value = "/getTeamEvents", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EmployeeEventViewModel> getTeamEventsByEmployeeId(@RequestParam(value = "date")  @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)  LocalDate date) {
        List<DashboardEventDTO> events = dashboardService.getTeamDashboardEvents(employeeCredentialsViewModel.getUserId(), date);
        return events.stream().map(event -> modelMapper.map(event, EmployeeEventViewModel.class)).collect(Collectors.toList());
    }


    @GetMapping(value = "/getDashboardSnapshot", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TeamSnapshotViewModel> getDashboardSnapshot(){
        Map<String, List<EmployeeSnapshotDto>> teamSummary = dashboardService.getTeamSnapshotDashboardEvents();
        return mapTeamSummaryDtoToTeamSummaryViewModel(teamSummary);
    }

    @GetMapping(value = "/getEmployeeTeamSnapshot", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<TeamSnapshotViewModel> getEmployeeTeamsSnapshot(){
        Map<String, List<EmployeeSnapshotDto>> teamSummary = dashboardService.getEmployeeTeamSnapshot(employeeCredentialsViewModel.getUserId());
        return mapTeamSummaryDtoToTeamSummaryViewModel(teamSummary);
    }

    @GetMapping(value = "/getMessagesByEventId/{groupId}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<EventMessageViewModel> getMessagesByEventId(@PathVariable("groupId") UUID groupId){
        List<EventMessageDTO> messages = dashboardService.getEventMessagesByEventId(groupId);
        return messages.stream().map(message -> modelMapper.map(message, EventMessageViewModel.class)).collect(Collectors.toList());
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
                mapEmployeeSnapshotViewModel(m, employee);
                employeeList.add(employee);
            }
            membersModel.setMembers(employeeList);
            model.add(membersModel);
        }
        return model;
    }

    private void mapEmployeeSnapshotViewModel(EmployeeSnapshotDto m, EmployeeSnapshotViewModel employee) {
        employee.setName(m.getName());
        employee.setEmployeeId(m.getEmployeeId());
        employee.setEmail(m.getEmail());
        employee.setClientName(m.getClientName());
        if (m.getDescription() == null) {
            employee.setState(IN_OFFICE);
        } else {
            employee.setState(m.getDescription());
        }
    }
}
