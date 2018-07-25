package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.ContractViewModel;
import com.unosquare.admin_core.back_end.ViewModels.CreateTeamViewModel;
import com.unosquare.admin_core.back_end.ViewModels.SaveHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.ContractDTO;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import org.modelmapper.PropertyMap;

public class SaveContractMappings extends BaseMappings<ContractDTO, ContractViewModel> {
    @Override
    public PropertyMap<ContractDTO, ContractViewModel> MapFromDtoToTarget() {
        return new PropertyMap<ContractDTO, ContractViewModel>() {
            protected void configure() {
            }
        };
    }


    @Override
    public PropertyMap<ContractViewModel, ContractDTO> MapFromTargetToDto() {
        return new PropertyMap<ContractViewModel, ContractDTO>() {
            protected void configure() {

            }
        };

    }
}
