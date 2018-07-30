package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.ApproveHolidayViewModel;
import com.unosquare.admin_core.back_end.ViewModels.CancelHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import org.modelmapper.PropertyMap;

public class CancelHolidayMappings implements BaseMappings<EventDTO, CancelHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, CancelHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, CancelHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<CancelHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <CancelHolidayViewModel, EventDTO>() {
            protected void configure() {
                map().setEventId(source.getHolidayId());

            }
        };
    }
}

