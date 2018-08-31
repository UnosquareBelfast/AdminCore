package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.viewModels.dashboard.DashboardSnapshotEventViewModel;
import com.unosquare.admin_core.back_end.viewModels.employee.EmployeeDashboardViewModel;
import org.modelmapper.PropertyMap;

public class ViewMobileEventDashboardMappings implements BaseMappings<EventDTO, DashboardSnapshotEventViewModel> {

    @Override
    public PropertyMap<EventDTO, DashboardSnapshotEventViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, DashboardSnapshotEventViewModel>() {
            protected void configure() {
                map().setTeamName(source.getTeamName());
            }
        };
    }

    @Override
    public PropertyMap<DashboardSnapshotEventViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <DashboardSnapshotEventViewModel, EventDTO>() {
            protected void configure() {
            }
        };
    }
}