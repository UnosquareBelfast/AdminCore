package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property="@id", scope = Holiday.class)
@Table(name = "Holiday")
public class Holiday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int holidayId;

    private LocalDate date;

    @ManyToOne
    @JoinColumn(name = "employeeId")
    private Employee employee;

    private String status;
    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public Holiday() {

    }

    public Holiday(LocalDate date, Employee employee, boolean isHalfDay) {
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.isHalfDay = isHalfDay;
        this.date = date;
    }

    public Holiday(LocalDate date, Employee employee, String status, boolean isHalfDay) {
        this.date = date;
        this.employee = employee;
        this.status = "new";
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.status = status;
        this.isHalfDay = isHalfDay;
    }
}
