package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@NoArgsConstructor
@Entity
@Data
@ToString
@Table(name = "Event_Type")
public class EventType implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="eventTypeSeq",sequenceName="event_type_event_type_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventTypeSeq")
    @Column(name = "event_type_id", unique = true, nullable = false)
    private int eventTypeId;

    @Column(name = "description")
    private String description;

    public EventType(int eventTypeId){
        this.eventTypeId = eventTypeId;
    }
}
