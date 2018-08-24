
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.holidays.CreateHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

@NoArgsConstructor
public class SaveHolidayMappings implements BaseMappings<EventDTO, CreateHolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, CreateHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap<EventDTO, CreateHolidayViewModel>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<CreateHolidayViewModel, EventDTO> MapFromTargetToSource() {
        return new PropertyMap <CreateHolidayViewModel, EventDTO>() {
            protected void configure() {

                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();

                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.ANNUAL_LEAVE, destination.getEventTypeId());
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.AWAITING_APPROVAL, destination.getEventStatusId());
                skip().setStartDate(null);
                skip().setEndDate(null);
                map().setDateCreated(LocalDate.now());
                map().setLastModified(LocalDate.now());
                }
        };
    }
}

