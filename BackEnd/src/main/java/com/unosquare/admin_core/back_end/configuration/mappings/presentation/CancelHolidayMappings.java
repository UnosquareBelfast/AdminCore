package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.holidays.CancelHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

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
                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();

                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.ANNUAL_LEAVE, destination.getEventTypeId());
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.CANCELLED, destination.getEventStatusId());
                map().setEventId(source.getEventId());
                map().setLastModified(LocalDate.now());
                skip().setEmployee(null);
            }
        };
    }
}

