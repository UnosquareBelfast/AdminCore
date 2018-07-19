package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

@Data
public class ClientDTO implements java.io.Serializable {

    private int clientId;
    private String clientName;

    public ClientDTO() {

    }

    public ClientDTO(int clientId, String clientName) {
        this.clientId = clientId;
        this.clientName = clientName;

    }

    public ClientDTO(String clientName) {
        this.clientName = clientName;

    }
}
