package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.holidays.RejectHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

public class RejectHolidayMappings implements BaseMappings<EventDTO, RejectHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, RejectHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, RejectHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<RejectHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <RejectHolidayViewModel, EventDTO>() {
            protected void configure() {
                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();

                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.ANNUAL_LEAVE, destination.getEventTypeId());
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.REJECTED, destination.getEventStatusId());
                map().setEventId(source.getHolidayId());
                map().setLastModified(LocalDate.now());
                skip().setEmployee(null);
            }
        };
    }
}

