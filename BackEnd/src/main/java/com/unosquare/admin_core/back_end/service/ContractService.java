package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.dto.ContractDTO;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.repository.ContractRepository;
import com.unosquare.admin_core.back_end.repository.EmployeeRepository;
import com.unosquare.admin_core.back_end.repository.TeamRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ContractService {

    @Autowired
    ContractRepository contractRepository;

    @Autowired
    ModelMapper modelMapper;

    public List<ContractDTO> findAll() {
        List contracts = contractRepository.findAll();
        return mapContractsToDtos(contracts);
    }

    public void save(ContractDTO contractDto) {
        Preconditions.checkNotNull(contractDto);
        contractRepository.save(modelMapper.map(contractDto, Contract.class));
    }

    public void delete(ContractDTO contractDto) {
        Preconditions.checkNotNull(contractDto);
        contractRepository.delete(modelMapper.map(contractDto, Contract.class));
    }

    public List<ContractDTO> findByEmployeeId(int employeeId) {
        List contracts = contractRepository.findByEmployee(new Employee(employeeId));
        return mapContractsToDtos(contracts);
    }

    public List<ContractDTO> findByEmployeeIdAndTeamId(int employeeId, int teamId) {
        List contracts = contractRepository.findByEmployeeAndTeam(new Employee(employeeId), new Team(teamId));
        return mapContractsToDtos(contracts);
    }

    public List<ContractDTO> findByTeamId(int teamId) {
        List contracts = contractRepository.findByTeam(new Team(teamId));
        return mapContractsToDtos(contracts);
    }

    private List<ContractDTO> mapContractsToDtos(List<Contract> contracts) {
        return contracts.stream().map(event -> modelMapper.map(event, ContractDTO.class)).collect(Collectors.toList());
    }
}