package com.unosquare.adminCore.dto;

import com.unosquare.adminCore.entity.ContractPK;
import com.unosquare.adminCore.enums.ContractStatus;
import com.unosquare.adminCore.service.ClientService;
import com.unosquare.adminCore.service.EmployeeService;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

@Data
public class ContractDto {

    @Autowired
    ClientService clientService;

    @Autowired
    EmployeeService employeeService;

    private EmployeeDto employee;
    private ClientDto client;
    private short contractStatusId;
    private String contractStatusDescription;

    public ContractDto() {

    }

    public ContractDto(int clientId, int employeeId, int contractStatusId) {
        this.client = new ModelMapper().map(clientService.findById(clientId), ClientDto.class);
        this.employee = new ModelMapper().map(employeeService.findById(employeeId), EmployeeDto.class);
        this.contractStatusId = (short) contractStatusId;
        this.contractStatusDescription = getContractStatus().getDescription();
    }

    public ContractPK getContractId()
    {
        return new ContractPK(employee.getEmployeeId(), client.getClientId());
    }

    public ContractStatus getContractStatus()
    {
        return ContractStatus.fromId(contractStatusId);
    }
}

