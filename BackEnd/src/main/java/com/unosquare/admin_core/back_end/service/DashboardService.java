package com.unosquare.admin_core.back_end.service;

import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Event;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.repository.*;
import lombok.val;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    TeamRepository teamRepository;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ContractRepository contractRepository;




    @Autowired
    DashboardRepository dashboardRepository;

    public List<EventDTO> FindDashboardForEmployee(int employeeId) {

        List<Event> events = dashboardRepository.findByEmployee(new Employee(employeeId));
        return mapEventsToDtos(events);
    }

    public List <ContractDTO>  FindDashboardForTeams(int[] teamIds) {

        List <ContractDTO> contractList = new ArrayList();

      for(int i : teamIds){

          Optional<Contract> result = contractRepository.findById(i);
          if (result.isPresent()) {
              contractList.add(modelMapper.map(result.get(), ContractDTO.class));
          }
      }
        return contractList;
    }


    public List<ContractDTO> findEmployeesByConract(int[] teamIds){
        return null;
    }

    private List<EventDTO> mapEventsToDtos(List<Event> events) {
        return events.stream().map(event -> modelMapper.map(event, EventDTO.class)).collect(Collectors.toList());
    }

    private List<ContractDTO> mapContractsToDtos(List<Contract> contracts){
        return contracts.stream().map(contract -> modelMapper.map(contracts, ContractDTO.class)).collect(Collectors.toList());
    }

    private List<TeamDTO> mapTeamToDtOS(List<Team> teams){
        return teams.stream().map(team -> modelMapper.map(teams, TeamDTO.class)).collect(Collectors.toList());
    }

}
