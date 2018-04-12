package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "mandatoryHolidayId")
@Table(name = "MandatoryHoliday")
public class MandatoryHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mandatoryHolidayId;

    private LocalDate date;
    private String country;

    public MandatoryHoliday() {

    }

    public MandatoryHoliday(LocalDate date, String country) {
        this.date = date;
        this.country = country;
    }
}
