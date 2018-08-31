package com.unosquare.admin_core.back_end.viewModels.dashboard;

import com.unosquare.admin_core.back_end.viewModels.contracts.ContractViewModel;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeDashboardViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventStatusViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventTypeViewModel;
import com.unosquare.admin_core.back_end.viewModels.teams.TeamDashboardEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.teams.TeamViewModel;
import lombok.Data;
import java.util.List;

@Data
public class DashboardSnapshotEventViewModel {
    private String teamName;
    private EmployeeDashboardViewModel employee;
    private EventTypeViewModel eventType;
    private EventStatusViewModel eventStatus;


}
