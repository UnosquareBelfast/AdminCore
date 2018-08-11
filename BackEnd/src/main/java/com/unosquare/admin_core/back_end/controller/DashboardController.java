package com.unosquare.admin_core.back_end.controller;

import com.unosquare.admin_core.back_end.ViewModels.*;
import com.unosquare.admin_core.back_end.dto.ContractDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.service.DashboardService;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(origins = "*", allowCredentials = "true", allowedHeaders = "*")
@RequestMapping("/dashboard")
public class DashboardController {

    @Autowired
    public EmployeeCredentialsViewModel userDetails;

    @Autowired
    DashboardService dashboardService;

    @Autowired
    ModelMapper modelMapper;

    public String getUsername() {
        return userDetails.getEmail();
    }


    @GetMapping(value = "/{viewTeam}", produces = MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    public List<DashboardViewModel> getAllEventsByTeam(@RequestParam(value="viewTeam", required = false, defaultValue = "false") boolean viewTeam){
        if (viewTeam) {

         return null;
        }
        else{
          List events = dashboardService.FindDashboardForEmployee(userDetails.getEmployeeId());
            return mapEventDtosToHolidays(events);
        }
    }

    private List<DashboardViewModel> mapEventDtosToHolidays(List<EventDTO> events) {
        return events.stream().map(event -> modelMapper.map(event, DashboardViewModel.class)).collect(Collectors.toList());
    }

    private List<DashboardTeamViewModel> mapTeamsDtosToDashboard(List<TeamDTO> teams){
        return teams.stream().map(team -> modelMapper.map(team, DashboardTeamViewModel.class)).collect(Collectors.toList());
    }

    private List<DashboardTeamViewModel> mapContractDtosToDashboard(List<ContractDTO> contracts){
       return contracts.stream().map(contract -> modelMapper.map(contract, DashboardTeamViewModel.class)).collect(Collectors.toList());
   }

}

