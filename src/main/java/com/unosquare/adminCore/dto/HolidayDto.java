package com.unosquare.adminCore.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.adminCore.enums.HolidayStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class HolidayDto {

    private int holidayId;

    private LocalDate date;

    private EmployeeDto employee;

    private short holidayStatusId;
    private String holidayStatusDescription;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public HolidayDto() {

    }

    public HolidayDto(int holidayId, LocalDate date, EmployeeDto employee, int holidayStatusId, boolean isHalfDay) {
        this.holidayId = holidayId;
        this.date = date;
        this.employee = employee;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    public HolidayDto(LocalDate date, EmployeeDto employee, int holidayStatusId, boolean isHalfDay) {
        this.date = date;
        this.employee = employee;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    @JsonIgnore
    public HolidayStatus getHolidayStatus()
    {
        return HolidayStatus.fromId(holidayStatusId);
    }
}
