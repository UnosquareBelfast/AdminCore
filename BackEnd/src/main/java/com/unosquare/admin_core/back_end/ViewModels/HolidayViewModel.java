package com.unosquare.admin_core.back_end.ViewModels;

import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import lombok.*;

import javax.persistence.*;
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
}
