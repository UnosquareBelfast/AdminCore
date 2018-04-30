package com.unosquare.admin_core.back_end.service;

import com.google.common.base.Preconditions;
import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.ContractPK;
import com.unosquare.admin_core.back_end.enums.ContractStatus;
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
        return contractRepository.findByEmployee_EmployeeId(employeeId);
    }

    public List<Contract> findByClientId(int clientId) {
        return contractRepository.findByClient_ClientId(clientId);
    }

    public List<Contract> findByStatus(ContractStatus status) {
        return contractRepository.findByContractStatus(status);
    }

    public Contract findById(int employeeId, int clientId) {
        Optional<Contract> result = contractRepository.findById(new ContractPK(employeeId, clientId));
        if (result.isPresent()) {
            return result.get();
        }
        return null;
    }
}
