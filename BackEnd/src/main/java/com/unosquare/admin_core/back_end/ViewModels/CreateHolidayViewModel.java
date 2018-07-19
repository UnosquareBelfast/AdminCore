package com.unosquare.admin_core.back_end.ViewModels;

import com.unosquare.admin_core.back_end.dto.DateDTO;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class CreateHolidayViewModel {

    @NotBlank
    private List<DateDTO> dates;

    @NotBlank
    private int employeeId;
}
