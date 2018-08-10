package com.unosquare.admin_core.back_end.dto;

import java.time.LocalDate;

public class DashboardDTO {

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
