package com.unosquare.admin_core.back_end.viewModels;

import java.time.LocalDate;
import lombok.Data;

@Data
public class EmployeeRegistrationViewModel {
  //  private int employeeId;
    private int countryId;
    private String email;
    private int employeeRoleId;
    private int employeeStatusId;
    private String firstName;
    private String lastName;
    private String password;
    private LocalDate startDate;

    public EmployeeRegistrationViewModel(){

    }

    public EmployeeRegistrationViewModel( int countryId, String email, int employeeRoleId, int employeeStatusId, String firstName, String lastName,
                                           String password,LocalDate startDate){

        //this.employeeId = employeeId;
        this.countryId = countryId;
        this.email = email;
        this.employeeRoleId = employeeRoleId;
        this.employeeRoleId = employeeStatusId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.startDate = startDate;

    }
}


