package com.unosquare.admin_core.back_end.entity;

//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "ContractStatus")
public class ContractStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="contractStatusSeq",sequenceName="contract_status_contract_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="contractStatusSeq")
    @Column(name = "contract_status_id", unique = true, nullable = false)
    private int contractStatusId;

    @Column(name = "description")
    private String description;

    public ContractStatus(){

    }

    public ContractStatus(int contractStatusId){
        this.contractStatusId = contractStatusId;
    }

    public ContractStatus(String description){
        this.description = description;
    }
}
