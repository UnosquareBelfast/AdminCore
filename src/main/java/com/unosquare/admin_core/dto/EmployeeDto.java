package com.unosquare.admin_core.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.enums.Country;
import com.unosquare.admin_core.enums.EmployeeRole;
import com.unosquare.admin_core.enums.EmployeeStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeDto {


    private int employeeId;

    private String forename;
    private String surname;
    private String email;
    private short totalHolidays;

    private LocalDate startDate;

    private short countryId;
    private String countryDescription;

    private short employeeRoleId;
    private String employeeRoleDescription;

    private short employeeStatusId;
    private String statusDescription;

    public EmployeeDto() {

    }

    public EmployeeDto(int employeeId, String forename, String surname, String email,
                       int employeeRoleId,
                       int employeeStatusId, LocalDate startDate,
                       int countryId) {
        this.employeeId = employeeId;
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRoleId = (short) employeeRoleId;
        this.employeeRoleDescription = getEmployeeRole().getDescription();
        this.employeeStatusId = (short) employeeStatusId;
        this.statusDescription = getEmployeeStatus().getDescription();
        this.startDate = startDate;
        this.countryId = (short) countryId;
        this.countryDescription = getCountry().getDescription();
    }

    public EmployeeDto(String forename, String surname, String email,
                       int employeeRoleId,
                       int employeeStatusId, LocalDate startDate,
                       int countryId) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.employeeRoleId = (short) employeeRoleId;
        this.employeeRoleDescription = getEmployeeRole().getDescription();
        this.employeeStatusId = (short) employeeStatusId;
        this.statusDescription = getEmployeeStatus().getDescription();
        this.startDate = startDate;
        this.countryId = (short) countryId;
        this.countryDescription = getCountry().getDescription();
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
