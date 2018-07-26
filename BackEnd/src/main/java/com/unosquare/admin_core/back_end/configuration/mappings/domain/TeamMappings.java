package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import com.unosquare.admin_core.back_end.entity.Team;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class TeamMappings implements BaseMappings<TeamDTO, Team> {
    @Override
    public PropertyMap<TeamDTO, Team> MapFromSourceToTarget() {
        return new PropertyMap <TeamDTO, Team>() {
            protected void configure() {
                map().setTeamName(source.getTeamName());
                map().setTeamId(source.getTeamId());
            }
        };
    }

    @Override
    public PropertyMap<Team,TeamDTO> MapFromTargetToSource() {
        return new PropertyMap <Team,TeamDTO>() {
            protected void configure() {
                map().setClientId(source.getClient().getClientId());
                map().setTeamId(source.getTeamId());
                map().setTeamName(source.getTeamName());
            }
        };
    }
}
