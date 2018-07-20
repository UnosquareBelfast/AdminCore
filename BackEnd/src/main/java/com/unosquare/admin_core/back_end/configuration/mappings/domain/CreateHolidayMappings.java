package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.CreateHolidayDTO;
import com.unosquare.admin_core.back_end.entity.*;
import org.modelmapper.PropertyMap;

public class CreateHolidayMappings implements BaseMappings<CreateHolidayDTO, Event> {
    @Override
    public PropertyMap<CreateHolidayDTO, Event> MapFromDtoToTarget() {
        return new PropertyMap <CreateHolidayDTO, Event>() {
            protected void configure() {
                map().setEmployee(new Employee(source.getEmployeeId()));

            }
        };
    }

    @Override
    public PropertyMap<Event, CreateHolidayDTO> MapFromTargetToDto() {
        return new PropertyMap <Event, CreateHolidayDTO>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployee().getEmployeeId());


            }
        };
    }
}
