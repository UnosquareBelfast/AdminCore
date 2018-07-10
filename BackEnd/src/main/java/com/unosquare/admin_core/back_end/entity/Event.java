package com.unosquare.admin_core.back_end.entity;

import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "Event")
public class Event implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="eventSeq",sequenceName="event_event_id_seq1", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventSeq")
    @Column(name = "event_id", unique = true, nullable = false)
    private int eventId;

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

    @OneToOne
    @JoinColumn(name = "event_type_id")
    private EventType eventType;

    private boolean isHalfDay;

    @Column(name = "last_modified")
    private LocalDate lastModified;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    public Event() {

    }

    public Event(LocalDate startDate, LocalDate endDate, int employeeId,
                 int eventTypeId, int statusId, boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = new Employee(employeeId);
        this.eventType = new EventType(eventTypeId);
        this.holidayStatus = new HolidayStatus(statusId);
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.isHalfDay = isHalfDay;
    }
}
