package com.unosquare.adminCore.enums;

public enum HolidayStatus {

    awaitingApproval((short)1, "Awaiting approval"), //default clientStatus for new holiday requests
    approved((short)2, "Approved"),
    denied((short)3, "Denied"),
    mandatory((short)4, "Mandatory"), // public holiday, can't cancel
    taken((short)5, "Taken");

    private final String description;
    private final short holidayStatusId;

    HolidayStatus(short holidayStatusId, String description) {
        this.holidayStatusId = holidayStatusId;
        this.description = description;
    }

    public short getHolidayStatusId()
    {
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

    public static HolidayStatus fromId(short holidayStatusId) {
        for (HolidayStatus status : HolidayStatus.values()) {
            if(status.holidayStatusId == holidayStatusId)
            {
                return status;
            }
        }
        return null;
    }
}
