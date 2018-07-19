package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDto;
import com.unosquare.admin_core.back_end.entity.*;
import org.modelmapper.PropertyMap;

public class EventMappings implements BaseMappings<EventDto, Event> {
    @Override
    public PropertyMap<EventDto, Event> MapFromDtoToTarget() {
        return new PropertyMap <EventDto, Event>() {
            protected void configure() {
                map().setStartDate(source.getStartDate());
                map().setLastModified(source.getLastModified());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getEventId());

            }
        };
    }

    @Override
    public PropertyMap<Event, EventDto> MapFromTargetToDto() {
        return new PropertyMap <Event, EventDto>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployee().getEmployeeId());
                map().setEventStatusId(source.getEventStatus().getEventStatusId());
                map().setEventTypeId(source.getEventType().getEventTypeId());


            }
        };
    }
}
