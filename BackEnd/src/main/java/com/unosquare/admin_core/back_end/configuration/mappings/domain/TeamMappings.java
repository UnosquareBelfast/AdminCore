package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import com.unosquare.admin_core.back_end.entity.Team;
import org.modelmapper.PropertyMap;

public class TeamMappings implements BaseMappings<TeamDTO, Team> {
    @Override
    public PropertyMap<TeamDTO, Team> MapFromDtoToTarget() {
        return new PropertyMap <TeamDTO, Team>() {
            protected void configure() {
                map().setTeamName(source.getTeamName());
                map().setTeamId(source.getTeamId());

            }
        };
    }

    @Override
    public PropertyMap<Team,TeamDTO> MapFromTargetToDto() {
        return new PropertyMap <Team,TeamDTO>() {
            protected void configure() {
                map().setClientId(source.getClient().getClientId());
                map().setTeamId(source.getTeamId());
                map().setTeamName(source.getTeamName());



            }
        };
    }
}
