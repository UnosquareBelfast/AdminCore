package com.unosquare.admin_core.back_end.configuration.mappings.domain;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseMappings;
import com.unosquare.admin_core.back_end.configuration.mappings.converters.EmployeeNameConverter;
import com.unosquare.admin_core.back_end.dto.EventMessageDTO;
import com.unosquare.admin_core.back_end.entity.EventMessage;
import lombok.NoArgsConstructor;
import org.modelmapper.PropertyMap;


@NoArgsConstructor
public class EventMessageMappings implements BaseMappings<EventMessageDTO, EventMessage> {

    @Override
    public PropertyMap<EventMessageDTO, EventMessage> MapFromSourceToTarget() {
        return new PropertyMap <EventMessageDTO, EventMessage>() {
            protected void configure() {
            }
        };
    }

    @Override
    public PropertyMap<EventMessage, EventMessageDTO> MapFromTargetToSource() {
        return new PropertyMap <EventMessage, EventMessageDTO>() {
            protected void configure() {
                EmployeeNameConverter employeeNameConverter = new EmployeeNameConverter();
                using(employeeNameConverter.MapFromSourceToTarget()).map(source.getEmployee(), destination.getAuthor());
                map().setMessageTypeDescription(source.getEventMessageType().getDescription());
                map().setMessageTypeId(source.getEventMessageType().getEventMessageTypeId());
            }
        };
    }
}
