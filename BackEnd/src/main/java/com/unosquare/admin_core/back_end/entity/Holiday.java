package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = Holiday.class)
@Table(name = "Holiday")
public class Holiday implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "holiday_id")
    private int holidayId;

    private LocalDate date;

    @Basic
    @Column(name = "employee_id")
    private int employeeId;

    @Basic
    @Column(name = "holiday_status_id")
    private int holidayStatusId;

    private boolean isHalfDay;

    @Column(name = "last_modified")
    private LocalDate lastModified;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    public Holiday() {

    }

    public Holiday(LocalDate date, int employeeId, int statusId, boolean isHalfDay) {
        this.date = date;
        this.employeeId = employeeId;
        this.holidayStatusId = statusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.isHalfDay = isHalfDay;
    }
}
