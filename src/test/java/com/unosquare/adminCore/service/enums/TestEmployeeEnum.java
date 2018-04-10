package com.unosquare.adminCore.service.enums;

import java.time.LocalDate;

public enum TestEmployeeEnum {
    employeeId("1"),
    forename("test"),
    surname("tester"),
    email("test@test.com"),
    totalHolidays("21"),
    isAdmin("true"),
    isActive("true"),
    country("GB");


        private final String description;

    TestEmployeeEnum(String description) {
            this.description = description;
        }

        @Override
        public String toString() {
            return description;
        }


}
