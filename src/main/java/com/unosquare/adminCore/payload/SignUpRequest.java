package com.unosquare.adminCore.payload;

import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Data
public class SignUpRequest {
    @NotBlank
    @Size(min = 4, max = 40)
    private String forename;

    @NotBlank
    @Size(min = 4, max = 40)
    private String surname;

    @NotBlank
    @Size(min = 4, max = 40)
    private String county;

    @NotNull
    private boolean isAdmin;

    @NotNull
    private boolean isActive;

    @NotNull
    private LocalDate startDate;

    @NotBlank
    @Size(max = 40)
    @Email
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    public SignUpRequest() {

    }

    public SignUpRequest(String forename, String surname, String email, String password,
                         String county, boolean isActive, boolean isAdmin, LocalDate startDate) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.county = county;
        this.isActive = isActive;
        this.isAdmin = isAdmin;
        this.startDate = startDate;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }
}
