package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.entity.Employee;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import com.unosquare.admin_core.back_end.service.EmployeeService;
import lombok.Data;
import org.modelmapper.ModelMapper;
import org.springframework.ui.ModelMap;

import java.time.LocalDate;

@Data
public class HolidayDto {
    EmployeeService employeeService;
   // private EmployeeDto employee;
    private int holidayId;

    private LocalDate startDate;
    private LocalDate endDate;

    private int employeeId;
    private Employee employee;//Delete if needed
   // private EmployeeDto employee;

    private int holidayStatusId;
    private String holidayStatusDescription;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public HolidayDto() {

    }

    public HolidayDto(int holidayId, LocalDate startDate, LocalDate endDate, int employeeId, int holidayStatusId, boolean isHalfDay) {
        this.holidayId = holidayId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        //this.employee = new ModelMapper().map(employeeService.findById(employeeId), EmployeeDto.class);
        this.employee = new Employee();
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    public HolidayDto(LocalDate startDate, LocalDate endDate, int employeeId, int holidayStatusId, boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        this.holidayStatusId = (short) holidayStatusId;
        //this.employee = new ModelMapper().map(employeeService.findById(employeeId), EmployeeDto.class);
        this.employee = new Employee();
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
