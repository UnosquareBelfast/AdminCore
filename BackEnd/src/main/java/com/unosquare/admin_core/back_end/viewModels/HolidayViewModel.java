package com.unosquare.admin_core.back_end.viewModels;

import java.time.LocalDate;
import com.unosquare.admin_core.back_end.entity.Employee;

import com.unosquare.admin_core.back_end.entity.HolidayStatus;
import lombok.Data;

@Data
public class HolidayViewModel {
    private int holidayId;
    private int employeeId;
    private String employeeFirstName;
    private String employeeLastName;
    private LocalDate startDate;
    private LocalDate endDate;
    private LocalDate requestDate;
    private int holidayStatusId;
    private String holidayStatusDescription;
    private boolean isHalfDay;
    private Employee employee;


    public HolidayViewModel(){

    }

    public HolidayViewModel(int holidayId, int employeeId, String employeeFirstName , String employeeLastName, LocalDate startDate, LocalDate endDate,
                            LocalDate requestDate, int holidayStatusId, String holidayStatusDescription, boolean isHalfDay){

        this.holidayId = holidayId;
        this.employeeId = employeeId;
        this.employeeFirstName = employeeFirstName;
        this.employeeLastName = employeeLastName;
        this.startDate = startDate;
        this.endDate = endDate;
        this.requestDate = requestDate;
        this.employee = new Employee();
        this.holidayStatusId = holidayStatusId;
        this.holidayStatusDescription = holidayStatusDescription;
        this.isHalfDay = isHalfDay;
    }

    public com.unosquare.admin_core.back_end.enums.HolidayStatus getHolidayStatus() {
        return com.unosquare.admin_core.back_end.enums.HolidayStatus.fromId(holidayStatusId);
    }


}
