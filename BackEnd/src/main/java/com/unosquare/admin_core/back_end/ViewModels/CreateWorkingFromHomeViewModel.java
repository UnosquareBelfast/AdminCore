package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Data;

import javax.validation.constraints.NotBlank;
import java.util.List;

@Data
public class CreateWorkingFromHomeViewModel  {

    @NotBlank
     private List<DateViewModel> dates;

    @NotBlank
    private int employeeId;

    @NotBlank
    private int eventTypeId;

}
