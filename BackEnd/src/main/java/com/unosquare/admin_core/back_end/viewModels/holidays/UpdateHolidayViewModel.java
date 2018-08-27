package com.unosquare.admin_core.back_end.viewModels.holidays;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.time.LocalDate;


@Data
public class UpdateHolidayViewModel {
    @NotBlank
    private int eventId;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean halfDay;

}
