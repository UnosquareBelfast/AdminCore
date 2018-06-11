package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property = "@id", scope = HolidayStatus.class)
@Table(name = "HolidayStatus")
public class HolidayStatus implements java.io.Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "holiday_status_id")
    private int holidayStatusId;

    @Column(name = "description")
    private String description;

    public HolidayStatus(){

    }

    public HolidayStatus(int holidayStatusId){
        this.holidayStatusId = holidayStatusId;
    }
}
