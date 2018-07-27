package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.RegisterEmployeeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class RegisterEmployeeMappings implements BaseMappings<EmployeeDTO, RegisterEmployeeViewModel> {

    @Override
    public PropertyMap<EmployeeDTO, RegisterEmployeeViewModel> MapFromSourceToTarget() {
        return  new PropertyMap <EmployeeDTO, RegisterEmployeeViewModel>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<RegisterEmployeeViewModel, EmployeeDTO> MapFromTargetToSource() {
        return new PropertyMap <RegisterEmployeeViewModel, EmployeeDTO>() {
            protected void configure() {
                skip().setEmployeeId(0);
                map().setEmployeeStatusId(source.getStatusId());
                map().setEmployeeRoleId(source.getEmployeeRoleId());
                map().setCountryId(source.getCountryId());
                map().setEmail(source.getEmail());
                map().setForename(source.getForename());
                map().setSurname(source.getSurname());
            }
        };
    }

}
