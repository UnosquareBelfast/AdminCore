package com.unosquare.admin_core.back_end.ViewModels;

import com.unosquare.admin_core.back_end.entity.Employee;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CreateEventViewModel {
    private int eventId;

    private LocalDate startDate;
    private LocalDate endDate;

    private int employeeId;

    private int eventTypeId;
    private String eventTypeDescription;

    private int eventStatusId;
    private String eventStatusDescription;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    private Employee employee;


}
