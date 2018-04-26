package com.unosquare.adminCore.enums.enumConverter;

import com.unosquare.adminCore.enums.Country;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class CountryConverter
        implements AttributeConverter<Country, Short> {

    public Short convertToDatabaseColumn(Country country) {
        if (country == null) {
            return null;
        }

        return country.getCountryId();
    }

    public Country convertToEntityAttribute(Short id) {
        if (id == null) {
            return null;
        }

        return Country.fromId(id);
    }
}