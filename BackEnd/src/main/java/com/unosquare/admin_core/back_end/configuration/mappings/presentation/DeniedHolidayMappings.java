package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.holidays.DeniedHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

public class DeniedHolidayMappings implements BaseMappings<EventDTO, DeniedHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, DeniedHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, DeniedHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<DeniedHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <DeniedHolidayViewModel, EventDTO>() {
            protected void configure() {
                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();

                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.ANNUAL_LEAVE, destination.getEventTypeId());
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.DENIED, destination.getEventStatusId());
                map().setEventId(source.getEventId());
                map().setLastModified(LocalDate.now());
                skip().setEmployee(null);
            }
        };
    }
}

