package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import java.time.LocalDate;

@Data
public class FindEmployeeViewModel {
    private int employeeId;

    private String forename;
    private String surname;
    private String email;
    private int totalHolidays;

    private LocalDate startDate;

    private int countryId;
    private String countryDescription;

    private int employeeRoleId;
    private String employeeRoleDescription;

    private int employeeStatusId;
    private String statusDescription;
}
