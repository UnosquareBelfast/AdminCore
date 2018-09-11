package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Data
@Entity
@NoArgsConstructor
@Table(name = "Event_Message")
public class EventMessage {

    @Id
    @SequenceGenerator(name="eventMessageSeq",sequenceName="event_message_event_message_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventMessageSeq")

    @Column(name = "event_message_id", unique = true, nullable = false)
    private int eventMessageId;

    @OneToOne()
    @JoinColumn(name = "eventId")
    private Event event;

    @OneToOne()
    @JoinColumn(name = "employeeId")
    private Employee employee;

    @Column(name = "last_modified")
    private LocalDate lastModified;

    @Column(name = "message")
    private String Message;

    public EventMessage(int eventMessageId) {
        this.eventMessageId = eventMessageId;
    }
}
