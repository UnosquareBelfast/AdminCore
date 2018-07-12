package com.unosquare.admin_core.back_end.configuration.mappings;

import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import org.hibernate.event.spi.SaveOrUpdateEvent;
import org.modelmapper.AbstractConverter;
import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.jws.soap.SOAPBinding;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;

public class EmployeeMappings implements BaseMappings<EmployeeDto, Employee> {


    @Override
    public PropertyMap<EmployeeDto, Employee> RetrieveSourceDtoMapping() {
        return new PropertyMap <EmployeeDto, Employee>() {
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
           //     map().setHolidays(new HashSet<Holiday>(source.getEmployeeId()));
            }
        };
    }

    @Override
    public PropertyMap<Employee, EmployeeDto> RetrieveTargetDtoMapping() {
        return new PropertyMap <Employee, EmployeeDto>() {
            protected void configure() {

                map().setTotalHolidays(source.getTotalHolidays());
                map().setEmail(source.getEmail());
                map().setCountryId(source.getCountry().getCountryId());
                map().setCountryDescription(source.getCountry().getDescription());
                map().setEmployeeId(source.getEmployeeId());
                map().setEmployeeStatusId(source.getEmployeeStatus().getEmployeeStatusId());
                map().setStatusDescription(source.getEmployeeStatus().getDescription());
                map().setEmployeeRoleId(source.getEmployeeRole().getEmployeeRoleId());
                map().setEmployeeRoleDescription(source.getEmployeeRole().getDescription());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
                map().setStartDate(source.getStartDate());


            }
        };
    }

}
