package com.unosquare.admin_core.back_end.viewModels.dashboard;

import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeDashboardViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventStatusViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventTypeViewModel;
import lombok.Data;

import java.util.List;

@Data
public class DashboardEventViewModel {
    private int eventId;
    private String startDate;
    private String endDate;
    private EventTypeViewModel eventType;
    private EventStatusViewModel eventStatus;
    private EmployeeDashboardViewModel employee;
    private boolean isHalfDay;
    private List<EventMessageViewModel> messages;
}
