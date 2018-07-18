package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

@Data
public class TeamDto implements java.io.Serializable {

    private int clientId;
    private int teamId;
    private String teamName;

    public TeamDto() {

    }

    public TeamDto(int clientId, int teamId, String teamName) {
        this.clientId = clientId;
        this.teamId = teamId;
        this.teamName = teamName;

    }

    public TeamDto(String teamName) {
        this.teamName = teamName;

    }
}
