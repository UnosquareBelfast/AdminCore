package com.unosquare.admin_core.back_end.configuration.mappings.converters;

import com.unosquare.admin_core.back_end.configuration.mappings.BaseConverters;
import com.unosquare.admin_core.back_end.enums.EventTypes;
import org.modelmapper.Converter;

public class EventTypesConverter implements BaseConverters<EventTypes, Integer> {

    @Override
    public Converter<EventTypes, Integer> MapFromSourceToTarget() {
        return mappingContext -> mappingContext.getSource().getEventTypeId();
    }

    @Override
    public Converter<Integer, EventTypes> MapFromTargetToSource() {
        return mappingContext -> EventTypes.fromId(mappingContext.getSource());
    }
}
