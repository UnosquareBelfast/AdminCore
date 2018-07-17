package com.unosquare.admin_core.back_end.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "Contract")
public class Contract implements java.io.Serializable{

    @Id
    @SequenceGenerator(name="seq",sequenceName="contract_contract_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="seq")
    @Column(name = "contract_id", unique = true, nullable = false)
    private int contractId;

    @ManyToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @ManyToOne
    @MapsId("clientId")
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate;

    public Contract() {

    }

    public Contract(int id) {
        this.contractId = id;
    }
}


