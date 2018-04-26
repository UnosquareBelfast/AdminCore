package com.unosquare.adminCore.entity;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.unosquare.adminCore.enums.Country;
import com.unosquare.adminCore.enums.enumConverter.CountryConverter;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Data
@JsonIdentityInfo(generator = ObjectIdGenerators.IntSequenceGenerator.class, property="@id", scope = MandatoryHoliday.class)
@Table(name = "MandatoryHoliday")
public class MandatoryHoliday {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int mandatoryHolidayId;

    private LocalDate date;

    @Basic
    @Convert( converter=CountryConverter.class )
    @Column(name = "countryId")
    private Country country;

    public MandatoryHoliday() {

    }

    public MandatoryHoliday(LocalDate date, Country country) {
        this.date = date;
        this.country = country;
    }
}
