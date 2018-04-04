package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import javax.persistence.*;

@Entity
@Table(name = "Contract")
public class Contract{

    @EmbeddedId
    private ContractPK contractId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_employeeId")
    @MapsId("Employee")
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_clientId")
    @MapsId("Client")
    private Client client;

    private String status;

    public Contract()
    {

    }

    public Contract(ContractPK id, Employee employee, Client client, String status) {
        this.contractId = id;
        this.status = status;
    }

    public ContractPK getId() {
        return contractId;
    }

    public void setId(ContractPK id) {
        this.contractId = id;
    }

    public Employee getEmployee() {
        return employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }

    public Client getClient() {
        return client;
    }

    public void setClient(Client client) {
        this.client = client;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setContractId(ContractPK contractId) {
        this.contractId = contractId;
    }
}


