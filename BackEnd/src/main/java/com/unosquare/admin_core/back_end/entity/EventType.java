package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "EventType")
public class EventType implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="eventTypeSeq",sequenceName="event_type_event_type_id_seq1", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventTypeSeq")
    @Column(name = "event_type_id", unique = true, nullable = false)
    private int eventTypeId;

    @Column(name = "description")
    private String description;

    public EventType(){

    }

    public EventType(int eventTypeId){
        this.eventTypeId = eventTypeId;
    }
}
