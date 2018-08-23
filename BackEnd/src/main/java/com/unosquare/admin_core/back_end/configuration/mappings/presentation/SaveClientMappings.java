package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.clients.ClientViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.ClientDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class SaveClientMappings implements BaseMappings<ClientDTO,ClientViewModel> {
    @Override
    public PropertyMap<ClientDTO, ClientViewModel> MapFromSourceToTarget() {
        return new PropertyMap<ClientDTO, ClientViewModel>() {
            protected void configure() {
                map().setClientId(source.getClientId());
                map().setClientName(source.getClientName());

            }
        };
    }


    @Override
    public PropertyMap<ClientViewModel, ClientDTO> MapFromTargetToSource() {
        return new PropertyMap<ClientViewModel, ClientDTO>() {
            protected void configure() {
                map().setClientId(source.getClientId());
                map().setClientName(source.getClientName());

            }
        };

    }




}
