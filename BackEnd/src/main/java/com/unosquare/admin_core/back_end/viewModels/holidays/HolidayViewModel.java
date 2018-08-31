package com.unosquare.admin_core.back_end.viewModels.holidays;

import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeViewModel;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HolidayViewModel {

        private int holidayId;

        private LocalDate startDate;

        private LocalDate endDate;

        private EmployeeViewModel employee;

        private EventStatus eventStatus;

        private EventType eventType;

        private boolean isHalfDay;

        private LocalDate lastModified;

        private LocalDate dateCreated;

        private String deniedMessage;
}
