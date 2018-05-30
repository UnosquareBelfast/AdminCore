package com.unosquare.admin_core.back_end.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDate;

@Data
public class DateDTO {
    private LocalDate startDate;

    private LocalDate ednDate;

    @Builder.Default
    private boolean halfDay = false;
}
