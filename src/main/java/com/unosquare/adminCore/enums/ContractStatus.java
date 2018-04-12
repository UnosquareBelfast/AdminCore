package com.unosquare.adminCore.enums;

public enum ContractStatus {

    active("Active"),
    inactive("Inactive");

    private final String description;

    ContractStatus(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }
}
