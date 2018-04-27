package com.unosquare.admin_core.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.enums.Country;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MandatoryHolidayDto {

    private int mandatoryHolidayId;

    private LocalDate date;
    private short countryId;
    private String countryDescription;

    public MandatoryHolidayDto() {

    }

    public MandatoryHolidayDto(int mandatoryHolidayId, LocalDate date, int countryId) {
        this.mandatoryHolidayId = mandatoryHolidayId;
        this.date = date;
        this.countryId = (short) countryId;
        this.countryDescription = getCountry().getDescription();
    }

    public MandatoryHolidayDto(LocalDate date, int countryId) {
        this.date = date;
        this.countryId = (short) countryId;
        this.countryDescription = getCountry().getDescription();
    }

    @JsonIgnore
    public Country getCountry() {
        return Country.fromId(countryId);
    }
}
