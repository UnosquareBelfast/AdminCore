package com.unosquare.admin_core.back_end.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "Contract")
public class Contract implements java.io.Serializable{

    @EmbeddedId
    private ContractPK contractId = new ContractPK();

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "client_id")
    private Client client;

    @OneToOne
    @MapsId("contract_status_id")
    @JoinColumn(name = "contract_status_id")
    private ContractStatus contractStatus;

    public Contract() {

    }

    public Contract(ContractPK id, ContractStatus status) {
        this.contractId = id;
        this.contractStatus = status;
    }
}


