package com.unosquare.admin_core.back_end.viewModels.holidays;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class RejectHolidayViewModel {
    @NotBlank
    private int eventId;
    private String message;
}
