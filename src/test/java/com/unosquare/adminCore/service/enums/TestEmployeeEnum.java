package com.unosquare.adminCore.service.enums;

public enum TestEmployeeEnum {
    employeeId("1"),
    forename("test"),
    surname("tester"),
    email("test@test.com"),
    totalHolidays("21"),
    isAdmin("true"),
    isActive("true"),
    country("GB"),

    employeeId2("2"),
    forename2("test2"),
    surname2("tester2"),
    email2("test2@test.com"),
    totalHolidays2("22"),
    isAdmin2("false"),
    isActive2("false"),
    country2("GB"),

    signupEmail("fake@email.com"),
    passwordDecrypted("Password1"),
    passwordEncrypted("$2a$10$rnFlWIICS91zvKuCwGcJi.ugaSrUrKom9t258KOd98sWpn/tYVDpi");


    private final String description;

    TestEmployeeEnum(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return description;
    }


}
