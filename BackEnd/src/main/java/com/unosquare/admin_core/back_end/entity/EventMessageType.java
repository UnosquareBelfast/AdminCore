package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Embeddable
@Data
@NoArgsConstructor
@Table(name = "Event_Message_Type")
public class EventMessageType implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="eventStatusSeq",sequenceName="event_status_event_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventStatusSeq")
    @Column(name = "event_message_type_id", unique = true, nullable = false)
    private int eventMessageTypeId;

    @Column(name = "description")
    private String description;

    public EventMessageType(int eventMessageTypeId){
        this.eventMessageTypeId = eventMessageTypeId;
    }
}
