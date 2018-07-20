package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Entity
@Data
@Table(name = "Client")
public class Client implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="seq",sequenceName="client_client_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    @Column(name = "client_id", unique = true, nullable = false)
    private int clientId;

    private String clientName;

    @OneToMany(mappedBy = "client")
    @JsonIgnore
    private Set<Team> teams = new HashSet();

    public Client(int clientId){
        this.clientId = clientId;
    }

    public Client(String clientName) {
        this.clientName = clientName;
    }

}
