package com.unosquare.admin_core.back_end.repository;

import com.unosquare.admin_core.back_end.entity.Contract;
import com.unosquare.admin_core.back_end.entity.ContractPK;
import com.unosquare.admin_core.back_end.enums.ContractStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, ContractPK> {

    List<Contract> findByEmployee_EmployeeId(int employeeId);

    List<Contract> findByClient_ClientId(int clientId);

    List<Contract> findByContractStatus(ContractStatus contractStatus);
}
