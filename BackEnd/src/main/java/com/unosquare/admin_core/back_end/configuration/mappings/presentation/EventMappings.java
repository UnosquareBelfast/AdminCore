package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.CreateEventViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDTO;
import org.modelmapper.PropertyMap;

public class EventMappings implements BaseMappings<EventDTO, CreateEventViewModel> {

    @Override
    public PropertyMap<EventDTO, CreateEventViewModel> MapFromDtoToTarget() {
        return new PropertyMap<EventDTO, CreateEventViewModel>() {
            protected void configure() {
                map().setDateCreated(source.getDateCreated());
                map().setEmployeeId(source.getEmployeeId());
                map().setEndDate(source.getEndDate());
                map().setEventId(source.getEventId());
                map().setEventStatusDescription(source.getEventStatusDescription());
                map().setStartDate(source.getStartDate());
                map().setLastModified(source.getLastModified());
                map().setHalfDay(source.isHalfDay());
                map().setEventTypeId(source.getEventTypeId());
                map().setEventTypeDescription(source.getEventTypeDescription());


            }
        };
    }


    @Override
    public PropertyMap<CreateEventViewModel, EventDTO> MapFromTargetToDto() {
        return new PropertyMap<CreateEventViewModel, EventDTO>() {
            protected void configure() {
                map().setEventTypeId(source.getEventTypeId());
                map().setDateCreated(source.getDateCreated());
                map().setHalfDay(source.isHalfDay());
                map().setEmployeeId(source.getEmployeeId());
                map().setStartDate(source.getStartDate());
                map().setEventStatusDescription(source.getEventStatusDescription());
                map().setEventStatusId(source.getEventStatusId());
                map().setLastModified(source.getLastModified());
                map().setEventTypeDescription(source.getEventStatusDescription());
                map().setEventStatusId(source.getEventStatusId());
                map().setEndDate(source.getEndDate());
                map().setEventId(source.getEventId());

            }
        };
    }
}
