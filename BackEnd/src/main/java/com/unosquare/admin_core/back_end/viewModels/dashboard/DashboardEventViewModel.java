package com.unosquare.admin_core.back_end.viewModels.dashboard;

import com.unosquare.admin_core.back_end.viewModels.events.EventStatusViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventTypeViewModel;
import lombok.Data;

@Data
public class DashboardEventViewModel {
    private String startDate;
    private String endDate;
    private EventTypeViewModel eventType;
    private EventStatusViewModel eventStatus;
    private boolean isHalfDay;
}
