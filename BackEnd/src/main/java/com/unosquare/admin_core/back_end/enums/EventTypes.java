package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum EventTypes {

    ANNUAL_LEAVE(1, "Annual Leave"),
    WORKING_FROM_HOME(2, "Working From Home"),
    SICK_LEAVE(3, "Sick Leave"),
    WORK_RELATED_TRAVEL(4, "Work Related Travel");


    private final String description;
    private final int eventTypeId;

    EventTypes(int eventTypeId, String description) {
        this.eventTypeId = eventTypeId;
        this.description = description;
    }

    public int getEventTypeId() {
        return eventTypeId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{eventTypeId='%s', description='%s'}",
                eventTypeId, description);
    }

    public static EventTypes fromId(int eventTypeID) {
        for (EventTypes type : EventTypes.values()) {
            if (type.eventTypeId == eventTypeID) {
                return type;
            }
        }
        return null;
    }
}
