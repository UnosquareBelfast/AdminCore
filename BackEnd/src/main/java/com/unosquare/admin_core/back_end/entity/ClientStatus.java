package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = ClientStatus.class)
@Table(name = "ClientStatus")
public class ClientStatus implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientStatusId;

    @Column(name = "description")
    private String description;

    public ClientStatus(){

    }

    public ClientStatus(String description){
        this.description = description;
    }
}
