package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, ContractPK> {

    List<Contract> findByEmployee(Employee employee);

    List<Contract> findByClient(Client client);

    List<Contract> findByContractStatus(ContractStatus contractStatus);
}
