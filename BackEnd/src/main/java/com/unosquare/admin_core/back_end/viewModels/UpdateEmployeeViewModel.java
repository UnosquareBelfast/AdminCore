package com.unosquare.admin_core.back_end.viewModels;
import lombok.Data;

@Data
public class UpdateEmployeeViewModel {
    private int countryId;
    private String email;
    private int employeeId;
    private int employeeRoleId;
    private int employeeStatusId;
    private String firstName;
    private String lastName;
    private int totalHolidays;


    public UpdateEmployeeViewModel(){

    }

    public UpdateEmployeeViewModel(int countryId, String email, int employeeId, int employeeRoleId, int employeeStatusId,
                                   String firstName, String lastName , int totalHolidays){

        this.countryId = countryId;
        this.email = email;
        this.employeeId = employeeId;
        this.employeeRoleId = employeeRoleId;
        this.employeeStatusId = employeeStatusId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.totalHolidays = totalHolidays;
    }

}
