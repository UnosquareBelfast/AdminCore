package com.unosquare.admin_core.back_end.viewModels;
import lombok.Data;

@Data
public class UpdatePasswordViewModel {
    private String email;
    private int employeeId;
    private String oldPassword;
    private String newPassword;

    public UpdatePasswordViewModel(){

    }

    public UpdatePasswordViewModel(String email, int employeeId, String oldPassword, String newPassword){
        this.email = email;
        this.employeeId = employeeId;
        this.oldPassword = oldPassword;
        this.newPassword = newPassword;
    }

}
