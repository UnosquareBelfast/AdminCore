package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class LoginRequestViewModel {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}