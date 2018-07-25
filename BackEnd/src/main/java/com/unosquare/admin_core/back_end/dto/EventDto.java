package com.unosquare.admin_core.back_end.dto;

import lombok.Data;
import lombok.NoArgsConstructor;


import java.time.LocalDate;


@Data
@NoArgsConstructor

public class EventDTO {

    private int eventId;

    private LocalDate startDate;
    private LocalDate endDate;

    private int eventTypeId;
    private String eventTypeDescription;

    private int eventStatusId;
    private String eventStatusDescription;

    private EmployeeDTO employee;

    private boolean isHalfDay;

    private LocalDate lastModified;

    private LocalDate dateCreated;
}
