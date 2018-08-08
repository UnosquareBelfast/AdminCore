package com.unosquare.admin_core.back_end.ViewModels;

import com.unosquare.admin_core.back_end.dto.EmployeeDTO;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ViewWorkingFromHomeViewModel {

    private int eventId;

    private LocalDate startDate;

    private LocalDate endDate;

    private int eventStatusId;

    private String eventStatusDescription;

    private EmployeeDTO employee;

    private LocalDate lastModified;

    private LocalDate dateCreated;

}
