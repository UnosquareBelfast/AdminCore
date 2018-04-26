package com.unosquare.adminCore.enums;

public enum SecurityRoles {

    teamLeader("ROLE_TEAM LEADER"),
    systemAdmin("ROLE_SYSTEM_ADMINISTRATOR"),
    user("ROLE_USER");

    private final String description;

    SecurityRoles(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
