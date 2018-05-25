package com.unosquare.admin_core.back_end.enums.converter;

import com.unosquare.admin_core.back_end.enums.EmployeeStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class EmployeeStatusConverter
        implements AttributeConverter<EmployeeStatus, Integer> {

    public Integer convertToDatabaseColumn(EmployeeStatus status) {
        if (status == null) {
            return null;
        }

        return status.getEmployeeStatusId();
    }

    public EmployeeStatus convertToEntityAttribute(Integer id) {
        if (id == null) {
            return null;
        }

        return EmployeeStatus.fromId(id);
    }
}
