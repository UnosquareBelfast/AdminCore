
package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.viewModels.holidays.HolidayViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.EventStatus;
import com.unosquare.admin_core.back_end.entity.EventType;

import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;

@NoArgsConstructor
public class HolidayMappings implements BaseMappings<EventDTO, HolidayViewModel> {

    @Override
    public PropertyMap<EventDTO, HolidayViewModel> MapFromSourceToTarget() {
        return new PropertyMap <EventDTO, HolidayViewModel>() {
            protected void configure() {

                map().setEventId(source.getEventId());
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
    public PropertyMap<HolidayViewModel, EventDTO> MapFromTargetToSource() {
        return  new PropertyMap <HolidayViewModel, EventDTO>() {
            protected void configure() {
            }
        };
    }
}

