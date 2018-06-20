package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Data
@Table(name = "Client")
public class Client implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="seq",sequenceName="client_client_id_seq1")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    @Column(name = "client_id", unique = true, nullable = false)
    private int clientId;

    private String clientName;
    private String teamName;
    private String contactName;
    private String contactEmail;

    @Basic
    @OneToOne
    @JoinColumn(name = "client_status_id", insertable = false, updatable = false)
    private ClientStatus clientStatus;

    private int minimumEmployeesForTeam = 0;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private Set<Contract> contracts = new HashSet();

    public Client() {

    }

    public Client(int clientId){
        this.clientId = clientId;
    }

    public Client(String clientName, String teamName, String contactName, String contactEmail, ClientStatus clientStatus) {
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.clientStatus = clientStatus;
    }

}
