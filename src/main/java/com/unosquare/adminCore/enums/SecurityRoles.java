package com.unosquare.adminCore.enums;

public enum SecurityRoles {

    TeamLeader("ROLE_TEAM LEADER"),
    SystemAdmin("ROLE_SYSTEM_ADMINISTRATOR"),
    User("ROLE_USER");

    private final String description;

    SecurityRoles(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
