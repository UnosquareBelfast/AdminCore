package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EventStatuses {

    AWAITING_APPROVAL(1, "Awaiting approval"), //default clientStatus for new holiday requests
    APPROVED(2, "Approved"),
    DENIED(3, "Denied"),
    TAKEN(5, "Taken");

    private final String description;
    private final int eventStatusId;

    EventStatuses(int holidayStatusId, String description) {
        this.eventStatusId = holidayStatusId;
        this.description = description;
    }

    public int getEventStatusId() {
        return eventStatusId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{holidayStatusId='%s', description='%s'}",
                eventStatusId, description);
    }

    public static EventStatuses fromId(int holidayStatusId) {
        for (EventStatuses status : EventStatuses.values()) {
            if (status.eventStatusId == holidayStatusId) {
                return status;
            }
        }
        return null;
    }
}
