package com.unosquare.admin_core.back_end.viewModels;

import org.apache.tomcat.jni.Local;

import java.time.LocalDate;

import lombok.Data;

@Data
public class UpdateHolidayViewModel {

    private int holidayId;
    private int employeeId;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate updateDate;
    private int holidayStatusId;
    private boolean isHalfDay;

    public UpdateHolidayViewModel(){

    }

    public UpdateHolidayViewModel(int holidayId, int employeeId, LocalDate startDate, LocalDate endDate, LocalDate updateDate, int holidayStatusId, boolean isHalfDay){
        this.holidayId = holidayId;
        this.employeeId = employeeId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.updateDate = updateDate;
        this.holidayStatusId = holidayStatusId;
        this.isHalfDay = isHalfDay;
    }

}
