package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

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
    @JoinColumn(name = "employee_id")
    private Employee employee;

    @Column(name = "last_modified")
    private LocalDateTime lastModified;

    @Column(name = "message")
    private String Message;

    @OneToOne(cascade=CascadeType.DETACH)
    @JoinColumn(name = "event_message_type_id")
    private EventMessageType eventMessageType;

    public EventMessage(int eventMessageId) {
        this.eventMessageId = eventMessageId;
    }
}
