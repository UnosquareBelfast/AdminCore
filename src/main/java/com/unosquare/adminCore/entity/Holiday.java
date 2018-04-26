package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unosquare.adminCore.enums.HolidayStatus;
import com.unosquare.adminCore.enums.enumConverter.HolidayStatusConverter;
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

    @Basic
    @Column(name = "holidayStatusId")
    @Convert( converter=HolidayStatusConverter.class )
    private HolidayStatus holidayStatus;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public Holiday() {

    }

    public Holiday(LocalDate date, Employee employee, HolidayStatus status, boolean isHalfDay) {
        this.date = date;
        this.employee = employee;
        this.holidayStatus = status;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatus = status;
        this.isHalfDay = isHalfDay;
    }
}
