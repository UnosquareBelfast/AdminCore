package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;

@Data
public class CreateHolidayDto {

    @NotBlank
    private LocalDate date;

    private boolean isHalfDay;

    @NotBlank
    private int employeeId;

}
