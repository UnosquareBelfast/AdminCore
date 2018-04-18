package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "clientId", scope = Client.class)
@Table(name = "Client")
public class Client implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int clientId;

    private String clientName;
    private String teamName;
    private String contactName;
    private String contactEmail;
    private String status;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet<>();

    public Client() {

    }

    public Client(String clientName, String teamName, String contactName, String contactEmail, String status) {
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.status = status;
    }
}
