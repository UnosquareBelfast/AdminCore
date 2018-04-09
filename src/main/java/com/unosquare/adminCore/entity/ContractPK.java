package com.unosquare.adminCore.entity;

import java.io.Serializable;
import java.util.Objects;

public class ContractPK implements Serializable {

    private int employeeId;
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ContractPK taskId1 = (ContractPK) o;
        if (employeeId != taskId1.employeeId) return false;
        return clientId == taskId1.clientId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(employeeId, clientId);
    }
}
