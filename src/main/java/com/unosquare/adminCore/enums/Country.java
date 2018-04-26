package com.unosquare.adminCore.enums;

public enum Country {

    northernIreland((short) 1, "Northern Ireland"),
    mexico((short) 2, "Mexico");

    private final short countryId;
    private final String description;

    Country(short countryId, String description) {
        this.countryId = countryId;
        this.description = description;
    }

    public short getCountryId()
    {
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

    public static Country fromId(short countryId) {

        for (Country status : Country.values()) {
            if(status.countryId == countryId)
            {
                return status;
            }
        }
        return null;
    }
}
