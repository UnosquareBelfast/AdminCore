package com.unosquare.adminCore.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.adminCore.enums.ClientStatus;
import lombok.Data;

@Data
public class ClientDto implements java.io.Serializable {

    private int clientId;

    private String clientName;
    private String teamName;
    private String contactName;
    private String contactEmail;
    private String clientStatusDescription;
    private short clientStatusId;

    private short minimumEmployeesForTeam = 0;

    public ClientDto() {

    }

    public ClientDto(int clientId, String clientName, String teamName, String contactName, String contactEmail, int clientStatusId) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.clientStatusId =  (short)clientStatusId;
        this.clientStatusDescription = getClientStatus().getDescription();
    }

    public ClientDto(String clientName, String teamName, String contactName, String contactEmail, int clientStatusId) {
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.clientStatusId =  (short)clientStatusId;
        this.clientStatusDescription = getClientStatus().getDescription();
    }

    @JsonIgnore
    public ClientStatus getClientStatus()
    {
        return ClientStatus.fromId(clientStatusId);
    }
}
