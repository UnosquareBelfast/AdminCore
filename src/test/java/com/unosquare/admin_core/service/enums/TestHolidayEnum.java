package com.unosquare.admin_core.service.enums;

public enum TestHolidayEnum {
    holidayId1("1"),
    status1("APPROVED"),

    holidayId2("2"),
    status2("pending");

    private final String description;

    TestHolidayEnum(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
