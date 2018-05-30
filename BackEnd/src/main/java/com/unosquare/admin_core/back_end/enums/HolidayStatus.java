package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum HolidayStatus {

    AWAITING_APPROVAL(1, "Awaiting approval"), //default clientStatus for new holiday requests
    APPROVED(2, "Approved"),
    DENIED(3, "Denied"),
    MANDATORY(4, "Mandatory"), // public holiday, can't cancel
    TAKEN(5, "Taken");

    private final String description;
    private final int holidayStatusId;

    HolidayStatus(int holidayStatusId, String description) {
        this.holidayStatusId = holidayStatusId;
        this.description = description;
    }

    public int getHolidayStatusId() {
        return holidayStatusId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{holidayStatusId='%s', description='%s'}",
                holidayStatusId, description);
    }

    public static HolidayStatus fromId(int holidayStatusId) {
        for (HolidayStatus status : HolidayStatus.values()) {
            if (status.holidayStatusId == holidayStatusId) {
                return status;
            }
        }
        return null;
    }
}
