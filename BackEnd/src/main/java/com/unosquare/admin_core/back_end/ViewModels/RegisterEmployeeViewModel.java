package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import java.time.LocalDate;

@Data
public class RegisterEmployeeViewModel {

    @NotBlank
    @Size(min = 4, max = 40)
    private String forename;

    @NotBlank
    @Size(min = 4, max = 40)
    private String surname;

    @NotBlank
    private int countryId;

    private int roleId;

    private int statusId;

    private LocalDate startDate;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;
}
