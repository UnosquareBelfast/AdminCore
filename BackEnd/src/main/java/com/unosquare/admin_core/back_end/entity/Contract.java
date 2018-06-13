package com.unosquare.admin_core.back_end.entity;

import com.unosquare.admin_core.back_end.enums.ContractStatus;
import com.unosquare.admin_core.back_end.enums.converter.ContractStatusConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
@Table(name = "Contract")
public class Contract {

    @EmbeddedId
    private ContractPK contractId = new ContractPK();

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id", referencedColumnName = "employee_id", insertable = false, updatable = false)
    private Employee employee;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "client_id", referencedColumnName = "client_id", insertable = false, updatable = false)
    private Client client;

    @Basic
    @Column(name = "contractStatusId")
    @Convert(converter = ContractStatusConverter.class)
    private ContractStatus contractStatus;

    public Contract() {

    }

    public Contract(ContractPK id, ContractStatus status) {
        this.contractId = id;
        this.contractStatus = status;
    }
}


