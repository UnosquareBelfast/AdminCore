package com.unosquare.admin_core.back_end.viewModels.teams;

import lombok.Data;

@Data
public class CreateTeamViewModel {
    private int clientId;
    private int teamId;
    private String teamName;
}
