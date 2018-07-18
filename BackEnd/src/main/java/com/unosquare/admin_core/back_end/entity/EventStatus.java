package com.unosquare.admin_core.back_end.entity;

import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "Event_Status")
public class EventStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="eventStatusSeq",sequenceName="event_status_event_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="eventStatusSeq")
    @Column(name = "event_status_id", unique = true, nullable = false)
    private int eventStatusId;

    @Column(name = "description")
    private String description;

    public EventStatus(){

    }

    public EventStatus(int eventStatusId){
        this.eventStatusId = eventStatusId;
    }
}
