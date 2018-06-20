package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "ClientStatus")
public class ClientStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="seq",sequenceName="client_status_client_status_id_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    @Column(name = "client_status_id", unique = true, nullable = false)
    private int clientStatusId;

    @Column(name = "description")
    private String description;

    public ClientStatus(){

    }

    public ClientStatus(int clientStatusId){
        this.clientStatusId = clientStatusId;
    }

    public ClientStatus(String description){
        this.description = description;
    }
}
