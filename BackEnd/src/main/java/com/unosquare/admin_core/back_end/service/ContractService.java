package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Client;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.Team;
import com.unosquare.admin_core.back_end.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    ContractRepository contractRepository;

    public List<Contract> findAll() {
        return contractRepository.findAll();
    }

    public void save(Contract contract) {
        Preconditions.checkNotNull(contract);
        contractRepository.save(contract);
    }

    public List<Contract> findByEmployeeId(int employeeId) {
        return contractRepository.findByEmployee(new Employee(employeeId));
    }

    public List<Contract> findByTeamId(int teamId) {
        return contractRepository.findByTeam(new Team(teamId));
    }
}
