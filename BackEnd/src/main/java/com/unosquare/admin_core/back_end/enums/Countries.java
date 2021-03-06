package com.unosquare.admin_core.back_end.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum Countries {

    NORTHERN_IRELAND(1, "Northern Ireland"),
    MEXICO(2, "Mexico");

    private final int countryId;
    private final String description;

    Countries(int countryId, String description) {
        this.countryId = countryId;
        this.description = description;
    }

    public int getCountryId() {
        return countryId;
    }

    public String getDescription() {
        return description;
    }

    @Override
    public String toString() {
        return String.format(
                "{countryId='%s', description='%s'}",
                countryId, description);
    }

    public static Countries fromId(int countryId) {

        for (Countries status : Countries.values()) {
            if (status.countryId == countryId) {
                return status;
            }
        }
        return null;
    }
}
