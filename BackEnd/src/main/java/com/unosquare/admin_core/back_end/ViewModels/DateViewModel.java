package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DateViewModel {

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean halfDay;
}
