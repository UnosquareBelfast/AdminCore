package com.unosquare.admin_core.back_end.viewModels;

import com.unosquare.admin_core.back_end.dto.DateDTO;
import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;


@Data
public class CreateHolidayViewModel {

    @NotBlank
    private List<DateViewModel> dates;

    @NotBlank
    private int employeeId;

}

