package com.unosquare.admin_core.back_end.ViewModels;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DateViewModel {

    private LocalDate startDate;

    private LocalDate endDate;

    @Builder.Default
    private boolean halfDay = false;
}
