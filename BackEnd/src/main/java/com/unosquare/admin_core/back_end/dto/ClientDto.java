package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ClientDto implements java.io.Serializable {

    private int clientId;
    private String clientName;

    public ClientDto() {

    }

    public ClientDto(int clientId, String clientName) {
        this.clientId = clientId;
        this.clientName = clientName;

    }

    public ClientDto(String clientName) {
        this.clientName = clientName;

    }
}
