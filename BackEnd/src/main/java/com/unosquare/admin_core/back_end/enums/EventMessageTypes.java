package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EventMessageTypes {

    GENERAL(1, "General"), //default clientStatus for new holiday requests
    REJECTED(2, "Rejected"),
    CANCELLED(3,"Cancelled");

    private String description;
    private int eventMessageTypeId;

    EventMessageTypes(int holidayStatusId, String description) {
        this.eventMessageTypeId = holidayStatusId;
        this.description = description;
    }

    public int getEventStatusId() {
        return eventMessageTypeId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{eventStatusId='%s', description='%s'}",
                eventMessageTypeId, description);
    }

    public static EventMessageTypes fromId(int eventStatusId) {
        for (EventMessageTypes status : EventMessageTypes.values()) {
            if (status.eventMessageTypeId == eventStatusId) {
                return status;
            }
        }
        return null;
    }
}
