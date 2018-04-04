package com.unosquare.adminCore.service;

import com.google.common.base.Preconditions;
import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.entity.ContractPK;
import com.unosquare.adminCore.repository.ContractRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContractService {

    @Autowired
    ContractRepository contractRepository;

    public List<Contract> findAll()
    {
        return contractRepository.findAll();
    }

    public Contract findbyId(int employeeId, int clientId){
        Optional<Contract> searchResult = contractRepository.findById(new ContractPK(employeeId, clientId));
        return searchResult.get();
    }

    public void save(Contract contract)
    {
        Preconditions.checkNotNull(contract);
        contractRepository.save(contract);
    }
}
