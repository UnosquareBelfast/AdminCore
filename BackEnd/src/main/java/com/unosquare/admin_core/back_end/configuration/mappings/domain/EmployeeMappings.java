package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Employee;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class EmployeeMappings implements BaseMappings<EmployeeDTO, Employee> {

    @Override
    public PropertyMap<EmployeeDTO, Employee> MapFromSourceToTarget() {
        return new PropertyMap <EmployeeDTO, Employee>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<Employee, EmployeeDTO> MapFromTargetToSource() {
        return new PropertyMap <Employee, EmployeeDTO>() {
            protected void configure() {
            }
        };
    }
}
