package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import com.unosquare.admin_core.back_end.entity.Country;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EmployeeRole;
import com.unosquare.admin_core.back_end.entity.EmployeeStatus;
import org.modelmapper.PropertyMap;

public class EmployeeMappings implements BaseMappings<EmployeeDTO, Employee> {

    @Override
    public PropertyMap<EmployeeDTO, Employee> MapFromDtoToTarget() {
        return new PropertyMap <EmployeeDTO, Employee>() {
            protected void configure() {
                map().setPassword(null);
                map().getCountry().setDescription(source.getCountryDescription());
                map().getEmployeeRole().setDescription(source.getEmployeeRoleDescription());
                map().getEmployeeStatus().setDescription(source.getStatusDescription());
                map().setTotalHolidays(source.getTotalHolidays());
                map().setEmail(source.getEmail());
                map().setCountry(new Country(source.getCountryId()));
                map().setEmployeeId(source.getEmployeeId());
                map().setEmployeeStatus(new EmployeeStatus(source.getEmployeeStatusId()));
                map().setEmployeeRole(new EmployeeRole(source.getEmployeeRoleId()));
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());
            }
        };
    }

    @Override
    public PropertyMap<Employee, EmployeeDTO> MapFromTargetToDto() {
        return new PropertyMap <Employee, EmployeeDTO>() {
            protected void configure() {

                map().setTotalHolidays(source.getTotalHolidays());
                map().setEmail(source.getEmail());
                map().setCountryId(source.getCountry().getCountryId());
                map().setCountryDescription(source.getCountry().getDescription());
                map().setEmployeeStatusId(source.getEmployeeStatus().getEmployeeStatusId());
                map().setStatusDescription(source.getEmployeeStatus().getDescription());
                map().setEmployeeRoleId(source.getEmployeeRole().getEmployeeRoleId());
                map().setEmployeeRoleDescription(source.getEmployeeRole().getDescription());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());
                map().setEmployeeId(source.getEmployeeId());


            }
        };
    }

}
