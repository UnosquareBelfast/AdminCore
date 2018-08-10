package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.DashboardViewModel;
import com.unosquare.admin_core.back_end.ViewModels.HolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;
import org.modelmapper.PropertyMap;

public class ViewDashboardMappings implements BaseMappings<EventDTO, DashboardViewModel> {

    @Override
    public PropertyMap<EventDTO, DashboardViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, DashboardViewModel>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployee().getEmployeeId());
                map().setFirstName(source.getEmployee().getForename());
                map().setSurname(source.getEmployee().getSurname());

            }
        };
    }

    @Override
    public PropertyMap<DashboardViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <DashboardViewModel, EventDTO>() {
            protected void configure() {
            }
        };
    }
}
