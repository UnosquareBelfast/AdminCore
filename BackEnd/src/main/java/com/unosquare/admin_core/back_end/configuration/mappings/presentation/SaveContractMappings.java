package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.contracts.ContractViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.ContractDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class SaveContractMappings implements BaseMappings<ContractDTO, ContractViewModel> {
    @Override
    public PropertyMap<ContractDTO, ContractViewModel> MapFromSourceToTarget() {
        return new PropertyMap<ContractDTO, ContractViewModel>() {
            protected void configure() {
            }
        };
    }


    @Override
    public PropertyMap<ContractViewModel, ContractDTO> MapFromTargetToSource() {
        return new PropertyMap<ContractViewModel, ContractDTO>() {
            protected void configure() {

            }
        };

    }
}
