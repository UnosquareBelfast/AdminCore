
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.viewModels.events.CreateEventViewModel;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

@NoArgsConstructor
public class SaveEventMappings implements BaseMappings<EventDTO, CreateEventViewModel> {

    @Override
    public PropertyMap<EventDTO, CreateEventViewModel> MapFromSourceToTarget() {
        return new PropertyMap<EventDTO, CreateEventViewModel>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<CreateEventViewModel, EventDTO> MapFromTargetToSource() {
        return new PropertyMap <CreateEventViewModel, EventDTO>() {
            protected void configure() {

                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.AWAITING_APPROVAL, destination.getEventStatusId());
                skip().setStartDate(null);
                skip().setEndDate(null);
                map().setDateCreated(LocalDate.now());
                map().setLastModified(LocalDate.now());
                }
        };
    }
}

