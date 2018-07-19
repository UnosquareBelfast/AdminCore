package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EmployeeRole;
import org.modelmapper.PropertyMap;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;


public class RegisterEmployeeMappings implements BaseMappings <EmployeeDTO, Employee>  {
    @Override
    public PropertyMap<EmployeeDTO, Employee> MapFromDtoToTarget() {
        return new PropertyMap <EmployeeDTO, Employee>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployeeId());
                map().setCountry(new Country(source.getCountryId()));
                map().setEmployeeRole(new EmployeeRole(source.getEmployeeRoleId()));
                skip().setEmployeeId(source.getEmployeeId());



            }
        };
    }

    @Override
    public PropertyMap<Employee, EmployeeDTO> MapFromTargetToDto() {
        return new PropertyMap <Employee, EmployeeDTO>() {
            protected void configure() {
                map().setEmployeeRoleId(source.getEmployeeRole().getEmployeeRoleId());
                skip().setEmployeeId(source.getEmployeeId());
                map().setCountryId(source.getCountry().getCountryId());
                map().setEmployeeId(source.getEmployeeId());

            }
        };
    }
}
