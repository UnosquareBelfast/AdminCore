package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

@Data
public class TeamDTO implements java.io.Serializable {

    private int clientId;
    private int teamId;
    private String teamName;

    public TeamDTO() {

    }

    public TeamDTO(int clientId, int teamId, String teamName) {
        this.clientId = clientId;
        this.teamId = teamId;
        this.teamName = teamName;

    }

    public TeamDTO(String teamName) {
        this.teamName = teamName;

    }
}
