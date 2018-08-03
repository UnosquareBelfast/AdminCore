package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.CreateWorkingFromHomeViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventStatusesConverter;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.PropertyMap;

import java.time.LocalDate;

public class SaveWorkingFromHomeMappings implements BaseMappings<EventDTO,CreateWorkingFromHomeViewModel> {
    @Override
    public PropertyMap<EventDTO, CreateWorkingFromHomeViewModel> MapFromSourceToTarget() {
        return new PropertyMap<EventDTO, CreateWorkingFromHomeViewModel>() {
            protected void configure() {

            }
        };
    }


    @Override
    public PropertyMap<CreateWorkingFromHomeViewModel, EventDTO> MapFromTargetToSource() {
        return new PropertyMap<CreateWorkingFromHomeViewModel, EventDTO>() {
            protected void configure() {

                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                EventStatusesConverter eventStatusConverter = new EventStatusesConverter();

                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.WORKING_FROM_HOME, destination.getEventTypeId());
                using(eventStatusConverter.MapFromSourceToTarget()).map(EventStatuses.APPROVED, destination.getEventStatusId());

                skip().setStartDate(null);
                skip().setEndDate(null);
                map().setDateCreated(LocalDate.now());
                map().setLastModified(LocalDate.now());


            }
        };
    }
}
