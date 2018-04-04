package com.unosquare.adminCore.enums;

public enum ClientStatus {

    active ("Active"),
    inactive ("Inactive");

    private final String description;

    ClientStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
