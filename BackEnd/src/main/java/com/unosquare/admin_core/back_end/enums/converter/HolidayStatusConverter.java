package com.unosquare.admin_core.back_end.enums.converter;

import com.unosquare.admin_core.back_end.enums.HolidayStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class HolidayStatusConverter
        implements AttributeConverter<HolidayStatus, Integer> {

    public Integer convertToDatabaseColumn(HolidayStatus status) {
        if (status == null) {
            return null;
        }

        return status.getHolidayStatusId();
    }

    public HolidayStatus convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }

        return HolidayStatus.fromId(id);
    }
}
