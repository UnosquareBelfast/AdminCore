package com.unosquare.admin_core.back_end.viewModels.auth;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequestViewModel {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}