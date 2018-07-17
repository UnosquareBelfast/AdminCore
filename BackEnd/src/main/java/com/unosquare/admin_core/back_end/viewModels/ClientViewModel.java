package com.unosquare.admin_core.back_end.viewModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.ClientStatus;

public class ClientViewModel {

    private int clientId;
    private String clientName;
    private String teamName;
    private String contactName;
    private String contactEmail;
    private String clientStatusDescription;
    private int clientStatusId;

    private int minimumEmployeesForTeam = 0;

    public ClientViewModel(){

    }

    public ClientViewModel(int clientId, String clientName, String teamName, String contactName, String contactEmail, int clientStatusId) {
        this.clientId = clientId;
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.clientStatusId = (short) clientStatusId;
        this.clientStatusDescription = getClientStatus().getDescription();
    }

    public ClientViewModel(String clientName, String teamName, String contactName, String contactEmail, int clientStatusId) {
        this.clientName = clientName;
        this.teamName = teamName;
        this.contactName = contactName;
        this.contactEmail = contactEmail;
        this.clientStatusId = (short) clientStatusId;
        this.clientStatusDescription = getClientStatus().getDescription();
    }


    public ClientStatus getClientStatus() {
        return ClientStatus.fromId(clientStatusId);
    }

}
