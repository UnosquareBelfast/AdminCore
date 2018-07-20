package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import com.unosquare.admin_core.back_end.entity.*;
import org.modelmapper.PropertyMap;
import org.omg.CORBA.MARSHAL;

public class EventMappings implements BaseMappings<EventDTO, Event> {
    @Override
    public PropertyMap<EventDTO, Event> MapFromDtoToTarget() {
        return new PropertyMap <EventDTO, Event>() {
            protected void configure() {
                map().setStartDate(source.getStartDate());
                map().setLastModified(source.getLastModified());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getEventId());
                map().setEventId(source.getEventId());
                map().setEmployee(source.getEmployee());
                map().setEventType(new EventType(source.getEventTypeId()));
                map().setEndDate(source.getEndDate());
            }
        };
    }

    @Override
    public PropertyMap<Event, EventDTO> MapFromTargetToDto() {
        return new PropertyMap <Event, EventDTO>() {
            protected void configure() {
                map().setEmployeeId(source.getEmployee().getEmployeeId());
                map().setEventStatusId(source.getEventStatus().getEventStatusId());
                map().setEventTypeId(source.getEventType().getEventTypeId());
                map().setEndDate(source.getEndDate());
                map().setHalfDay(source.isHalfDay());
                map().setEventId(source.getEventId());
                map().setDateCreated(source.getDateCreated());
                map().setEventTypeId(source.getEventType().getEventTypeId());
                map().setLastModified(source.getLastModified());
                map().setEmployee(source.getEmployee());
                map().setEventStatusDescription(source.getEventStatus().getDescription());
                map().setStartDate(source.getStartDate());


            }
        };
    }
}
