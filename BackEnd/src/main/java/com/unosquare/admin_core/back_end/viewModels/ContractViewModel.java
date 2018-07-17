package com.unosquare.admin_core.back_end.viewModels;

import com.unosquare.admin_core.back_end.dto.ClientDto;
import com.unosquare.admin_core.back_end.dto.EmployeeDto;
import com.unosquare.admin_core.back_end.entity.ContractPK;
import com.unosquare.admin_core.back_end.enums.ContractStatus;
import com.unosquare.admin_core.back_end.service.ClientService;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import org.modelmapper.ModelMapper;

public class ContractViewModel {


    ClientService clientService;


    EmployeeService employeeService;

    private EmployeeDto employee;
    private ClientDto client;
    private int contractStatusId;
    private String contractStatusDescription;

    public ContractViewModel() {

    }

    public ContractViewModel(int clientId, int employeeId, int contractStatusId) {
        this.client = new ModelMapper().map(clientService.findById(clientId), ClientDto.class);
        this.employee = new ModelMapper().map(employeeService.findById(employeeId), EmployeeDto.class);
        this.contractStatusId = contractStatusId;
        this.contractStatusDescription = getContractStatus().getDescription();
    }

    public ContractPK getContractId() {
        return new ContractPK(employee.getEmployeeId(), client.getClientId());
    }

    public ContractStatus getContractStatus() {
        return ContractStatus.fromId(contractStatusId);
    }
}
