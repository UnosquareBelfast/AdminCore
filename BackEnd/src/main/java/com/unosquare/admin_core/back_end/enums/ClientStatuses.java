package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum ClientStatuses {

    ACTIVE(1, "Active"),
    INACTIVE(2, "Inactive");

    private final String description;
    private final int clientStatusId;

    ClientStatuses(int clientStatusId, String description) {
        this.clientStatusId = clientStatusId;
        this.description = description;
    }

    public int getClientStatusId() {
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

    public static ClientStatuses fromId(int clientStatusId) {
        for (ClientStatuses status : ClientStatuses.values()) {
            if (status.clientStatusId == clientStatusId) {
                return status;
            }
        }
        return null;
    }
}
