package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.RegisterEmployeeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import org.modelmapper.PropertyMap;

public class RegisterEmployeeMappings extends BaseMappings<EmployeeDTO, RegisterEmployeeViewModel> {

    @Override
    public PropertyMap<EmployeeDTO, RegisterEmployeeViewModel> MapFromDtoToTarget() {
        return  new PropertyMap <EmployeeDTO, RegisterEmployeeViewModel>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<RegisterEmployeeViewModel, EmployeeDTO> MapFromTargetToDto() {
        return new PropertyMap <RegisterEmployeeViewModel, EmployeeDTO>() {
            protected void configure() {
                skip().setEmployeeId(0);
                map().setEmployeeStatusId(source.getStatusId());
                map().setEmployeeRoleId(source.getRoleId());
                map().setCountryId(source.getCountryId());
                map().setEmail(source.getEmail());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
            }
        };
    }

}
