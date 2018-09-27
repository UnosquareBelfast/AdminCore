package com.unosquare.admin_core.back_end.viewModels.holidays;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Data
public class RejectHolidayViewModel {
    @NotBlank
    private UUID groupId;
    private String message;
}
