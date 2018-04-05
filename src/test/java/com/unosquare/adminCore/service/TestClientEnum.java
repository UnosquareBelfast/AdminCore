package com.unosquare.adminCore.service;

public enum TestClientEnum {
    name("test"),
    email("test@test.com"),
    status("active"),
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
