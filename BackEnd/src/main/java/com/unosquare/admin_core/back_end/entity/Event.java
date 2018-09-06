package com.unosquare.admin_core.back_end.entity;

import lombok.*;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Event")
public class Event {

    @Id
    @SequenceGenerator(name="eventSeq",sequenceName="event_event_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventSeq")
    @Column(name = "event_id", unique = true, nullable = false)
    private int eventId;

    @Basic
    @Column(name = "start_date")
    private LocalDate startDate;

    @Basic
    @Column(name = "end_date")
    private LocalDate endDate;

    @OneToOne()
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @OneToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "event_status_id")
    private EventStatus eventStatus;

    @OneToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "event_type_id")
    private EventType eventType;

    private boolean isHalfDay;

    @Column(name = "last_modified")
    private LocalDate lastModified;

    @Column(name = "message")
    private String Message;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    public Event(int eventId) {
        this.eventId = eventId;
    }
}
