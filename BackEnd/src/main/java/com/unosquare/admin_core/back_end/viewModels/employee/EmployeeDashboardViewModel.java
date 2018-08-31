package com.unosquare.admin_core.back_end.viewModels.employee;

import com.unosquare.admin_core.back_end.viewModels.events.EventStatusViewModel;
import com.unosquare.admin_core.back_end.viewModels.events.EventTypeViewModel;
import lombok.Data;

@Data
public class EmployeeDashboardViewModel {

    private String forename;

    private String surname;

    private String status;

    private String type;

}
