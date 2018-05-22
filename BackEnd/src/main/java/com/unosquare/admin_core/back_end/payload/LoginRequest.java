package com.unosquare.admin_core.back_end.payload;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;

    public LoginRequest() {

    }

    public LoginRequest(String email, String password) {
        this.email = email;
        this.password = password;
    }
}