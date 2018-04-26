package com.unosquare.adminCore.enums.enumConverter;

import com.unosquare.adminCore.enums.EmployeeRole;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

@Converter
public class EmployeeRoleConverter
        implements AttributeConverter<EmployeeRole, Short> {

    public Short convertToDatabaseColumn(EmployeeRole role) {
        if (role == null) {
            return null;
        }

        return role.getEmployeeRoleId();
    }

    public EmployeeRole convertToEntityAttribute(Short id) {
        if (id == null) {
            return null;
        }

        return EmployeeRole.fromId(id);
    }
}
