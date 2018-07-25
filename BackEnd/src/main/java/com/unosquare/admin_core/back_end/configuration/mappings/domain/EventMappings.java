package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.*;
import com.unosquare.admin_core.back_end.enums.EventStatuses;
import org.modelmapper.PropertyMap;
import org.omg.CORBA.MARSHAL;

public class EventMappings extends BaseMappings<EventDTO, Event> {
    @Override
    public PropertyMap<EventDTO, Event> MapFromDtoToTarget() {
        return new PropertyMap <EventDTO, Event>() {
            protected void configure() {
                map().setStartDate(source.getStartDate());
                map().setLastModified(source.getLastModified());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getEventId());
                map().setEndDate(source.getEndDate());
                map().setDateCreated(source.getDateCreated());
                map().setEventStatus(new EventStatus(source.getEventStatusId()));
                map().setEventType(new EventType(source.getEventTypeId()));

            }
        };
    }

    @Override
    public PropertyMap<Event, EventDTO> MapFromTargetToDto() {
        return new PropertyMap <Event, EventDTO>() {
            protected void configure() {
                map().setEventStatusId(source.getEventStatus().getEventStatusId());
                map().setEventTypeId(source.getEventType().getEventTypeId());
                map().setEndDate(source.getEndDate());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getEventId());
                map().setDateCreated(source.getDateCreated());
                map().setLastModified(source.getLastModified());
                map().setEventStatusDescription(source.getEventStatus().getDescription());
                map().setStartDate(source.getStartDate());
                map().setEventTypeDescription(source.getEventType().getDescription());
            }
        };
    }
}
