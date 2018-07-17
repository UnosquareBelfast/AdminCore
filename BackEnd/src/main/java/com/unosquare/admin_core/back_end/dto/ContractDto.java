package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.service.ClientService;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import com.unosquare.admin_core.back_end.service.TeamService;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDate;

@Data
public class ContractDto {

    @JsonIgnore
    @Autowired
    ClientService clientService;

    @JsonIgnore
    @Autowired
    TeamService teamService;

    @JsonIgnore
    @Autowired
    EmployeeService employeeService;

    private int contractId;
    private EmployeeDto employee;
    private TeamDto team;
    private LocalDate startDate;
    private LocalDate endDate;

    public ContractDto() {

    }

    public ContractDto(int contractId, int teamId, int employeeId, LocalDate startDate, LocalDate endDate) {
        this.contractId = contractId;
        this.team = new ModelMapper().map(teamService.findById(teamId), TeamDto.class);
        this.employee = new ModelMapper().map(employeeService.findById(employeeId), EmployeeDto.class);
        this.startDate = startDate;
        this.endDate = endDate;
    }
}


