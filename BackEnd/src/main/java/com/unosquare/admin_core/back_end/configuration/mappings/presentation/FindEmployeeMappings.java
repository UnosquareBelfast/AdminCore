package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.FindEmployeeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class FindEmployeeMappings implements BaseMappings<EmployeeDTO, FindEmployeeViewModel> {
    @Override
    public PropertyMap<EmployeeDTO, FindEmployeeViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EmployeeDTO, FindEmployeeViewModel>() {
            protected void configure() {

            }
        };
    }


    @Override
    public PropertyMap<FindEmployeeViewModel, EmployeeDTO> MapFromTargetToSource() {
        return new PropertyMap <FindEmployeeViewModel, EmployeeDTO>() {
            protected void configure() {

            }
        };
    }
}
