package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "mandatoryHolidayId")
@Table(name = "MandatoryHoliday")
public class MandatoryHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mandatoryHolidayId;

    private LocalDate date;
    private String country;

    public MandatoryHoliday(LocalDate date, String country) {
        this.date = date;
        this.country = country;
    }

    public MandatoryHoliday()
    {

    }

    public int getMandatoryHolidayId() {
        return mandatoryHolidayId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public void setMandatoryHolidayId(int mandatoryHolidayId) {
        this.mandatoryHolidayId = mandatoryHolidayId;
    }
}
