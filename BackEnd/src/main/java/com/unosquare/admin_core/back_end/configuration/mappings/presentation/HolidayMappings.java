
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.HolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;

import org.modelmapper.PropertyMap;

import java.time.LocalDate;

public class HolidayMappings extends BaseMappings<EventDTO, HolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, HolidayViewModel> MapFromDtoToTarget() {
        return new PropertyMap <EventDTO, HolidayViewModel>() {
            protected void configure() {

                map().setHolidayId(source.getEventId());
                map().setDateCreated(source.getDateCreated());
                map().setEndDate(source.getEndDate());
                map().setHalfDay(source.isHalfDay());
                map().setLastModified(source.getLastModified());
                map().setStartDate(source.getStartDate());
                map().setEventStatus(new EventStatus(source.getEventStatusId()));
                map().setEventType(new EventType(source.getEventTypeId()));

            }
        };
    }

    @Override
    public PropertyMap<HolidayViewModel, EventDTO> MapFromTargetToDto() {
        return  new PropertyMap <HolidayViewModel, EventDTO>() {
            protected void configure() {
            }
        };
    }
}

