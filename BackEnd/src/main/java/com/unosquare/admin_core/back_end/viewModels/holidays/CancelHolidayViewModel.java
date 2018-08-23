package com.unosquare.admin_core.back_end.viewModels.holidays;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class CancelHolidayViewModel {
@NotBlank
private int holidayId;
}
