package com.unosquare.admin_core.back_end.configuration.mappings.presentation;

import com.unosquare.admin_core.back_end.ViewModels.CreateEventViewModel;
import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.dto.EventDto;
import org.modelmapper.PropertyMap;

public class EventMappings implements BaseMappings<EventDto, CreateEventViewModel> {

    @Override
    public PropertyMap<EventDto, CreateEventViewModel> MapFromDtoToTarget() {
        return new PropertyMap <EventDto, CreateEventViewModel>() {
            protected void configure() {

            }
        };
    }


    @Override
    public PropertyMap<CreateEventViewModel, EventDto> MapFromTargetToDto() {
        return new PropertyMap <CreateEventViewModel, EventDto>() {
            protected void configure() {
            }
        };
    }
}
