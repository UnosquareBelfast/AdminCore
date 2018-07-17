package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeDto {


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

    public EmployeeDto() {

    }

    public EmployeeDto(int employeeId, String forename, String surname, String email,
                       int employeeRoleId,
                       int employeeStatusId, LocalDate startDate,
                       int countryId,
                       int totalHolidays) {
        this.employeeId = employeeId;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRoleId = employeeRoleId;
        this.employeeRoleDescription = getEmployeeRole().getDescription();
        this.employeeStatusId = employeeStatusId;
        this.statusDescription = getEmployeeStatus().getDescription();
        this.startDate = startDate;
        this.countryId = countryId;
        this.countryDescription = getCountry().getDescription();
        this.totalHolidays = totalHolidays;
    }

    public EmployeeDto(String forename, String surname, String email,
                       int employeeRoleId,
                       int employeeStatusId, LocalDate startDate,
                       int countryId, int totalHolidays) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRoleId = employeeRoleId;
        this.employeeRoleDescription = getEmployeeRole().getDescription();
        this.employeeStatusId = employeeStatusId;
        this.statusDescription = getEmployeeStatus().getDescription();
        this.startDate = startDate;
        this.countryId = countryId;
        this.countryDescription = getCountry().getDescription();
        this.totalHolidays = totalHolidays;
    }

    @JsonIgnore

    public EmployeeRole getEmployeeRole() {
        return EmployeeRole.fromId(employeeRoleId);
    }

    @JsonIgnore
    public EmployeeStatus getEmployeeStatus() {
        return EmployeeStatus.fromId(employeeStatusId);
    }

    @JsonIgnore
    public Country getCountry() {
        return Country.fromId(countryId);
    }
}
