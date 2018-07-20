package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.CreateHolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.FindEmployeeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.CreateHolidayDTO;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import org.modelmapper.PropertyMap;

import java.awt.*;

public class CreateHolidayMappings implements BaseMappings<CreateHolidayDTO, CreateHolidayViewModel> {
    @Override
    public PropertyMap<CreateHolidayDTO, CreateHolidayViewModel> MapFromDtoToTarget() {
        return new PropertyMap <CreateHolidayDTO, CreateHolidayViewModel>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployeeId());
            }
        };
    }


    @Override
    public PropertyMap<CreateHolidayViewModel, CreateHolidayDTO> MapFromTargetToDto() {
        return new PropertyMap <CreateHolidayViewModel, CreateHolidayDTO>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployeeId());
               // map().setDates(source.getDates());

            }
        };
    }
}
