package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.Countries;
import com.unosquare.admin_core.back_end.enums.EmployeeRoles;
import com.unosquare.admin_core.back_end.enums.EmployeeStatuses;
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
                       int countryId) {
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
    }

    public EmployeeDto(String forename, String surname, String email,
                       int employeeRoleId,
                       int employeeStatusId, LocalDate startDate,
                       int countryId) {
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
    }

    @JsonIgnore
    public EmployeeRoles getEmployeeRole() {
        return EmployeeRoles.fromId(employeeRoleId);
    }

    @JsonIgnore
    public EmployeeStatuses getEmployeeStatus() {
        return EmployeeStatuses.fromId(employeeStatusId);
    }

    @JsonIgnore
    public Countries getCountry() {
        return Countries.fromId(countryId);
    }
}
