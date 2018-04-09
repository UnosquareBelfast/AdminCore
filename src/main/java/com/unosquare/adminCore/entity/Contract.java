package com.unosquare.adminCore.entity;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Contract")
public class Contract implements Serializable {

    @EmbeddedId
    private ContractPK contractId = new ContractPK();

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId", insertable = false, updatable = false)
    private Employee employee;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "clientId", referencedColumnName = "clientId", insertable = false, updatable = false)
    private Client client;

    private String status;

    public Contract()
    {

    }

    public Contract(ContractPK id, String status) {

        this.contractId = id;
        this.status = status;
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
}


