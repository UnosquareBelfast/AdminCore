package com.unosquare.adminCore.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ClientStatus {

    active((short)1, "Active"),
    inactive((short)2, "Inactive");

    private final String description;
    private final short clientStatusId;

    ClientStatus(short clientStatusId,String description) {
        this.clientStatusId = clientStatusId;
        this.description = description;
    }

    public short getClientStatusId(){
        return clientStatusId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{clientStatusId='%s', description='%s'}",
                clientStatusId, description);
    }

    public static ClientStatus fromId(short clientStatusId) {
        for (ClientStatus status : ClientStatus.values()) {
            if(status.clientStatusId == clientStatusId)
            {
                return status;
            }
        }
        return null;
    }
}
