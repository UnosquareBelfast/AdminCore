package com.unosquare.admin_core.enums;

public enum SecurityRoles {

    TEAM_LEADER("ROLE_TEAM LEADER"),
    SYSTEM_ADMIN("ROLE_SYSTEM_ADMINISTRATOR"),
    USER("ROLE_USER");

    private final String description;

    SecurityRoles(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
