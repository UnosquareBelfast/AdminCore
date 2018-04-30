package com.unosquare.admin_core.back_end.entity;

import com.unosquare.admin_core.back_end.enums.ContractStatus;
import com.unosquare.admin_core.back_end.enums.converter.ContractStatusConverter;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Data
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


