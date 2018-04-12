package com.unosquare.adminCore.enums;

public enum SecurityRoles {

    Admin("ROLE_ADMIN"),
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
