package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.ClientViewModel;
import com.unosquare.admin_core.back_end.ViewModels.CreateTeamViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.ClientDTO;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import org.modelmapper.PropertyMap;

public class SaveClientMappings extends BaseMappings<ClientDTO,ClientViewModel> {
    @Override
    public PropertyMap<ClientDTO, ClientViewModel> MapFromDtoToTarget() {
        return new PropertyMap<ClientDTO, ClientViewModel>() {
            protected void configure() {
                map().setClientId(source.getClientId());
                map().setClientName(source.getClientName());

            }
        };
    }


    @Override
    public PropertyMap<ClientViewModel, ClientDTO> MapFromTargetToDto() {
        return new PropertyMap<ClientViewModel, ClientDTO>() {
            protected void configure() {
                map().setClientId(source.getClientId());
                map().setClientName(source.getClientName());

            }
        };

    }




}
