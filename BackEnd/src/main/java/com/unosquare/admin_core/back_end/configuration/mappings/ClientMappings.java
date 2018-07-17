package com.unosquare.admin_core.back_end.configuration.mappings;

import com.fasterxml.jackson.databind.ser.Serializers;
import com.unosquare.admin_core.back_end.dto.*;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.ClientStatus;
import com.unosquare.admin_core.back_end.payload.SignUpRequest;
import org.modelmapper.ModelMapper;
import org.modelmapper.PropertyMap;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.unosquare.admin_core.back_end.enums.ClientStatus;

import java.util.ArrayList;
import java.util.List;

public class ClientMappings implements BaseMappings<ClientDto, Client> {

    @Override
    public PropertyMap<ClientDto, Client> RetrieveSourceDtoMapping() {
        return new PropertyMap<ClientDto, Client>() {
            protected void configure() {

                map().setMinimumEmployeesForTeam(source.getMinimumEmployeesForTeam());
                map().setTeamName(source.getTeamName());
                map().setContactEmail(source.getContactEmail());
                map().setClientName(source.getClientName());
                map().setClientId(source.getClientId());
                map().setContactName(source.getContactName());
                map().setClientStatus(new com.unosquare.admin_core.back_end.entity.ClientStatus(source.getClientStatusId()));
            }
        };
    }


    @Override
    public PropertyMap<Client, ClientDto> RetrieveTargetDtoMapping(){
        return new PropertyMap<Client, ClientDto>() {
            @Override
            protected void configure() {
                map().setMinimumEmployeesForTeam(source.getMinimumEmployeesForTeam());
                map().setTeamName(source.getTeamName());
                map().setContactEmail(source.getContactEmail());
                map().setClientName(source.getClientName());
                map().setClientId(source.getClientId());
                map().setContactName(source.getContactName());
                skip().setClientStatusDescription(source.getClientStatus().getDescription());
                map().setClientStatusId(source.getClientStatus().getClientStatusId());

            }
        };
    }
}
