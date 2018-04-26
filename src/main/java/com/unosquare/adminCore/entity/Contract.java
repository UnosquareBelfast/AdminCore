package com.unosquare.adminCore.entity;

import com.unosquare.adminCore.enums.ContractStatus;
import com.unosquare.adminCore.enums.enumConverter.ContractStatusConverter;
import lombok.Data;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashMap;
import java.util.Map;

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
    @Convert( converter=ContractStatusConverter.class )
    private ContractStatus contractStatus;

    public Contract() {

    }

    public Contract(ContractPK id, ContractStatus status) {
        this.contractId = id;
        this.contractStatus = status;
    }
}


