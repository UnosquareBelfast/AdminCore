package com.unosquare.admin_core.back_end.payload;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
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
    @JsonProperty("country")
    private int countryId;

    @JsonProperty("employeeRole")
    private int employeeRoleId;

    @JsonProperty("status")
    private int statusId;

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
                         int countryId, int statusId, int employeeRoleId, LocalDate startDate) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.countryId = countryId;
        this.statusId = statusId;
        this.employeeRoleId = employeeRoleId;
        this.startDate = startDate;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }
}
