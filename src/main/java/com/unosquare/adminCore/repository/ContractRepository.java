package com.unosquare.adminCore.repository;

import com.unosquare.adminCore.entity.Contract;
import com.unosquare.adminCore.entity.ContractPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContractRepository extends JpaRepository<Contract, ContractPK> {

    List<Contract> findByEmployee_EmployeeId(int employeeId);

    List<Contract> findByClient_ClientId(int clientId);

    List<Contract> findByStatusIgnoreCase(String status);
}
