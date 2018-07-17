package com.unosquare.admin_core.back_end.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "Team")
public class Team implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="seq",sequenceName="team_team_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    @Column(name = "team_id", unique = true, nullable = false)
    private int teamId;

    @ManyToOne
    @JoinColumn(name = "client_id")
    private Client clientId;

    private String teamName;

    private String contactName;

    private String contactEmail;

    public Team() {

    }

    public Team(int teamId){
        this.teamId = teamId;
    }
}
