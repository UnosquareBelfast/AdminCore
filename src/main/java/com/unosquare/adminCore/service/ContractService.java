package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.entity.ContractPK;
import com.unosquare.adminCore.enums.ContractStatus;
import com.unosquare.adminCore.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return contractRepository.findByEmployee_EmployeeId(employeeId);
    }

    public List<Contract> findByClientId(int clientId) {
        return contractRepository.findByClient_ClientId(clientId);
    }

    public List<Contract> findByStatus(ContractStatus status) {
        return contractRepository.findByContractStatus(status);
    }

    public Contract findById(int employeeId, int clientId) {
        return contractRepository.findById(new ContractPK(employeeId, clientId)).get();
    }
}
