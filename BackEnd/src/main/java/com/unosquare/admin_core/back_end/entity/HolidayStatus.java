package com.unosquare.admin_core.back_end.entity;

//import com.fasterxml.jackson.annotation.JsonIdentityInfo;
//import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;
import lombok.ToString;

import javax.persistence.*;

@Entity
@Data
@ToString
@Table(name = "HolidayStatus")
public class HolidayStatus implements java.io.Serializable {

    @Id
    @SequenceGenerator(name="holidayStatusSeq",sequenceName="holiday_status_holiday_status_id_seq", allocationSize = 1)
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="holidayStatusSeq")
    @Column(name = "holiday_status_id", unique = true, nullable = false)
    private int holidayStatusId;

    @Column(name = "description")
    private String description;

    public HolidayStatus(){

    }

    public HolidayStatus(int holidayStatusId){
        this.holidayStatusId = holidayStatusId;
    }
}
