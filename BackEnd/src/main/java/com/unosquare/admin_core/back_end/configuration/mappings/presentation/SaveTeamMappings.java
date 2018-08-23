package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.teams.CreateTeamViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.TeamDTO;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class SaveTeamMappings implements BaseMappings<TeamDTO,CreateTeamViewModel> {
    @Override
    public PropertyMap<TeamDTO, CreateTeamViewModel> MapFromSourceToTarget() {
        return new PropertyMap<TeamDTO, CreateTeamViewModel>() {
            protected void configure() {
                map().setClientId(source.getClientId());
                map().setTeamId(source.getTeamId());
                map().setTeamName(source.getTeamName());
            }
        };
    }


    @Override
    public PropertyMap<CreateTeamViewModel, TeamDTO> MapFromTargetToSource() {
        return new PropertyMap<CreateTeamViewModel, TeamDTO>() {
            protected void configure() {
                map().setTeamName(source.getTeamName());
                map().setTeamId(source.getTeamId());
                map().setClientId(source.getClientId());
            }
        };

    }
}
