package com.unosquare.admin_core.back_end.configuration.mappings.converters;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseConverters;
import com.unosquare.admin_core.back_end.entity.Employee;
import org.modelmapper.Converter;

public class EmployeeNameConverter implements BaseConverters<Employee, String> {

    @Override
    public Converter<Employee, String> MapFromSourceToTarget() {
        return mappingContext -> String.join(" ", mappingContext.getSource().getForename(), mappingContext.getSource().getSurname());
    }

    @Override
    public Converter<String, Employee> MapFromTargetToSource() {
        return null;
    }
}
