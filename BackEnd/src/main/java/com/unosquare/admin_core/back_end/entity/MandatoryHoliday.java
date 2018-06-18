package com.unosquare.admin_core.back_end.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@Table(name = "MandatoryHoliday")
public class MandatoryHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mandatoryHolidayId;

    private LocalDate date;

    @Basic
    @ManyToOne
    @JoinColumn(name = "country_id", insertable = false, updatable = false)
    private Country country;

    public MandatoryHoliday() {

    }

    public MandatoryHoliday(int mandatoryHolidayId){
        this.mandatoryHolidayId = mandatoryHolidayId;
    }

    public MandatoryHoliday(LocalDate date, Country country) {
        this.date = date;
        this.country = country;
    }
}
