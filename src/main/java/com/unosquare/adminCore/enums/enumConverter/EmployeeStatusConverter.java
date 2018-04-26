package com.unosquare.adminCore.enums.enumConverter;

import com.unosquare.adminCore.enums.EmployeeStatus;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class EmployeeStatusConverter
        implements AttributeConverter<EmployeeStatus, Short> {

    public Short convertToDatabaseColumn(EmployeeStatus status) {
        if (status == null) {
            return null;
        }

        return status.getEmployeeStatusId();
    }

    public EmployeeStatus convertToEntityAttribute(Short id) {
        if (id == null) {
            return null;
        }

        return EmployeeStatus.fromId(id);
    }
}
