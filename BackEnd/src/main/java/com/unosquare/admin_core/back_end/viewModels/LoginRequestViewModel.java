package com.unosquare.admin_core.back_end.viewModels;

import com.unosquare.admin_core.back_end.payload.LoginRequest;
import lombok.Data;

@Data
public class LoginRequestViewModel {
    private String email;
    private String password;


    public LoginRequestViewModel(){

    }

    public LoginRequestViewModel(String email, String password){
        this.email = email;
        this.password = password;
    }

}
