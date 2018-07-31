package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.UpdateHolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EventTypesConverter;
import com.unosquare.admin_core.back_end.dto.UpdateEventDTO;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import lombok.NoArgsConstructor;

import org.modelmapper.PropertyMap;

import java.time.LocalDate;

@NoArgsConstructor
public class UpdateHolidayMappings implements BaseMappings<UpdateEventDTO, UpdateHolidayViewModel>{
    @Override
    public PropertyMap<UpdateEventDTO, UpdateHolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <UpdateEventDTO, UpdateHolidayViewModel>() {
            protected void configure() {

            }
        };
    }

    @Override
    public PropertyMap<UpdateHolidayViewModel, UpdateEventDTO> MapFromTargetToSource() {
        return  new PropertyMap <UpdateHolidayViewModel, UpdateEventDTO>() {
            protected void configure() {
                EventTypesConverter eventTypesConverter = new EventTypesConverter();
                using(eventTypesConverter.MapFromSourceToTarget()).map(EventTypes.ANNUAL_LEAVE, destination.getEventTypeId());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getHolidayId());
                map().setLastModified(LocalDate.now());
                map().setStartDate(source.getStartDate());
                map().setEndDate(source.getEndDate());
            }
        };
    }

}