package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "holidayId")

@Table(name = "Holiday")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holidayId;

    private LocalDate startDate;
    private LocalDate endDate;

    private short holidayLength;

    @ManyToOne
    @JoinColumn(name = "employeeId")
    private Employee employee;

    private String status;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public Holiday() {

    }

    public Holiday(LocalDate startDate, LocalDate endDate, short holidayLength, Employee employee) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.holidayLength = holidayLength;
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
    }

    public Holiday(LocalDate startDate, LocalDate endDate, short holidayLength, Employee employee, String status) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.holidayLength = holidayLength;
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.status = status;
    }
}
