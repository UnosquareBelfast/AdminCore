package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "ContractStatus")
public class ContractStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "contract_status_id")
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
