package com.unosquare.admin_core.back_end.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.unosquare.admin_core.back_end.enums.EventType;
import com.unosquare.admin_core.back_end.enums.HolidayStatus;
import lombok.Data;

import java.time.LocalDate;

@Data
public class EventDto {

    private int eventId;

    private LocalDate startDate;
    private LocalDate endDate;

    private int employeeId;

    private int eventTypeId;
    private String eventTypeDescription;

    private int holidayStatusId;
    private String holidayStatusDescription;

    private boolean isHalfDay;

    private LocalDate lastModified;
    private LocalDate dateCreated;

    public EventDto() {

    }

    public EventDto(int eventId, LocalDate startDate, LocalDate endDate, int employeeId, int eventTypeId, int holidayStatusId, boolean isHalfDay) {
        this.eventId = eventId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        this.eventTypeId = (short) eventTypeId;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.eventTypeDescription = getEventType().getDescription();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    public EventDto(LocalDate startDate, LocalDate endDate, int employeeId, int eventTypeId, int holidayStatusId, boolean isHalfDay) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.employeeId = employeeId;
        this.eventTypeId = (short) eventTypeId;
        this.holidayStatusId = (short) holidayStatusId;
        this.lastModified = LocalDate.now();
        this.dateCreated = LocalDate.now();
        this.eventTypeDescription = getEventType().getDescription();
        this.holidayStatusDescription = getHolidayStatus().getDescription();
        this.isHalfDay = isHalfDay;
    }

    @JsonIgnore
    public HolidayStatus getHolidayStatus() {
        return HolidayStatus.fromId(holidayStatusId);
    }

    @JsonIgnore
    public EventType getEventType() {return EventType.fromId(eventTypeId); }
}
