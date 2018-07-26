package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

@Data
public class CreateTeamViewModel {
    private int clientId;
    private int teamId;
    private String teamName;
}
