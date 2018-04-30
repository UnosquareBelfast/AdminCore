package com.unosquare.admin_core.payload;

import com.unosquare.admin_core.enums.Country;
import com.unosquare.admin_core.enums.EmployeeRole;
import com.unosquare.admin_core.enums.EmployeeStatus;
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
    @Size(min = 4, max = 40)
    private Country county;

    private EmployeeRole employeeRole;

    private EmployeeStatus status;

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
                         Country county, EmployeeStatus status, EmployeeRole employeeRole, LocalDate startDate) {
        this.forename = forename;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.county = county;
        this.status = status;
        this.employeeRole = employeeRole;
        this.startDate = startDate;
    }

    public String getUsername() {
        return email;
    }

    public void setUsername(String username) {
        this.email = username;
    }
}
