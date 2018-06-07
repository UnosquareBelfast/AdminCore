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

    @Basic
    @Column(name = "start_date")
    private LocalDate startDate;

    @Basic
    @Column(name = "end_date")
    private LocalDate endDate;

//    @Basic
//    @Column(name = "employee_id")
//    private int employeeId;
//
//    @Basic
//    @Column(name = "holiday_status_id")
//    private int holidayStatusId;

    @OneToOne
    @MapsId("employeeId")
    @JoinColumn(name = "employeeId", referencedColumnName = "employeeId", insertable = false, updatable = false)
    private Employee employee;

    @OneToOne
    @MapsId("holidayStatusId")
    @JoinColumn(name = "holidayStatusId", referencedColumnName = "holidayStatusId", insertable = false, updatable = false)
    private HolidayStatus holidayStatus;

    private boolean isHalfDay;

    @Column(name = "last_modified")
    private LocalDate lastModified;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    public Holiday() {

    }

    public Holiday(LocalDate startDate, LocalDate endDate, int employeeId, int statusId,
                   boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = new Employee(employeeId);
        this.holidayStatus = new HolidayStatus(statusId);
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.isHalfDay = isHalfDay;
    }
}
