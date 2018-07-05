package com.unosquare.admin_core.back_end.enums;

public enum SecurityRoles {

    TEAM_LEADER("TEAM LEADER"),
    SYSTEM_ADMIN("SYSTEM_ADMINISTRATOR"),
    USER("USER");

    private final String description;

    SecurityRoles(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
