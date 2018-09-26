package com.unosquare.admin_core.back_end.dto;

import lombok.Data;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
public class DashboardEventDTO {
    private UUID groupId;
    private LocalDate eventStartDate;
    private LocalDate eventEndDate;
    private List<EventDTO> events;
}
