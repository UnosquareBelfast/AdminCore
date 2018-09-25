package com.unosquare.admin_core.back_end.viewModels.dashboard;

import lombok.Data;

import java.util.List;
import java.util.UUID;

@Data
public class EmployeeEventViewModel {
    private UUID groupId;
    private String eventStartDate;
    private String eventEndDate;
    private List<DashboardEventViewModel> events;
}
