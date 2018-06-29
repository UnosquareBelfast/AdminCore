package com.unosquare.admin_core.back_end.entity;

import lombok.Data;

import javax.persistence.Column;
import java.io.Serializable;
import java.util.Objects;

@Data
public class ContractPK implements Serializable {

    @Column(name = "employee_id")
    private int employeeId;

    @Column(name = "client_id")
    private int clientId;

    public ContractPK() {

    }

    public ContractPK(int employeeId, int clientId) {
        this.employeeId = employeeId;
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
