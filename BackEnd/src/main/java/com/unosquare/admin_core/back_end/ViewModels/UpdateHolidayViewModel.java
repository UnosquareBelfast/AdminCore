package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;
import java.util.List;

@Data
public class UpdateHolidayViewModel {
    @NotBlank
    private List<DateViewModel> dates;

    @NotBlank
    private int employeeId;

    @NotBlank
    private int eventTypeId;

    @NotBlank
    private int eventStatusId;

    @NotBlank
    private int holidayId;
}
