package com.unosquare.admin_core.back_end.viewModels;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.Country;
import com.unosquare.admin_core.back_end.enums.EmployeeRole;
import com.unosquare.admin_core.back_end.enums.EmployeeStatus;
import lombok.Data;

@Data
public class EmployeeViewModel {
    private int countryId;
    private String email;
    private int employeeId;
    private int employeeRoleId;
    private int employeeStatusId;
    private String firstName;
    private String lastName;
    private int totalHolidays;



    public EmployeeViewModel(){

    }

    public EmployeeViewModel(int countryId, String email, int employeeId, int employeeStatusId, String firstName, String lastName, int totalHolidays){
        this.countryId = countryId;
        this.email = email;
        this.employeeId = employeeId;
        this.employeeStatusId = employeeStatusId;
        this.firstName = firstName;
        this.totalHolidays = totalHolidays;

    }

    public EmployeeRole getEmployeeRole() {
        return EmployeeRole.fromId(employeeRoleId);
    }

    public EmployeeStatus getEmployeeStatus() {
        return EmployeeStatus.fromId(employeeStatusId);
    }

    public Country getCountry() {
        return Country.fromId(countryId);
    }

}
