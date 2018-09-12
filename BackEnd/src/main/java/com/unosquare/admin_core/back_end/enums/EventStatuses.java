package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EventStatuses {

    AWAITING_APPROVAL(1, "Awaiting approval"), //default clientStatus for new holiday requests
    APPROVED(2, "Approved"),
    REJECTED(3, "Rejected"),
    CANCELLED(4,"Cancelled");

    private String description;
    private int eventStatusId;

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
                "{eventStatusId='%s', description='%s'}",
                eventStatusId, description);
    }

    public static EventStatuses fromId(int eventStatusId) {
        for (EventStatuses status : EventStatuses.values()) {
            if (status.eventStatusId == eventStatusId) {
                return status;
            }
        }
        return null;
    }
}
