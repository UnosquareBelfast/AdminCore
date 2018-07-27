package com.unosquare.admin_core.back_end.ViewModels;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.Countries;
import com.unosquare.admin_core.back_end.enums.EmployeeRoles;
import com.unosquare.admin_core.back_end.enums.EmployeeStatuses;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EmployeeViewModel {
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
