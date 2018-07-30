package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class ApproveHolidayViewModel {
    @NotBlank
    private int holidayId;
}
