package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class DateDTO {

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean halfDay = false;
}
