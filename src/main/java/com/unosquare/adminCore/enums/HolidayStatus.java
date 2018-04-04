package com.unosquare.adminCore.enums;

public enum HolidayStatus {

    awaitingApproval ("Awaiting approval"), //default status for new holiday requests
    approved ("Approved"),
    denied ("Denied"),
    mandatory ("Mandatory"), // public holiday, can't cancel
    taken ("Taken");

    private final String description;

    HolidayStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
