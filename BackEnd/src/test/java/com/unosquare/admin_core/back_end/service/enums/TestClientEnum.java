package com.unosquare.admin_core.back_end.service.enums;

public enum TestClientEnum {
    name("test"),
    email("test@test.com"),
    status("ACTIVE"),
    teamName("testTeam"),
    contactName("Tester");

    private final String description;

    TestClientEnum(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
