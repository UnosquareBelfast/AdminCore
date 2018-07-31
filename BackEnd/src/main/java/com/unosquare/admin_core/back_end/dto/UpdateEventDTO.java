package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateEventDTO {

    private int eventId;

    private int eventTypeId;

    private LocalDate startDate;

    private LocalDate endDate;

    private boolean isHalfDay;

    private LocalDate lastModified;

}
