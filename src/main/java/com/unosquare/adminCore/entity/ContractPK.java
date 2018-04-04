package com.unosquare.adminCore.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
public class ContractPK implements Serializable {

    @Column(name = "EmployeeId")
    private int employeeId;

    @Column(name = "ClientId")
    private int clientId;

    public ContractPK()
    {

    }

    public ContractPK(int employeeId, int clientId) {
        this.employeeId = employeeId;
        this.clientId = clientId;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(int employeeId) {
        this.employeeId = employeeId;
    }

    public int getClientId() {
        return clientId;
    }

    public void setClientId(int clientId) {
        this.clientId = clientId;
    }
}
