package com.unosquare.admin_core.back_end.entity;

//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "Holiday")
public class Holiday implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="holidaySeq",sequenceName="holiday_holiday_id_seq1", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="holidaySeq")
    @Column(name = "holiday_id", unique = true, nullable = false)
    private int holidayId;

    @Basic
    @Column(name = "start_date")
    private LocalDate startDate;

    @Basic
    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @OneToOne
    @JoinColumn(name = "holiday_status_id")
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
