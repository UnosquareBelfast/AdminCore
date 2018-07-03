package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HolidayDto {

    private int holidayId;

    private LocalDate startDate;
    private LocalDate endDate;

    private EmployeeDto employee;

    private int holidayStatusId;
    private String holidayStatusDescription;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public HolidayDto() {

    }

    public HolidayDto(int holidayId, LocalDate startDate, LocalDate endDate, EmployeeDto employee, int holidayStatusId, boolean isHalfDay) {
        this.holidayId = holidayId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = employee;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    public HolidayDto(LocalDate startDate, LocalDate endDate, EmployeeDto employee, int holidayStatusId, boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employee = employee;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    @JsonIgnore
    public HolidayStatus getHolidayStatus() {
        return HolidayStatus.fromId(holidayStatusId);
    }
}
