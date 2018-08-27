package com.unosquare.admin_core.back_end.viewModels.dashboard;

import lombok.Data;

import java.util.List;

@Data
public class MobileEmployeeEventViewModel {
    private List<MobileDashboardEventViewModel> events;
}
