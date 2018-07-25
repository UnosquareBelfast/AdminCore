package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.FindEmployeeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import org.modelmapper.PropertyMap;

public class FindEmployeeMappings extends BaseMappings<EmployeeDTO, FindEmployeeViewModel> {
    @Override
    public PropertyMap<EmployeeDTO, FindEmployeeViewModel> MapFromDtoToTarget() {
        return new PropertyMap <EmployeeDTO, FindEmployeeViewModel>() {
            protected void configure() {
                map().setCountryId(source.getCountryId());
            }
        };
    }


    @Override
    public PropertyMap<FindEmployeeViewModel, EmployeeDTO> MapFromTargetToDto() {
        return new PropertyMap <FindEmployeeViewModel, EmployeeDTO>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployeeId());
                map().setCountryId(source.getCountryId());
                map().setCountryDescription(source.getCountryDescription());
                map().setForename(source.getForename());
                map().setStatusDescription(source.getStatusDescription());//works
                map().setEmployeeRoleId(source.getEmployeeRoleId());
                map().setEmployeeRoleDescription(source.getEmployeeRoleDescription());
            }
        };
    }
}
