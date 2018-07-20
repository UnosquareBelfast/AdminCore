package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import com.unosquare.admin_core.back_end.entity.*;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EventDTO {

    private int eventId;

    private LocalDate startDate;
    private LocalDate endDate;

    private int employeeId;

    private int eventTypeId;
    private String eventTypeDescription;

    private int eventStatusId;
    private String eventStatusDescription;

    private Employee employee;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public EventDTO() {

    }

    public EventDTO(int eventId, LocalDate startDate, LocalDate endDate, int employeeId, int eventTypeId, int eventStatusId, boolean isHalfDay) {
        this.eventId = eventId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        this.eventTypeId = (short) eventTypeId;
        this.eventStatusId = (short) eventStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.eventTypeDescription = getEventType().getDescription();
        this.eventStatusDescription = getEventStatus().getDescription();
        this.isHalfDay = isHalfDay;
        this.employee = new Employee(getEmployeeId());

    }

    public EventDTO(LocalDate startDate, LocalDate endDate, int employeeId, int eventTypeId, int holidayStatusId, boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        this.eventTypeId = (short) eventTypeId;
        this.eventStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.eventTypeDescription = getEventType().getDescription();
        this.eventStatusDescription = getEventStatus().getDescription();
        this.isHalfDay = isHalfDay;
        this.employee = new Employee(getEmployeeId());

    }

    @JsonIgnore
    public EventStatuses getEventStatus() {
        return EventStatuses.fromId(eventStatusId);
    }

    @JsonIgnore
    public EventTypes getEventType() {return EventTypes.fromId(eventTypeId); }
}
